package com.healthplatform.healthplatform.timeline.dto;

import java.util.List;

public record TimelinePageResponse(

        List<TimelineEventResponse> content,

        int page,

        int size,

        long totalElements,

        int totalPages,

        boolean first,

        boolean last

) {
}
