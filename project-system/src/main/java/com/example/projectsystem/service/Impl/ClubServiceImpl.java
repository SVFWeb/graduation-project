package com.example.projectsystem.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.projectsystem.domain.Club;
import com.example.projectsystem.mapper.ClubMapper;
import com.example.projectsystem.service.ClubService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubServiceImpl extends ServiceImpl<ClubMapper, Club> implements ClubService {

    @Override
    public Club createClub(Club club) {
        if (club.getStatus() == null) {
            club.setStatus(1); // 默认启用
        }
        save(club);
        return club;
    }

    @Override
    public List<Club> getLatestClubs(int limit) {
        if (limit <= 0) {
            limit = 4;
        }
        // 只查询启用的社团，按创建时间倒序，限制条数
        return lambdaQuery()
                .eq(Club::getStatus, 1)
                .orderByDesc(Club::getCreateTime)
                .last("LIMIT " + limit)
                .list();
    }
}

