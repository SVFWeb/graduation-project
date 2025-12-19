package com.example.projectsystem.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.projectsystem.domain.Activity;
import com.example.projectsystem.domain.Club;
import com.example.projectsystem.mapper.ActivityMapper;
import com.example.projectsystem.service.ActivityService;
import com.example.projectsystem.service.ClubService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ActivityServiceImpl extends ServiceImpl<ActivityMapper, Activity> implements ActivityService {

    private final ClubService clubService;

    public ActivityServiceImpl(ClubService clubService) {
        this.clubService = clubService;
    }

    @Override
    public Activity createActivity(Activity activity) {
        // 根据 clubId 设置活动等级（使用 club.levelTag）
        if (activity.getClubId() != null) {
            Club club = clubService.getById(activity.getClubId());
            if (club == null) {
                throw new IllegalArgumentException("社团不存在");
            }
            activity.setActivityLevel(club.getLevelTag());
        }

        // 默认状态和审核状态
        if (activity.getStatus() == null) {
            activity.setStatus("审核中");
        }
        if (activity.getAuditStatus() == null) {
            activity.setAuditStatus(0);
        }
        if (activity.getScore() == null) {
            activity.setScore(BigDecimal.ZERO);
        }

        save(activity);
        return activity;
    }
}


