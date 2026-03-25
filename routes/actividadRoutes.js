const express = require('express');
const router = express.Router();
const ActividadService = require('../service/actividadService.js');
const ActividadController = require('../controller/actividadController.js');
// const { verifyToken } = require('../middleware/authMiddleware.js'); // Descomentar si necesitas autenticación

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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
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
 *               usuario_id:
 *                 type: integer
 *                 example: 3
 *               proyecto_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Actividad creada exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/', (req, res) => actividadController.crearActividad(req, res));

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
router.get('/:id', (req, res) => actividadController.obtenerActividadPorId(req, res));

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
 *     responses:
 *       200:
 *         description: Actividad actualizada exitosamente
 *       404:
 *         description: Actividad no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', (req, res) => actividadController.actualizarActividad(req, res));

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
router.delete('/:id', (req, res) => actividadController.eliminarActividad(req, res));

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
 */

module.exports = router;
