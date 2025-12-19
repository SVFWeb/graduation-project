package com.example.projectsystem.dto;

/**
 * 审核活动请求
 */
public class ActivityReviewRequest {

    /**
     * 活动 ID
     */
    private Long activityId;

    /**
     * 审核人（需要是 isBoss = true 的用户）
     */
    private Long auditUserId;

    /**
     * 是否通过（true: 通过；false: 拒绝）
     */
    private Boolean pass;

    /**
     * 审核备注（可选）
     */
    private String remark;

    public Long getActivityId() {
        return activityId;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

    public Long getAuditUserId() {
        return auditUserId;
    }

    public void setAuditUserId(Long auditUserId) {
        this.auditUserId = auditUserId;
    }

    public Boolean getPass() {
        return pass;
    }

    public void setPass(Boolean pass) {
        this.pass = pass;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}


