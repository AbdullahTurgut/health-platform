CREATE TABLE doctors (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                         user_id UUID NOT NULL,

                         first_name VARCHAR(100) NOT NULL,
                         last_name VARCHAR(100) NOT NULL,

                         specialization VARCHAR(150),

                         phone VARCHAR(50),
                         email VARCHAR(255),

                         notes TEXT,

                         created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

                         CONSTRAINT fk_doctors_user
                             FOREIGN KEY (user_id)
                                 REFERENCES users(id)
                                 ON DELETE CASCADE
);

CREATE INDEX idx_doctors_user_id
    ON doctors(user_id);

CREATE INDEX idx_doctors_specialization
    ON doctors(specialization);