const { userQueries } = require('../queries/usersQueries');

const getUserProfile = async (req, res) => {
    // Acceder al ID del usuario desde req.user, que fue asignado por el authMiddleware
    const idUser = req.user?.id;  // Aquí tomamos el ID del usuario decodificado del token
    console.log(idUser);  // Puedes ver el valor del ID en la consola

    if (!idUser) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    try {
        const profile = await userQueries.getUserProfile(idUser);

        if (!profile) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(profile);  // Devolvemos la información del perfil al cliente
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
    }
};

const getUsersWithPagination = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;     // Página actual, por defecto 1
    const limit = parseInt(req.query.limit, 10) || 10;  // Límite de elementos por página, por defecto 10
    try {
        const { users, totalPages } = await userQueries.getUsersWithCourses(page, limit);
        res.json({ users, totalPages });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

const createUser = async (req, res) => {
    console.log("datos recibidos en el backend", req.body);

    try {
        const newUser = await userQueries.createUser(req.body);

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
        const user = await userQueries.checkEmailExists(email);

        if (user) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        res.status(200).json({ message: "El correo está disponible" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al verificar el correo" });
    }
};

const userControllers = {
    checkEmailExists,
    getUsersWithPagination,
    getUserProfile,
    createUser

};

module.exports = {
    userControllers
};