package com.example.projectsystem.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.projectsystem.domain.ClubMember;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ClubMemberMapper extends BaseMapper<ClubMember> {
}

