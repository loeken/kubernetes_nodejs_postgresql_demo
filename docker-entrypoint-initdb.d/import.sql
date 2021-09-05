create database api;
\c api;
CREATE TABLE users (
              ID SERIAL PRIMARY KEY,
              name VARCHAR(30),
              email VARCHAR(30)
      );
INSERT INTO USERS values (1,'foo','bar');
