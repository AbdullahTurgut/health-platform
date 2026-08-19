package com.healthplatform.healthplatform.search.controller;

import com.healthplatform.healthplatform.search.dto.GlobalSearchResponse;
import com.healthplatform.healthplatform.search.service.GlobalSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class GlobalSearchController {

    private final GlobalSearchService globalSearchService;

    @GetMapping
    public ResponseEntity<GlobalSearchResponse> search(
            @RequestParam("q")
            String query
    ) {

        return ResponseEntity.ok(
                globalSearchService.search(query)
        );
    }
}
