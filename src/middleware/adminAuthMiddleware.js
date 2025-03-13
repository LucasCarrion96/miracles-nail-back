const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Modelo de usuario
const UserRol = require('../models/userRolModel'); // Modelo de roles

// Middleware para verificar si el usuario es administrador
const isAdmin = async (req, res, next) => {
    try {
        // Obtener el token desde la cookie HttpOnly
        const token = req.cookies.token; // Acceder directamente a la cookie 'token'
        console.log('Token recibido:', token);  // Agregar esto para verificar

        if (!token) {
            return res.status(401).json({ message: 'No estás autenticado' });
        }

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guardar la información del usuario en req.user

        // Buscar el usuario en la base de datos usando el idUser desde el token decodificado
        const user = await User.findOne({
            where: { idUser: req.user.idUser },
            attributes: ['idUser', 'userRol']
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Buscar el rol del usuario para verificar si es administrador
        const role = await UserRol.findOne({
            where: { idUserRol: user.userRol },
            attributes: ['userRol']
        });

        if (!role || role.userRol !== 'admin') {
            console.log('no es admin');
            return res.status(403).json({ message: 'No tienes permisos de administrador' });
        }

        next(); // Continuar con la siguiente función
    } catch (error) {
        console.error('Error al verificar si es admin:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

module.exports = isAdmin;