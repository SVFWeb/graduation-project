package com.example.projectsystem.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.projectsystem.commons.Results;
import com.example.projectsystem.domain.CampusInfo;
import com.example.projectsystem.dto.CampusInfoRequest;
import com.example.projectsystem.service.CampusInfoService;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    // 2-5 学校 CRUD
    @PostMapping("/schools")
    public Results addSchool(@RequestBody CampusInfoRequest request) {
        if (!StringUtils.hasText(request.getSchoolName())) {
            return Results.fail().message("学校名称不能为空");
        }
        // 检查学校名称是否已存在
        CampusInfo existing = campusInfoService.lambdaQuery()
                .eq(CampusInfo::getSchoolName, request.getSchoolName())
                .eq(CampusInfo::getLevel, 1)
                .one();
        if (existing != null) {
            return Results.fail().message("学校名称已存在，不能重复");
        }
        CampusInfo info = new CampusInfo();
        info.setSchoolName(request.getSchoolName());
        info.setLevel(1);
        info.setParentId(null);
        info.setSort(request.getSort() == null ? 0 : request.getSort());
        info.setStatus(request.getStatus() == null ? 1 : request.getStatus());
        campusInfoService.save(info);
        return Results.success().message("新增学校成功").data("id", info.getId());
    }

    @GetMapping("/schools")
    public Results listSchools() {
        List<CampusInfo> list = campusInfoService.lambdaQuery()
                .eq(CampusInfo::getLevel, 1)
                .list();
        return Results.success().data("items", list);
    }

    @PutMapping("/schools/{id}")
    public Results updateSchool(@PathVariable Long id, @RequestBody CampusInfoRequest request) {
        CampusInfo existing = campusInfoService.getById(id);
        if (existing == null || existing.getLevel() != 1) {
            return Results.fail().message("学校不存在");
        }
        if (StringUtils.hasText(request.getSchoolName())) {
            // 检查新名称是否与其他学校重名
            CampusInfo duplicate = campusInfoService.lambdaQuery()
                    .eq(CampusInfo::getSchoolName, request.getSchoolName())
                    .eq(CampusInfo::getLevel, 1)
                    .ne(CampusInfo::getId, id)
                    .one();
            if (duplicate != null) {
                return Results.fail().message("学校名称已存在，不能重复");
            }
            existing.setSchoolName(request.getSchoolName());
        }
        if (request.getSort() != null) {
            existing.setSort(request.getSort());
        }
        if (request.getStatus() != null) {
            existing.setStatus(request.getStatus());
        }
        campusInfoService.updateById(existing);
        return Results.success().message("更新学校成功");
    }

    @DeleteMapping("/schools/{id}")
    public Results deleteSchool(@PathVariable Long id) {
        CampusInfo existing = campusInfoService.getById(id);
        if (existing == null || existing.getLevel() != 1) {
            return Results.fail().message("学校不存在");
        }
        campusInfoService.removeWithChildren(id);
        return Results.success().message("删除学校成功");
    }

    // 6-9 学院 CRUD（基于学校ID）
    @PostMapping("/schools/{schoolId}/colleges")
    public Results addCollege(@PathVariable Long schoolId, @RequestBody CampusInfoRequest request) {
        CampusInfo school = campusInfoService.getById(schoolId);
        if (school == null || school.getLevel() != 1) {
            return Results.fail().message("学校不存在");
        }
        if (!StringUtils.hasText(request.getCollegeName())) {
            return Results.fail().message("学院名称不能为空");
        }
        // 检查同一学校下学院名称是否已存在
        CampusInfo existing = campusInfoService.lambdaQuery()
                .eq(CampusInfo::getSchoolName, school.getSchoolName())
                .eq(CampusInfo::getCollegeName, request.getCollegeName())
                .eq(CampusInfo::getLevel, 2)
                .eq(CampusInfo::getParentId, schoolId)
                .one();
        if (existing != null) {
            return Results.fail().message("该学校下学院名称已存在，不能重复");
        }
        CampusInfo info = new CampusInfo();
        info.setSchoolName(school.getSchoolName());
        info.setCollegeName(request.getCollegeName());
        info.setLevel(2);
        info.setParentId(schoolId);
        info.setSort(request.getSort() == null ? 0 : request.getSort());
        info.setStatus(request.getStatus() == null ? 1 : request.getStatus());
        campusInfoService.save(info);
        return Results.success().message("新增学院成功").data("id", info.getId());
    }

    @GetMapping("/schools/{schoolId}/colleges")
    public Results listColleges(@PathVariable Long schoolId) {
        CampusInfo school = campusInfoService.getById(schoolId);
        if (school == null || school.getLevel() != 1) {
            return Results.fail().message("学校不存在");
        }
        List<CampusInfo> list = campusInfoService.lambdaQuery()
                .eq(CampusInfo::getLevel, 2)
                .eq(CampusInfo::getParentId, schoolId)
                .list();
        return Results.success().data("items", list);
    }

    @PutMapping("/schools/{schoolId}/colleges/{id}")
    public Results updateCollege(@PathVariable Long schoolId,
                                 @PathVariable Long id,
                                 @RequestBody CampusInfoRequest request) {
        CampusInfo college = campusInfoService.getById(id);
        if (college == null || college.getLevel() != 2) {
            return Results.fail().message("学院不存在");
        }
        if (!schoolId.equals(college.getParentId())) {
            return Results.fail().message("学院不属于该学校");
        }
        if (StringUtils.hasText(request.getCollegeName())) {
            // 检查同一学校下新学院名称是否与其他学院重名
            CampusInfo duplicate = campusInfoService.lambdaQuery()
                    .eq(CampusInfo::getSchoolName, college.getSchoolName())
                    .eq(CampusInfo::getCollegeName, request.getCollegeName())
                    .eq(CampusInfo::getLevel, 2)
                    .eq(CampusInfo::getParentId, schoolId)
                    .ne(CampusInfo::getId, id)
                    .one();
            if (duplicate != null) {
                return Results.fail().message("该学校下学院名称已存在，不能重复");
            }
            college.setCollegeName(request.getCollegeName());
        }
        if (request.getSort() != null) {
            college.setSort(request.getSort());
        }
        if (request.getStatus() != null) {
            college.setStatus(request.getStatus());
        }
        campusInfoService.updateById(college);
        return Results.success().message("更新学院成功");
    }

    @DeleteMapping("/schools/{schoolId}/colleges/{id}")
    public Results deleteCollege(@PathVariable Long schoolId, @PathVariable Long id) {
        CampusInfo college = campusInfoService.getById(id);
        if (college == null || college.getLevel() != 2) {
            return Results.fail().message("学院不存在");
        }
        if (!schoolId.equals(college.getParentId())) {
            return Results.fail().message("学院不属于该学校");
        }
        campusInfoService.removeWithChildren(id);
        return Results.success().message("删除学院成功");
    }

    // 10-13 班级 CRUD（基于学院ID）
    @PostMapping("/colleges/{collegeId}/classes")
    public Results addClass(@PathVariable Long collegeId, @RequestBody CampusInfoRequest request) {
        CampusInfo college = campusInfoService.getById(collegeId);
        if (college == null || college.getLevel() != 2) {
            return Results.fail().message("学院不存在");
        }
        if (!StringUtils.hasText(request.getClassName())) {
            return Results.fail().message("班级名称不能为空");
        }
        // 检查同一学院下班级名称是否已存在
        CampusInfo existing = campusInfoService.lambdaQuery()
                .eq(CampusInfo::getSchoolName, college.getSchoolName())
                .eq(CampusInfo::getCollegeName, college.getCollegeName())
                .eq(CampusInfo::getClassName, request.getClassName())
                .eq(CampusInfo::getLevel, 3)
                .eq(CampusInfo::getParentId, collegeId)
                .one();
        if (existing != null) {
            return Results.fail().message("该学院下班级名称已存在，不能重复");
        }
        CampusInfo info = new CampusInfo();
        info.setSchoolName(college.getSchoolName());
        info.setCollegeName(college.getCollegeName());
        info.setClassName(request.getClassName());
        info.setLevel(3);
        info.setParentId(collegeId);
        info.setSort(request.getSort() == null ? 0 : request.getSort());
        info.setStatus(request.getStatus() == null ? 1 : request.getStatus());
        campusInfoService.save(info);
        return Results.success().message("新增班级成功").data("id", info.getId());
    }

    @GetMapping("/colleges/{collegeId}/classes")
    public Results listClasses(@PathVariable Long collegeId) {
        CampusInfo college = campusInfoService.getById(collegeId);
        if (college == null || college.getLevel() != 2) {
            return Results.fail().message("学院不存在");
        }
        List<CampusInfo> list = campusInfoService.lambdaQuery()
                .eq(CampusInfo::getLevel, 3)
                .eq(CampusInfo::getParentId, collegeId)
                .list();
        return Results.success().data("items", list);
    }

    @PutMapping("/colleges/{collegeId}/classes/{id}")
    public Results updateClass(@PathVariable Long collegeId,
                               @PathVariable Long id,
                               @RequestBody CampusInfoRequest request) {
        CampusInfo clazz = campusInfoService.getById(id);
        if (clazz == null || clazz.getLevel() != 3) {
            return Results.fail().message("班级不存在");
        }
        if (!collegeId.equals(clazz.getParentId())) {
            return Results.fail().message("班级不属于该学院");
        }
        if (StringUtils.hasText(request.getClassName())) {
            // 检查同一学院下新班级名称是否与其他班级重名
            CampusInfo duplicate = campusInfoService.lambdaQuery()
                    .eq(CampusInfo::getSchoolName, clazz.getSchoolName())
                    .eq(CampusInfo::getCollegeName, clazz.getCollegeName())
                    .eq(CampusInfo::getClassName, request.getClassName())
                    .eq(CampusInfo::getLevel, 3)
                    .eq(CampusInfo::getParentId, collegeId)
                    .ne(CampusInfo::getId, id)
                    .one();
            if (duplicate != null) {
                return Results.fail().message("该学院下班级名称已存在，不能重复");
            }
            clazz.setClassName(request.getClassName());
        }
        if (request.getSort() != null) {
            clazz.setSort(request.getSort());
        }
        if (request.getStatus() != null) {
            clazz.setStatus(request.getStatus());
        }
        campusInfoService.updateById(clazz);
        return Results.success().message("更新班级成功");
    }

    @DeleteMapping("/colleges/{collegeId}/classes/{id}")
    public Results deleteClass(@PathVariable Long collegeId, @PathVariable Long id) {
        CampusInfo clazz = campusInfoService.getById(id);
        if (clazz == null || clazz.getLevel() != 3) {
            return Results.fail().message("班级不存在");
        }
        if (!collegeId.equals(clazz.getParentId())) {
            return Results.fail().message("班级不属于该学院");
        }
        campusInfoService.removeById(id);
        return Results.success().message("删除班级成功");
    }
}

