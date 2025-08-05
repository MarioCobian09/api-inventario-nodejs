# API de Gestión de Inventario

API RESTful para un sistema de gestión de inventario. Desarrollada con Node.js, Express, TypeScript y TypeORM. Incluye autenticación JWT, roles de administrador y control de stock.

## ✨ Características

* **Autenticación JWT:** Endpoints protegidos para garantizar la seguridad.
* **Gestión de Roles:** Rutas exclusivas para usuarios administradores (CRUD de usuarios).
* **CRUD Completo:** Operaciones de Crear, Leer, Actualizar y Eliminar para:
    * Usuarios.
    * Productos.
    * Categorías.
* **Gestión de Stock:** Endpoints dedicados para registrar entradas y salidas de inventario.
* **Historial de Movimientos:** Cada entrada y salida de stock se registra para una auditoría completa.
* **Búsqueda y Filtros:** Endpoint para buscar productos por nombre/descripción o filtrarlos por categoría.
* **Validación de Datos:** Uso de `class-validator` y `express-validator` para asegurar la integridad de los datos de entrada.

## 🛠️ Tecnologías Utilizadas

* **Backend:** Node.js, Express, TypeScript
* **Base de Datos:** MySQL
* **ORM:** TypeORM
* **Autenticación:** JWT (jsonwebtoken), bcrypt
* **Validación:** class-validator, express-validator
* **Variables de Entorno:** dotenv

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para configurar y correr el proyecto en tu entorno local.

### **Pre-requisitos**

* Node.js (v18 o superior)
* Un servidor de base de datos MySQL

### **Pasos**

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/mariocobian09/api-inventario-nodejs.git](https://github.com/mariocobian09/api-inventario-nodejs.git)
    cd api-inventario-nodejs
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar las variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto. Puedes usar el siguiente como plantilla:
    ```.env
    # Base de Datos
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASS=tu_contraseña_de_mysql
    DB_NAME=inventario_db

    # JWT
    JWT_SECRET=tu_clave_secreta_para_jwt

    # Puerto del servidor
    PORT=5000
    ```

4.  **Iniciar la base de datos:**
    Asegúrate de que tu servidor MySQL esté corriendo y que la base de datos `inventario_db` exista. TypeORM la sincronizará automáticamente gracias a `synchronize: true`.

5.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La API estará disponible en `http://localhost:5000`.

## 📁 Estructura del Proyecto

El proyecto sigue una arquitectura orientada a servicios, separando las responsabilidades en capas:

```text
src/
├── config/         # Conexión a la BD y otras configuraciones.
├── controllers/    # Manejan las peticiones y respuestas HTTP.
├── middlewares/    # Funciones intermedias (autenticación, validación).
├── models/         # Entidades de TypeORM que definen las tablas de la BD.
├── repositories/   # Abstracción para el acceso directo a la base de datos.
├── routes/         # Definición de los endpoints de la API.
├── schemas/        # DTOs (Data Transfer Objects) con reglas de validación.
├── services/       # Contienen la lógica de negocio principal.
└── utils/          # Funciones de utilidad (JWT, hashing de contraseñas).
```

## 🌐 Endpoints de la API

La base de la URL es `/api`.

### Autenticación (`/auth`)

* `POST /create-user`: Registro de un nuevo usuario.
* `POST /login`: Inicio de sesión, devuelve un token JWT.

_El resto de las rutas requieren un token de autenticación._

### Usuarios (`/user`) - *Rutas de Administrador*

* `GET /get-all`: Obtiene todos los usuarios.
* `GET /:userId`: Obtiene un usuario por ID.
* `PATCH /:id`: Actualiza un usuario.
* `PATCH /:id/role`: Cambia el rol de un usuario.
* `DELETE /:id`: Elimina un usuario.

### Categorías (`/category`)

* `POST /`: Crea una nueva categoría.
* `GET /`: Obtiene todas las categorías.
* ... y el resto de operaciones CRUD.

### Productos (`/product`)

* `POST /`: Crea un nuevo producto.
* `GET /`: Obtiene los productos, con opción de búsqueda (`?search=...`) y filtro (`?category=...`).
* `POST /:id/add`: Añade stock a un producto.
* `POST /:id/remove`: Retira stock de un producto.
* `GET /:id/movements`: Obtiene el historial de movimientos de un producto.
* ... y el resto de operaciones CRUD para productos.

## ✒️ Autor

**Mario Geovani Cobian Ayala**
