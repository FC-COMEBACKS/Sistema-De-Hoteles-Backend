import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import Hotel from '../hotel/hotel.model.js';
import Reservation from '../reservation/reservation.model.js';
import User from '../user/user.model.js';

export const generateInvoicePDF = async (invoice) => {
    const reservation = await Reservation.findById(invoice.reservation).populate('room').populate('user');
    const hotel = await Hotel.findById(reservation.hotel);
    const user = await User.findById(reservation.user);
    const facturasDir = path.join(process.cwd(), 'public', 'uploads', 'Facturas');
    if (!fs.existsSync(facturasDir)) {
        fs.mkdirSync(facturasDir, { recursive: true });
    }
    const filePath = path.join(facturasDir, `factura_${invoice._id}.pdf`);
    const doc = new PDFDocument({ margin: 30 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);
    doc.fontSize(16).text(hotel.name, { align: 'center' });
    doc.fontSize(10).text(hotel.address, { align: 'center' });
    doc.text(`Tel: ${hotel.telephone}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Factura N°: ${invoice.invoiceNumber}`);
    doc.text(`Fecha de emisión: ${invoice.issueDate.toLocaleDateString()}`);
    doc.text(`Cliente: ${user ? user.name : 'N/A'}`);
    doc.text(`Correo: ${user ? user.email : 'N/A'}`);
    doc.moveDown();
    doc.fontSize(11).text('Detalle de la reservación:');
    const roomType = reservation.room && reservation.room.type ? reservation.room.type : 'N/A';
    const roomPrice = reservation.room && reservation.room.pricePerDay ? reservation.room.pricePerDay : 0;
    doc.text(`Habitación: ${roomType}`);
    doc.text(`Precio habitación: Q${roomPrice.toFixed(2)}`);
    doc.text(`Check-in: ${reservation.startDate ? reservation.startDate.toLocaleDateString() : 'N/A'}`);
    doc.text(`Check-out: ${reservation.exitDate ? reservation.exitDate.toLocaleDateString() : 'N/A'}`);
    doc.moveDown();
    let totalAdicionales = 0;
    doc.fontSize(11).text('Servicios adicionales:');
    if (invoice.additionalCharges.length === 0) {
        doc.text('Ninguno');
    } else {
        invoice.additionalCharges.forEach((charge, idx) => {
            doc.text(`${idx + 1}. ${charge.serviceType} - Q${charge.amount.toFixed(2)}${charge.description ? ' (' + charge.description + ')' : ''}`);
            totalAdicionales += charge.amount;
        });
    }
    doc.moveDown();
    doc.fontSize(12).text(`Subtotal habitación: Q${roomPrice.toFixed(2)}`);
    doc.fontSize(12).text(`Subtotal adicionales: Q${totalAdicionales.toFixed(2)}`);
    doc.fontSize(12).text(`Total: Q${(roomPrice + totalAdicionales).toFixed(2)}`, { align: 'right' });
    doc.moveDown();
    doc.fontSize(10).text('¡Gracias por su preferencia!', { align: 'center' });
    doc.end();
    return new Promise((resolve, reject) => {
        stream.on('finish', () => resolve(filePath));
        stream.on('error', (err) => reject(err));
    });
};