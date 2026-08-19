package com.healthplatform.healthplatform.search.dto;

import java.util.List;

public record SearchPageResponse(

        String query,

        List<SearchResultItem> content,

        int page,

        int size,

        long totalElements,

        int totalPages,

        boolean first,

        boolean last

) {
}