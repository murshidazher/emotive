-- Deploy fresh database tables

\i '/docker-entrypoint-initdb.d/tables/user_role.sql'
\i '/docker-entrypoint-initdb.d/tables/user_group.sql'
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/permission.sql'
\i '/docker-entrypoint-initdb.d/tables/role_permission.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'
\i '/docker-entrypoint-initdb.d/tables/shistory.sql'

\i '/docker-entrypoint-initdb.d/seed/seed.sql'
