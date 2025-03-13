const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Usamos cookies para almacenar el token

    if (!token) {
        return res.status(401).json({ message: 'No autorizado. Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decodificado:', decoded); // Aquí puedes ver qué datos contiene el token

        // Añadimos los datos del usuario al objeto req
        req.user = {
            id: decoded.idUser, // Asegúrate de que el campo sea el correcto
            role: decoded.userRol, // Similar al anterior
        };

        next(); // Continua con la siguiente función
    } catch (error) {
        console.error('Error al verificar el token:', error.message);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado. Inicia sesión nuevamente.' });
        }

        return res.status(401).json({ message: 'Token inválido.' });
    }
};

module.exports = authMiddleware;