import turnsQueries from '../queries/turnsQueries';
import { Turns } from '@models';
import CrudController from '@crudController';

const crudController = new CrudController(Turns);

const getAllTurns = async (req, res) => {
    const idUser = req.user;
    console.log('este es el req user', idUser)
    const page = parseInt(req.query.page, 10) || 1;     // Página actual, por defecto 1
    const limit = parseInt(req.query.limit, 10) || 10;  // Límite de elementos por página, por defecto 10

    try {
        const { turns, totalPages } = await turnsQueries.getTurns(page, limit);
        res.json({ turns, totalPages });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los turnos' });
    }
};


const createTurn = async (req, res) => {
    const { horario, turnDay, totalPrice, nailArtCount, threeDCount, caricatureCount, idUser, idService, idServiceAdd } = req.body;
    console.log(req.body); // Agrega esta línea para depurar

    try {
        if (!horario || !turnDay || !totalPrice) {
            return res.status(400).json({ message: 'Faltan datos obligatorios: horario, turnDay o totalPrice.' });
        }

        const turnData = {
            idUser: idUser,
            idService: idService,
            idServiceAdd: idServiceAdd,
            idSchedule: horario,
            turnDay: turnDay,
            totalPrice: totalPrice,
            nailArtQuantity: nailArtCount || 0,
            '3dQuantity': threeDCount || 0,
            caricatureQuantity: caricatureCount || 0,
        };

        req.body = turnData;
        return crudController.create(req, res);
    } catch (error) {
        console.error("Error al crear el turno:", error);
        console.error("Error al crear el turno en TurnsController:", {
            body: req.body,
            error: error.message,
        });
        res.status(500).json({ message: 'Error al crear el turno', error });
    }
};

const deleteTurn = async (req, res) => {
    return crudController.delete(req, res);
};

const getTurnsForUserProfile = async (req, res) => {
    const idUser = req.session.user?.id; // Obtén el ID del usuario desde la sesión correctamente
    console.log('Este es el user', idUser)
    console.log('userId desde la sesión:', idUser); // Verifica que el userId se esté obteniendo correctamente

    if (!idUser) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    try {
        const turns = await turnsQueries.getTurnsByUserId(idUser); // Usa tu función para obtener los turnos de un usuario
        console.log('Turnos obtenidos:', turns); // Verifica que los turnos se obtienen correctamente
        res.json(turns);
    } catch (error) {
        console.error('Error al obtener los turnos:', error);
        res.status(500).json({ message: 'Error al obtener los turnos' });
    }
};


const turnsControllers = {
    getAllTurns,
    createTurn,
    deleteTurn,
    getTurnsForUserProfile,

};

export default turnsControllers;
