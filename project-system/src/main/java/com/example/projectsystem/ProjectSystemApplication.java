package com.example.projectsystem;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.projectsystem.mapper")
public class ProjectSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectSystemApplication.class, args);
    }

}
