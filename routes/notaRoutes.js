const express = require('express');
const router = express.Router();
const NotaService = require('../service/notaService.js');
const NotaController = require('../controller/notaController.js');
// const { verifyToken } = require('../middleware/authMiddleware.js'); // Descomentar si necesitas autenticación

const notaService = new NotaService();
const notaController = new NotaController(notaService);

/**
 * @swagger
 * /notas:
 *   post:
 *     summary: Crear un nueva nota
 *     description: Endpoint para crear una nueva nota en la aplicación.
 *     tags:
 *       - Notas
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
 *                 description: Título de la nota
 *               contenido:
 *                 type: string
 *                 description: Contenido de la nota
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la nota
 *               usuario_id:
 *                 type: integer
 *                 example: 3
 *               proyecto_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Nota creada exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/', (req, res) => notaController.crearNota(req, res));

/**
 * @swagger
 * /notas:
 *   get:
 *     summary: Obtener todas las notas
 *     description: Endpoint para obtener una lista de todas las notas.
 *     tags:
 *       - Notas
 *     responses:
 *       200:
 *         description: Lista de notas obtenida exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.get('/', (req, res) => notaController.obtenerNotas(req, res));

/**
 * @swagger
 * /notas/{id}:
 *   get:
 *     summary: Obtener una nota por ID
 *     description: Endpoint para obtener una nota específica por su ID.
 *     tags:
 *       - Notas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la nota
 *     responses:
 *       200:
 *         description: Nota obtenida exitosamente
 *       404:
 *         description: Nota no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', (req, res) => notaController.obtenerNotaPorId(req, res));

/**
 * @swagger
 * /notas/{id}:
 *   put:
 *     summary: Actualizar una nota
 *     description: Endpoint para actualizar una nota existente por su ID.
 *     tags:
 *       - Notas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la nota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título de la nota
 *               contenido:
 *                 type: string
 *                 description: Contenido de la nota
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la nota
 *               usuario_id:
 *                 type: integer
 *                 example: 3
 *               proyecto_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Nota actualizada exitosamente
 *       404:
 *         description: Nota no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', (req, res) => notaController.actualizarNota(req, res));

/**
 * @swagger
 * /notas/{id}:
 *   delete:
 *     summary: Eliminar una nota
 *     description: Endpoint para eliminar una nota por su ID.
 *     tags:
 *       - Notas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la nota    
 *     responses:
 *       200:
 *         description: Nota eliminada exitosamente
 *       404:
 *         description: Nota no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', (req, res) => notaController.eliminarNota(req, res));

/**
 * @swagger
 * components:
 *   schemas:
 *     Nota:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la nota
 *         titulo:
 *           type: string
 *           description: Título de la nota
 *         contenido:
 *           type: string
 *           description: Contenido de la nota
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de la nota
 *         usuario_id:
 *           type: integer
 *           example: 3
 *         proyecto_id:
 *           type: integer
 *           example: 2
 */

module.exports = router;
