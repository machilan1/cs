# General Setup

## Install dependencies

> `npm i `

# Frontend

### File directory

- apps/cs

### To serve, run

> `nx serve cs`

# Backend

### Before serving, you should

1. Make sure you created a .env file in root directory that contains following parameters.
   > SALT_ROUNDS=12  
   > JWT_SECRET=368b7feed06e1a47134c391169a0fd4dcebc00ee4c6d73fadababb475c8ea0e9
   >
   > PORT=3000
   > API_PORT=3000  
   > API_HOST=localhost  
   > `API_URL=http://${API_HOST}:${API_PORT}`
   >
   > MIGRATION_FILE_DIR=apps/api/libs/shared/src/lib/drizzle/migrations  
   > SCHEMA_FILE_DIR=apps/api/libs/shared/src/lib/drizzle/schema.ts  
   > DB_NAME=db  
   > DB_HOST=localhost  
   > DB_USER=postgres  
   > DB_PSW =123456  
   > DB_PORT=5432

> ` docker-compose up`

> `nx serve api`

### File directory

- apps/api
