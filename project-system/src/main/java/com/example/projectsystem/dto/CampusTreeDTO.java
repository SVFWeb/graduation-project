package com.example.projectsystem.dto;

import java.util.ArrayList;
import java.util.List;

public class CampusTreeDTO {
    private Long id;
    private String name;
    private List<CampusCollegeDTO> colleges = new ArrayList<>();

    public CampusTreeDTO() {
    }

    public CampusTreeDTO(Long id, String name, List<CampusCollegeDTO> colleges) {
        this.id = id;
        this.name = name;
        this.colleges = colleges;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<CampusCollegeDTO> getColleges() {
        return colleges;
    }

    public void setColleges(List<CampusCollegeDTO> colleges) {
        this.colleges = colleges;
    }
}

