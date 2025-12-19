package com.example.projectsystem.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.projectsystem.domain.Club;
import com.example.projectsystem.domain.ClubMember;
import com.example.projectsystem.domain.User;
import com.example.projectsystem.dto.ClubMemberWithUserDTO;
import com.example.projectsystem.dto.ClubOptionDTO;
import com.example.projectsystem.mapper.ClubMemberMapper;
import com.example.projectsystem.service.ClubService;
import com.example.projectsystem.service.ClubMemberService;
import com.example.projectsystem.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClubMemberServiceImpl extends ServiceImpl<ClubMemberMapper, ClubMember> implements ClubMemberService {

    private final UserService userService;
    private final ClubService clubService;

    public ClubMemberServiceImpl(UserService userService, ClubService clubService) {
        this.userService = userService;
        this.clubService = clubService;
    }

    @Override
    public ClubMember joinClub(Long clubId, Long userId) {
        // 检查是否已经加入
        ClubMember existing = lambdaQuery()
                .eq(ClubMember::getClubId, clubId)
                .eq(ClubMember::getUserId, userId)
                .one();

        if (existing != null) {
            throw new IllegalArgumentException("您已经加入该社团");
        }

        // 从user表获取用户信息
        User user = userService.getById(userId);
        if (user == null) {
            throw new IllegalArgumentException("用户不存在");
        }

        // 获取用户名称，优先使用realName，如果没有则使用username
        String userName = StringUtils.hasText(user.getRealName()) ? user.getRealName() : user.getUsername();

        ClubMember clubMember = new ClubMember();
        clubMember.setClubId(clubId);
        clubMember.setUserId(userId);
        clubMember.setUserName(userName);
        clubMember.setIsManager(false);
        clubMember.setJoinTime(LocalDateTime.now());
        save(clubMember);
        return clubMember;
    }

    @Override
    public void updateUserName(Long userId, String userName) {
        // 更新该用户在所有社团中的用户名称
        lambdaUpdate()
                .eq(ClubMember::getUserId, userId)
                .set(ClubMember::getUserName, userName)
                .update();
    }

    @Override
    public void setManager(Long clubId, Long userId, boolean isManager) {
        // 更新指定社团中某个成员的管理员标记
        ClubMember member = lambdaQuery()
                .eq(ClubMember::getClubId, clubId)
                .eq(ClubMember::getUserId, userId)
                .one();
        if (member == null) {
            throw new IllegalArgumentException("该用户未加入该社团");
        }
        // 如果该成员在此社团已经是管理员，则不允许重复设置
        if (isManager && Boolean.TRUE.equals(member.getIsManager())) {
            throw new IllegalArgumentException("该成员已是该社团的管理员");
        }

        member.setIsManager(isManager);
        updateById(member);

        // 同步更新 user 表中的 isManager 字段：
        // 规则：只要该用户在任意社团中是管理员，则 user.isManager = true；
        // 否则 user.isManager = false。
        User user = userService.getById(userId);
        if (user != null) {
            if (isManager) {
                // 直接标记为管理员
                user.setIsManager(true);
            } else {
                // 取消某个社团管理员后，需要判断该用户是否仍在其他社团是管理员
                boolean stillManagerSomewhere = lambdaQuery()
                        .eq(ClubMember::getUserId, userId)
                        .eq(ClubMember::getIsManager, true)
                        .count() > 0;
                user.setIsManager(stillManagerSomewhere);
            }
            userService.updateById(user);
        }
    }

    @Override
    public List<ClubMemberWithUserDTO> getMembersWithUserByClubId(Long clubId) {
        // 先查询该社团的所有成员
        List<ClubMember> members = lambdaQuery()
                .eq(ClubMember::getClubId, clubId)
                // 管理员优先，其次按加入时间排序（可根据需要调整）
                .orderByDesc(ClubMember::getIsManager)
                .orderByAsc(ClubMember::getJoinTime)
                .list();

        // 再逐个加载用户信息并封装到 DTO 中
        return members.stream()
                .map(member -> {
                    User user = userService.getById(member.getUserId());
                    return new ClubMemberWithUserDTO(member, user);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<ClubOptionDTO> getManagedClubOptionsByUserId(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("用户ID不能为空");
        }

        List<ClubMember> managerRecords = lambdaQuery()
                .eq(ClubMember::getUserId, userId)
                .eq(ClubMember::getIsManager, true)
                .list();

        if (managerRecords.isEmpty()) {
            return List.of();
        }

        List<Long> clubIds = managerRecords.stream()
                .map(ClubMember::getClubId)
                .distinct()
                .collect(Collectors.toList());

        List<Club> clubs = clubService.lambdaQuery()
                .in(Club::getId, clubIds)
                .eq(Club::getStatus, 1)
                .list();

        return clubs.stream()
                .map(club -> new ClubOptionDTO(club.getName(), club.getId()))
                .collect(Collectors.toList());
    }
}

