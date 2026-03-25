const ClaseService = require('../service/claseService');
const claseService = new ClaseService();

class claseController {

  async crearClase(req, res) {
    try {
      const usuario = req.user;

      const response = await claseService.crearClase(
        req.body.nombre,
        usuario
      );

      if (response?.error) {
        return res.status(403).json(response);
      }

      res.status(201).json(response);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerClases(req, res) {
    try {
      const clases = await claseService.obtenerClases();
      res.json(clases);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async unirseClase(req, res) {
    try {
      const usuario_id = req.user.id;

      const response = await claseService.unirseClase(
        req.body.codigo,
        usuario_id
      );

      if (response?.error) {
        return res.status(400).json(response);
      }

      res.json(response);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerClasesProfesor(req, res) {
    try {
      const clases = await claseService.obtenerClasesProfesor(req.user.id);
      res.json(clases);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = new claseController();