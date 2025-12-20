package com.example.projectsystem.controller;

import com.example.projectsystem.commons.Results;
import com.example.projectsystem.domain.CampusInfo;
import com.example.projectsystem.dto.CampusInfoRequest;
import com.example.projectsystem.service.CampusInfoService;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/campus")
public class CampusInfoController {

    private final CampusInfoService campusInfoService;

    public CampusInfoController(CampusInfoService campusInfoService) {
        this.campusInfoService = campusInfoService;
    }

    // 1. 树形结构
    @GetMapping("/tree")
    public Results getCampusTree() {
        return Results.success()
                .message("查询成功")
                .data("items", campusInfoService.buildCampusTree());
    }

    // 创建校园信息（统一接口）
    @PostMapping
    public Results createCampusInfo(@RequestBody CampusInfoRequest request) {
        if (!StringUtils.hasText(request.getSchoolName())) {
            return Results.fail().message("学校名称不能为空");
        }

        java.util.List<Long> createdIds = new java.util.ArrayList<>();

        // 1. 处理学校（level=1）
        CampusInfo school = campusInfoService.lambdaQuery()
                .eq(CampusInfo::getSchoolName, request.getSchoolName())
                .eq(CampusInfo::getLevel, 1)
                .one();

        Long schoolId;
        if (school == null) {
            // 学校不存在，创建学校
            CampusInfo newSchool = new CampusInfo();
            newSchool.setSchoolName(request.getSchoolName());
            newSchool.setLevel(1);
            newSchool.setParentId(null);
            newSchool.setSort(request.getSort() == null ? 0 : request.getSort());
            newSchool.setStatus(request.getStatus() == null ? 1 : request.getStatus());
            campusInfoService.save(newSchool);
            schoolId = newSchool.getId();
            createdIds.add(schoolId);
        } else {
            schoolId = school.getId();
        }

        // 2. 处理学院（level=2）- 如果提供了 collegeName
        Long collegeId = null;
        if (StringUtils.hasText(request.getCollegeName())) {
            CampusInfo college = campusInfoService.lambdaQuery()
                    .eq(CampusInfo::getSchoolName, request.getSchoolName())
                    .eq(CampusInfo::getCollegeName, request.getCollegeName())
                    .eq(CampusInfo::getLevel, 2)
                    .eq(CampusInfo::getParentId, schoolId)
                    .one();

            if (college == null) {
                // 学院不存在，创建学院
                CampusInfo newCollege = new CampusInfo();
                newCollege.setSchoolName(request.getSchoolName());
                newCollege.setCollegeName(request.getCollegeName());
                newCollege.setLevel(2);
                newCollege.setParentId(schoolId);
                newCollege.setSort(request.getSort() == null ? 0 : request.getSort());
                newCollege.setStatus(request.getStatus() == null ? 1 : request.getStatus());
                campusInfoService.save(newCollege);
                collegeId = newCollege.getId();
                createdIds.add(collegeId);
            } else {
                collegeId = college.getId();
            }
        }

        // 3. 处理班级（level=3）- 如果提供了 className
        if (StringUtils.hasText(request.getClassName())) {
            if (collegeId == null) {
                return Results.fail().message("创建班级需要提供学院名称");
            }

            CampusInfo clazz = campusInfoService.lambdaQuery()
                    .eq(CampusInfo::getSchoolName, request.getSchoolName())
                    .eq(CampusInfo::getCollegeName, request.getCollegeName())
                    .eq(CampusInfo::getClassName, request.getClassName())
                    .eq(CampusInfo::getLevel, 3)
                    .eq(CampusInfo::getParentId, collegeId)
                    .one();

            if (clazz == null) {
                // 班级不存在，创建班级
                CampusInfo newClass = new CampusInfo();
                newClass.setSchoolName(request.getSchoolName());
                newClass.setCollegeName(request.getCollegeName());
                newClass.setClassName(request.getClassName());
                newClass.setLevel(3);
                newClass.setParentId(collegeId);
                newClass.setSort(request.getSort() == null ? 0 : request.getSort());
                newClass.setStatus(request.getStatus() == null ? 1 : request.getStatus());
                campusInfoService.save(newClass);
                createdIds.add(newClass.getId());
            }
        }

        return Results.success()
                .message("创建成功")
                .data("createdIds", createdIds)
                .data("count", createdIds.size());
    }
}
