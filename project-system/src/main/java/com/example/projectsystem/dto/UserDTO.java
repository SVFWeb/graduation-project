package com.example.projectsystem.dto;

import com.example.projectsystem.domain.User;

import java.time.ZoneId;

/**
 * 用户数据传输对象，时间字段转换为时间戳（毫秒）
 */
public class UserDTO {
    private Long id;
    private String username;
    private Boolean isCompleted;
    private String realName;
    private String studentNo;
    private Integer gender;
    private String phone;
    private String email;
    private String schoolName;
    private String collegeName;
    private String className;
    private Long completeTime; // 时间戳（毫秒）
    private Boolean isManager;
    private Boolean isBoss;
    private String avatarUrl;
    private Long createTime; // 时间戳（毫秒）
    private Long updateTime; // 时间戳（毫秒）

    public UserDTO() {
    }

    public UserDTO(User user) {
        if (user == null) {
            return;
        }
        this.id = user.getId();
        this.username = user.getUsername();
        this.isCompleted = user.getIsCompleted();
        this.realName = user.getRealName();
        this.studentNo = user.getStudentNo();
        this.gender = user.getGender();
        this.phone = user.getPhone();
        this.email = user.getEmail();
        this.schoolName = user.getSchoolName();
        this.collegeName = user.getCollegeName();
        this.className = user.getClassName();
        this.completeTime = user.getCompleteTime() != null 
            ? user.getCompleteTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli() 
            : null;
        this.isManager = user.getIsManager();
        this.isBoss = user.getIsBoss();
        this.avatarUrl = user.getAvatarUrl();
        this.createTime = user.getCreateTime() != null 
            ? user.getCreateTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli() 
            : null;
        this.updateTime = user.getUpdateTime() != null 
            ? user.getUpdateTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli() 
            : null;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Boolean getIsCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

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

    public Long getCompleteTime() {
        return completeTime;
    }

    public void setCompleteTime(Long completeTime) {
        this.completeTime = completeTime;
    }

    public Boolean getIsManager() {
        return isManager;
    }

    public void setIsManager(Boolean isManager) {
        this.isManager = isManager;
    }

    public Boolean getIsBoss() {
        return isBoss;
    }

    public void setIsBoss(Boolean isBoss) {
        this.isBoss = isBoss;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public Long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }

    public Long getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Long updateTime) {
        this.updateTime = updateTime;
    }
}

