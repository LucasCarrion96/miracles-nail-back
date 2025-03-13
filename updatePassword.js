const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config(); // Si usas variables de entorno para la configuración de DB

// Configuración de la base de datos
const dbOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

// Crear la conexión con la base de datos MySQL
const connection = mysql.createConnection(dbOptions);

// Función para actualizar la contraseña
const updatePassword = async (userMail, newPassword) => {
    try {
        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña en la base de datos
        const query = 'UPDATE users SET userPass = ? WHERE mail = ?';
        connection.execute(query, [hashedPassword, userMail], (err, result) => {
            if (err) {
                console.error('Error al actualizar la contraseña:', err);
                return;
            }
            console.log('Contraseña actualizada correctamente para el usuario:', userMail);
            connection.end();
        });
    } catch (error) {
        console.error('Error al hashear la contraseña:', error);
    }
};

// Tomar los argumentos de la consola
const userMail = process.argv[2];  // El correo del usuario (primer argumento)
const newPassword = process.argv[3]; // La nueva contraseña (segundo argumento)

if (!userMail || !newPassword) {
    console.log('Por favor, ingresa un correo y una nueva contraseña.');
    process.exit(1);
}

// Llamar a la función
updatePassword(userMail, newPassword);
