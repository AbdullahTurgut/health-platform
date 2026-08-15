CREATE TABLE visits (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                        user_id UUID NOT NULL,

                        disease_id UUID,
                        doctor_id UUID,
                        hospital_id UUID,

                        visit_date TIMESTAMP WITH TIME ZONE NOT NULL,

                        department VARCHAR(150),

                        reason TEXT,

                        diagnosis_note TEXT,

                        notes TEXT,

                        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

                        CONSTRAINT fk_visits_user
                            FOREIGN KEY (user_id)
                                REFERENCES users(id)
                                ON DELETE CASCADE,

                        CONSTRAINT fk_visits_disease
                            FOREIGN KEY (disease_id)
                                REFERENCES diseases(id)
                                ON DELETE SET NULL,

                        CONSTRAINT fk_visits_doctor
                            FOREIGN KEY (doctor_id)
                                REFERENCES doctors(id)
                                ON DELETE SET NULL,

                        CONSTRAINT fk_visits_hospital
                            FOREIGN KEY (hospital_id)
                                REFERENCES hospitals(id)
                                ON DELETE SET NULL
);

CREATE INDEX idx_visits_user_id
    ON visits(user_id);

CREATE INDEX idx_visits_disease_id
    ON visits(disease_id);

CREATE INDEX idx_visits_doctor_id
    ON visits(doctor_id);

CREATE INDEX idx_visits_hospital_id
    ON visits(hospital_id);

CREATE INDEX idx_visits_visit_date
    ON visits(visit_date);