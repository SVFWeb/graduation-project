package com.example.projectsystem.dto;

/**
 * 活动模糊查询请求
 */
public class ActivitySearchRequest {

    /**
     * 关键字（匹配名称、介绍、地点）
     */
    private String keyword;

    /**
     * 活动状态（审核中、报名中、等待中、进行中、已结束）
     */
    private String status;

    /**
     * 活动分类（对应 activityType）
     */
    private String category;

    /**
     * 活动级别（对应 activityLevel）
     */
    private String level;

    private Integer currentPage;

    private Integer pageSize;

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
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
}


