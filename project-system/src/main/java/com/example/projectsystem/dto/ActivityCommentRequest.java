package com.example.projectsystem.dto;

import java.math.BigDecimal;

/**
 * 人员评价活动请求（当前表结构仅支持评分，如需文字评价需在表中增加字段）
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
}


