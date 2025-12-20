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
@TableName("club")
public class Club implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Long id;

    @TableField("icon_url")
    private String iconUrl;

    private String name;

    private String tags;

    private String description;

    private Integer status;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;

    /**
     * 社团类型（对应表字段 level_tag）
     */
    @TableField("level_tag")
    private String levelTag;

    @TableField(exist = false)
    private Long memberCount;
}
