const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Obtener el token desde las cookies

    if (!token) {
        console.log('no hay token');
        return res.status(401).json({ message: 'No estás autenticado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Token inválido:', err);
            return res.status(403).json({ message: 'Token inválido' });
        }

        req.user = decoded; // Guardar los datos del usuario decodificados
        next();
    });
};

module.exports = verifyToken;