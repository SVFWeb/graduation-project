package com.example.projectsystem.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@TableName("club_member")
public class ClubMember implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Long id;

    @TableField("club_id")
    private Long clubId;

    @TableField("user_id")
    private Long userId;

    @TableField("user_name")
    private String userName;

    @TableField("is_manager")
    private Boolean isManager;

    @TableField("join_time")
    private LocalDateTime joinTime;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}
