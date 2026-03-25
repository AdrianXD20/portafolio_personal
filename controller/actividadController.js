class ActividadController {
  constructor(actividadService) {
    this.actividadService = actividadService;
  }

  // 🔥 CREAR (MEJORADO)
  async crearActividad(req, res) {
    try {
      const usuario_id = req.user.id;
      const nuevaActividad = req.body;

      const actividad = await this.actividadService.crearActividad(
        nuevaActividad,
        usuario_id
      );

      if (actividad?.error) {
        return res.status(403).json(actividad);
      }

      return res.status(201).json(actividad);

    } catch (error) {
      console.error('Error creando nueva actividad:', error);
      res.status(500).json({ message: 'Error al crear la actividad', error: error.message });
    }
  }

  // 🔥 OBTENER TODAS (igual)
  async obtenerActividades(req, res) {
    try {
      const actividades = await this.actividadService.obtenerActividades();
      res.status(200).json(actividades);
    } catch (error) {
      console.error('Error al obtener actividades:', error);
      res.status(500).json({ message: 'Error al obtener las actividades', error: error.message });
    }
  }

  // 🔥 OBTENER POR ID (igual)
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

  // 🔥 NUEVO: POR CLASE
  async obtenerPorClase(req, res) {
    try {
      const { clase_id } = req.params;
      const usuario_id = req.user.id;

      const response = await this.actividadService.obtenerActividadesPorClase(
        clase_id,
        usuario_id
      );

      if (response?.error) {
        return res.status(403).json(response);
      }

      res.status(200).json(response);

    } catch (error) {
      console.error('Error al obtener actividades por clase:', error);
      res.status(500).json({ message: 'Error al obtener actividades por clase', error: error.message });
    }
  }

  // 🔥 NUEVO: POR PROYECTO
  async obtenerPorProyecto(req, res) {
    try {
      const { proyecto_id } = req.params;
      const usuario_id = req.user.id;

      const response = await this.actividadService.obtenerActividadesPorProyecto(
        proyecto_id,
        usuario_id
      );

      if (response?.error) {
        return res.status(403).json(response);
      }

      res.status(200).json(response);

    } catch (error) {
      console.error('Error al obtener actividades por proyecto:', error);
      res.status(500).json({ message: 'Error al obtener actividades por proyecto', error: error.message });
    }
  }

  // 🔥 NUEVO: PERSONALES
  async obtenerPersonales(req, res) {
    try {
      const usuario_id = req.user.id;

      const actividades = await this.actividadService.obtenerActividadesPersonales(usuario_id);

      res.status(200).json(actividades);

    } catch (error) {
      console.error('Error al obtener actividades personales:', error);
      res.status(500).json({ message: 'Error al obtener actividades personales', error: error.message });
    }
  }

  // 🔥 ACTUALIZAR (MEJORADO)
  async actualizarActividad(req, res) {
    try {
      const id = req.params.id;
      const datosActualizados = req.body;
      const usuario_id = req.user.id;

      const actividad = await this.actividadService.actualizarActividad(
        id,
        datosActualizados,
        usuario_id
      );

      if (!actividad) {
        return res.status(404).json({ message: 'Actividad no encontrada' });
      }

      if (actividad?.error) {
        return res.status(403).json(actividad);
      }

      res.status(200).json(actividad);

    } catch (error) {
      console.error('Error al actualizar actividad:', error);
      res.status(500).json({ message: 'Error al actualizar la actividad', error: error.message });
    }
  }

  // 🔥 ELIMINAR (MEJORADO)
  async eliminarActividad(req, res) {
    try {
      const id = req.params.id;
      const usuario_id = req.user.id;

      const resultado = await this.actividadService.eliminarActividad(id, usuario_id);

      if (!resultado) {
        return res.status(404).json({ message: 'Actividad no encontrada' });
      }

      if (resultado?.error) {
        return res.status(403).json(resultado);
      }

      res.status(200).json({ message: 'Actividad eliminada exitosamente' });

    } catch (error) {
      console.error('Error al eliminar actividad:', error);
      res.status(500).json({ message: 'Error al eliminar la actividad', error: error.message });
    }
  }
}

module.exports = ActividadController;