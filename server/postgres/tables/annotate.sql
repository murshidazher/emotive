BEGIN TRANSACTION;

CREATE TABLE annotate
(
  id serial PRIMARY KEY,
  client_id INTEGER REFERENCES users(id),
  employee_id INTEGER REFERENCES users(id),
  request json NOT NULL,
  created TIMESTAMP NOT NULL,
  annotated json,
  resolved BOOLEAN NOT NULL DEFAULT FALSE
);

COMMIT;
