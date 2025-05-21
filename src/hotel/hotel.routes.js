import { Router } from "express";
import { createHotel, deleteHotel, getHotels, getHotelById, updateHotel} from "../hotel/hotel.controller.js";
import { createHotelValidator, deleteHotelValidator, getHotelByIdValidator, getHotelsValidator,updateHotelValidator } from "../middlewares/hotel-validator.js";

const router = Router();

/**
 * @swagger
 * /createHotel:
 *   post:
 *     summary: Crea un nuevo hotel
 *     description: Permite crear un hotel en el sistema.
 *     tags:
 *       - Hotel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del hotel
 *               address:
 *                 type: string
 *                 description: Dirección del hotel
 *               stars:
 *                 type: integer
 *                 description: Cantidad de estrellas
 *     responses:
 *       201:
 *         description: Hotel creado exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       409:
 *         description: El hotel ya existe
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - createHotelValidator
 *     x-roles:
 *       - admin
 */
router.post("/createHotel", createHotelValidator, createHotel);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todos los hoteles
 *     description: Devuelve una lista de todos los hoteles registrados.
 *     tags:
 *       - Hotel
 *     responses:
 *       200:
 *         description: Lista de hoteles obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - getHotelsValidator
 *     x-roles:
 *       - public
 */
router.get("/", getHotelsValidator, getHotels);

/**
 * @swagger
 * /findHotel/{hid}:
 *   get:
 *     summary: Obtiene un hotel por ID
 *     description: Devuelve la información de un hotel específico por su ID.
 *     tags:
 *       - Hotel
 *     parameters:
 *       - in: path
 *         name: hid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hotel
 *     responses:
 *       200:
 *         description: Hotel encontrado exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Hotel no encontrado
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - getHotelByIdValidator
 *     x-roles:
 *       - public
 */
router.get("/findHotel/:hid", getHotelByIdValidator, getHotelById);

/**
 * @swagger
 * /updateHotel/{hid}:
 *   put:
 *     summary: Actualiza un hotel por ID
 *     description: Permite actualizar la información de un hotel existente.
 *     tags:
 *       - Hotel
 *     parameters:
 *       - in: path
 *         name: hid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hotel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del hotel
 *               address:
 *                 type: string
 *                 description: Dirección del hotel
 *               stars:
 *                 type: integer
 *                 description: Cantidad de estrellas
 *     responses:
 *       200:
 *         description: Hotel actualizado exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       404:
 *         description: Hotel no encontrado
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - updateHotelValidator
 *     x-roles:
 *       - admin
 */
router.put("/updateHotel/:hid", updateHotelValidator, updateHotel);

/**
 * @swagger
 * /deleteHotel/{hid}:
 *   delete:
 *     summary: Elimina un hotel por ID
 *     description: Permite eliminar un hotel existente del sistema.
 *     tags:
 *       - Hotel
 *     parameters:
 *       - in: path
 *         name: hid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hotel
 *     responses:
 *       200:
 *         description: Hotel eliminado exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Hotel no encontrado
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - deleteHotelValidator
 *     x-roles:
 *       - admin
 */
router.delete("/deleteHotel/:hid", deleteHotelValidator, deleteHotel);

export default router;