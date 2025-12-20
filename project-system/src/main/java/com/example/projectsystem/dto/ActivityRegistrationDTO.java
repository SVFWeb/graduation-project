package com.example.projectsystem.dto;

import com.example.projectsystem.domain.ActivityRegistration;

import java.math.BigDecimal;
import java.time.ZoneId;

/**
 * 活动报名数据传输对象，时间字段转换为时间戳（毫秒）
 */
public class ActivityRegistrationDTO {
    private Long id;
    private Long activityId;
    private Long userId;
    private String status;
    private BigDecimal score;
    private Long auditUserId;
    private Long auditTime; // 时间戳（毫秒）
    private Long registrationTime; // 时间戳（毫秒）
    private Long createTime; // 时间戳（毫秒）
    private Long updateTime; // 时间戳（毫秒）

    public ActivityRegistrationDTO() {
    }

    public ActivityRegistrationDTO(ActivityRegistration registration) {
        if (registration == null) {
            return;
        }
        this.id = registration.getId();
        this.activityId = registration.getActivityId();
        this.userId = registration.getUserId();
        this.status = registration.getStatus();
        this.score = registration.getScore();
        this.auditUserId = registration.getAuditUserId();
        this.auditTime = registration.getAuditTime() != null 
            ? registration.getAuditTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli() 
            : null;
        this.registrationTime = registration.getRegistrationTime() != null 
            ? registration.getRegistrationTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli() 
            : null;
        this.createTime = registration.getCreateTime() != null 
            ? registration.getCreateTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli() 
            : null;
        this.updateTime = registration.getUpdateTime() != null 
            ? registration.getUpdateTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli() 
            : null;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getActivityId() {
        return activityId;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public Long getAuditUserId() {
        return auditUserId;
    }

    public void setAuditUserId(Long auditUserId) {
        this.auditUserId = auditUserId;
    }

    public Long getAuditTime() {
        return auditTime;
    }

    public void setAuditTime(Long auditTime) {
        this.auditTime = auditTime;
    }

    public Long getRegistrationTime() {
        return registrationTime;
    }

    public void setRegistrationTime(Long registrationTime) {
        this.registrationTime = registrationTime;
    }

    public Long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }

    public Long getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Long updateTime) {
        this.updateTime = updateTime;
    }
}

