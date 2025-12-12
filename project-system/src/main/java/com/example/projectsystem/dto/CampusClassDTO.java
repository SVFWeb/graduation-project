package com.example.projectsystem.dto;

public class CampusClassDTO {
    private Long id;
    private String name;

    public CampusClassDTO() {
    }

    public CampusClassDTO(Long id, String name) {
        this.id = id;
        this.name = name;
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
}

