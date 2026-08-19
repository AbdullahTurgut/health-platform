package com.healthplatform.healthplatform.dashboard.dto;

import java.time.Instant;
import java.util.UUID;

public record DashboardRecentItem(

        UUID id,

        String type,

        String title,

        String subtitle,

        Instant eventDate

) {
}
