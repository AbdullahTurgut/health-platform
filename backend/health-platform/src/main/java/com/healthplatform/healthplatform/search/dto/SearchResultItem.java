package com.healthplatform.healthplatform.search.dto;

import com.healthplatform.healthplatform.search.model.SearchResultType;

import java.time.Instant;
import java.util.UUID;

public record SearchResultItem(

        UUID id,

        SearchResultType type,

        String title,

        String subtitle,

        String description,

        Instant eventDate,

        UUID diseaseId,

        String diseaseName

) {
}
