package com.example.projectsystem.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.projectsystem.domain.Club;
import com.example.projectsystem.mapper.ClubMapper;
import com.example.projectsystem.service.ClubService;
import org.springframework.stereotype.Service;

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
}

