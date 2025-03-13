const User = require('../models/userModel');
const Turns = require('../models/turnsModel');
const Course = require('../models/coursesModel');
const Service = require('../models/serviceModel');
const UserHealthCondition = require('../models/userHealthConditionModel');
const HealthCondition = require('../models/healthConditionModel');
const bcrypt = require("bcrypt");

// 1. Obtener perfil del usuario
const getUserProfile = async (id) => {
    try {
        // Obtén los datos básicos del usuario
        const user = await User.findOne({
            where: { idUser: id },
            attributes: ['idUser', 'userName', 'userSurname', 'mail', 'profilePicture', 'birthDate', 'phone',],
            include: [
                {
                    model: Course,
                    attributes: ['title', 'category', 'description', 'price', 'duration']
                },
                {
                    model: UserHealthCondition,
                    include: [
                        {
                            model: HealthCondition,
                            attributes: ['healthCondition']
                        }
                    ]
                },
            ]


        });

        if (!user) {
            return null;
        }

        // Obtén los turnos del usuario
        const turns = await Turns.findAll({
            where: { idUser: id },
            attributes: ['idTurns', 'turnDay', 'totalPrice', 'nailArtQuantity', 'caricatureQuantity', '3dQuantity'],
            include: [
                {
                    model: Service,
                    attributes: ['nameService'],
                },
                {
                    model: Service, // Relación con el servicio adicional
                    as: 'AdditionalService', // Alias para diferenciarlo
                    foreignKey: 'idServiceAdd', // La clave foránea en Turns
                    attributes: ['nameService'], // El nombre del servicio adicional
                }

            ]
        });


        return {
            user,
            turns,
        };
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        throw error;
    }
};



async function getUsersWithCourses(page, limit) {

    try {

        const offset = (page - 1) * limit;

        // Obtiene los turnos con límite y desplazamiento (offset)
        const { rows: users, count } = await User.findAndCountAll({
            include: [
                {
                    model: Course,
                    attributes: ['title']
                }
            ],
            limit,      // número de registros por página
            offset      // desplazamiento
        });

        return {
            users,
            totalPages: Math.ceil(count / limit) // calcula el total de páginas
        };
    } catch (error) {
        console.error('Error al obtener turnos:', error);
        throw new Error('Error al obtener turnos');
    }
}

async function getTotalUsers() {
    try {
        const totalUsers = await User.count();
        console.log('Total de usuarios:', totalUsers); // Log para depurar
        return totalUsers;
    } catch (error) {
        console.error('Error al obtener el total de usuarios:', error);
        throw new Error('Error al obtener el total de usuarios');
    }
}

// Crear un nuevo usuario
const createUser = async (userData) => {
    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { mail: userData.mail } });
        if (existingUser) {
            return { error: "El correo ya está registrado" };
        }

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Crear el usuario con el rol por defecto en el backend (evita manipulación desde el front)
        const newUser = await User.create({
            userName: userData.userName,
            userSurname: userData.userSurname,
            mail: userData.mail,
            phone: userData.phone,
            userPass: hashedPassword,
            userRol: 2 // Asignamos siempre el rol de usuario normal
        });

        return newUser;
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        throw new Error("Error al crear el usuario");
    }
};


const userQueries = {
    getUserProfile,
    getUsersWithCourses,
    getTotalUsers,
    createUser,
};


module.exports = {
    userQueries
};
