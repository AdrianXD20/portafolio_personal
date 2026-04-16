const express = require('express');
const router = express.Router();
const ActividadService = require('../service/actividadService.js');
const ActividadController = require('../controller/actividadController.js');
const { verifyToken, requireRole } = require('../middleware/authMiddleware.js');

const actividadService = new ActividadService();
const actividadController = new ActividadController(actividadService);

/**
 * @swagger
 * /actividades:
 *   post:
 *     summary: Crear una nueva actividad
 *     description: Endpoint para crear una nueva actividad en la aplicación.
 *     tags:
 *       - Actividades
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - proyecto_id
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título del actividad
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la actividad
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la actividad
 *               estado:
 *                 type: string
 *                 description: Estado de la actividad('Completado','En progreso','Planeado')
 *               proyecto_id:
 *                 type: integer
 *                 example: 2
 *               clase_id:
 *                 type: integer
 *                 example: 1
 *                 description: ID de la clase (opcional)
 *     responses:
 *       201:
 *         description: Actividad creada exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/', verifyToken, requireRole('USER'), (req, res) => actividadController.crearActividad(req, res));

/**
 * @swagger
 * /actividades:
 *   get:
 *     summary: Obtener todas las actividades
 *     description: Endpoint para obtener una lista de todas las actividades.
 *     tags:
 *       - Actividades
 *     responses:
 *       200:
 *         description: Lista de actividades obtenida exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.get('/', (req, res) => actividadController.obtenerActividades(req, res));



/**
 * @swagger
 * /actividades/{id}:
 *   put:
 *     summary: Actualizar una actividad
 *     description: Endpoint para actualizar una actividad existente por su ID.
 *     tags:
 *       - Actividades
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la actividad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título de la actividad
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la actividad
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la actividad
 *               estado:
 *                 type: string
 *                 description: Estado de la actividad('Completado','En progreso','Planeado')
 *               usuario_id:
 *                 type: integer
 *                 example: 3
 *               proyecto_id:
 *                 type: integer
 *                 example: 2
 *               clase_id:
 *                 type: integer
 *                 example: 1
 *                 description: ID de la clase (opcional)
 *     responses:
 *       200:
 *         description: Actividad actualizada exitosamente
 *       404:
 *         description: Actividad no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', verifyToken, requireRole('USER'), (req, res) => actividadController.actualizarActividad(req, res));

/**
 * @swagger
 * /actividades/{id}:
 *   delete:
 *     summary: Eliminar una actividad
 *     description: Endpoint para eliminar una actividad por su ID.
 *     tags:
 *       - Actividades
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la actividad    
 *     responses:
 *       200:
 *         description: Actividad eliminada exitosamente
 *       404:
 *         description: Actividad no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', verifyToken, requireRole('USER'), (req, res) => actividadController.eliminarActividad(req, res));

/**
 * @swagger
 * components:
 *   schemas:
 *     Actividad:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la actividad
 *         titulo:
 *           type: string
 *           description: Título de la actividad
 *         descripcion:
 *           type: string
 *           description: Descripción de la actividad
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de la actividad
 *         estado:
 *           type: string
 *           description: Estado de la actividad('Completado','En progreso','Planeado')
 *         usuario_id:
 *           type: integer
 *           example: 3
 *         proyecto_id:
 *           type: integer
 *           example: 2
 *         clase_id:
 *           type: integer
 *           example: 1
 *           description: ID de la clase (opcional)
 */

/**
 * @swagger
 * /actividades/clase/{clase_id}:
 *   get:
 *     summary: Obtener actividades por clase
 *     description: Devuelve todas las actividades de una clase específica (solo si el usuario pertenece a ella).
 *     tags:
 *       - Actividades
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clase_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la clase
 *     responses:
 *       200:
 *         description: Lista de actividades de la clase
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.get('/clase/:clase_id', verifyToken, (req, res) => actividadController.obtenerPorClase(req, res));

/**
 * @swagger
 * /actividades/proyecto/{proyecto_id}:
 *   get:
 *     summary: Obtener actividades por proyecto
 *     description: Devuelve todas las actividades asociadas a un proyecto del usuario.
 *     tags:
 *       - Actividades
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: proyecto_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Lista de actividades del proyecto
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.get('/proyecto/:proyecto_id', verifyToken, (req, res) => actividadController.obtenerPorProyecto(req, res));

/**
 * @swagger
 * /actividades/personales:
 *   get:
 *     summary: Obtener actividades personales
 *     description: Devuelve todas las actividades del usuario que no están asociadas a ninguna clase.
 *     tags:
 *       - Actividades
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de actividades personales
 *       500:
 *         description: Error en el servidor
 */
router.get('/personales', verifyToken, (req, res) => actividadController.obtenerPersonales(req, res));

/**
 * @swagger
 * /actividades/mis:
 *   get:
 *     summary: Obtener todas las actividades del usuario
 *     description: Devuelve todas las actividades creadas por el usuario logueado (personales, de clases y proyectos).
 *     tags:
 *       - Actividades
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las actividades del usuario
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.get('/mis', verifyToken, requireRole('USER'), (req, res) => actividadController.obtenerMisActividades(req, res));

/**
 * @swagger
 * /actividades/{id}:
 *   get:
 *     summary: Obtener una actividad por ID
 *     description: Endpoint para obtener una actividad específica por su ID.
 *     tags:
 *       - Actividades
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la actividad
 *     responses:
 *       200:
 *         description: Actividad obtenida exitosamente
 *       404:
 *         description: Actividad no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', verifyToken, requireRole('USER'), (req, res) => actividadController.obtenerActividadPorId(req, res));

module.exports = router;
