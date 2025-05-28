import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { validatorLogin, validatorRegister } from "../middlewares/user-validator.js";


const router = Router();


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Crea un nuevo usuario en el sistema. Solo usuarios no autenticados pueden acceder a este endpoint.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario único
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico válido
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: Contraseña del usuario (mínimo 6 caracteres)
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   description: Token JWT de autenticación
 *       400:
 *         description: Datos inválidos o faltantes
 *       409:
 *         description: El usuario o email ya existe
 *       500:
 *         description: Error interno del servidor
 *     security: []
 *     x-roles:
 *       - public
 *     x-validations:
 *       - validatorRegister
 */
router.post("/register", validatorRegister, register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     description: Autentica a un usuario registrado y retorna un token JWT.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico registrado
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   description: Token JWT de autenticación
 *       400:
 *         description: Datos inválidos o faltantes
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error interno del servidor
 *     security: []
 *     x-roles:
 *       - public
 *     x-validations:
 *       - validatorLogin
 */
router.post("/login", validatorLogin, login);

export default router;