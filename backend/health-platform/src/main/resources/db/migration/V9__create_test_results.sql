CREATE TABLE test_results (
                              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                              medical_test_id UUID NOT NULL,

                              parameter_name VARCHAR(150) NOT NULL,

                              value_text VARCHAR(100) NOT NULL,

                              numeric_value NUMERIC(18, 6),

                              unit VARCHAR(50),

                              reference_range VARCHAR(100),

                              flag VARCHAR(30),

                              notes TEXT,

                              created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                              updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

                              CONSTRAINT fk_test_results_medical_test
                                  FOREIGN KEY (medical_test_id)
                                      REFERENCES medical_tests(id)
                                      ON DELETE CASCADE,

                              CONSTRAINT chk_test_results_flag
                                  CHECK (
                                      flag IS NULL
                                          OR flag IN (
                                                      'NORMAL',
                                                      'LOW',
                                                      'HIGH',
                                                      'CRITICAL',
                                                      'ABNORMAL',
                                                      'POSITIVE',
                                                      'NEGATIVE',
                                                      'UNKNOWN'
                                          )
                                      )
);

CREATE INDEX idx_test_results_medical_test_id
    ON test_results(medical_test_id);

CREATE INDEX idx_test_results_parameter_name
    ON test_results(parameter_name);

CREATE INDEX idx_test_results_numeric_value
    ON test_results(numeric_value);