import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, UserRol } from '@models';
import authQueries from '../queries/authQueries';

const login = async (req, res) => {
    const { mail, password } = req.body;

    if (!mail || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    try {
        const user = await User.findOne({ where: { mail } });

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const match = await bcrypt.compare(password, user.userPass);

        if (!match) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const role = await UserRol.findOne({
            where: { idUserRol: user.userRol },
            attributes: ['userRol'],
        });

        const token = jwt.sign(
            { idUser: user.idUser, userRol: user.userRol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'Strict',
        });

        return res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: {
                idUser: user.idUser,
                name: user.userName,
                surname: user.userSurname,
                role: role ? role.userRol : 'Usuario sin rol',
            },
        });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        return res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
};

const checkSession = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(200).json({ loggedIn: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            where: { idUser: decoded.idUser },
            attributes: ['idUser', 'userName', 'userRol'],
        });

        if (!user) {
            return res.status(404).json({ loggedIn: false, message: 'Usuario no encontrado' });
        }

        const role = await UserRol.findOne({
            where: { idUserRol: user.userRol },
            attributes: ['userRol'],
        });

        return res.status(200).json({
            loggedIn: true,
            user: {
                idUser: user.idUser,
                name: user.userName,
                role: role ? role.userRol : 'Usuario sin rol',
            },
        });
    } catch (error) {
        console.error('Error al verificar token:', error);
        return res.status(401).json({ loggedIn: false, message: 'Token inválido o expirado' });
    }
};

const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    });
    return res.status(200).json({ message: 'Sesión cerrada exitosamente' });
};
const createUser = async (req, res) => {
    console.log("datos recibidos en el backend", req.body);

    try {
        const newUser = await authQueries.createUser(req.body);

        if (newUser.error) {
            return res.status(400).json({ message: newUser.error });
        }

        res.status(201).json({ message: "Usuario creado exitosamente", user: newUser.idUser });

    } catch (error) {
        console.error("Error en el controlador al crear el usuario:", error);
        res.status(500).json({ message: "Error al crear el usuario" });
    }
};

//check email
const checkEmailExists = async (req, res) => {
    const { email } = req.query;

    try {
        // Llamamos a la consulta de la base de datos
        const user = await authQueries.checkEmailExists(email);

        if (user) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        res.status(200).json({ message: "El correo está disponible" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al verificar el correo" });
    }
};





export default { login, checkSession, logout, createUser, checkEmailExists };
