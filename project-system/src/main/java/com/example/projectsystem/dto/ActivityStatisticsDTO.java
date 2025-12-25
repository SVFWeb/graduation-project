package com.example.projectsystem.dto;

import lombok.Data;

@Data
public class ActivityStatisticsDTO {
    private ActivityDTO activityInfo;
    private StatusStats statusStats;
    private Double successRate;
    private Integer maxParticipants;
    private Integer currentParticipants;
    
    @Data
    public static class StatusStats {
        private Long pending;
        private Long approved;
        private Long rejected;
        private Long total;
    }
}