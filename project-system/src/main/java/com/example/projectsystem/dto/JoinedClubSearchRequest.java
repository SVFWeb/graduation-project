package com.example.projectsystem.dto;

public class JoinedClubSearchRequest {
    private Long userId;
    private String keyword;
    private Integer currentPage;
    private Integer pageSize;
    private String type; // 新增：join / management

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getKeyword() { return keyword; }
    public void setKeyword(String keyword) { this.keyword = keyword; }

    public Integer getCurrentPage() { return currentPage; }
    public void setCurrentPage(Integer currentPage) { this.currentPage = currentPage; }

    public Integer getPageSize() { return pageSize; }
    public void setPageSize(Integer pageSize) { this.pageSize = pageSize; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}