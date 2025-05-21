import { Router } from "express";
import { createRoom, getRooms, getRoomById, updateRoom} from "./room.controller.js";
import { validateCrateRoom, validateGetRoomById, validateUpdateRoom} from "../middlewares/room-validator.js";

const router = Router();

/**
 * @swagger
 * /createRoom:
 *   post:
 *     summary: Crea una nueva habitación
 *     description: Permite crear una habitación en el sistema.
 *     tags:
 *       - Room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hotelId
 *               - number
 *               - type
 *             properties:
 *               hotelId:
 *                 type: string
 *                 description: ID del hotel al que pertenece la habitación
 *               number:
 *                 type: string
 *                 description: Número de la habitación
 *               type:
 *                 type: string
 *                 description: "Tipo de habitación (ej: simple, doble, suite)"
 *               price:
 *                 type: number
 *                 description: Precio por noche
 *     responses:
 *       201:
 *         description: Habitación creada exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       409:
 *         description: La habitación ya existe
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - validateCrateRoom
 *     x-roles:
 *       - admin
 */
router.post("/createRoom", validateCrateRoom, createRoom);

/**
 * @swagger
 * /getRooms:
 *   get:
 *     summary: Obtiene todas las habitaciones
 *     description: Devuelve una lista de todas las habitaciones registradas.
 *     tags:
 *       - Room
 *     responses:
 *       200:
 *         description: Lista de habitaciones obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 *     x-roles:
 *       - public
 */
router.get("/getRooms", getRooms);

/**
 * @swagger
 * /getRoomById/{rid}:
 *   get:
 *     summary: Obtiene una habitación por ID
 *     description: Devuelve la información de una habitación específica por su ID.
 *     tags:
 *       - Room
 *     parameters:
 *       - in: path
 *         name: rid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la habitación
 *     responses:
 *       200:
 *         description: Habitación encontrada exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Habitación no encontrada
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - validateGetRoomById
 *     x-roles:
 *       - public
 */
router.get("/getRoomById/:rid", validateGetRoomById, getRoomById);

/**
 * @swagger
 * /updateRoom/{rid}:
 *   put:
 *     summary: Actualiza una habitación por ID
 *     description: Permite actualizar la información de una habitación existente.
 *     tags:
 *       - Room
 *     parameters:
 *       - in: path
 *         name: rid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la habitación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *                 description: Nuevo número de la habitación
 *               type:
 *                 type: string
 *                 description: Nuevo tipo de habitación
 *               price:
 *                 type: number
 *                 description: Nuevo precio por noche
 *     responses:
 *       200:
 *         description: Habitación actualizada exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       404:
 *         description: Habitación no encontrada
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - validateUpdateRoom
 *     x-roles:
 *       - admin
 */
router.put("/updateRoom/:rid", validateUpdateRoom, updateRoom);

export default router;