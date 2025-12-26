package com.example.projectsystem.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@TableName("activity")
public class Activity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 活动图片 URL（多个 URL 使用逗号分隔存储）
     */
    @TableField("image_urls")
    private String imageUrls;

    private String name;

    @TableField("club_id")
    private Long clubId;

    private String description;

    private String location;

    /**
     * 参与须知
     */
    @TableField("notice")
    private String notice;

    @TableField("registration_start_time")
    private LocalDateTime registrationStartTime;

    @TableField("registration_end_time")
    private LocalDateTime registrationEndTime;

    @TableField("start_time")
    private LocalDateTime startTime;

    @TableField("end_time")
    private LocalDateTime endTime;

    @TableField("max_participants")
    private Integer maxParticipants;

    /**
     * 当前报名人数
     */
    @TableField("current_participants")
    private Integer currentParticipants;

    /**
     * 人员是否需要审核
     */
    @TableField("need_audit")
    private Boolean needAudit;

    /**
     * 活动类型
     */
    @TableField("activity_type")
    private String activityType;

    /**
     * 活动等级（由社团的 level_tag 决定）
     */
    @TableField("activity_level")
    private String activityLevel;

    /**
     * 活动状态（审核中、报名中、等待中、进行中、已结束）
     */
    private String status;

    /**
     * 活动总评分（平均分，保留1位小数）
     */
    private BigDecimal score;

    /**
     * 审核状态(0-待审核,1-已通过,2-已拒绝)
     */
    @TableField("audit_status")
    private Integer auditStatus;

    @TableField("audit_time")
    private LocalDateTime auditTime;

    @TableField("audit_user_id")
    private Long auditUserId;

    /**
     * 是否上架(0-下架,1-上架)
     */
    @TableField("is_published")
    private Boolean isPublished;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}
