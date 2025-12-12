package com.example.projectsystem.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.projectsystem.domain.CampusInfo;
import com.example.projectsystem.dto.CampusClassDTO;
import com.example.projectsystem.dto.CampusCollegeDTO;
import com.example.projectsystem.dto.CampusTreeDTO;
import com.example.projectsystem.mapper.CampusInfoMapper;
import com.example.projectsystem.service.CampusInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CampusInfoServiceImpl extends ServiceImpl<CampusInfoMapper, CampusInfo> implements CampusInfoService {

    @Override
    public List<CampusTreeDTO> buildCampusTree() {
        List<CampusInfo> infos = lambdaQuery()
                .eq(CampusInfo::getStatus, 1)
                .orderByAsc(CampusInfo::getLevel, CampusInfo::getSort, CampusInfo::getId)
                .list();

        Map<Long, CampusTreeDTO> schoolMap = new LinkedHashMap<>();
        Map<Long, CampusCollegeDTO> collegeMap = new LinkedHashMap<>();
        
        for (CampusInfo info : infos) {
            if (info.getLevel() == null) {
                continue;
            }
            if (info.getLevel() == 1) {
                // 学校
                if (!schoolMap.containsKey(info.getId())) {
                    CampusTreeDTO school = new CampusTreeDTO(info.getId(), info.getSchoolName(), new ArrayList<>());
                    schoolMap.put(info.getId(), school);
                }
            } else if (info.getLevel() == 2) {
                // 学院
                CampusTreeDTO schoolNode = schoolMap.get(info.getParentId());
                if (schoolNode != null) {
                    CampusCollegeDTO college = collegeMap.get(info.getId());
                    if (college == null) {
                        college = new CampusCollegeDTO(info.getId(), info.getCollegeName(), new ArrayList<>());
                        collegeMap.put(info.getId(), college);
                        schoolNode.getColleges().add(college);
                    }
                }
            } else if (info.getLevel() == 3) {
                // 班级
                CampusCollegeDTO collegeNode = collegeMap.get(info.getParentId());
                if (collegeNode != null && StringUtils.hasText(info.getClassName())) {
                    collegeNode.getClasses().add(new CampusClassDTO(info.getId(), info.getClassName()));
                }
            }
        }
        return new ArrayList<>(schoolMap.values());
    }

    @Override
    public void removeWithChildren(Long id) {
        if (id == null) {
            return;
        }
        List<Long> toDelete = new ArrayList<>();
        collectChildIds(id, toDelete);
        if (!toDelete.isEmpty()) {
            removeBatchByIds(toDelete);
        }
    }

    private void collectChildIds(Long parentId, List<Long> collector) {
        collector.add(parentId);
        List<CampusInfo> children = lambdaQuery()
                .select(CampusInfo::getId)
                .eq(CampusInfo::getParentId, parentId)
                .list();
        for (CampusInfo child : children) {
            collectChildIds(child.getId(), collector);
        }
    }
}

