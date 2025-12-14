package com.example.projectsystem.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.projectsystem.domain.Club;

public interface ClubService extends IService<Club> {
    /**
     * 创建社团
     */
    Club createClub(Club club);
}

