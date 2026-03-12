# WebMclarenProyecto

Aplicación full stack para catálogo de modelos McLaren con autenticación JWT y gestión de favoritos por usuario.

## Resumen ejecutivo

Este proyecto implementa una arquitectura cliente-servidor moderna:

- Frontend SPA con React + Vite + TypeScript + Tailwind CSS.
- Backend REST API con NestJS + TypeScript.
- Persistencia en PostgreSQL mediante Prisma ORM.
- Base de datos dockerizada con Docker Compose para entorno local reproducible.

El objetivo funcional principal es permitir:

- Registro e inicio de sesión de usuarios.
- Consulta de modelos de coche.
- Creación de modelos protegida por autenticación.
- Gestión de favoritos por usuario autenticado.

## Stack tecnológico

### Frontend

- React 19
- Vite 7
- TypeScript
- Tailwind CSS 4

### Backend

- Node.js
- NestJS 11
- TypeScript
- Prisma ORM
- JWT (Passport + @nestjs/jwt)
- bcrypt

### Datos e infraestructura

- PostgreSQL 16 (contenedor Docker)
- Docker Compose

## Arquitectura general

- frontend/: interfaz de usuario y experiencia cliente.
- backend/: API REST y lógica de negocio.
- docker-compose.yml: servicio de base de datos local.

Flujo principal:

1. El frontend consume la API REST del backend.
2. El backend autentica usuarios con JWT.
3. Prisma gestiona el acceso a PostgreSQL.
4. Los favoritos se almacenan en una tabla relacional con restricción de unicidad por usuario/modelo.

## Requisitos previos

Instalar en tu equipo:

- Node.js 20+ (recomendado LTS)
- npm 10+
- Docker Desktop (con Docker Compose habilitado)

Comprobación rápida:

```bash
node -v
npm -v
docker -v
docker compose version
```

## Puesta en marcha (local)

## 1) Levantar base de datos

Desde la raíz del proyecto:

```bash
docker compose up -d
```

Esto levanta PostgreSQL en localhost:5432.

## 2) Configurar y ejecutar backend

En una terminal nueva:

```bash
cd backend
npm install
```

Variables de entorno:

- Si no existe archivo .env, crear uno tomando como base .env.example.
- Variables necesarias:
  - PORT
  - DATABASE_URL
  - JWT_SECRET
  - JWT_EXPIRES_IN

Preparar Prisma y datos iniciales:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
```

Iniciar API en desarrollo:

```bash
npm run start:dev
```

API disponible en: http://localhost:3000

## 3) Configurar y ejecutar frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend disponible en: http://localhost:5173

## Scripts útiles

### Backend

- npm run start:dev -> arranque en modo desarrollo con watch.
- npm run build -> compila la aplicación.
- npm run start:prod -> ejecuta build de producción.
- npm run prisma:generate -> genera cliente Prisma.
- npm run prisma:migrate -- --name <nombre> -> crea/aplica migraciones en desarrollo.
- npm run prisma:seed -> inserta datos iniciales.
- npm run test -> pruebas unitarias.
- npm run test:e2e -> pruebas end-to-end.

### Frontend

- npm run dev -> servidor de desarrollo.
- npm run build -> compilación para producción.
- npm run preview -> previsualizar build.
- npm run lint -> análisis estático.

## Endpoints principales de la API

### Autenticación

- POST /auth/register
- POST /auth/login

### Modelos de coche

- GET /car-models (público)
- POST /car-models (requiere Bearer Token)

### Favoritos

- GET /favorites (requiere Bearer Token)
- POST /favorites/:carModelId (requiere Bearer Token)
- DELETE /favorites/:carModelId (requiere Bearer Token)

## Modelo de datos (alto nivel)

- User
  - id, email (único), passwordHash, name, createdAt, updatedAt
- CarModel
  - id, name (único), category, powerLabel, powerHp, imageUrl, description, timestamps
- Favorite
  - id, userId, carModelId, createdAt
  - restricción única: userId + carModelId

## Convenciones operativas

- El backend habilita CORS para permitir consumo desde frontend local.
- La autenticación usa JWT firmado con JWT_SECRET.
- Las rutas protegidas deben recibir cabecera:

```text
Authorization: Bearer <token>
```

## Solución de problemas

### El backend no conecta a la base de datos

- Verificar contenedor activo:

```bash
docker ps
```

- Comprobar que DATABASE_URL apunta a localhost:5432 y credenciales correctas.

### Error de migración o esquema desactualizado

Ejecutar de nuevo:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

### Puerto ocupado

- Backend usa 3000 por defecto.
- Frontend usa 5173 por defecto.
- PostgreSQL usa 5432.

Cambiar puertos si hay conflictos (env/backend o configuración de Vite).

## Estructura del repositorio

```text
WebMclarenProyecto/
  backend/
    prisma/
    src/
  frontend/
    src/
  docker-compose.yml
  stack.txt
```

## Checklist de validación rápida

- docker compose up -d ejecutado sin errores.
- backend instalado y corriendo en localhost:3000.
- frontend instalado y corriendo en localhost:5173.
- migraciones aplicadas y seed ejecutado.
- login funcional y operaciones de favoritos funcionando con token JWT.

## Estado del proyecto

Proyecto listo para entorno local de desarrollo y evaluación técnica.
Orientado a crecimiento modular gracias a NestJS + Prisma y separación clara frontend/backend.
