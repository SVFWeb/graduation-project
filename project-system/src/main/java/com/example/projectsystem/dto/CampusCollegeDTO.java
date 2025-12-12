package com.example.projectsystem.dto;

import java.util.ArrayList;
import java.util.List;

public class CampusCollegeDTO {
    private Long id;
    private String name;
    private List<CampusClassDTO> classes = new ArrayList<>();

    public CampusCollegeDTO() {
    }

    public CampusCollegeDTO(Long id, String name, List<CampusClassDTO> classes) {
        this.id = id;
        this.name = name;
        this.classes = classes;
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

    public List<CampusClassDTO> getClasses() {
        return classes;
    }

    public void setClasses(List<CampusClassDTO> classes) {
        this.classes = classes;
    }
}

