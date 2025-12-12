package com.example.projectsystem.controller;

import com.example.projectsystem.commons.Results;
import com.example.projectsystem.domain.User;
import com.example.projectsystem.dto.LoginRequest;
import com.example.projectsystem.dto.ProfileUpdateRequest;
import com.example.projectsystem.dto.RegisterRequest;
import com.example.projectsystem.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public Results register(@RequestBody RegisterRequest request) {
        try {
            User user = userService.register(request.getUsername(), request.getPassword());
            return Results.success()
                    .message("注册成功")
                    .data("userId", user.getId());
        } catch (IllegalArgumentException e) {
            return Results.fail().message(e.getMessage());
        }
    }

    @PostMapping("/login")
    public Results login(@RequestBody LoginRequest request) {
        try {
            User user = userService.login(request.getUsername(), request.getPassword());
            return Results.success()
                    .message("登录成功")
                    .data("token", user.getToken())
                    .data("user", user);
        } catch (IllegalArgumentException e) {
            return Results.fail().message(e.getMessage());
        }
    }

    @PutMapping("/{id}/profile")
    public Results completeProfile(@PathVariable("id") Long id, @RequestBody ProfileUpdateRequest request) {
        try {
            User user = userService.completeProfile(id, request);

            return Results.success()
                    .message("信息完善成功")
                    .data("user", user);
        } catch (IllegalArgumentException e) {
            return Results.fail().message(e.getMessage());
        } catch (Exception e) {
            return Results.fail().message(e.getMessage());
        }
    }
}

