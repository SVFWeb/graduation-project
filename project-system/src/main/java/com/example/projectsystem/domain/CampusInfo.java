package com.example.projectsystem.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@TableName("campus_info")
public class CampusInfo implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Long id;

    private String schoolName;

    private String collegeName;

    private String className;

    /**
     * 层级：1-学校，2-学院，3-班级
     */
    private Integer level;

    private Long parentId;

    private Integer sort;

    /**
     * 状态(1-启用,0-禁用)
     */
    private Integer status;

    private LocalDateTime createTime;
}
