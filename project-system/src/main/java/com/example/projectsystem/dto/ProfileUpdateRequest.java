package com.example.projectsystem.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ProfileUpdateRequest {
    @NotBlank(message = "姓名不能为空")
    private String realName;
    
    @NotBlank(message = "学号不能为空")
    private String studentNo;
    
    /**
     * 性别(0-女,1-男)
     */
    @NotNull(message = "性别不能为空")
    private Integer gender;
    
    private String phone;
    private String email;
    
    @NotBlank(message = "学校名称不能为空")
    private String schoolName;
    
    @NotBlank(message = "学院名称不能为空")
    private String collegeName;
    
    @NotBlank(message = "班级名称不能为空")
    private String className;
    
    private String avatarUrl;
    
    /**
     * 是否为管理者(0-否,1-是)
     */
    private Boolean isManager;

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getStudentNo() {
        return studentNo;
    }

    public void setStudentNo(String studentNo) {
        this.studentNo = studentNo;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public Boolean getIsManager() {
        return isManager;
    }

    public void setIsManager(Boolean isManager) {
        this.isManager = isManager;
    }
}

