package com.example.projectsystem.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 创建活动请求
 */
public class ActivityCreateRequest {

    /**
     * 活动名称
     */
    private String name;

    /**
     * 活动介绍
     */
    private String description;

    /**
     * 活动类型
     */
    private String activityType;

    /**
     * 活动地点
     */
    private String location;

    /**
     * 主办方社团 ID
     */
    private Long clubId;

    /**
     * 参与须知
     */
    private String notice;

    /**
     * 报名开始时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime registrationStartTime;

    /**
     * 报名结束时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime registrationEndTime;

    /**
     * 活动开始时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startTime;

    /**
     * 活动结束时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;

    /**
     * 最大报名人数
     */
    private Integer maxParticipants;

    /**
     * 人员是否需要审核
     */
    private Boolean needAudit;

    /**
     * 材料图片 URL 数组
     */
    private List<String> imageUrls;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getActivityType() {
        return activityType;
    }

    public void setActivityType(String activityType) {
        this.activityType = activityType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    public String getNotice() {
        return notice;
    }

    public void setNotice(String notice) {
        this.notice = notice;
    }

    public LocalDateTime getRegistrationStartTime() {
        return registrationStartTime;
    }

    public void setRegistrationStartTime(LocalDateTime registrationStartTime) {
        this.registrationStartTime = registrationStartTime;
    }

    public LocalDateTime getRegistrationEndTime() {
        return registrationEndTime;
    }

    public void setRegistrationEndTime(LocalDateTime registrationEndTime) {
        this.registrationEndTime = registrationEndTime;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public Integer getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(Integer maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public Boolean getNeedAudit() {
        return needAudit;
    }

    public void setNeedAudit(Boolean needAudit) {
        this.needAudit = needAudit;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }
}


