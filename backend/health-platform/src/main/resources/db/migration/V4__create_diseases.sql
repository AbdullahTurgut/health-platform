CREATE TABLE diseases (
                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                          user_id UUID NOT NULL,

                          name VARCHAR(255) NOT NULL,

                          diagnosis_date DATE,

                          status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

                          description TEXT,

                          created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

                          CONSTRAINT fk_diseases_user
                              FOREIGN KEY (user_id)
                                  REFERENCES users(id)
                                  ON DELETE CASCADE,

                          CONSTRAINT chk_diseases_status
                              CHECK (status IN ('ACTIVE', 'RESOLVED', 'CHRONIC'))
);

CREATE INDEX idx_diseases_user_id
    ON diseases(user_id);