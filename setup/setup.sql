-- Comando para criar o banco de dados
USE master;
GO
-- Comando para criar o banco de dados
CREATE DATABASE CinemaApp;
GO

-- Comandos para usar o banco de dados recém-criado
USE CinemaApp;
GO

-- Criar login com usuário e senha
CREATE LOGIN AdminUser12
WITH PASSWORD = '28448292ddA';
GO

-- Criar um usuário no banco de dados associado ao login
CREATE USER AdminUser12 FOR LOGIN AdminUser12;
GO

-- Conceder permissões ao usuário no banco de dados
GRANT SELECT, INSERT, UPDATE, DELETE ON DATABASE::CinemaApp TO AdminUser12;
GO



