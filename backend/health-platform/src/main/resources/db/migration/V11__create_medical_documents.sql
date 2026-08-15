CREATE TABLE medical_documents (
                                   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                                   user_id UUID NOT NULL,

                                   disease_id UUID,
                                   visit_id UUID,
                                   medical_test_id UUID,
                                   imaging_id UUID,

                                   name VARCHAR(255) NOT NULL,

                                   document_type VARCHAR(50) NOT NULL,

                                   file_name VARCHAR(255) NOT NULL,

                                   storage_key VARCHAR(500) NOT NULL,

                                   mime_type VARCHAR(100) NOT NULL,

                                   file_size BIGINT NOT NULL,

                                   uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

                                   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                   updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

                                   CONSTRAINT fk_medical_documents_user
                                       FOREIGN KEY (user_id)
                                           REFERENCES users(id)
                                           ON DELETE CASCADE,

                                   CONSTRAINT fk_medical_documents_disease
                                       FOREIGN KEY (disease_id)
                                           REFERENCES diseases(id)
                                           ON DELETE SET NULL,

                                   CONSTRAINT fk_medical_documents_visit
                                       FOREIGN KEY (visit_id)
                                           REFERENCES visits(id)
                                           ON DELETE SET NULL,

                                   CONSTRAINT fk_medical_documents_medical_test
                                       FOREIGN KEY (medical_test_id)
                                           REFERENCES medical_tests(id)
                                           ON DELETE SET NULL,

                                   CONSTRAINT fk_medical_documents_imaging
                                       FOREIGN KEY (imaging_id)
                                           REFERENCES imaging(id)
                                           ON DELETE SET NULL,

                                   CONSTRAINT chk_medical_documents_type
                                       CHECK (
                                           document_type IN (
                                                             'LAB_REPORT',
                                                             'IMAGING_REPORT',
                                                             'PRESCRIPTION',
                                                             'EPICRISIS',
                                                             'DOCTOR_NOTE',
                                                             'DISCHARGE_SUMMARY',
                                                             'PATHOLOGY_REPORT',
                                                             'OTHER'
                                               )
                                           ),

                                   CONSTRAINT chk_medical_documents_file_size
                                       CHECK (file_size >= 0)
);

CREATE INDEX idx_medical_documents_user_id
    ON medical_documents(user_id);

CREATE INDEX idx_medical_documents_disease_id
    ON medical_documents(disease_id);

CREATE INDEX idx_medical_documents_visit_id
    ON medical_documents(visit_id);

CREATE INDEX idx_medical_documents_medical_test_id
    ON medical_documents(medical_test_id);

CREATE INDEX idx_medical_documents_imaging_id
    ON medical_documents(imaging_id);

CREATE INDEX idx_medical_documents_type
    ON medical_documents(document_type);

CREATE INDEX idx_medical_documents_uploaded_at
    ON medical_documents(uploaded_at);

CREATE INDEX idx_medical_documents_name
    ON medical_documents(name);