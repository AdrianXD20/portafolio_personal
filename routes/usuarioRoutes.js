const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const upload = require('../middleware/cloudinary').upload;

const UserService = require('../service/usuarioService.js');
const UserController = require('../controller/usuarioController.js');
const { verifyToken } = require('../middleware/authMiddleware.js');

const userService = new UserService();
const userController = new UserController(userService)

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario.
 *     description: Endpoint para registrar un nuevo usuario en la aplicación.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario (debe ser único)
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario (mínimo 6 caracteres)
 *               maticula:
 *                 type: string
 *                 description: Matrícula del estudiantes
 *               celular:
 *                 type: string
 *                 description: Número de celular del estudiante
 *               foto_perfil:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Descripción del error
 *       500:
 *         description: Error en el servidor
 */
router.post('/register',upload.single('foto_perfil'),(req,res) => userController.crearUsuario(req,res));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión un usuario.
 *     description: Endpoint para que un usuario inicie sesión y obtenga un token de autenticación.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contraseña
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo del usuario
 *               contraseña:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación JWT
 *       400:
 *         description: Error en las credenciales o en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post('/login',(req,res)=> userController.login(req,res));

/**
 * @swagger
 * /recuperar:
 *   post:
 *     summary: Solicitar recuperación de contraseña
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Correo enviado si existe el usuario
 */
  router.post('/recuperar', async (req, res) => {
    const { email } = req.body;
    const response = await userService.solicitarRecuperacion(email);
    res.json(response);
  });
/**
 * @swagger
 * /resetear:
 *   post:
 *     summary: Restablecer contraseña
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               nuevaContraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 */
 // Ruta para restablecer la contraseña
 router.post('/resetear', async (req, res) => {
    const { token, nuevaContraseña } = req.body;
    const response = await userService.resetearPassword(token, nuevaContraseña);
    res.json(response);
  });




  /**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del usuario
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         apellido:
 *           type: string
 *           description: Apellido del usuario
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *         contraseña:
 *           type: string
 *           description: Contraseña del usuario (encriptada)
 *         rol:
 *           type: string
 *           description: Rol del usuario (por defecto 'usuario')
 *         resetToken:
 *           type: string
 *           description: Token de reseteo de contraseña (opcional)
 *         imagen_perfil:
 *           type: string
 *           description: URL de la imagen de perfil del usuario
 *         direccion:
 *           type: string
 *           description: Poner donde vives
 *         telefono:
 *           type: string
 *           description: Tu fon apa
 *       example:
 *         id: 1
 *         nombre: "Juan"
 *         apellido: "Perez"
 *         email: "juan@example.com"
 *         contraseña: "$2b$10$abcde12345"
 *         rol: "usuario"
 *         resetToken: null
 *         imagen_perfil: "https://example.com/profile.jpg"
 *         direccion: calle 33 entre 34 y 36, col Cola de Tarzan
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de registros
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
  router.get('/usuarios',(req,res)=> userController.obtenerUsuario(req,res))

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 */
  router.get('/usuario/:id', (req,res)=> userController.obtenerUsuarioId(req,res))

/**
 * @swagger
 * /usuario/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               foto_perfil:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
  router.put('/usuario/:id', upload.single('imagen_perfil') , (req,res)=> userController.actualizarUsuario(req,res))
/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */
  router.delete('/usuario/:id', (req,res)=> userController.eliminarUsuario(req,res))
  
  module.exports = router;
