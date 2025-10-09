CREATE DATABASE IF NOT EXISTS login_demo;
USE login_demo;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL
);

INSERT INTO users (username, password, name)
VALUES ('testuser', 'password123', 'Usuario Demo')
ON DUPLICATE KEY UPDATE name=VALUES(name);