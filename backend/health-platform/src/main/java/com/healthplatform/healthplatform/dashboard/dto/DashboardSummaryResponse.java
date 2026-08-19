package com.healthplatform.healthplatform.dashboard.dto;

import com.healthplatform.healthplatform.timeline.dto.TimelineEventResponse;

import java.util.List;

public record DashboardSummaryResponse(

        DashboardCountsResponse counts,

        List<DashboardRecentItem> recentVisits,

        List<DashboardRecentItem> recentMedicalTests,

        List<DashboardRecentItem> recentImaging,

        List<TimelineEventResponse> recentTimeline

) {
}
