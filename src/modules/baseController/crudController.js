class CrudController {
    constructor(model) {
        this.model = model;
        this.idField = this.getIdField();
    }

    getIdField() {
        const primaryKeys = this.model.primaryKeyAttributes;
        return primaryKeys && primaryKeys.length > 0 ? primaryKeys[0] : 'id';
    }

    async getAll(req, res) {
        try {
            const items = await this.model.findAll();
            res.json(items);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los registros', error });
        }
    }

    async create(req, res) {
        const data = req.body;

        try {
            const newItem = await this.model.create(data);
            res.status(201).json(newItem);
        } catch (error) {
            console.error("Error al crear el registro:", error);
            res.status(500).json({ message: 'Error al crear el registro', error });
        }
    }

    async delete(req, res) {
        const idValue = req.params[this.idField];

        try {
            console.log(`ID recibido para eliminar: ${idValue}`);

            const deleted = await this.model.destroy({ where: { [this.idField]: idValue } });

            if (deleted) {
                return res.status(200).json({ message: 'Registro eliminado con éxito' });
            }

            res.status(404).json({ message: 'Registro no encontrado' });
        } catch (error) {
            console.error("Error al eliminar el registro:", error);
            res.status(500).json({ message: 'Error al eliminar el registro', error });
        }
    }

    async update(req, res) {
        const idValue = req.params[this.idField];
        const data = req.body;

        try {
            const [updated] = await this.model.update(data, { where: { [this.idField]: idValue } });

            if (updated) {
                const updatedItem = await this.model.findOne({ where: { [this.idField]: idValue } });
                return res.status(200).json(updatedItem);
            }

            res.status(404).json({ message: 'Registro no encontrado o sin cambios' });
        } catch (error) {
            console.error("Error en la actualización:", error);
            res.status(500).json({ message: 'Error al actualizar el registro', error });
        }
    }

    async search(req, res) {
        const { query, field } = req.query;
        try {
            const results = await this.model.findAll({
                where: {
                    [field]: { [Op.like]: `%${query}%` }
                }
            });
            res.status(200).json(results);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            res.status(500).json({ message: 'Error al realizar la búsqueda', error });
        }
    }
}

export default CrudController;
