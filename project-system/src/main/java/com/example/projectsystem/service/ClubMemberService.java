package com.example.projectsystem.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.projectsystem.domain.ClubMember;

public interface ClubMemberService extends IService<ClubMember> {
    /**
     * 加入社团
     */
    ClubMember joinClub(Long clubId, Long userId);

    /**
     * 更新用户名称（当用户修改姓名时同步更新）
     */
    void updateUserName(Long userId, String userName);
}

