package com.healthplatform.healthplatform.document.controller;

import com.healthplatform.healthplatform.document.dto.MedicalDocumentResponse;
import com.healthplatform.healthplatform.document.model.DocumentType;
import com.healthplatform.healthplatform.document.service.MedicalDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class MedicalDocumentController {

    private final MedicalDocumentService medicalDocumentService;

    @GetMapping
    public ResponseEntity<List<MedicalDocumentResponse>> getAllDocuments(
            @RequestParam(required = false) UUID diseaseId,
            @RequestParam(required = false) UUID visitId,
            @RequestParam(required = false) UUID medicalTestId,
            @RequestParam(required = false) UUID imagingId,
            @RequestParam(required = false) DocumentType documentType,
            @RequestParam(required = false) String name
    ) {

        return ResponseEntity.ok(
                medicalDocumentService.getAllDocuments(
                        diseaseId,
                        visitId,
                        medicalTestId,
                        imagingId,
                        documentType,
                        name
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalDocumentResponse> getDocument(
            @PathVariable UUID id
    ) {

        return ResponseEntity.ok(
                medicalDocumentService.getDocument(id)
        );
    }

    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<MedicalDocumentResponse> uploadDocument(
            @RequestPart("file") MultipartFile file,
            @RequestParam String name,
            @RequestParam DocumentType documentType,
            @RequestParam(required = false) UUID diseaseId,
            @RequestParam(required = false) UUID visitId,
            @RequestParam(required = false) UUID medicalTestId,
            @RequestParam(required = false) UUID imagingId
    ) {

        return ResponseEntity
                .status(201)
                .body(
                        medicalDocumentService.uploadDocument(
                                file,
                                name,
                                documentType,
                                diseaseId,
                                visitId,
                                medicalTestId,
                                imagingId
                        )
                );
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadDocument(
            @PathVariable UUID id
    ) {

        MedicalDocumentService.DocumentDownload download =
                medicalDocumentService.downloadDocument(id);

        MediaType mediaType;

        try {
            mediaType =
                    MediaType.parseMediaType(
                            download.mimeType()
                    );
        } catch (Exception exception) {
            mediaType =
                    MediaType.APPLICATION_OCTET_STREAM;
        }

        ContentDisposition disposition =
                ContentDisposition
                        .attachment()
                        .filename(
                                download.fileName(),
                                StandardCharsets.UTF_8
                        )
                        .build();

        return ResponseEntity
                .ok()
                .contentType(mediaType)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        disposition.toString()
                )
                .body(download.resource());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(
            @PathVariable UUID id
    ) {

        medicalDocumentService.deleteDocument(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}
