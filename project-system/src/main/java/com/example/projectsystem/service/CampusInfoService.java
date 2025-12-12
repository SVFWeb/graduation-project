package com.example.projectsystem.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.projectsystem.domain.CampusInfo;
import com.example.projectsystem.dto.CampusTreeDTO;

import java.util.List;

public interface CampusInfoService extends IService<CampusInfo> {
    /**
     * 生成校园信息树结构
     */
    List<CampusTreeDTO> buildCampusTree();

    /**
     * 删除指定节点及其所有子节点
     */
    void removeWithChildren(Long id);
}

