package com.healthplatform.healthplatform.timeline.dto;

import com.healthplatform.healthplatform.timeline.model.TimelineEventType;

import java.time.Instant;
import java.util.UUID;

public record TimelineEventResponse(

        UUID id,

        TimelineEventType type,

        Instant eventDate,

        String title,

        String subtitle,

        String description,

        UUID diseaseId,

        String diseaseName

) {
}
