package com.example.projectsystem.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.projectsystem.commons.PageResult;
import com.example.projectsystem.commons.Results;
import com.example.projectsystem.domain.*;
import com.example.projectsystem.dto.*;
import com.example.projectsystem.service.*;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.math.RoundingMode;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityService activityService;
    private final ActivityRegistrationService activityRegistrationService;
    private final ClubService clubService;
    private final ClubMemberService clubMemberService;
    private final UserService userService;

    public ActivityController(ActivityService activityService,
                              ActivityRegistrationService activityRegistrationService,
                              ClubService clubService,
                              ClubMemberService clubMemberService,
                              UserService userService) {
        this.activityService = activityService;
        this.activityRegistrationService = activityRegistrationService;
        this.clubService = clubService;
        this.clubMemberService = clubMemberService;
        this.userService = userService;
    }

    /**
     * 创建活动
     * 活动状态默认为“审核中”，活动等级由社团的 level_tag 决定
     */
    @PostMapping
    public Results createActivity(@RequestBody ActivityCreateRequest request) {
        try {
            if (!StringUtils.hasText(request.getName())) {
                return Results.fail().message("活动名称不能为空");
            }
            if (request.getClubId() == null) {
                return Results.fail().message("主办方社团ID不能为空");
            }

            Club club = clubService.getById(request.getClubId());
            if (club == null) {
                return Results.fail().message("主办方社团不存在");
            }

            Activity activity = new Activity();
            activity.setName(request.getName());
            activity.setDescription(request.getDescription());
            activity.setActivityType(request.getActivityType());
            activity.setLocation(request.getLocation());
            activity.setClubId(request.getClubId());
            activity.setNotice(request.getNotice());
            activity.setRegistrationStartTime(request.getRegistrationStartTime());
            activity.setRegistrationEndTime(request.getRegistrationEndTime());
            activity.setStartTime(request.getStartTime());
            activity.setEndTime(request.getEndTime());
            activity.setMaxParticipants(request.getMaxParticipants());
            activity.setNeedAudit(request.getNeedAudit() != null ? request.getNeedAudit() : Boolean.FALSE);

            // 图片 URL 数组用逗号拼接存储
            if (!CollectionUtils.isEmpty(request.getImageUrls())) {
                String joined = String.join(",", request.getImageUrls());
                activity.setImageUrls(joined);
            }

            Activity created = activityService.createActivity(activity);
            return Results.success()
                    .message("创建活动成功")
                    .data("activity", created);
        } catch (IllegalArgumentException e) {
            return Results.fail().message(e.getMessage());
        } catch (Exception e) {
            return Results.fail().message("创建活动失败: " + e.getMessage());
        }
    }

    /**
     * 获取待审核活动列表（由 isBoss = true 的用户查看）
     */
    @GetMapping("/pending")
    public Results getPendingActivities(@RequestParam("bossUserId") Long bossUserId,
                                        @RequestParam(value = "currentPage", defaultValue = "1") Integer currentPage,
                                        @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize) {
        try {
            User user = userService.getById(bossUserId);
            if (user == null || user.getIsBoss() == null || !user.getIsBoss()) {
                return Results.fail().message("无权限查看待审核活动");
            }

            Page<Activity> page = new Page<>(currentPage, pageSize);
            LambdaQueryWrapper<Activity> wrapper = new LambdaQueryWrapper<>();
            wrapper.eq(Activity::getAuditStatus, 0); // 待审核
            wrapper.orderByDesc(Activity::getCreateTime);

            IPage<Activity> result = activityService.page(page, wrapper);
            PageResult<Activity> pageData = new PageResult<>(
                    result.getTotal(),
                    (int) result.getCurrent(),
                    (int) result.getSize(),
                    result.getRecords()
            );

            return Results.success()
                    .message("查询成功")
                    .data("page", pageData);
        } catch (Exception e) {
            return Results.fail().message("查询失败: " + e.getMessage());
        }
    }

    /**
     * 审核活动（由 isBoss = true 的用户进行）
     */
    @PostMapping("/review")
    public Results reviewActivity(@RequestBody ActivityReviewRequest request) {
        try {
            if (request.getActivityId() == null || request.getAuditUserId() == null || request.getPass() == null) {
                return Results.fail().message("参数不完整");
            }
            User user = userService.getById(request.getAuditUserId());
            if (user == null || user.getIsBoss() == null || !user.getIsBoss()) {
                return Results.fail().message("无审核权限");
            }

            Activity activity = activityService.getById(request.getActivityId());
            if (activity == null) {
                return Results.fail().message("活动不存在");
            }

            if (Boolean.TRUE.equals(request.getPass())) {
                activity.setAuditStatus(1);
            } else {
                activity.setAuditStatus(2);
                activity.setStatus("已拒绝");
            }
            activity.setAuditUserId(request.getAuditUserId());
            activity.setAuditTime(LocalDateTime.now());

            // 审核通过后，根据时间刷新活动状态（报名中 / 等待中 / 进行中 / 已结束）
            if (activity.getAuditStatus() != null && activity.getAuditStatus() == 1) {
                refreshActivityStatusByTime(activity);
            } else {
                activityService.updateById(activity);
            }
            return Results.success().message("审核成功");
        } catch (Exception e) {
            return Results.fail().message("审核失败: " + e.getMessage());
        }
    }

    /**
     * 获取某活动下待审核的报名人员（由主办方的管理者进行审核）
     */
    @GetMapping("/{activityId}/registrations/pending")
    public Results getPendingRegistrations(@PathVariable Long activityId,
                                           @RequestParam("managerUserId") Long managerUserId) {
        try {
            Activity activity = activityService.getById(activityId);
            if (activity == null) {
                return Results.fail().message("活动不存在");
            }

            // 校验是否为该社团管理员
            Long clubId = activity.getClubId();
            ClubMember member = clubMemberService.lambdaQuery()
                    .eq(ClubMember::getClubId, clubId)
                    .eq(ClubMember::getUserId, managerUserId)
                    .one();
            if (member == null || member.getIsManager() == null || !member.getIsManager()) {
                return Results.fail().message("无权限查看该活动报名信息");
            }

            List<ActivityRegistration> list = activityRegistrationService.lambdaQuery()
                    .eq(ActivityRegistration::getActivityId, activityId)
                    .eq(ActivityRegistration::getStatus, "待审核")
                    .orderByAsc(ActivityRegistration::getRegistrationTime)
                    .list();

            return Results.success()
                    .message("查询成功")
                    .data("items", list);
        } catch (Exception e) {
            return Results.fail().message("查询失败: " + e.getMessage());
        }
    }

    /**
     * 审核报名人员（通过/拒绝）
     */
    @PostMapping("/registrations/review")
    public Results reviewRegistration(@RequestBody RegistrationReviewRequest request) {
        try {
            if (request.getActivityId() == null
                    || request.getUserId() == null
                    || request.getManagerUserId() == null
                    || request.getPass() == null) {
                return Results.fail().message("参数不完整");
            }

            Activity activity = activityService.getById(request.getActivityId());
            if (activity == null) {
                return Results.fail().message("活动不存在");
            }

            // 校验是否为该社团管理员
            ClubMember member = clubMemberService.lambdaQuery()
                    .eq(ClubMember::getClubId, activity.getClubId())
                    .eq(ClubMember::getUserId, request.getManagerUserId())
                    .one();
            if (member == null || member.getIsManager() == null || !member.getIsManager()) {
                return Results.fail().message("无审核权限");
            }

            // 通过活动ID和用户ID查找报名记录
            ActivityRegistration registration = activityRegistrationService.lambdaQuery()
                    .eq(ActivityRegistration::getActivityId, request.getActivityId())
                    .eq(ActivityRegistration::getUserId, request.getUserId())
                    .one();
            if (registration == null) {
                return Results.fail().message("报名记录不存在");
            }

            String oldStatus = registration.getStatus();
            if (Boolean.TRUE.equals(request.getPass())) {
                registration.setStatus("已通过");
            } else {
                registration.setStatus("已拒绝");
            }
            registration.setAuditUserId(request.getManagerUserId());
            registration.setAuditTime(LocalDateTime.now());

            activityRegistrationService.updateById(registration);

            // 更新活动的当前报名人数（只统计已通过的）
            if (Boolean.TRUE.equals(request.getPass()) && !"已通过".equals(oldStatus)) {
                // 审核通过，且之前不是已通过状态，增加人数
                long approvedCount = activityRegistrationService.lambdaQuery()
                        .eq(ActivityRegistration::getActivityId, request.getActivityId())
                        .eq(ActivityRegistration::getStatus, "已通过")
                        .count();
                activity.setCurrentParticipants((int) approvedCount);
                activityService.updateById(activity);
            } else if (!Boolean.TRUE.equals(request.getPass()) && "已通过".equals(oldStatus)) {
                // 审核拒绝，且之前是已通过状态，减少人数
                long approvedCount = activityRegistrationService.lambdaQuery()
                        .eq(ActivityRegistration::getActivityId, request.getActivityId())
                        .eq(ActivityRegistration::getStatus, "已通过")
                        .count();
                activity.setCurrentParticipants((int) approvedCount);
                activityService.updateById(activity);
            }

            return Results.success().message("审核成功");
        } catch (Exception e) {
            return Results.fail().message("审核失败: " + e.getMessage());
        }
    }

    /**
     * 模糊查询活动列表
     * 请求参数均为可选，如果都为空，则返回所有活动
     */
    @PostMapping("/search")
    public Results searchActivities(@RequestBody ActivitySearchRequest request) {
        try {
            Integer currentPage = request.getCurrentPage() != null && request.getCurrentPage() > 0
                    ? request.getCurrentPage() : 1;
            Integer pageSize = request.getPageSize() != null && request.getPageSize() > 0
                    ? request.getPageSize() : 10;

            Page<Activity> page = new Page<>(currentPage, pageSize);
            LambdaQueryWrapper<Activity> wrapper = new LambdaQueryWrapper<>();

            if (StringUtils.hasText(request.getKeyword())) {
                wrapper.and(w -> w
                        .like(Activity::getName, request.getKeyword())
                        .or()
                        .like(Activity::getDescription, request.getKeyword())
                        .or()
                        .like(Activity::getLocation, request.getKeyword())
                );
            }
            if (StringUtils.hasText(request.getStatus())) {
                wrapper.eq(Activity::getStatus, request.getStatus());
            }
            if (StringUtils.hasText(request.getCategory())) {
                wrapper.eq(Activity::getActivityType, request.getCategory());
            }
            if (StringUtils.hasText(request.getLevel())) {
                wrapper.eq(Activity::getActivityLevel, request.getLevel());
            }

            wrapper.orderByDesc(Activity::getCreateTime);

            IPage<Activity> result = activityService.page(page, wrapper);
            // 查询时根据当前时间刷新每个活动的状态
            for (Activity activity : result.getRecords()) {
                refreshActivityStatusByTime(activity);
            }
            
            // 转换为 DTO，将 imageUrls 字符串转换为数组
            List<ActivityDTO> activityDTOs = result.getRecords().stream()
                    .map(activity -> {
                        ActivityDTO dto = new ActivityDTO(activity);
                        // 将 imageUrls 字符串转换为数组
                        if (StringUtils.hasText(activity.getImageUrls())) {
                            List<String> urls = Arrays.stream(activity.getImageUrls().split(","))
                                    .map(String::trim)
                                    .filter(StringUtils::hasText)
                                    .collect(Collectors.toList());
                            dto.setImageUrls(urls);
                        } else {
                            dto.setImageUrls(new ArrayList<>());
                        }
                        return dto;
                    })
                    .collect(Collectors.toList());
            
            PageResult<ActivityDTO> pageData = new PageResult<>(
                    result.getTotal(),
                    (int) result.getCurrent(),
                    (int) result.getSize(),
                    activityDTOs
            );

            return Results.success()
                    .message("查询成功")
                    .data("page", pageData);
        } catch (Exception e) {
            return Results.fail().message("查询失败: " + e.getMessage());
        }
    }

    /**
     * 根据活动ID查看活动详情
     */
    @GetMapping("/{id}")
    public Results getActivityDetail(@PathVariable Long id) {
        try {
            Activity activity = activityService.getById(id);
            if (activity == null) {
                return Results.fail().message("活动不存在");
            }

            // 进入详情时也根据时间刷新一次状态
            refreshActivityStatusByTime(activity);

            // 统计已通过的报名人数
            long participantCount = activityRegistrationService.lambdaQuery()
                    .eq(ActivityRegistration::getActivityId, id)
                    .eq(ActivityRegistration::getStatus, "已通过")
                    .count();
            activity.setCurrentParticipants((int) participantCount);

            // 创建包含时间戳的活动响应对象
            Map<String, Object> activityMap = new HashMap<>();
            activityMap.put("id", activity.getId());
            activityMap.put("name", activity.getName());
            activityMap.put("clubId", activity.getClubId());
            activityMap.put("description", activity.getDescription());
            activityMap.put("location", activity.getLocation());
            activityMap.put("notice", activity.getNotice());
            // 将时间字段转换为时间戳（毫秒）
            activityMap.put("registrationStartTime", activity.getRegistrationStartTime() != null
                    ? activity.getRegistrationStartTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()
                    : null);
            activityMap.put("registrationEndTime", activity.getRegistrationEndTime() != null
                    ? activity.getRegistrationEndTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()
                    : null);
            activityMap.put("startTime", activity.getStartTime() != null
                    ? activity.getStartTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()
                    : null);
            activityMap.put("endTime", activity.getEndTime() != null
                    ? activity.getEndTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()
                    : null);
            activityMap.put("maxParticipants", activity.getMaxParticipants());
            activityMap.put("currentParticipants", activity.getCurrentParticipants());
            activityMap.put("needAudit", activity.getNeedAudit());
            activityMap.put("activityType", activity.getActivityType());
            activityMap.put("activityLevel", activity.getActivityLevel());
            activityMap.put("status", activity.getStatus());
            activityMap.put("score", activity.getScore());
            activityMap.put("auditStatus", activity.getAuditStatus());
            activityMap.put("auditTime", activity.getAuditTime());
            activityMap.put("auditUserId", activity.getAuditUserId());
            activityMap.put("createTime", activity.getCreateTime());
            activityMap.put("updateTime", activity.getUpdateTime());

            // 解析图片 URL 数组给前端更友好一些
            if (StringUtils.hasText(activity.getImageUrls())) {
                List<String> urls = Arrays.stream(activity.getImageUrls().split(","))
                        .map(String::trim)
                        .filter(StringUtils::hasText)
                        .collect(Collectors.toList());
                return Results.success()
                        .message("查询成功")
                        .data("activity", activityMap)
                        .data("imageUrls", urls);
            }

            return Results.success()
                    .message("查询成功")
                    .data("activity", activityMap);
        } catch (Exception e) {
            return Results.fail().message("查询失败: " + e.getMessage());
        }
    }

    /**
     * 人员活动报名
     */
    @PostMapping("/{activityId}/register")
    public Results registerActivity(@PathVariable Long activityId,
                                    @RequestBody ActivityRegisterRequest request) {
        try {
            if (request.getUserId() == null) {
                return Results.fail().message("用户ID不能为空");
            }

            Activity activity = activityService.getById(activityId);
            if (activity == null) {
                return Results.fail().message("活动不存在");
            }
            if (activity.getAuditStatus() == null || activity.getAuditStatus() != 1) {
                return Results.fail().message("活动尚未通过审核，无法报名");
            }

            // 报名时间范围校验
            LocalDateTime now = LocalDateTime.now();
            if (activity.getRegistrationStartTime() == null
                    || activity.getRegistrationEndTime() == null) {
                return Results.fail().message("活动报名时间未配置，无法报名");
            }
            if (now.isBefore(activity.getRegistrationStartTime())
                    || now.isAfter(activity.getRegistrationEndTime())) {
                return Results.fail().message("当前不在报名时间范围内");
            }

            // 检查是否已报名
            ActivityRegistration existing = activityRegistrationService.lambdaQuery()
                    .eq(ActivityRegistration::getActivityId, activityId)
                    .eq(ActivityRegistration::getUserId, request.getUserId())
                    .one();
            if (existing != null) {
                return Results.fail().message("您已报名该活动");
            }

            // 检查人数上限（只统计已通过的）
            if (activity.getMaxParticipants() != null && activity.getMaxParticipants() > 0) {
                long approvedCount = activityRegistrationService.lambdaQuery()
                        .eq(ActivityRegistration::getActivityId, activityId)
                        .eq(ActivityRegistration::getStatus, "已通过")
                        .count();
                if (approvedCount >= activity.getMaxParticipants()) {
                    return Results.fail().message("报名人数已达上限");
                }
            }

            ActivityRegistration registration = new ActivityRegistration();
            registration.setActivityId(activityId);
            registration.setUserId(request.getUserId());
            // 不需要审核则直接标记为已通过，否则为待审核
            if (Boolean.TRUE.equals(activity.getNeedAudit())) {
                registration.setStatus("待审核");
            } else {
                registration.setStatus("已通过");
            }
            registration.setRegistrationTime(LocalDateTime.now());

            activityRegistrationService.save(registration);

            // 如果不需要审核直接通过，更新活动的当前报名人数
            if (!Boolean.TRUE.equals(activity.getNeedAudit())) {
                long approvedCount = activityRegistrationService.lambdaQuery()
                        .eq(ActivityRegistration::getActivityId, activityId)
                        .eq(ActivityRegistration::getStatus, "已通过")
                        .count();
                activity.setCurrentParticipants((int) approvedCount);
                activityService.updateById(activity);
            }

            return Results.success()
                    .message("报名成功")
                    .data("registration", registration);
        } catch (Exception e) {
            return Results.fail().message("报名失败: " + e.getMessage());
        }
    }

    /**
     * 人员评价活动（当前仅支持评分）
     */
    @PostMapping("/comment")
    public Results commentActivity(@RequestBody ActivityCommentRequest request) {
        try {
            if (request.getActivityId() == null || request.getUserId() == null || request.getScore() == null) {
                return Results.fail().message("参数不完整");
            }
            Activity activity = activityService.getById(request.getActivityId());
            if (activity == null) {
                return Results.fail().message("活动不存在");
            }

            // 只能在活动结束后进行评分
            if (activity.getEndTime() == null) {
                return Results.fail().message("活动结束时间未配置，无法评分");
            }
            LocalDateTime now = LocalDateTime.now();
            if (!now.isAfter(activity.getEndTime())) {
                return Results.fail().message("活动结束后才能进行评分");
            }

            ActivityRegistration registration = activityRegistrationService.lambdaQuery()
                    .eq(ActivityRegistration::getActivityId, request.getActivityId())
                    .eq(ActivityRegistration::getUserId, request.getUserId())
                    .one();
            if (registration == null) {
                return Results.fail().message("未找到报名记录，不能评价");
            }
            if (!"已通过".equals(registration.getStatus())) {
                return Results.fail().message("报名未通过，不能评价");
            }

            BigDecimal score = request.getScore();
            if (score.compareTo(BigDecimal.ZERO) < 0 || score.compareTo(new BigDecimal("100")) > 0) {
                return Results.fail().message("评分范围应在0-100之间");
            }

            registration.setScore(score);
            activityRegistrationService.updateById(registration);

            // 计算活动平均评分（仅统计已通过且已评分的报名记录），保留1位小数
            List<ActivityRegistration> scoredList = activityRegistrationService.lambdaQuery()
                    .eq(ActivityRegistration::getActivityId, request.getActivityId())
                    .eq(ActivityRegistration::getStatus, "已通过")
                    .isNotNull(ActivityRegistration::getScore)
                    .list();
            if (!scoredList.isEmpty()) {
                BigDecimal totalScore = scoredList.stream()
                        .map(ActivityRegistration::getScore)
                        .reduce(BigDecimal.ZERO, BigDecimal::add);
                BigDecimal averageScore = totalScore.divide(
                        BigDecimal.valueOf(scoredList.size()), 1, RoundingMode.HALF_UP);
                activity.setScore(averageScore);
            } else {
                activity.setScore(BigDecimal.ZERO);
            }
            activityService.updateById(activity);

            return Results.success().message("评价成功");
        } catch (Exception e) {
            return Results.fail().message("评价失败: " + e.getMessage());
        }
    }

    /**
     * 获取审核人员列表（由社团的管理者进行审核）
     * 返回待审核人员列表，包含个人信息
     */
    @GetMapping("/{activityId}/registrations/status")
    public Results getRegistrationStatus(@PathVariable Long activityId,
                                         @RequestParam("managerUserId") Long managerUserId) {
        try {
            Activity activity = activityService.getById(activityId);
            if (activity == null) {
                return Results.fail().message("活动不存在");
            }

            // 校验是否为该社团管理员
            Long clubId = activity.getClubId();
            ClubMember member = clubMemberService.lambdaQuery()
                    .eq(ClubMember::getClubId, clubId)
                    .eq(ClubMember::getUserId, managerUserId)
                    .one();
            if (member == null || member.getIsManager() == null || !member.getIsManager()) {
                return Results.fail().message("无权限查看该活动报名信息");
            }

            // 查询所有待审核的报名记录
            List<ActivityRegistration> registrations = activityRegistrationService.lambdaQuery()
                    .eq(ActivityRegistration::getActivityId, activityId)
                    .eq(ActivityRegistration::getStatus, "待审核")
                    .orderByAsc(ActivityRegistration::getRegistrationTime)
                    .list();

            if (registrations.isEmpty()) {
                return Results.success()
                        .message("查询成功")
                        .data("items", new ArrayList<>());
            }

            // 批量查询用户信息
            List<Long> userIds = registrations.stream()
                    .map(ActivityRegistration::getUserId)
                    .distinct()
                    .collect(Collectors.toList());
            List<User> users = userService.listByIds(userIds);

            // 转换为 DTO，时间字段转换为时间戳
            List<UserDTO> resultList = users.stream()
                    .map(UserDTO::new)
                    .collect(Collectors.toList());

            return Results.success()
                    .message("查询成功")
                    .data("items", resultList);
        } catch (Exception e) {
            return Results.fail().message("查询失败: " + e.getMessage());
        }
    }

    /**
     * 根据当前时间刷新活动状态：
     * - 报名中：当前时间在报名开始和报名结束之间
     * - 等待中：报名结束后且当前时间在活动开始之前，或者当前时间在报名开始之前
     * - 进行中：当前时间在活动开始和活动结束之间
     * - 已结束：当前时间晚于活动结束
     *
     * 仅在活动已通过审核（auditStatus = 1）时生效。
     */
    private void refreshActivityStatusByTime(Activity activity) {
        if (activity == null) {
            return;
        }
        if (activity.getAuditStatus() == null || activity.getAuditStatus() != 1) {
            return;
        }

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime regStart = activity.getRegistrationStartTime();
        LocalDateTime regEnd = activity.getRegistrationEndTime();
        LocalDateTime start = activity.getStartTime();
        LocalDateTime end = activity.getEndTime();

        // 关键时间未配置时，不强制调整状态
        if (regStart == null || regEnd == null || start == null || end == null) {
            activityService.updateById(activity);
            return;
        }

        String newStatus;
        if (now.isAfter(regStart) && now.isBefore(regEnd)) {
            newStatus = "报名中";
        } else if ((now.isAfter(regEnd) && now.isBefore(start)) || now.isBefore(regStart)) {
            newStatus = "等待中";
        } else if (now.isAfter(start) && now.isBefore(end)) {
            newStatus = "进行中";
        } else if (now.isAfter(end)) {
            newStatus = "已结束";
        } else {
            // 其他边界情况，保持原状态
            newStatus = activity.getStatus();
        }

        if (newStatus != null && !newStatus.equals(activity.getStatus())) {
            activity.setStatus(newStatus);
            activityService.updateById(activity);
        } else {
            // 即便状态未变化，也保证其他字段更新（例如审核时间等）
            activityService.updateById(activity);
        }
    }
}


