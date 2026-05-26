# ITSTEP Connect Backend

Backend часть проекта ITSTEP Connect.

## Stack

- Go
- Gin
- PostgreSQL
- GORM
- JWT

## Features

- Register
- Login
- JWT Authentication
- Posts CRUD
- Comments CRUD
- Protected Routes
## Установка PostgreSQL

Скачать PostgreSQL и pgAdmin.

После установки открыть pgAdmin.
```
## Создание базы данных

1. Открыть pgAdmin

2. Нажать правой кнопкой на Databases

3. Create → Database

4. Название базы данных:

```text
itstep_connect
```

5. Нажать Save
## PostgreSQL Config

Database:
itstep_connect

User:
postgres

Password:
123

Port:
5432
## Clone repository

```bash
git clone https://github.com/rash111d/project-web.git
```
## Открыть проект

```bash
cd project-web
```
## Установка зависимостей

```bash
go mod tidy
```
## Запуск backend

```bash
go run cmd/main.go
```
Backend запускается на:

http://localhost:8080
## API Routes

### Auth

POST /register

POST /login
### Posts

GET /api/posts

POST /api/posts

DELETE /api/posts/:id
### Comments

POST /api/comments

GET /api/posts/:id/comments

DELETE /api/comments/:id
## Authorization

Protected routes используют JWT token.

Authorization Header:

Bearer TOKEN
## Архитектура проекта

Структура проекта:

- cmd
- internal/database
- internal/models
- internal/handlers
- internal/middleware
