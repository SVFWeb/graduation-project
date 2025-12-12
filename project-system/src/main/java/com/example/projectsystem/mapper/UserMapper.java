package com.example.projectsystem.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.projectsystem.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
}

