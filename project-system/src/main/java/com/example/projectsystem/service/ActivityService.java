package com.example.projectsystem.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.projectsystem.domain.Activity;

public interface ActivityService extends IService<Activity> {

    /**
     * 创建活动，默认活动状态为“审核中”，审核状态为 0（待审核）
     */
    Activity createActivity(Activity activity);
}


