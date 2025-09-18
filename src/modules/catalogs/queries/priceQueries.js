import { Service, ArtType } from "@models"

async function getPrice() {
    try {
        const [services, artTypes] = await Promise.all([
            Service.findAll(),
            ArtType.findAll(),
        ]);
        return {
            services,
            artTypes,
        };
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        throw new Error('Error al obtener servicios');
    }
}

export const priceQueries = {
    getPrice,

};
