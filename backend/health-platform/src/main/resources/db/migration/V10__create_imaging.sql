CREATE TABLE imaging (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                         user_id UUID NOT NULL,

                         disease_id UUID,
                         visit_id UUID,
                         doctor_id UUID,
                         hospital_id UUID,

                         type VARCHAR(50) NOT NULL,

                         body_part VARCHAR(150),

                         imaging_date TIMESTAMP WITH TIME ZONE NOT NULL,

                         report TEXT,

                         notes TEXT,

                         created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

                         CONSTRAINT fk_imaging_user
                             FOREIGN KEY (user_id)
                                 REFERENCES users(id)
                                 ON DELETE CASCADE,

                         CONSTRAINT fk_imaging_disease
                             FOREIGN KEY (disease_id)
                                 REFERENCES diseases(id)
                                 ON DELETE SET NULL,

                         CONSTRAINT fk_imaging_visit
                             FOREIGN KEY (visit_id)
                                 REFERENCES visits(id)
                                 ON DELETE SET NULL,

                         CONSTRAINT fk_imaging_doctor
                             FOREIGN KEY (doctor_id)
                                 REFERENCES doctors(id)
                                 ON DELETE SET NULL,

                         CONSTRAINT fk_imaging_hospital
                             FOREIGN KEY (hospital_id)
                                 REFERENCES hospitals(id)
                                 ON DELETE SET NULL,

                         CONSTRAINT chk_imaging_type
                             CHECK (
                                 type IN (
                                          'MRI',
                                          'CT',
                                          'ULTRASOUND',
                                          'XRAY',
                                          'PET',
                                          'MAMMOGRAPHY',
                                          'OTHER'
                                     )
                                 )
);

CREATE INDEX idx_imaging_user_id
    ON imaging(user_id);

CREATE INDEX idx_imaging_disease_id
    ON imaging(disease_id);

CREATE INDEX idx_imaging_visit_id
    ON imaging(visit_id);

CREATE INDEX idx_imaging_doctor_id
    ON imaging(doctor_id);

CREATE INDEX idx_imaging_hospital_id
    ON imaging(hospital_id);

CREATE INDEX idx_imaging_date
    ON imaging(imaging_date);

CREATE INDEX idx_imaging_type
    ON imaging(type);

CREATE INDEX idx_imaging_body_part
    ON imaging(body_part);