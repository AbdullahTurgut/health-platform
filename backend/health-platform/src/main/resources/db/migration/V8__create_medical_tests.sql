CREATE TABLE medical_tests (
                               id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                               user_id UUID NOT NULL,

                               disease_id UUID,
                               visit_id UUID,

                               name VARCHAR(200) NOT NULL,

                               category VARCHAR(50) NOT NULL,

                               test_date TIMESTAMP WITH TIME ZONE NOT NULL,

                               laboratory VARCHAR(200),

                               notes TEXT,

                               created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                               updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

                               CONSTRAINT fk_medical_tests_user
                                   FOREIGN KEY (user_id)
                                       REFERENCES users(id)
                                       ON DELETE CASCADE,

                               CONSTRAINT fk_medical_tests_disease
                                   FOREIGN KEY (disease_id)
                                       REFERENCES diseases(id)
                                       ON DELETE SET NULL,

                               CONSTRAINT fk_medical_tests_visit
                                   FOREIGN KEY (visit_id)
                                       REFERENCES visits(id)
                                       ON DELETE SET NULL,

                               CONSTRAINT chk_medical_tests_category
                                   CHECK (
                                       category IN (
                                                    'BLOOD',
                                                    'URINE',
                                                    'HORMONE',
                                                    'BIOCHEMISTRY',
                                                    'GENETIC',
                                                    'PATHOLOGY',
                                                    'MICROBIOLOGY',
                                                    'OTHER'
                                           )
                                       )
);

CREATE INDEX idx_medical_tests_user_id
    ON medical_tests(user_id);

CREATE INDEX idx_medical_tests_disease_id
    ON medical_tests(disease_id);

CREATE INDEX idx_medical_tests_visit_id
    ON medical_tests(visit_id);

CREATE INDEX idx_medical_tests_test_date
    ON medical_tests(test_date);

CREATE INDEX idx_medical_tests_name
    ON medical_tests(name);