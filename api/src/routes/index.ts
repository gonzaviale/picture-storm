import { Router } from 'express';

import { registerUser } from '../controllers/userController/userRegisterController';
import { loginUser } from '../controllers/userController/userLoginController';
import { savePicture } from '../controllers/userController/userSavePictureController';
import { getPicturesByUser, getPicturesByUserSaved } from '../controllers/userController/userGetController';
import { removeSavedPicture } from '../controllers/userController/userDeleteController';

import { addPictureExternal, createPicture } from '../controllers/pictureController/pictureCreateController';
import { getPictures, getPictureById, searchPicturesByQuery } from '../controllers/pictureController/pictureGetController';
import { deletePicture } from '../controllers/pictureController/pictureDeleteController';
import { updatePicture } from '../controllers/pictureController/pictureUpdateController';

import { validateTokenHeader } from '../middleware/validateTokenHeader';
import { validateCreatePicture } from '../middleware/validateCreatePicture';

const router = Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Registra un nuevo usuario en la aplicación.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: string
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: Error en los datos de registro
 */
router.post('/users/register', registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     description: Permite a un usuario iniciar sesión.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *       400:
 *         description: Credenciales inválidas
 */
router.post('/users/login', loginUser);

/**
 * @swagger
 * /api/users/save:
 *   post:
 *     summary: Agrega una imagen a guardadas
 *     description: Agrega una imagen a la lista de guardadas del usuario.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pictureId:
 *                 type: string
 *                 description: ID de la imagen a agregar
 *     responses:
 *       200:
 *         description: Imagen guardada
 */
router.post('/users/save', validateTokenHeader, savePicture);

/**
 * @swagger
 * /api/users/my-pictures:
 *   get:
 *     summary: Obtiene las imagenes del usuario
 *     description: Recupera todas las imagenes creadas por el usuario autenticado.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         description: Número de página
 *     responses:
 *       200:
 *         description: Lista de imagenes del usuario
 */
router.get('/users/my-pictures', validateTokenHeader, getPicturesByUser);

/**
 * @swagger
 * /api/users/my-save-pictures:
 *   get:
 *     summary: Obtiene imagenes guardadas del usuario
 *     description: Recupera todas las imagenes que fueron agregadas a la seccion de guardadas por el usuario.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         description: Número de página
 *     responses:
 *       200:
 *         description: Lista de imagenes guardadas del usuario
 */
router.get('/users/my-save-pictures', validateTokenHeader, getPicturesByUserSaved);

/**
 * @swagger
 * /api/users/delete-saved-picture:
 *   delete:
 *     summary: Elimina una imagen de guardadas
 *     description: Elimina una imagen de la lista de guardadas del usuario.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pictureId:
 *                 type: string
 *                 description: ID de la imagen a eliminar
 *     responses:
 *       200:
 *         description: Imagen eliminada de guardadas
 */
router.delete('/users/delete-saved-picture', validateTokenHeader, removeSavedPicture);

/**
 * @swagger
 * /api/pictures/:
 *   post:
 *     summary: Crea una nueva imagen
 *     description: Crea una nueva imagen en la base de datos.
 *     tags:
 *       - Imagenes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Descripción de la imagen
 *               color:
 *                 type: string
 *                 description: Color de la imagen
 *               altDescription:
 *                 type: string
 *                 description: Descripción alternativa de la imagen
 *               image:
 *                 type: string
 *                 description: URL de la imagen
 *               likes:
 *                 type: number
 *                 description: likes de la imagen
 *     responses:
 *       201:
 *         description: Imagen creada exitosamente
 *       400:
 *         description: Datos de entrada no válidos
 */
router.post('/pictures/', validateTokenHeader, validateCreatePicture, createPicture);

/**
 * @swagger
 * /api/pictures/external:
 *   post:
 *     summary: Agrega una imagen desde un servicio externo
 *     description: Agrega una imagen a la base de datos utilizando los detalles obtenidos de un servicio externo.
 *     tags:
 *       - Imagenes Externas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: El ID de la imagen en el servicio externo
 *     responses:
 *       201:
 *         description: Imagen creada a partir del servicio externo
 */
router.post('/pictures/external', validateTokenHeader, addPictureExternal);

/**
 * @swagger
 * /api/pictures/{id}:
 *   put:
 *     summary: Actualiza una imagen
 *     description: Actualiza una imagen existente buscada por su ID.
 *     tags:
 *       - Imagenes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la imagen que se quiere actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Descripción de la imagen
 *               color:
 *                 type: string
 *                 description: Color de la imagen
 *               altDescription:
 *                 type: string
 *                 description: Descripción alternativa de la imagen
 *               image:
 *                 type: string
 *                 description: URL de la imagen
 *               likes:
 *                 type: number
 *                 description: likes de la imagen
 *     responses:
 *       200:
 *         description: Imagen actualizada exitosamente
 *       404:
 *         description: Imagen no encontrada
 */
router.put('/pictures/:id', validateTokenHeader, updatePicture);

/**
 * @swagger
 * /api/pictures/{id}:
 *   delete:
 *     summary: Elimina una imagen
 *     description: Elimina una imagen existente por su ID.
 *     tags:
 *       - Imagenes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la imagen que se quiere eliminar
 *     responses:
 *       200:
 *         description: Imagen eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Imagen eliminada exitosamente
 *       404:
 *         description: Imagen no encontrada
 */
router.delete('/pictures/:id', validateTokenHeader, deletePicture);

/**
 * @swagger
 * /api/pictures/:
 *   get:
 *     summary: Obtiene todas las imagenes
 *     description: Obtiene una lista de todas las imagenes almacenadas en la base de datos.
 *     tags:
 *       - Imagenes
 *     responses:
 *       200:
 *         description: Lista de imagenes
 */
router.get('/pictures/', getPictures);

/**
 * @swagger
 * /api/pictures/{id}:
 *   get:
 *     summary: Obtiene una imagen por ID
 *     description: Obtiene una sola imagen por ID.
 *     tags:
 *       - Imagenes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la imagen
 *     responses:
 *       200:
 *         description: Imagen encontrada
 *       404:
 *         description: Imagen no encontrada
 */
router.get('/pictures/:id', getPictureById);

/**
 * @swagger
 * /api/pictures/unsplash-service/search:
 *   get:
 *     summary: Busca imagenes externas
 *     description: Busca imagenes en un servicio externo utilizando un término de búsqueda.
 *     tags:
 *       - Imagenes Externas
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: El término de búsqueda para encontrar imagenes externas
 *     responses:
 *       200:
 *         description: Resultados de búsqueda de imagenes
 */
router.get('/pictures/unsplash-service/search', validateTokenHeader, searchPicturesByQuery);

export default router;