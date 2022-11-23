ALTER TABLE users_jwt
ADD CONSTRAINT users_unique_email UNIQUE (email);