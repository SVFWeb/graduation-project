package com.example.projectsystem.commons;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
 
@Data
@AllArgsConstructor
@NoArgsConstructor
//@Schema(title = "分页结果类", description = "用于封装分页查询结果的通用类")
public class PageResult<T> {
//    @Schema(title = "总记录数")
    private Long total;
//    @Schema(title = "当前页码")
    private Integer currentPage;
//    @Schema(title = "每页显示条数")
    private Integer pageSize;
//    @Schema(title = "总页数")
    private Integer totalPage;
//    @Schema(title = "当前页数据")
    private List<T> records;
    
    public PageResult(Long total, Integer currentPage, Integer pageSize, List<T> records) {
        this.total = total;
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.records = records;
        // 计算总页数
        this.totalPage = (int) Math.ceil((double) total / pageSize);
    }
}