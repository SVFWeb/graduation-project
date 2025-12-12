package com.example.projectsystem.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.projectsystem.domain.User;
import com.example.projectsystem.dto.ProfileUpdateRequest;
import com.example.projectsystem.mapper.UserMapper;
import com.example.projectsystem.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Override
    public User register(String username, String password) {
        if (!StringUtils.hasText(username) || !StringUtils.hasText(password)) {
            throw new IllegalArgumentException("账号和密码不能为空");
        }
        User exists = lambdaQuery().eq(User::getUsername, username).one();
        if (exists != null) {
            throw new IllegalArgumentException("账号已存在");
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setIsCompleted(false);
        save(user);
        return user;
    }

    @Override
    public User login(String username, String password) {
        if (!StringUtils.hasText(username) || !StringUtils.hasText(password)) {
            throw new IllegalArgumentException("账号和密码不能为空");
        }
        User user = lambdaQuery().eq(User::getUsername, username).one();
        if (user == null || !Objects.equals(user.getPassword(), password)) {
            throw new IllegalArgumentException("账号或密码错误");
        }
        user.setToken(UUID.randomUUID().toString());
        updateById(user);
        return user;
    }

    @Override
    public User completeProfile(Long userId, ProfileUpdateRequest request) {
        User user = getById(userId);
        if (user == null) {
            throw new NoSuchElementException("用户不存在");
        }
        user.setRealName(request.getRealName());
        user.setStudentNo(request.getStudentNo());
        user.setGender(request.getGender());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setSchoolName(request.getSchoolName());
        user.setCollegeName(request.getCollegeName());
        user.setClassName(request.getClassName());
        user.setIsCompleted(true);
        user.setCompleteTime(LocalDateTime.now());
        updateById(user);
        return user;
    }
}

