package com.example.projectsystem.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.projectsystem.domain.ClubMember;
import com.example.projectsystem.domain.User;
import com.example.projectsystem.mapper.ClubMemberMapper;
import com.example.projectsystem.service.ClubMemberService;
import com.example.projectsystem.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;

@Service
public class ClubMemberServiceImpl extends ServiceImpl<ClubMemberMapper, ClubMember> implements ClubMemberService {

    private final UserService userService;

    public ClubMemberServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public ClubMember joinClub(Long clubId, Long userId) {
        // 检查是否已经加入
        ClubMember existing = lambdaQuery()
                .eq(ClubMember::getClubId, clubId)
                .eq(ClubMember::getUserId, userId)
                .one();

        if (existing != null) {
            throw new IllegalArgumentException("您已经加入该社团");
        }

        // 从user表获取用户信息
        User user = userService.getById(userId);
        if (user == null) {
            throw new IllegalArgumentException("用户不存在");
        }

        // 获取用户名称，优先使用realName，如果没有则使用username
        String userName = StringUtils.hasText(user.getRealName()) ? user.getRealName() : user.getUsername();

        ClubMember clubMember = new ClubMember();
        clubMember.setClubId(clubId);
        clubMember.setUserId(userId);
        clubMember.setUserName(userName);
        clubMember.setIsManager(false);
        clubMember.setJoinTime(LocalDateTime.now());
        save(clubMember);
        return clubMember;
    }

    @Override
    public void updateUserName(Long userId, String userName) {
        // 更新该用户在所有社团中的用户名称
        lambdaUpdate()
                .eq(ClubMember::getUserId, userId)
                .set(ClubMember::getUserName, userName)
                .update();
    }
}

