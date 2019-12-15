/*
Connect to db as personalprojects and RUN  \c mydiary \i api/src/seeders/delete.sql
*/

TRUNCATE users
CASCADE;

TRUNCATE entries
CASCADE;