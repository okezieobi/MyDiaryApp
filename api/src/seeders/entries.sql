/*
Connect to db as personalprojects and RUN  \c mylaw \i api/src/seeders/users.sql \q
*/

INSERT INTO entries
    (id, title, body, "user_id")
VALUES
    (2020202020202, 'TITLE ONE', 'BODY ONE', 1010101010101);

INSERT INTO entries
    (id, title, body, "user_id")
VALUES
    (3030303030303, 'TITLE TWO', 'BODY TWO', 5050505050505);

SELECT *
FROM entries;