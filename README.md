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
## Install PostgreSQL

Скачать PostgreSQL и pgAdmin.

После установки создать базу данных:

```sql
CREATE DATABASE itstep_connect;
```
## PostgreSQL Config

Database name:
itstep_connect

User:
postgres

Password:
123

Port:
5432
## Clone repository

```bash
git clone https://github.com/rash111d/itstep-connect-backend.git
```
## Open project

```bash
cd itstep-connect-backend
```
## Install dependencies

```bash
go mod tidy
```
## Run backend

```bash
go run cmd/main.go
```
Backend runs on:

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

Protected routes use JWT token.

Authorization header:

Bearer TOKEN
## Architecture

Project structure:

- cmd
- internal/database
- internal/models
- internal/handlers
- internal/middleware

## Скриншоты

<img width="2394" height="1384" alt="Снимок экрана 2026-05-27 173547" src="https://github.com/user-attachments/assets/f9d0ef28-97be-4bbc-9b12-a374a719d489" />

