# Project Map - Joyeria E-commerce

## 1. Vision general

Aplicacion e-commerce de joyeria dividida en frontend y backend, conectados por API REST.

Objetivo actual:
- listar productos
- ver detalle de producto
- crear, actualizar y borrar productos
- subir imagenes y asignar imagen principal

Objetivo futuro:
- carrito
- checkout
- autenticacion de usuarios

---

## 2. Estructura real del repo

```
e-commerce/
  apps/
    backend/
      src/
        app.js
        server.js
        config/
        middlewares/
        modules/
          product/
    frontend/
      src/
        app/
        components/
        features/
          products/
        styles/
  PROJECT_MAP.md
  README.md
```

---

## 3. Stack tecnologico

### Frontend
- React
- TypeScript
- Vite
- react-router-dom
- CSS global

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- Zod
- Multer (subida de archivos)

---

## 4. Arquitectura general

Frontend (React + Router)
-> Service layer (fetch API)
-> Express API
-> Controllers
-> Services
-> Mongoose Models
-> MongoDB

---

## 5. Dominio principal: Products

Responsabilidades del modulo `product`:
- crear productos con variantes
- calcular `basePrice` y `totalStock`
- listar productos con paginacion y filtros basicos
- obtener detalle por id
- actualizar y eliminar productos
- gestionar imagenes del producto

---

## 6. Modelo de datos (Product)

Campos principales:
- `name`
- `slug` (generado en backend)
- `description`
- `mainImage`
- `images` (array de objetos `{ url, alt }`)
- `basePrice` (derivado de variantes)
- `totalStock` (derivado de variantes)
- `variants` (sku, price, stock, attributes)
- `createdAt`, `updatedAt`

`inStock` se deriva de `totalStock > 0` en los DTOs.

---

## 7. Endpoints actuales (Backend)

Base: `/api/products`

- `GET /api/products`
  - listado paginado
  - query params: `page`, `limit`, `search`, `material`

- `GET /api/products/:id`
  - detalle de producto por ObjectId

- `POST /api/products`
  - crear producto

- `PATCH /api/products/:id`
  - actualizacion parcial

- `DELETE /api/products/:id`
  - borrar producto

- `POST /api/products/:id/images`
  - subir imagen (multipart/form-data, campo `image`)

- `PATCH /api/products/:id/main-image`
  - cambiar imagen principal

Endpoint adicional:
- `GET /health`

---

## 8. Frontend actual

Estructura relevante:
- `src/app` (entrada y rutas)
- `src/components/layout` (layout global)
- `src/features/products`
  - `pages/HomePage.tsx`
  - `pages/ProductPage.tsx`
  - `components/ProductCard.tsx`
  - `services/product.service.ts`
  - `types/product.ts`

Estado:
- HomePage implementada
- ProductPage implementada
- consumo de API para listado y detalle implementado

---

## 9. Consistencia de rutas

Rutas de detalle unificadas a `id` en frontend y backend:
- Frontend: `/products/:id`
- Backend: `GET /api/products/:id`

---

## 10. Estado actual del proyecto

### Backend
Completado:
- conexion MongoDB
- modulo Product con arquitectura controller/service/model/schema/dto
- CRUD principal (excepto auth)
- validaciones con Zod
- subida de imagenes
- endpoint healthcheck

Pendiente:
- filtros avanzados
- paginacion mejorada
- estandarizar formato de `images` entre modelo y controlador

### Frontend
Completado:
- React + Vite + TypeScript
- rutas principales
- HomePage y ProductPage
- ProductCard
- conexion inicial con API

Pendiente:
- filtros en UI
- paginacion en UI
- carrito

---

## 11. Proximas funcionalidades

### Carrito
- CartContext
- CartPage
- CartItem

### Checkout
1. carrito
2. direccion
3. pago
4. confirmacion

### Autenticacion
- login
- registro
- historial de pedidos

---

## 12. Flujo de datos (Product listing)

1. Usuario entra en HomePage
2. React ejecuta getProducts()
3. product.service.ts llama a GET /api/products
4. Express recibe la request
5. product.controller llama a product.service
6. product.service consulta Product model
7. Mongoose consulta MongoDB
8. MongoDB devuelve datos
9. Controller transforma DTO
10. API responde JSON
11. React actualiza estado
12. ProductCard renderiza productos

Commits:
- Conventional Commits

Branching:
- main
- develop
- feature/*

Arquitectura backend:
controller → service → model

Arquitectura frontend:
pages → components → services → types

---

## 13. Objetivo del proyecto

Construir un e-commerce completo de joyeria que demuestre:
- arquitectura mantenible
- frontend moderno
- backend escalable
- buenas practicas de desarrollo
