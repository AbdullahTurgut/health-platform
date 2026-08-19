package com.healthplatform.healthplatform.search.controller;

import com.healthplatform.healthplatform.search.dto.SearchPageResponse;
import com.healthplatform.healthplatform.search.model.SearchResultType;
import com.healthplatform.healthplatform.search.service.GlobalSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class GlobalSearchController {

    private final GlobalSearchService globalSearchService;

    @GetMapping
    public ResponseEntity<SearchPageResponse> search(

            @RequestParam("q")
            String query,

            @RequestParam(required = false)
            SearchResultType type,

            @RequestParam(required = false)
            UUID diseaseId,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "20")
            int size

    ) {

        return ResponseEntity.ok(
                globalSearchService.search(
                        query,
                        type,
                        diseaseId,
                        page,
                        size
                )
        );
    }
}