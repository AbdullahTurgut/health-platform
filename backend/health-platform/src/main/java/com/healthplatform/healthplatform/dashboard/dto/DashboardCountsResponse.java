package com.healthplatform.healthplatform.dashboard.dto;

public record DashboardCountsResponse(

        long activeDiseases,

        long activeMedications,

        long totalVisits,

        long totalMedicalTests,

        long totalImaging,

        long totalDocuments

) {
}
