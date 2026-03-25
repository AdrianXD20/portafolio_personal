class ActividadController {
  constructor(actividadService) {
    this.actividadService = actividadService;
  }

  async crearActividad(req, res) {
    try {
      const nuevaActividad = req.body;
      const actividad = await this.actividadService.crearActividad(nuevaActividad);
      return res.status(201).json(actividad);
    } catch (error) {
      console.error('Error creando nueva actividad:', error);
      res.status(500).json({ message: 'Error al crear la actividad', error: error.message });
    }
  }

  async obtenerActividades(req, res) {
    try {
      const actividades = await this.actividadService.obtenerActividades();
      res.status(200).json(actividades);
    } catch (error) {
      console.error('Error al obtener actividades:', error);
      res.status(500).json({ message: 'Error al obtener las actividades', error: error.message });
    }
  }

  async obtenerActividadPorId(req, res) {
    try {
      const id = req.params.id;
      const actividad = await this.actividadService.obtenerActividadPorId(id);
      if (!actividad) {
        return res.status(404).json({ message: 'Actividad no encontrada' });
      }
      return res.status(200).json(actividad);
    } catch (error) {
      console.error('Error al obtener actividad por ID:', error);
      res.status(500).json({ message: 'Error al obtener la actividad', error: error.message });
    }
  }

  async actualizarActividad(req, res) {
    try {
      const id = req.params.id;
      const datosActualizados = req.body;
      const actividad = await this.actividadService.actualizarActividad(id, datosActualizados);
      if (!actividad) {
        return res.status(404).json({ message: 'Actividad no encontrada' });
      }
      res.status(200).json(actividad);
    } catch (error) {
      console.error('Error al actualizar actividad:', error);
      res.status(500).json({ message: 'Error al actualizar la actividad', error: error.message });
    }
  }

  async eliminarActividad(req, res) {
    try {
      const id = req.params.id;
      const resultado = await this.actividadService.eliminarActividad(id);
      if (!resultado) {
        return res.status(404).json({ message: 'Actividad no encontrada' });
      }
      res.status(200).json({ message: 'Actividad eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar actividad:', error);
      res.status(500).json({ message: 'Error al eliminar la actividad', error: error.message });
    }
  }
}

module.exports = ActividadController;
