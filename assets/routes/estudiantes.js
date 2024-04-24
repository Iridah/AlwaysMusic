// Definicion de Modulos
const Estudiante = require('../models/estudiante');
const pool = require('../config/db');


// Funcion 'Crear'
const crearEstudiante = async (req, res) => {
    // 1. Obtener datos del cuerpo de la solicitud
    const { rut, nombre, curso, nivel} = req.body;
  
    // 2. Crear una nueva instancia de Estudiante
    const nuevoEstudiante = new Estudiante(rut, nombre, curso, nivel);
  
    // 3. Preparar la consulta SQL para insertar el estudiante
    const query = `INSERT INTO estudiantes (rut, nombre, curso, nivel) VALUES ($1, $2, $3, $4)`;
  
    // 4. Definir los valores para la consulta
    const values = [nuevoEstudiante.rut, nuevoEstudiante.nombre, nuevoEstudiante.curso, nuevoEstudiante.nivel];
  
    // 5. Ejecutar la consulta SQL utilizando el pool de conexiones
    try {
      await pool.query(query, values);
  
      // 6. Enviar una respuesta exitosa
      res.status(201).json({ message: 'Estudiante creado exitosamente' });
    } catch (error) {
      // 7. Manejar errores de la base de datos
      console.error(chalk.red('Error al crear estudiante:', error));
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

// Funcion 'Obtener'
const obtenerEstudiantes = async (req, res) => {
    // 1. Preparar la consulta SQL para seleccionar todos los estudiantes
    const query = 'SELECT * FROM estudiantes';
  
    // 2. Ejecutar la consulta SQL utilizando el pool de conexiones
    try {
      const result = await pool.query(query);
  
      // 3. Obtener los estudiantes del resultado de la consulta
      const estudiantes = result.rows;
  
      // 4. Enviar una respuesta con la lista de estudiantes
      res.status(200).json(estudiantes);
    } catch (error) {
      // 5. Manejar errores de la base de datos
      console.error(chalk.red('Error al obtener estudiantes:', error));
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  
// Funcion 'Obtener-xrut'
const obtenerEstudiantePorRut = async (req, res) => {
    // 1. Obtener el rut del estudiante de los parámetros de la ruta
    const { rut } = req.params;
  
    // 2. Preparar la consulta SQL para seleccionar el estudiante por rut
    const query = `SELECT * FROM estudiantes WHERE rut = $1`;
  
    // 3. Ejecutar la consulta SQL utilizando el pool de conexiones
    try {
        const result = await pool.query(query, [rut]);
        const estudiante = result.rows[0];
    
        if (estudiante) {
        // 4. Enviar una respuesta con el estudiante encontrado
        res.status(200).json(estudiante);
        } else {
        // 5. Enviar una respuesta indicando que el estudiante no se encontró
        res.status(404).json({ message: 'Estudiante no encontrado' });
        }
    } catch (error) {
        // 6. Manejar errores de la base de datos
        console.error(chalk.red('Error al obtener estudiante por rut:', error));
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}


// Funcion 'Actualizar'
const actualizarEstudiante = async (req, res) => {
    // 1. Obtener datos del cuerpo de la solicitud
    const { rut, nombre, curso, nivel } = req.body;
  
    // 2. Preparar la consulta SQL para actualizar el estudiante
    const query = `UPDATE estudiantes SET nombre = $1, apellido = $2, carrera = $3 WHERE rut = $4`;
  
    // 3. Definir los valores para la consulta
    const values = [rut, nombre, curso, nivel];
  
    // 4. Ejecutar la consulta SQL utilizando el pool de conexiones
    try {
      await pool.query(query, values);
  
      // 5. Enviar una respuesta de éxito
      res.status(200).json({ message: 'Estudiante actualizado exitosamente' });
    } catch (error) {
      // 6. Manejar errores de la base de datos
      console.error(chalk.red('Error al actualizar estudiante:', error));
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  
// Funcion 'Eliminar'
  const eliminarEstudiante = async (req, res) => {
    // 1. Obtener el rut del estudiante de los parámetros de la ruta
    const { rut } = req.params;
  
    // 2. Preparar la consulta SQL para eliminar el estudiante
    const query = `DELETE FROM estudiantes WHERE rut = $1`;
  
    // 3. Definir los valores para la consulta
    const values = [rut];
  
    // 4. Ejecutar la consulta SQL utilizando el pool de conexiones
    try {
      await pool.query(query, values);
  
      // 5. Enviar una respuesta de éxito
      res.status(200).json({ message: 'Estudiante eliminado exitosamente' });
    } catch (error) {
      // 6. Manejar errores de la base de datos
      console.error(chalk.red('Error al eliminar estudiante:', error));
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

// Definicion de rutas
app.put('/estudiantes/:rut', actualizarEstudiante);
app.delete('/estudiantes/:rut', eliminarEstudiante);