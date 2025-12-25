package com.example.projectsystem.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.projectsystem.domain.ActivityCheckin;
import com.example.projectsystem.mapper.ActivityCheckinMapper;
import com.example.projectsystem.service.ActivityCheckinService;
import org.springframework.stereotype.Service;

@Service
public class ActivityCheckinServiceImpl extends ServiceImpl<ActivityCheckinMapper, ActivityCheckin> implements ActivityCheckinService {
}

