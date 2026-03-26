const express = require('express');
const router = express.Router();
const ProyectoService = require('../service/proyectoService.js');
const ProyectoController = require('../controller/proyectoController.js');
const { verifyToken, requireRole } = require('../middleware/authMiddleware.js');

const proyectoService = new ProyectoService();
const proyectoController = new ProyectoController(proyectoService);

/**
 * @swagger
 * /proyectos:
 *   post:
 *     summary: Crear un nuevo proyecto
 *     description: Endpoint para crear un nuevo proyecto en la aplicación.
 *     tags:
 *       - Proyectos
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
 *                 description: Título del proyecto
 *               descripcion:
 *                 type: string
 *                 description: Descripción del proyecto
 *               usuario_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/', (req, res) => proyectoController.crearProyecto(req, res));

/**
 * @swagger
 * /proyectos:
 *   get:
 *     summary: Obtener todos los proyectos
 *     description: Endpoint para obtener una lista de todos los proyectos.
 *     tags:
 *       - Proyectos
 *     responses:
 *       200:
 *         description: Lista de proyectos obtenida exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.get('/', (req, res) => proyectoController.obtenerProyectos(req, res));

/**
 * @swagger
 * /proyectos/{id}:
 *   get:
 *     summary: Obtener un proyecto por ID
 *     description: Endpoint para obtener un proyecto específico por su ID.
 *     tags:
 *       - Proyectos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Proyecto obtenido exitosamente
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', (req, res) => proyectoController.obtenerProyectoPorId(req, res));

/**
 * @swagger
 * /proyectos/{id}:
 *   put:
 *     summary: Actualizar un proyecto
 *     description: Endpoint para actualizar un proyecto existente por su ID.
 *     tags:
 *       - Proyectos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proyecto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título del proyecto
 *               descripcion:
 *                 type: string
 *                 description: Descripción del proyecto
 *     responses:
 *       200:
 *         description: Proyecto actualizado exitosamente
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', (req, res) => proyectoController.actualizarProyecto(req, res));

/**
 * @swagger
 * /proyectos/{id}:
 *   delete:
 *     summary: Eliminar un proyecto
 *     description: Endpoint para eliminar un proyecto por su ID.
 *     tags:
 *       - Proyectos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Proyecto eliminado exitosamente
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', (req, res) => proyectoController.eliminarProyecto(req, res));

/**
 * @swagger
 * components:
 *   schemas:
 *     Proyecto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del proyecto
 *         titulo:
 *           type: string
 *           description: Título del proyecto
 *         descripcion:
 *           type: string
 *           description: Descripción del proyecto
 */

/**
 * @swagger
 * /proyectos/usuario:
 *   get:
 *     summary: Obtener proyectos del usuario
 *     description: Devuelve todos los proyectos creados por el usuario logueado.
 *     tags:
 *       - Proyectos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de proyectos del usuario
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.get('/usuario', verifyToken, requireRole('USER'), (req, res) => proyectoController.obtenerProyectosPorUsuario(req, res));

module.exports = router;
