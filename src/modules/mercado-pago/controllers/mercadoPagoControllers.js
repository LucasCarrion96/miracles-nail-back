// src/controllers/mercadoPagoController.js
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { Turns } from '@models';

import dotenv from 'dotenv';
// Cargar variables de entorno
dotenv.config();

// Instanciar el cliente de Mercado Pago
const mpConfig = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
    options: { timeout: 5000 } // Opcional: tiempo de espera en ms
});

// Instanciar la API de Preferencias (para crear la preferencia de pago)
const preferenceApi = new Preference(mpConfig);


// Instanciar la API de Pagos (para consultar el estado del pago en el webhook)
const paymentApi = new Payment(mpConfig);

// Función para crear el pago (preferencia)
const createPayment = async (req, res) => {
    try {
        const { idTurns } = req.body;
        const turn = await Turns.findByPk(idTurns);

        if (!turn) {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }

        // Configurar la preferencia para el pago (seña)
        const preference = {
            items: [
                {
                    title: "Reserva de turno",
                    unit_price: parseFloat((turn.totalPrice * 0.5).toFixed(2)), // Asegúrate de que sea un número válido
                    quantity: 1,
                    currency_id: "ARS"
                }
            ],
            back_urls: {
                success: "https://tusitio.com/pago-exitoso",
                failure: "https://tusitio.com/pago-fallido"
            },
            notification_url: "https://tusitio.com/mercadopago/webhook",
            auto_return: "approved",
            external_reference: String(idTurns) // Para identificar el turno en el webhook
        };

        // Crear la preferencia usando la API
        const response = await preferenceApi.create({ body: preference });

        // Verificar que la respuesta contiene 'init_point'
        if (!response || !response.init_point) {
            console.error('Respuesta de Mercado Pago no contiene init_point', response);
            return res.status(500).json({ message: "Error al crear el pago, no se encontró init_point" });
        }

        // Devolver la URL de pago
        return res.json({ url: response.init_point });
    } catch (error) {
        console.error("Error en createPayment:", error);
        return res.status(500).json({ message: "Error al crear el pago" });
    }
};
//Funcion para elo success



// Función para el webhook de Mercado Pago
const paymentWebhook = async (req, res) => {
    try {
        const paymentId = req.query['data.id'];
        if (!paymentId) {
            return res.status(400).json({ message: "ID de pago no recibido" });
        }

        // Consultar el pago usando la API de Pagos
        const payment = await paymentApi.get(paymentId);
        if (!payment.response) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }

        const { status, external_reference } = payment.response;

        // Buscar el turno correspondiente al external_reference
        const turn = await Turns.findByPk(external_reference);
        if (!turn) {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }

        // Actualizar el estado del pago en la base de datos:
        // Por ejemplo, idPaymentStatus: 2 para "approved", 3 para "cancelled", 1 para "pending"
        let idPaymentStatus = (status === 'approved') ? 2 : (status === 'cancelled') ? 3 : 1;
        await Turns.update({ idPaymentStatus }, { where: { idTurns: turn.idTurns } });

        return res.status(200).json({ message: 'Estado de pago actualizado' });
    } catch (error) {
        console.error("Error en el webhook:", error);
        return res.status(500).json({ message: "Error en el webhook" });
    }
};

export default { createPayment, paymentWebhook };
