# Picture Storm API

API backend desarrollada con **Node.js**, **Express**, **TypeScript**, y **MongoDB**, para Crear, Leer, Actualizar y Borrar imagenes.
También intengra servicio externo para incluir imagenes.

## Requisitos

- Node.js v14 o superior
- MongoDB
- Clave API de [Unsplash API](https://unsplash.com/developers) para obtener imagenes externas

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/gonzaviale/picture-storm.git
    cd api
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

    ```plaintext
    MONGO_URL=mongodb://localhost:27017/pictures
    UNSPLASH_API_KEY=<API-KEY>
    UNSPLASH_API="https://api.unsplash.com"
    JWT_SECRET=<JSON-WEB-TOKEN>
    PORT=3000
    ```

## Ejecución

### Modo de desarrollo

Para ejecutar en modo desarrollo con **nodemon**:

```bash
npm run dev
```

## Endpoints
La API expone los siguientes endpoints:

### Imagenes
- `POST /pictures`: Crea una nueva imagen.

- `GET /pictures`: Obtiene todas las imagenes.

- `GET /pictures/:id`: Obtiene una imagen específica por ID.

- `PUT /pictures/:id`: Actualiza una imagen existente.

- `DELETE /pictures/:id`: Elimina una imagen por ID.

- `GET /pictures/unsplash-service/search`: Busca imagenes externas usando Unsplash API.

- `POST /pictures/external`: Agrega una imagen desde un servicio externo.

### Usuarios
- `POST /users/register`: Registra un nuevo usuario.

- `POST /users/login`: Inicia sesión de un usuario.

- `GET /users/my-pictures`: Obtiene las imagenes del usuario autenticado.

- `GET /users/my-save-pictures`: Obtiene las imagenes favoritas del usuario autenticado.

- `POST /users/save`: Agrega una imagen a la lista de favoritos del usuario.

- `DELETE /users/delete-saved-picture`: Elimina una imagen de la lista de favoritos del usuario.

## Documentación de la API
La documentación de la API está disponible usando Swagger. Una vez que la aplicación esté en ejecución, accede a:

```plaintext
http://localhost:3000/api-docs
```

## Scripts
- `npm run dev`: Ejecuta el servidor en modo desarrollo con nodemon.

- `npm run build`: Compila el código TypeScript a JavaScript.

- `npm start`: Inicia el servidor con el código compilado.

## Tecnologías utilizadas
- Node.js: Entorno de ejecución para JavaScript en el servidor.

- Express: Framework de servidor web para Node.js.

- TypeScript: Superconjunto tipado de JavaScript.

- MongoDB: Base de datos NoSQL utilizada para almacenamiento de datos.

- Mongoose: ODM para MongoDB y Node.js.

- crypto-js: Biblioteca para encriptación y manejo seguro de contraseñas.

- Swagger: Herramienta para documentación de API.

- Unsplash API: Servicio externo para buscar imagenes.

### Cómo Usar Postman para Probar la API

1. **URL Base:**
   Utiliza `http://localhost:3000` como la URL base para todas las solicitudes mientras ejecutas tu servidor local.

2. **Solicitudes de Ejemplo:**

- **Registro de Usuario:**
  - Método: `POST`
  - URL: `http://localhost:3000/api/users/register`
  - Body (JSON):
    ```json
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "password123"
    }
    ```

- **Inicio de Sesión:**
  - Método: `POST`
  - URL: `http://localhost:3000/api/users/login`
  - Body (JSON):
    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```

- **Crear Imagen:**
  - Método: `POST`
  - URL: `http://localhost:3000/api/pictures`
  - Body (JSON):
    ```json
    {
        "description": "example",
        "altDescription": "example alternative",
        "color": "#592626",
        "image": "https://images.unsplash.com/photo-1682316953238-f1520b80618f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
    ```

### Autor
Gonzalo Viale
