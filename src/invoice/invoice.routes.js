import { Router } from "express";
import { createInvoice, payInvoice } from "./invoice.controller.js";
import { createInvoiceValidator, payInvoiceValidator } from "../middlewares/invoice-validator.js";

const router = Router();

/**
 * @swagger
 * /invoice/create/{reservationId}:
 *   post:
 *     summary: Crea una nueva factura para una reservación.
 *     tags:
 *       - Invoice
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reservación para la cual se generará la factura.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Monto total de la factura.
 *               description:
 *                 type: string
 *                 description: Descripción de la factura.
 *     responses:
 *       201:
 *         description: Factura creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Datos inválidos o faltantes.
 *       401:
 *         description: No autorizado. Token inválido o ausente.
 *       403:
 *         description: No tiene permisos para crear facturas.
 *       404:
 *         description: Reservación no encontrada.
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 *       - recepcionista
 *     x-validations:
 *       - createInvoiceValidator
 */

router.post("/create/:reservationId", createInvoiceValidator, createInvoice);

/**
 * @swagger
 * /invoice/pay/{id}:
 *   put:
 *     summary: Marca una factura como pagada.
 *     tags:
 *       - Invoice
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la factura a pagar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentMethod:
 *                 type: string
 *                 description: Método de pago utilizado.
 *     responses:
 *       200:
 *         description: Factura pagada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Datos inválidos o faltantes.
 *       401:
 *         description: No autorizado. Token inválido o ausente.
 *       403:
 *         description: No tiene permisos para pagar facturas.
 *       404:
 *         description: Factura no encontrada.
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 *       - recepcionista
 *     x-validations:
 *       - payInvoiceValidator
 */
router.put("/pay/:id", payInvoiceValidator, payInvoice);

export default router;