const express = require('express');
const router = express.Router();
const ExperienciaService = require('../service/experienciaService.js');
const ExperienciaController = require('../controller/experienciaController.js');
// const { verifyToken } = require('../middleware/authMiddleware.js'); // Descomentar si necesitas autenticación

const experienciaService = new ExperienciaService();
const experienciaController = new ExperienciaController(experienciaService);

/**
 * @swagger
 * /experiencias:
 *   post:
 *     summary: Crear un nueva experiencia
 *     description: Endpoint para crear una nueva experiencia en la aplicación.
 *     tags:
 *       - Experiencias
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
 *                 description: Título del experiencia
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la experiencia
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la experiencia
 *               usuario_id:
 *                 type: integer
 *                 example: 3
 *               proyecto_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Experiencia creada exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/', (req, res) => experienciaController.crearExperiencia(req, res));

/**
 * @swagger
 * /experiencias:
 *   get:
 *     summary: Obtener todas las experiencias
 *     description: Endpoint para obtener una lista de todas las experiencias.
 *     tags:
 *       - Experiencias
 *     responses:
 *       200:
 *         description: Lista de experiencias obtenida exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.get('/', (req, res) => experienciaController.obtenerExperiencias(req, res));

/**
 * @swagger
 * /experiencias/{id}:
 *   get:
 *     summary: Obtener una experiencia por ID
 *     description: Endpoint para obtener una experiencia específica por su ID.
 *     tags:
 *       - Experiencias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la experiencia
 *     responses:
 *       200:
 *         description: Experiencia obtenida exitosamente
 *       404:
 *         description: Experiencia no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', (req, res) => experienciaController.obtenerExperienciaPorId(req, res));

/**
 * @swagger
 * /experiencias/{id}:
 *   put:
 *     summary: Actualizar una experiencia
 *     description: Endpoint para actualizar una experiencia existente por su ID.
 *     tags:
 *       - Experiencias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la experiencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título de la experiencia
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la experiencia
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la experiencia
 *               usuario_id:
 *                 type: integer
 *                 example: 3
 *               proyecto_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Experiencia actualizada exitosamente
 *       404:
 *         description: Experiencia no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', (req, res) => experienciaController.actualizarExperiencia(req, res));

/**
 * @swagger
 * /experiencias/{id}:
 *   delete:
 *     summary: Eliminar una experiencia
 *     description: Endpoint para eliminar una experiencia por su ID.
 *     tags:
 *       - Experiencias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la experiencia    
 *     responses:
 *       200:
 *         description: Experiencia eliminada exitosamente
 *       404:
 *         description: Experiencia no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', (req, res) => experienciaController.eliminarExperiencia(req, res));

/**
 * @swagger
 * components:
 *   schemas:
 *     Experiencia:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la experiencia
 *         titulo:
 *           type: string
 *           description: Título de la experiencia
 *         descripcion:
 *           type: string
 *           description: Descripción de la experiencia
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de la experiencia
 *         usuario_id:
 *           type: integer
 *           example: 3
 *         proyecto_id:
 *           type: integer
 *           example: 2
 */

module.exports = router;
