import { Router } from "express";
import { createHotel, deleteHotel, getHotels, getHotelById, updateHotel} from "../hotel/hotel.controller.js";
import { createHotelValidator, deleteHotelValidator, getHotelByIdValidator, getHotelsValidator,updateHotelValidator } from "../middlewares/hotel-validator.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Hotel
 *   description: API for managing hotels
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * /hotels/createHotel:
 *   post:
 *     summary: Crear un nuevo hotel
 *     tags: [Hotel]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               host:
 *                 type: string
 *               pictures:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Hotel creado correctamente
 *       400:
 *         description: Error de validación o datos incorrectos
 */
router.post("/createHotel", createHotelValidator, createHotel);

/**
 * @swagger
 * /hotels/:
 *   get:
 *     summary: Obtener todos los hoteles
 *     tags: [Hotel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Límite de resultados
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *         description: Offset de resultados
 *     responses:
 *       200:
 *         description: Lista de hoteles
 */
router.get("/", getHotelsValidator, getHotels);

/**
 * @swagger
 * /hotels/findHotel/{hid}:
 *   get:
 *     summary: Obtener hotel por ID
 *     tags: [Hotel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hotel
 *     responses:
 *       200:
 *         description: Hotel encontrado
 *       404:
 *         description: Hotel no encontrado
 */
router.get("/findHotel/:hid", getHotelByIdValidator, getHotelById);

/**
 * @swagger
 * /hotels/updateHotel/{hid}:
 *   put:
 *     summary: Actualizar información de un hotel
 *     tags: [Hotel]
 *     security:
 *       - bearerAuth: []
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               host:
 *                 type: string
 *               pictures:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Hotel actualizado correctamente
 *       404:
 *         description: Hotel no encontrado
 */
router.put("/updateHotel/:hid", updateHotelValidator, updateHotel);

/**
 * @swagger
 * /hotels/deleteHotel/{hid}:
 *   delete:
 *     summary: Eliminar un hotel
 *     tags: [Hotel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hotel
 *     responses:
 *       200:
 *         description: Hotel eliminado correctamente
 *       404:
 *         description: Hotel no encontrado
 */
router.delete("/deleteHotel/:hid", deleteHotelValidator, deleteHotel);

export default router;