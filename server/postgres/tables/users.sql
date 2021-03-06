BEGIN TRANSACTION;

CREATE TABLE users
(
    id serial PRIMARY KEY,
    name VARCHAR(100),
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    joined TIMESTAMP NOT NULL,
    phone VARCHAR(14),
    city VARCHAR(100),
    group_id INTEGER NOT NULL REFERENCES user_group(id),
    user_role_id INTEGER NOT NULL REFERENCES user_role(id)
);

COMMIT;
