BEGIN TRANSACTION;

INSERT INTO user_group (name, description) VALUES ('Insider', 'A person who works for the company.');
INSERT INTO user_group (name, description) VALUES ('Client', 'A person/organization which requests images for annotation.');
INSERT INTO user_group (name, description) VALUES ('Customer', 'A person who wishes to access the system.');


INSERT INTO user_role (name, description) VALUES ('Administrator', 'A person responsible for carrying out the administration of the system.');
INSERT INTO user_role (name, description) VALUES ('Annotator', 'A person responsible for annotating images.');
INSERT INTO user_role (name, description) VALUES ('Client', 'A person who use the services of emotive.');
INSERT INTO user_role (name, description) VALUES ('Potential Customer', 'A person who has an account.');

INSERT INTO permission (name) VALUES ('ALL');
INSERT INTO permission (name) VALUES ('MID');
INSERT INTO permission (name) VALUES ('LOW');
INSERT INTO permission (name) VALUES ('NONE');

INSERT INTO role_permission (user_role_id, permission_id)
SELECT r.id, p.id
FROM user_role r, permission p
WHERE r.name='Potential Customer'
AND p.name='NONE';

INSERT INTO role_permission (user_role_id, permission_id)
SELECT r.id, p.id
FROM user_role r, permission p
WHERE r.name='Client'
AND p.name='LOW';

INSERT INTO role_permission (user_role_id, permission_id)
SELECT r.id, p.id
FROM user_role r, permission p
WHERE r.name='Annotator'
AND p.name='MID';

INSERT INTO role_permission (user_role_id, permission_id)
SELECT r.id, p.id
FROM user_role r, permission p
WHERE r.name='Administrator'
AND p.name='ALL';

INSERT INTO users (name, email, entries, joined, phone, city, group_id, user_role_id)
SELECT 'Isobelle Patterson', 'belle@gmail.com', '0', NOW(), '853 243 764 02', 'Arkansas', g.id, u.id
FROM user_group g, user_role u
WHERE g.name='Client'
AND u.name='Client';

INSERT INTO login (hash, email)
VALUES ('$2a$10$S0Ad0Iit1r8Agxm1Db58z.ww26qnMzjkMY1VTaQ8pA/DgcZa4bVSe', 'belle@gmail.com');

INSERT INTO users (name, email, entries, joined, phone, city, group_id, user_role_id)
SELECT 'Marc Anderson', 'marc@test.com', '0', NOW(), '893 223 763 12', 'Washington', g.id, u.id
FROM user_group g, user_role u
WHERE g.name='Insider'
AND u.name='Annotator';

INSERT INTO login (hash, email)
VALUES ('$2a$10$sDe0D3Luw3RKNgTqndSfKOw0D0jqJF2.8gIJztHbQdHOe0exdlrI6', 'marc@test.com');


INSERT INTO users (name, email, entries, joined, phone, city, group_id, user_role_id)
SELECT 'Peter Pettgrew', 'admin@test.com', '0', NOW(), '793 223 663 12', 'Oregon', g.id, u.id
FROM user_group g, user_role u
WHERE g.name='Insider'
AND u.name='Administrator';

INSERT INTO login (hash, email)
VALUES ('$2a$10$YeJlNWzfcyvrr22GUGT2oeeUXKTsRP1n45IQugduxET/t/EOgf//K', 'admin@test.com');

COMMIT;

