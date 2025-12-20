package com.example.projectsystem.dto;

/**
 * 审核活动报名人员请求
 */
public class RegistrationReviewRequest {

    /**
     * 活动 ID
     */
    private Long activityId;

    /**
     * 参加人员的用户ID
     */
    private Long userId;

    /**
     * 审核人（需要是该活动主办社团的管理员）
     */
    private Long managerUserId;

    /**
     * 是否通过
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getManagerUserId() {
        return managerUserId;
    }

    public void setManagerUserId(Long managerUserId) {
        this.managerUserId = managerUserId;
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


