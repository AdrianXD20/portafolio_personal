class ExperienciaController {
  constructor(experienciaService) {
    this.experienciaService = experienciaService;
  }

  async crearExperiencia(req, res) {
    try {
      const nuevaExperiencia = req.body;
      const experiencia = await this.experienciaService.crearExperiencia(nuevaExperiencia);
      return res.status(201).json(experiencia);
    } catch (error) {
      console.error('Error creando nueva experiencia:', error);
      res.status(500).json({ message: 'Error al crear la experiencia', error: error.message });
    }
  }

  async obtenerExperiencias(req, res) {
    try {
      const experiencias = await this.experienciaService.obtenerExperiencias();
      res.status(200).json(experiencias);
    } catch (error) {
      console.error('Error al obtener experiencias:', error);
      res.status(500).json({ message: 'Error al obtener las experiencias', error: error.message });
    }
  }

  async obtenerExperienciaPorId(req, res) {
    try {
      const id = req.params.id;
      const experiencia = await this.experienciaService.obtenerExperienciaPorId(id);
      if (!experiencia) {
        return res.status(404).json({ message: 'Experiencia no encontrada' });
      }
      return res.status(200).json(experiencia);
    } catch (error) {
      console.error('Error al obtener experiencia por ID:', error);
      res.status(500).json({ message: 'Error al obtener la experiencia', error: error.message });
    }
  }

  async actualizarExperiencia(req, res) {
    try {
      const id = req.params.id;
      const datosActualizados = req.body;
      const experiencia = await this.experienciaService.actualizarExperiencia(id, datosActualizados);
      if (!experiencia) {
        return res.status(404).json({ message: 'Experiencia no encontrada' });
      }
      res.status(200).json(experiencia);
    } catch (error) {
      console.error('Error al actualizar experiencia:', error);
      res.status(500).json({ message: 'Error al actualizar la experiencia', error: error.message });
    }
  }

  async eliminarExperiencia(req, res) {
    try {
      const id = req.params.id;
      const resultado = await this.experienciaService.eliminarExperiencia(id);
      if (!resultado) {
        return res.status(404).json({ message: 'Experiencia no encontrada' });
      }
      res.status(200).json({ message: 'Experiencia eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar experiencia:', error);
      res.status(500).json({ message: 'Error al eliminar la experiencia', error: error.message });
    }
  }
}

module.exports = ExperienciaController;
