package com.example.projectsystem.dto;

import com.example.projectsystem.domain.ActivityRegistration;
import com.example.projectsystem.domain.User;

/**
 * 报名信息及用户信息数据传输对象
 */
public class RegistrationWithUserDTO {
    private ActivityRegistrationDTO registration;
    private UserDTO user;

    public RegistrationWithUserDTO() {
    }

    public RegistrationWithUserDTO(ActivityRegistration registration, User user) {
        this.registration = new ActivityRegistrationDTO(registration);
        this.user = user != null ? new UserDTO(user) : null;
    }

    public ActivityRegistrationDTO getRegistration() {
        return registration;
    }

    public void setRegistration(ActivityRegistrationDTO registration) {
        this.registration = registration;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}

