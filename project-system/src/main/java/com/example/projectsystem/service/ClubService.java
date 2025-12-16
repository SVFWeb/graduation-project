package com.example.projectsystem.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.projectsystem.domain.Club;

import java.util.List;

public interface ClubService extends IService<Club> {
    /**
     * 创建社团
     */
    Club createClub(Club club);

    /**
     * 查询最新创建的社团列表
     *
     * @param limit 返回数量
     * @return 最新的社团列表
     */
    List<Club> getLatestClubs(int limit);
}

