package com.example.projectsystem.commons;

import java.io.Serializable;
import java.util.List;
 
//@Schema(title = "分页结果类", description = "用于封装分页查询结果的通用类")
public class PageResult<T> implements Serializable {
    private static final long serialVersionUID = 1L;
    
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
    
    public PageResult() {
    }
    
    public PageResult(Long total, Integer currentPage, Integer pageSize, List<T> records) {
        this.total = total;
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.records = records;
        // 计算总页数
        this.totalPage = (int) Math.ceil((double) total / pageSize);
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(Integer totalPage) {
        this.totalPage = totalPage;
    }

    public List<T> getRecords() {
        return records;
    }

    public void setRecords(List<T> records) {
        this.records = records;
    }
}