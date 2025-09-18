import { User, UserRol, UserHealthCondition } from '@models';
import bcrypt from 'bcrypt';
import { sequelize } from '@sequelize';
async function findUserByEmail(mail) {
    return await User.findOne({ where: { mail } });
}

async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

async function findRoleById(userRol) {
    return await UserRol.findOne({
        where: { idUserRol: userRol },
        attributes: ['userRol'],
    });
}

async function findUserById(idUser) {
    return await User.findOne({
        where: { idUser },
        attributes: ['idUser', 'userName', 'userRol'],
    });
}
// Crear un nuevo usuario
const createUser = async (userData) => {
    const t = await sequelize.transaction(); // Iniciar transacción

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { mail: userData.mail } });
        if (existingUser) {
            return { error: "El correo ya está registrado" };
        }

        // Hashear la contraseña antes de guardarla
        const formattedBirthDate = new Date(userData.birthDate);
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Crear el usuario con el rol por defecto en el backend (evita manipulación desde el front)
        const newUser = await User.create({
            userName: userData.userName,
            userSurname: userData.userSurname,
            mail: userData.mail,
            phone: userData.phone,
            userPass: hashedPassword,
            birthDate: formattedBirthDate,
            userRol: 2 // Asignamos siempre el rol de usuario normal
        }, { transaction: t });

        const userId = newUser.idUser;

        // 📌 Si el usuario seleccionó condiciones de salud, guardarlas
        const userHealthConditions = [];

        if (userData.healthConditions?.length > 0) {
            userData.healthConditions.forEach(conditionId => {
                userHealthConditions.push({
                    idUser: userId,
                    idHealthCondition: conditionId,
                    otherConditionDescription: null
                });
            });
        }

        if (userData.otherHealthCondition) {
            userHealthConditions.push({
                idUser: userId,
                idHealthCondition: 1, // ID de "Otra condición"
                otherConditionDescription: userData.otherHealthCondition
            });
        }

        // 📌 Guardar condiciones de salud solo si hay alguna
        if (userHealthConditions.length > 0) {
            await UserHealthCondition.bulkCreate(userHealthConditions, { transaction: t });
        }

        await t.commit(); // Confirmar transacción
        return newUser;

    } catch (error) {
        await t.rollback(); // Revertir cambios en caso de error
        console.error("Error al crear el usuario:", error);
        throw new Error("Error al crear el usuario");
    }
};

//chek email
const checkEmailExists = async (email) => {
    try {
        const user = await User.findOne({ where: { mail: email } });
        return user;  // Retorna el usuario si existe, o null si no
    } catch (error) {
        throw new Error("Error al verificar el correo");
    }
};
export default {
    findUserByEmail,
    verifyPassword,
    findRoleById,
    findUserById,
    createUser,
    checkEmailExists
};