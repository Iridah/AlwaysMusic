// Definicion de conexiones a Postgre
const pool = new Pool({
    user: 'postgres', // Reemplaza con tu usuario de PostgreSQL
    password: 'password', // Reemplaza con tu contraseña de PostgreSQL
    database: 'gestion_estudiantes', // Reemplaza con el nombre de tu base de datos
    host: 'localhost', // Reemplaza con la dirección de tu servidor PostgreSQL
    port: 5432 // Reemplaza con el puerto de tu servidor PostgreSQL
  });
  
  module.exports = pool;