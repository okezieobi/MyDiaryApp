/*
psql -U personalprojects -d postgres -h 127.0.0.1 -W (linux)
RUN \i migrations/migrate.sql \q
*/

DROP DATABASE IF EXISTS mydiary;
CREATE DATABASE mydiary;
