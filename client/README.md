# Picture Storm Client


Frontend desarrollado en **React** y **Vite** con **TypeScript**, donde los usuarios pueden crear sus propias imagenes y modificarlas, además pueden guardar imagenes almacenadas en la base de datos o incluso buscar de manera externa.

## Requisitos

- **Node.js** (v14 o superior)
- **npm** (v6 o superior)

## Instalación

1. Clona el repositorio e ingresa al directorio del frontend:
   ```bash
   git clone https://github.com/gonzaviale/picture-storm.git
   cd client
   ```

2. Instala todas las dependencias necesarias:
   ```bash
   npm install
   ```

## Ejecución del Proyecto

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm run dev
```

El frontend se ejecutará en `http://localhost:5173` (o el que Vite asigne).

Asegúrate de que el backend esté corriendo en `http://localhost:3000`.

## Funcionalidades Principales

- **Registro de Usuario:** Permite a los usuarios crear una cuenta.
- **Inicio de Sesión:** Permite a los usuarios autenticarse.
- **Operaciones CRUD:** Crear, Leer, Actualizar y Eliminar imagenes.
- **Exploración de Imagenes:** Buscar y visualizar imagenes desde una API externa.

## Dependencias Utilizadas

- **React**: Biblioteca principal para la construcción de la interfaz de usuario.
- **TypeScript**: Superset de JavaScript para el tipado estático.
- **Vite**: Herramienta de desarrollo rápida para aplicaciones web modernas.
- **TailwindCSS**: Framework de CSS para estilos rápidos y responsivos.
- **axios**: Cliente HTTP para las solicitudes a la API del backend.
- **react-router-dom**: Biblioteca de enrutamiento para manejar la navegación.
- **SweetAlert2**: Biblioteca para mostrar alertas interactivas y modernas.
- **@heroicons-react**: Colección de iconos.
