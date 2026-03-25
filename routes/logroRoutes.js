const express = require('express');
const router = express.Router();
const LogroService = require('../service/logroService.js');
const LogroController = require('../controller/logroController.js');
// const { verifyToken } = require('../middleware/authMiddleware.js'); // Descomentar si necesitas autenticación

const logroService = new LogroService();
const logroController = new LogroController(logroService);

/**
 * @swagger
 * /logros:
 *   post:
 *     summary: Crear un nuevo logro
 *     description: Endpoint para crear un nuevo logro en la aplicación.
 *     tags:
 *       - Logros
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
 *                 description: Título del logro
 *               descripcion:
 *                 type: string
 *                 description: Descripción del logro
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha del logro
 *               tipo:
 *                 type: string
 *                 description: Tipo de logro(Academico','Extracurricular','Personal','Profesional')
 *               usuario_id:
 *                 type: integer
 *                 example: 3
 *               proyecto_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Logro creado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/', (req, res) => logroController.crearLogro(req, res));

/**
 * @swagger
 * /logros:
 *   get:
 *     summary: Obtener todos los logros
 *     description: Endpoint para obtener una lista de todos los logros.
 *     tags:
 *       - Logros
 *     responses:
 *       200:
 *         description: Lista de logros obtenida exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.get('/', (req, res) => logroController.obtenerLogros(req, res));

/**
 * @swagger
 * /logros/{id}:
 *   get:
 *     summary: Obtener un logro por ID
 *     description: Endpoint para obtener un logro específico por su ID.
 *     tags:
 *       - Logros
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del logro
 *     responses:
 *       200:
 *         description: Logro obtenido exitosamente
 *       404:
 *         description: Logro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', (req, res) => logroController.obtenerLogroPorId(req, res));

/**
 * @swagger
 * /logros/{id}:
 *   put:
 *     summary: Actualizar un logro
 *     description: Endpoint para actualizar un logro existente por su ID.
 *     tags:
 *       - Logros
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del logro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título del logro
 *               descripcion:
 *                 type: string
 *                 description: Descripción del logro
 *               fecha:
 *                 type: string
*                 format: date
*                 description: Fecha del logro
 *               tipo:
 *                 type: string
 *                 description: Tipo de logro(Academico','Extracurricular','Personal','Profesional')
 *               usuario_id:
 *                 type: integer
 *                 example: 3
 *               proyecto_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Logro actualizado exitosamente
 *       404:
 *         description: Logro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', (req, res) => logroController.actualizarLogro(req, res));

/**
 * @swagger
 * /logros/{id}:
 *   delete:
 *     summary: Eliminar un logro
 *     description: Endpoint para eliminar un logro por su ID.
 *     tags:
 *       - Logros
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del logro    
 *     responses:
 *       200:
 *         description: Logro eliminado exitosamente
 *       404:
 *         description: Logro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', (req, res) => logroController.eliminarLogro(req, res));

/**
 * @swagger
 * components:
 *   schemas:
 *     Logro:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del logro
 *         titulo:
 *           type: string
 *           description: Título del logro
 *         descripcion:
 *           type: string
 *           description: Descripción del logro
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha del logro
 *         tipo:
 *           type: string
 *           description: Tipo de logro(Academico','Extracurricular','Personal','Profesional')
 *         usuario_id:
 *           type: integer
 *           example: 3
 *         proyecto_id:
 *           type: integer
 *           example: 2
 */

module.exports = router;
