import Invoice from './invoice.model.js';
import Reservation from '../reservation/reservation.model.js';
import Hotel from '../hotel/hotel.model.js';
import { generateInvoicePDF } from './generateInvoicePDF.js';

export const createInvoice = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const { additionalCharges = [], paymentMethod, dueDate } = req.body;
        const reservation = await Reservation.findById(reservationId).populate('hotel');
        if (!reservation) {
            return res.status(404).json({ msg: 'Reservación no encontrada' });
        }
        const hotel = await Hotel.findById(reservation.hotel._id);
        if (!hotel) {
            return res.status(404).json({ msg: 'Hotel no encontrado' });
        }
        let baseAmount = reservation.amount || 0;
        let totalAdditional = 0;
        const processedCharges = additionalCharges.map(charge => {
            const hotelService = hotel.services.find(s => s.type === charge.serviceType);
            if (!hotelService) {
                throw new Error(`Servicio adicional '${charge.serviceType}' no existe en el hotel`);
            }
            const amount = hotelService.price * (charge.quantity || 1);
            totalAdditional += amount;
            return {
                serviceType: charge.serviceType,
                description: charge.description || '',
                amount
            };
        });
        const amount = baseAmount + totalAdditional;
        const invoiceNumber = `INV-${Date.now()}`;
        const invoice = await Invoice.create({
            reservation: reservation._id,
            issueDate: new Date(),
            dueDate: dueDate || new Date(),
            additionalCharges: processedCharges,
            amount,
            paymentMethod,
            invoiceNumber,
            history: [{
                date: new Date(),
                user: req.usuario ? req.usuario._id : undefined,
                action: 'CREATED',
                details: 'Factura generada al finalizar la estadía.'
            }]
        });
        return res.status(201).json({
            success: true,
            msg: 'Factura generada correctamente',
            invoice
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

export const payInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { paymentStatus } = req.body;
        const usuario = req.usuario;

        const invoice = await Invoice.findById(id);
        if (!invoice) {
            return res.status(404).json({ success: false, msg: 'Factura no encontrada' });
        }
        let pdfPath = null;
        if (invoice.paymentStatus === 'PAID') {
            pdfPath = await generateInvoicePDF(invoice);
            return res.status(200).json({
                success: true,
                msg: 'Factura ya estaba pagada. PDF generado nuevamente.',
                invoice,
                pdfPath
            });
        }
        invoice.paymentStatus = paymentStatus;
        invoice.history.push({
            date: new Date(),
            user: usuario ? usuario._id : undefined,
            action: 'PAID',
            details: 'Factura pagada y PDF generado.'
        });
        await invoice.save();

        if (paymentStatus === 'PAID') {
            pdfPath = await generateInvoicePDF(invoice);
        }

        return res.status(200).json({
            success: true,
            msg: 'Factura actualizada correctamente',
            invoice,
            pdfPath
        });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};