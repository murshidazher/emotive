BEGIN TRANSACTION;

INSERT INTO users
    (name, email, entries, joined)
VALUES
    (
        'Isobelle Patterson',
        'belle@gmail.com',
        '0',
        '2019-10-05 08:53:16.687'
);

INSERT INTO login
    (hash, email)
VALUES
    (
        '$2a$10$S0Ad0Iit1r8Agxm1Db58z.ww26qnMzjkMY1VTaQ8pA/DgcZa4bVSe',
        'belle@gmail.com'
);

COMMIT;

