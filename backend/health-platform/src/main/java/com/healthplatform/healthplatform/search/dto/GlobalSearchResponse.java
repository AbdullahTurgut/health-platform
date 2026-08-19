package com.healthplatform.healthplatform.search.dto;

import java.util.List;

public record GlobalSearchResponse(

        String query,

        int totalResults,

        List<SearchResultItem> results

) {
}
