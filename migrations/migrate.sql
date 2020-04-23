/*
psql -U personalprojects -d postgres -h 127.0.0.1 -W (linux)
RUN \i migrations/migrate.sql \q
*/

DROP DATABASE IF EXISTS mydiary;
CREATE DATABASE mydiary;

/*
RUN 'npx sequelize-cli migration:generate --name model-name --url connection-string'
to create skeleton migration, use queries from model.sync({force:true}) to update skeleton migration
with raw queries

RUN 'npx sequelize-cli db:migration --name model-name --url connection-string'
to run migration
*/