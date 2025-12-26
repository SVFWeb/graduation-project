package com.example.projectsystem.dto;

import com.example.projectsystem.domain.Activity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

/**
 * 活动数据传输对象，用于返回给前端
 * imageUrls 字段为数组类型
 */
public class ActivityDTO {
    private Long id;
    private List<String> imageUrls;
    private String name;
    private Long clubId;
    private String description;
    private String location;
    private String notice;
    private Long registrationStartTime;
    private Long registrationEndTime;
    private Long startTime;
    private Long endTime;
    private Integer maxParticipants;
    private Integer currentParticipants;
    private Boolean needAudit;
    private String activityType;
    private String activityLevel;
    private String status;
    private BigDecimal score;
    private Integer auditStatus;
    private LocalDateTime auditTime;
    private Long auditUserId;
    private Boolean isPublished;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;

    public ActivityDTO() {
    }

    public ActivityDTO(Activity activity) {
        if (activity == null) {
            return;
        }
        this.id = activity.getId();
        this.name = activity.getName();
        this.clubId = activity.getClubId();
        this.description = activity.getDescription();
        this.location = activity.getLocation();
        this.notice = activity.getNotice();
        // 将 LocalDateTime 转换为时间戳（毫秒）
        this.registrationStartTime = activity.getRegistrationStartTime() != null
                ? activity.getRegistrationStartTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()
                : null;
        this.registrationEndTime = activity.getRegistrationEndTime() != null
                ? activity.getRegistrationEndTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()
                : null;
        this.startTime = activity.getStartTime() != null
                ? activity.getStartTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()
                : null;
        this.endTime = activity.getEndTime() != null
                ? activity.getEndTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()
                : null;
        this.maxParticipants = activity.getMaxParticipants();
        this.currentParticipants = activity.getCurrentParticipants();
        this.needAudit = activity.getNeedAudit();
        this.activityType = activity.getActivityType();
        this.activityLevel = activity.getActivityLevel();
        this.status = activity.getStatus();
        this.score = activity.getScore();
        this.auditStatus = activity.getAuditStatus();
        this.auditTime = activity.getAuditTime();
        this.auditUserId = activity.getAuditUserId();
        this.isPublished = activity.getIsPublished();
        this.createTime = activity.getCreateTime();
        this.updateTime = activity.getUpdateTime();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getNotice() {
        return notice;
    }

    public void setNotice(String notice) {
        this.notice = notice;
    }

    public Long getRegistrationStartTime() {
        return registrationStartTime;
    }

    public void setRegistrationStartTime(Long registrationStartTime) {
        this.registrationStartTime = registrationStartTime;
    }

    public Long getRegistrationEndTime() {
        return registrationEndTime;
    }

    public void setRegistrationEndTime(Long registrationEndTime) {
        this.registrationEndTime = registrationEndTime;
    }

    public Long getStartTime() {
        return startTime;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }

    public Long getEndTime() {
        return endTime;
    }

    public void setEndTime(Long endTime) {
        this.endTime = endTime;
    }

    public Integer getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(Integer maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public Integer getCurrentParticipants() {
        return currentParticipants;
    }

    public void setCurrentParticipants(Integer currentParticipants) {
        this.currentParticipants = currentParticipants;
    }

    public Boolean getNeedAudit() {
        return needAudit;
    }

    public void setNeedAudit(Boolean needAudit) {
        this.needAudit = needAudit;
    }

    public String getActivityType() {
        return activityType;
    }

    public void setActivityType(String activityType) {
        this.activityType = activityType;
    }

    public String getActivityLevel() {
        return activityLevel;
    }

    public void setActivityLevel(String activityLevel) {
        this.activityLevel = activityLevel;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }

    public Integer getAuditStatus() {
        return auditStatus;
    }

    public void setAuditStatus(Integer auditStatus) {
        this.auditStatus = auditStatus;
    }

    public LocalDateTime getAuditTime() {
        return auditTime;
    }

    public void setAuditTime(LocalDateTime auditTime) {
        this.auditTime = auditTime;
    }

    public Long getAuditUserId() {
        return auditUserId;
    }

    public void setAuditUserId(Long auditUserId) {
        this.auditUserId = auditUserId;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }

    public Boolean getIsPublished() {
        return isPublished;
    }

    public void setIsPublished(Boolean isPublished) {
        this.isPublished = isPublished;
    }
}

