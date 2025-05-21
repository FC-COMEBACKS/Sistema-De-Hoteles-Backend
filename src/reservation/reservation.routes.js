import { Router } from "express";
import {
    createReservation,
    getReservations,
    getReservationById,
    updateReservation,
    deleteReservation,
    getUserReservations
} from "./reservation.controller.js";
import { 
    getUserReservationsValidator,
    reserveRoomValidator,
    cancelReservationValidator,
    updateReservationValidator
 } from "../middlewares/reservation-validator.js";

const router = Router();

/**
 * @swagger
 * /createReser:
 *   post:
 *     summary: Crea una nueva reservación
 *     description: Permite crear una reservación para una habitación.
 *     tags:
 *       - Reservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roomId
 *               - checkIn
 *               - checkOut
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario que realiza la reservación
 *               roomId:
 *                 type: string
 *                 description: ID de la habitación a reservar
 *               checkIn:
 *                 type: string
 *                 format: date
 *                 description: Fecha de entrada (YYYY-MM-DD)
 *               checkOut:
 *                 type: string
 *                 format: date
 *                 description: Fecha de salida (YYYY-MM-DD)
 *     responses:
 *       201:
 *         description: Reservación creada exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       409:
 *         description: Conflicto de reservación
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - reserveRoomValidator
 *     x-roles:
 *       - user
 */
router.post("/createReser",reserveRoomValidator, createReservation);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todas las reservaciones
 *     description: Devuelve una lista de todas las reservaciones registradas.
 *     tags:
 *       - Reservation
 *     responses:
 *       200:
 *         description: Lista de reservaciones obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 *     x-roles:
 *       - admin
 */
router.get("/", getReservations);

/**
 * @swagger
 * /listReser/{id}:
 *   get:
 *     summary: Obtiene una reservación por ID
 *     description: Devuelve la información de una reservación específica por su ID.
 *     tags:
 *       - Reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reservación
 *     responses:
 *       200:
 *         description: Reservación encontrada exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Reservación no encontrada
 *       500:
 *         description: Error interno del servidor
 *     x-roles:
 *       - user
 */
router.get("/listReser/:id", getReservationById);

/**
 * @swagger
 * /updateReser/{id}:
 *   put:
 *     summary: Actualiza una reservación por ID
 *     description: Permite actualizar la información de una reservación existente.
 *     tags:
 *       - Reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reservación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               checkIn:
 *                 type: string
 *                 format: date
 *                 description: Nueva fecha de entrada (YYYY-MM-DD)
 *               checkOut:
 *                 type: string
 *                 format: date
 *                 description: Nueva fecha de salida (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Reservación actualizada exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       404:
 *         description: Reservación no encontrada
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - updateReservationValidator
 *     x-roles:
 *       - user
 */
router.put("/updateReser/:id",updateReservationValidator, updateReservation);

/**
 * @swagger
 * /deleteReser/{id}:
 *   delete:
 *     summary: Elimina una reservación por ID
 *     description: Permite cancelar una reservación existente.
 *     tags:
 *       - Reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reservación
 *     responses:
 *       200:
 *         description: Reservación eliminada exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Reservación no encontrada
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - cancelReservationValidator
 *     x-roles:
 *       - user
 */
router.delete("/deleteReser/:id",cancelReservationValidator, deleteReservation);

/**
 * @swagger
 * /userReser:
 *   get:
 *     summary: Obtiene las reservaciones del usuario autenticado
 *     description: Devuelve una lista de reservaciones asociadas al usuario autenticado.
 *     tags:
 *       - Reservation
 *     responses:
 *       200:
 *         description: Lista de reservaciones del usuario obtenida exitosamente
 *       401:
 *         description: No autenticado
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - getUserReservationsValidator
 *     x-roles:
 *       - user
 */
router.get("/userReser", getUserReservationsValidator, getUserReservations);

export default router;