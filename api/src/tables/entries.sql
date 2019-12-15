/*
Connect to database as personalprojects and RUN  \c mylaw \i api/src/tables/users.sql
*/

DROP TABLE IF EXISTS entries;

CREATE TABLE entries
(
    id          bigint      PRIMARY KEY NOT NULL,
    title       text        NOT NULL,
    body        text        NOT NULL,
    "user_id"   bigint      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_on  timestamptz DEFAULT NOW(),
    modified_on timestamptz DEFAULT NOW()
);