const express = require('express');
const router = express.Router();
const claseController = require('../controller/claseController');
const { verifyToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /clases:
 *   post:
 *     summary: Crear una clase (solo ADMIN)
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Clase creada correctamente
 *       403:
 *         description: No autorizado
 */
router.post('/', verifyToken, (req, res) =>
  claseController.crearClase(req, res)
);

/**
 * @swagger
 * /clases:
 *   get:
 *     summary: Obtener todas las clases
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clases
 */
router.get('/', verifyToken, (req, res) =>
  claseController.obtenerClases(req, res)
);

/**
 * @swagger
 * /clases/{id}/alumnos:
 *   get:
 *     summary: Obtener alumnos de una clase (solo profesor)
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la clase
 *     responses:
 *       200:
 *         description: Lista de alumnos
 *       403:
 *         description: No autorizado
 */
router.get('/:id/alumnos', verifyToken, (req, res) =>
  claseController.obtenerAlumnosDeClase(req, res)
);

/**
 * @swagger
 * /clases/unirse:
 *   post:
 *     summary: Unirse a una clase con código
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Te uniste correctamente
 *       400:
 *         description: Código inválido
 */
router.post('/unirse', verifyToken, (req, res) =>
  claseController.unirseClase(req, res)
);

/**
 * @swagger
 * /clases/profesor:
 *   get:
 *     summary: Obtener clases del profesor
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clases
 */
router.get('/profesor', verifyToken, (req, res) =>
  claseController.obtenerClasesProfesor(req, res)
);

module.exports = router;