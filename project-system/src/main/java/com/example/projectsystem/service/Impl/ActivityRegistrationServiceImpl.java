package com.example.projectsystem.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.projectsystem.domain.ActivityRegistration;
import com.example.projectsystem.mapper.ActivityRegistrationMapper;
import com.example.projectsystem.service.ActivityRegistrationService;
import org.springframework.stereotype.Service;

@Service
public class ActivityRegistrationServiceImpl extends ServiceImpl<ActivityRegistrationMapper, ActivityRegistration>
        implements ActivityRegistrationService {
}


