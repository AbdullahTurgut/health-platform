CREATE TABLE medications (
                             id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                             user_id UUID NOT NULL,
                             disease_id UUID,

                             name VARCHAR(200) NOT NULL,

                             dosage VARCHAR(100),

                             frequency VARCHAR(100),

                             route VARCHAR(30),

                             start_date DATE,
                             end_date DATE,

                             status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',

                             prescribed_by VARCHAR(200),

                             notes TEXT,

                             created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                             updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

                             CONSTRAINT fk_medications_user
                                 FOREIGN KEY (user_id)
                                     REFERENCES users(id)
                                     ON DELETE CASCADE,

                             CONSTRAINT fk_medications_disease
                                 FOREIGN KEY (disease_id)
                                     REFERENCES diseases(id)
                                     ON DELETE SET NULL,

                             CONSTRAINT chk_medications_status
                                 CHECK (
                                     status IN (
                                                'ACTIVE',
                                                'COMPLETED',
                                                'DISCONTINUED',
                                                'PAUSED'
                                         )
                                     ),

                             CONSTRAINT chk_medications_route
                                 CHECK (
                                     route IS NULL
                                         OR route IN (
                                                      'ORAL',
                                                      'TOPICAL',
                                                      'INJECTION',
                                                      'INHALATION',
                                                      'SUBLINGUAL',
                                                      'OTHER'
                                         )
                                     ),

                             CONSTRAINT chk_medications_dates
                                 CHECK (
                                     end_date IS NULL
                                         OR start_date IS NULL
                                         OR end_date >= start_date
                                     )
);

CREATE INDEX idx_medications_user_id
    ON medications(user_id);

CREATE INDEX idx_medications_disease_id
    ON medications(disease_id);

CREATE INDEX idx_medications_name
    ON medications(name);

CREATE INDEX idx_medications_status
    ON medications(status);

CREATE INDEX idx_medications_start_date
    ON medications(start_date);