package com.example.projectsystem.dto;

/**
 * 下拉选择使用的社团选项
 */
public class ClubOptionDTO {

    private String text;
    private Long value;

    public ClubOptionDTO() {
    }

    public ClubOptionDTO(String text, Long value) {
        this.text = text;
        this.value = value;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }
}


