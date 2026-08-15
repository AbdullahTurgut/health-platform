CREATE TABLE hospitals (
                           id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                           user_id UUID NOT NULL,

                           name VARCHAR(200) NOT NULL,

                           city VARCHAR(100),

                           address TEXT,

                           phone VARCHAR(50),

                           notes TEXT,

                           created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

                           CONSTRAINT fk_hospitals_user
                               FOREIGN KEY (user_id)
                                   REFERENCES users(id)
                                   ON DELETE CASCADE
);

CREATE INDEX idx_hospitals_user_id
    ON hospitals(user_id);

CREATE INDEX idx_hospitals_name
    ON hospitals(name);

CREATE INDEX idx_hospitals_city
    ON hospitals(city);