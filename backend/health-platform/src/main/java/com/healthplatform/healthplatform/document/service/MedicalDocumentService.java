package com.healthplatform.healthplatform.document.service;

import com.healthplatform.healthplatform.common.exception.ResourceNotFoundException;
import com.healthplatform.healthplatform.disease.entity.Disease;
import com.healthplatform.healthplatform.disease.repository.DiseaseRepository;
import com.healthplatform.healthplatform.document.dto.MedicalDocumentResponse;
import com.healthplatform.healthplatform.document.entity.MedicalDocument;
import com.healthplatform.healthplatform.document.model.DocumentType;
import com.healthplatform.healthplatform.document.repository.MedicalDocumentRepository;
import com.healthplatform.healthplatform.imaging.entity.Imaging;
import com.healthplatform.healthplatform.imaging.repository.ImagingRepository;
import com.healthplatform.healthplatform.medicaltest.entity.MedicalTest;
import com.healthplatform.healthplatform.medicaltest.repository.MedicalTestRepository;
import com.healthplatform.healthplatform.security.CurrentUserProvider;
import com.healthplatform.healthplatform.storage.FileStorageService;
import com.healthplatform.healthplatform.storage.StoredFile;
import com.healthplatform.healthplatform.user.entity.User;
import com.healthplatform.healthplatform.user.repository.UserRepository;
import com.healthplatform.healthplatform.visit.entity.Visit;
import com.healthplatform.healthplatform.visit.repository.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MedicalDocumentService {

    private static final Set<String> ALLOWED_MIME_TYPES =
            Set.of(
                    "application/pdf",
                    "image/jpeg",
                    "image/png"
            );

    private static final long MAX_FILE_SIZE =
            10L * 1024 * 1024;

    private final MedicalDocumentRepository medicalDocumentRepository;
    private final UserRepository userRepository;
    private final DiseaseRepository diseaseRepository;
    private final VisitRepository visitRepository;
    private final MedicalTestRepository medicalTestRepository;
    private final ImagingRepository imagingRepository;
    private final CurrentUserProvider currentUserProvider;
    private final FileStorageService fileStorageService;

    @Transactional(readOnly = true)
    public List<MedicalDocumentResponse> getAllDocuments(
            UUID diseaseId,
            UUID visitId,
            UUID medicalTestId,
            UUID imagingId,
            DocumentType documentType,
            String name
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        String normalizedName =
                normalizeFilter(name);

        long filterCount =
                java.util.stream.Stream.of(
                                diseaseId,
                                visitId,
                                medicalTestId,
                                imagingId,
                                documentType,
                                normalizedName
                        )
                        .filter(java.util.Objects::nonNull)
                        .count();

        if (filterCount > 1) {
            throw new IllegalArgumentException(
                    "Aynı anda yalnızca bir belge filtresi kullanılabilir!"
            );
        }

        List<MedicalDocument> documents;

        if (diseaseId != null) {

            resolveDisease(diseaseId, userId);

            documents =
                    medicalDocumentRepository
                            .findAllByUser_IdAndDisease_IdOrderByUploadedAtDesc(
                                    userId,
                                    diseaseId
                            );

        } else if (visitId != null) {

            resolveVisit(visitId, userId);

            documents =
                    medicalDocumentRepository
                            .findAllByUser_IdAndVisit_IdOrderByUploadedAtDesc(
                                    userId,
                                    visitId
                            );

        } else if (medicalTestId != null) {

            resolveMedicalTest(
                    medicalTestId,
                    userId
            );

            documents =
                    medicalDocumentRepository
                            .findAllByUser_IdAndMedicalTest_IdOrderByUploadedAtDesc(
                                    userId,
                                    medicalTestId
                            );

        } else if (imagingId != null) {

            resolveImaging(
                    imagingId,
                    userId
            );

            documents =
                    medicalDocumentRepository
                            .findAllByUser_IdAndImaging_IdOrderByUploadedAtDesc(
                                    userId,
                                    imagingId
                            );

        } else if (documentType != null) {

            documents =
                    medicalDocumentRepository
                            .findAllByUser_IdAndDocumentTypeOrderByUploadedAtDesc(
                                    userId,
                                    documentType
                            );

        } else if (normalizedName != null) {

            documents =
                    medicalDocumentRepository
                            .findAllByUser_IdAndNameContainingIgnoreCaseOrderByUploadedAtDesc(
                                    userId,
                                    normalizedName
                            );

        } else {

            documents =
                    medicalDocumentRepository
                            .findAllByUser_IdOrderByUploadedAtDesc(
                                    userId
                            );
        }

        return documents
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public MedicalDocumentResponse getDocument(
            UUID documentId
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        return toResponse(
                findOwnedDocument(
                        documentId,
                        userId
                )
        );
    }

    @Transactional
    public MedicalDocumentResponse uploadDocument(
            MultipartFile file,
            String name,
            DocumentType documentType,
            UUID diseaseId,
            UUID visitId,
            UUID medicalTestId,
            UUID imagingId
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        validateFile(file);
        validateName(name);

        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"
                                )
                        );

        Disease disease =
                resolveDisease(
                        diseaseId,
                        userId
                );

        Visit visit =
                resolveVisit(
                        visitId,
                        userId
                );

        MedicalTest medicalTest =
                resolveMedicalTest(
                        medicalTestId,
                        userId
                );

        Imaging imaging =
                resolveImaging(
                        imagingId,
                        userId
                );

        StoredFile storedFile = null;

        try {

            storedFile =
                    fileStorageService.store(
                            userId,
                            file.getInputStream(),
                            file.getOriginalFilename()
                    );

            MedicalDocument document =
                    new MedicalDocument();

            document.setUser(user);
            document.setDisease(disease);
            document.setVisit(visit);
            document.setMedicalTest(medicalTest);
            document.setImaging(imaging);

            document.setName(name.trim());
            document.setDocumentType(documentType);
            document.setFileName(
                    safeOriginalFileName(
                            file.getOriginalFilename()
                    )
            );
            document.setStorageKey(
                    storedFile.storageKey()
            );
            document.setMimeType(
                    file.getContentType()
            );
            document.setFileSize(
                    file.getSize()
            );

            MedicalDocument saved =
                    medicalDocumentRepository.save(
                            document
                    );

            return toResponse(saved);

        } catch (IOException exception) {

            rollbackStoredFile(storedFile);

            throw new IllegalArgumentException(
                    "Yüklenen dosya okunamadı",
                    exception
            );

        } catch (RuntimeException exception) {

            rollbackStoredFile(storedFile);

            throw exception;
        }
    }

    @Transactional(readOnly = true)
    public DocumentDownload downloadDocument(
            UUID documentId
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        MedicalDocument document =
                findOwnedDocument(
                        documentId,
                        userId
                );

        Resource resource =
                fileStorageService.load(
                        document.getStorageKey()
                );

        return new DocumentDownload(
                resource,
                document.getFileName(),
                document.getMimeType()
        );
    }

    @Transactional
    public void deleteDocument(
            UUID documentId
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        MedicalDocument document =
                findOwnedDocument(
                        documentId,
                        userId
                );

        String storageKey =
                document.getStorageKey();

        medicalDocumentRepository.delete(document);
        medicalDocumentRepository.flush();

        fileStorageService.delete(storageKey);
    }

    private MedicalDocument findOwnedDocument(
            UUID documentId,
            UUID userId
    ) {

        return medicalDocumentRepository
                .findByIdAndUser_Id(
                        documentId,
                        userId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Medical document not found"
                        )
                );
    }

    private Disease resolveDisease(
            UUID diseaseId,
            UUID userId
    ) {

        if (diseaseId == null) {
            return null;
        }

        return diseaseRepository
                .findByIdAndUser_Id(
                        diseaseId,
                        userId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Disease not found"
                        )
                );
    }

    private Visit resolveVisit(
            UUID visitId,
            UUID userId
    ) {

        if (visitId == null) {
            return null;
        }

        return visitRepository
                .findByIdAndUser_Id(
                        visitId,
                        userId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Visit not found"
                        )
                );
    }

    private MedicalTest resolveMedicalTest(
            UUID medicalTestId,
            UUID userId
    ) {

        if (medicalTestId == null) {
            return null;
        }

        return medicalTestRepository
                .findByIdAndUser_Id(
                        medicalTestId,
                        userId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Medical test not found"
                        )
                );
    }

    private Imaging resolveImaging(
            UUID imagingId,
            UUID userId
    ) {

        if (imagingId == null) {
            return null;
        }

        return imagingRepository
                .findByIdAndUser_Id(
                        imagingId,
                        userId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Görüntü bulunamadı"
                        )
                );
    }

    private void validateFile(
            MultipartFile file
    ) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException(
                    "Dosya zorunludur"
            );
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException(
                    "Dosya boyutu 10 MB'ı geçemez"
            );
        }

        String contentType =
                file.getContentType();

        if (
                contentType == null
                        || !ALLOWED_MIME_TYPES.contains(contentType)
        ) {
            throw new IllegalArgumentException(
                    "Desteklenmeyen dosya türü"
            );
        }
    }

    private void validateName(
            String name
    ) {

        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException(
                    "Belge adı zorunludur"
            );
        }

        if (name.trim().length() > 255) {
            throw new IllegalArgumentException(
                    "Belge adı en fazla 255 karakter olabilir"
            );
        }
    }

    private String safeOriginalFileName(
            String originalFileName
    ) {

        if (
                originalFileName == null
                        || originalFileName.isBlank()
        ) {
            return "file";
        }

        return java.nio.file.Path
                .of(originalFileName)
                .getFileName()
                .toString();
    }

    private void rollbackStoredFile(
            StoredFile storedFile
    ) {

        if (storedFile == null) {
            return;
        }

        try {
            fileStorageService.delete(
                    storedFile.storageKey()
            );
        } catch (RuntimeException ignored) {
            // best effort cleanup
        }
    }

    private String normalizeFilter(
            String value
    ) {

        if (value == null) {
            return null;
        }

        String trimmed =
                value.trim();

        return trimmed.isEmpty()
                ? null
                : trimmed;
    }

    private MedicalDocumentResponse toResponse(
            MedicalDocument document
    ) {

        Disease disease =
                document.getDisease();

        Visit visit =
                document.getVisit();

        MedicalTest medicalTest =
                document.getMedicalTest();

        Imaging imaging =
                document.getImaging();

        return new MedicalDocumentResponse(
                document.getId(),

                disease != null
                        ? disease.getId()
                        : null,

                disease != null
                        ? disease.getName()
                        : null,

                visit != null
                        ? visit.getId()
                        : null,

                visit != null
                        ? visit.getVisitDate()
                        : null,

                medicalTest != null
                        ? medicalTest.getId()
                        : null,

                medicalTest != null
                        ? medicalTest.getName()
                        : null,

                imaging != null
                        ? imaging.getId()
                        : null,

                imaging != null
                        ? imaging.getType().name()
                        : null,

                document.getName(),
                document.getDocumentType(),
                document.getFileName(),
                document.getMimeType(),
                document.getFileSize(),
                document.getUploadedAt(),
                document.getCreatedAt(),
                document.getUpdatedAt()
        );
    }

    public record DocumentDownload(
            Resource resource,
            String fileName,
            String mimeType
    ) {
    }
}
