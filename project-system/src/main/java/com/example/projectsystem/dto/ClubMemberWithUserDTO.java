package com.example.projectsystem.dto;

import com.example.projectsystem.domain.ClubMember;
import com.example.projectsystem.domain.User;

/**
 * 社团成员 + 完整用户信息 DTO
 */
public class ClubMemberWithUserDTO {

    private Long id;
    private Long clubId;
    private Long userId;
    private Boolean isManager;
    private String joinTime;

    // 用户完整信息（根据需要前端可选择使用）
    private User user;

    public ClubMemberWithUserDTO() {
    }

    public ClubMemberWithUserDTO(ClubMember member, User user) {
        this.id = member.getId();
        this.clubId = member.getClubId();
        this.userId = member.getUserId();
        this.isManager = member.getIsManager();
        this.joinTime = member.getJoinTime() != null ? member.getJoinTime().toString() : null;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Boolean getIsManager() {
        return isManager;
    }

    public void setIsManager(Boolean isManager) {
        this.isManager = isManager;
    }

    public String getJoinTime() {
        return joinTime;
    }

    public void setJoinTime(String joinTime) {
        this.joinTime = joinTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}


