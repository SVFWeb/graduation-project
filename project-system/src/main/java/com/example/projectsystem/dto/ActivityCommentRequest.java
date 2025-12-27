package com.example.projectsystem.dto;

import java.math.BigDecimal;

/**
 * 人员评价活动请求（支持评分和文字评价）
 */
public class ActivityCommentRequest {

    /**
     * 活动 ID
     */
    private Long activityId;

    /**
     * 用户 ID
     */
    private Long userId;

    /**
     * 评分（0-100）
     */
    private BigDecimal score;

    /**
     * 文字评价
     */
    private String comment;

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

    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}


