/*
Connect to db as personalprojects and RUN  \c mylaw \i api/src/seeders/users.sql \q
*/

INSERT INTO users
    (id, full_name, username, email, "password")
VALUES
    (1010101010101, 'Frank Okezie', 'Obiedere', 'foobar@mail.com', crypt('AbcDFer123*@is!', gen_salt('bf', 12)));

INSERT INTO users
    (id, full_name, username, email, "password")
VALUES
    (5050505050505, 'Obi Franklyn', 'Ekemezie', 'barfoo@email.com', crypt('AbcDFer123*@is!', gen_salt('bf', 12)));

SELECT
    *
FROM
    users;
