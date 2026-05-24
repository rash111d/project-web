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

## Run project
### 1. Install PostgreSQL

Создать базу данных:
```sql
CREATE DATABASE itstep_connect;
```
### 2. Configure database

PostgreSQL config:

- dbname: itstep_connect
- user: postgres
- password: 123
- port: 5432
### 3. Run backend

```bash
go run cmd/main.go
```
Backend runs on:

```text
http://localhost:8080
```
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
## Installation
### Clone repository

```bash
git clone https://github.com/rash111d/itstep-connect-backend.git
```
### Open project

```bash
cd itstep-connect-backend
```
### Install dependencies

```bash
go mod tidy
```
### Run backend

```bash
go run cmd/main.go
```