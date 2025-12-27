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
@TableName("activity_registration")
public class ActivityRegistration implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Long id;

    @TableField("activity_id")
    private Long activityId;

    @TableField("user_id")
    private Long userId;

    /**
     * 报名状态（待审核、已通过、已拒绝）
     */
    private String status;

    /**
     * 评分（0-100）
     */
    private BigDecimal score;

    /**
     * 文字评价
     */
    private String comment;

    @TableField("audit_user_id")
    private Long auditUserId;

    @TableField("audit_time")
    private LocalDateTime auditTime;

    @TableField("registration_time")
    private LocalDateTime registrationTime;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}


