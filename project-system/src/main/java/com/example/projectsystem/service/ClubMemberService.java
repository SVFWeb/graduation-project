package com.example.projectsystem.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.projectsystem.domain.ClubMember;
import com.example.projectsystem.dto.ClubMemberWithUserDTO;
import com.example.projectsystem.dto.ClubOptionDTO;

public interface ClubMemberService extends IService<ClubMember> {
    /**
     * 加入社团
     */
    ClubMember joinClub(Long clubId, Long userId);

    /**
     * 更新用户名称（当用户修改姓名时同步更新）
     */
    void updateUserName(Long userId, String userName);

    /**
     * 将指定用户设置为社团管理员
     */
    void setManager(Long clubId, Long userId, boolean isManager);

    /**
     * 根据社团ID获取包含完整用户信息的成员列表
     */
    java.util.List<ClubMemberWithUserDTO> getMembersWithUserByClubId(Long clubId);

    /**
     * 获取当前用户作为管理员管理的社团下拉选项
     */
    java.util.List<ClubOptionDTO> getManagedClubOptionsByUserId(Long userId);
}

