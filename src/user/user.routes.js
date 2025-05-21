import { Router } from "express";
import { getUserById, getUsers, deleteUserAdmin, updatePassword, updateUserUser, updateUserAdmin, updateRole, 
    deleteUserClient} from "./user.controller.js";
import { getUserByIdValidator, updatePasswordValidator, deleteUserValidatorClient, deleteUserValidatorAdmin, 
    createUserValidation, updateRoleValidator, getUserValidation} from "../middlewares/user-validator.js";
import { register } from "../auth/auth.controller.js";

const router = Router();

/**
 * @swagger
 * /findUser/{uid}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Devuelve la información de un usuario específico por su ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - getUserByIdValidator
 *     x-roles:
 *       - admin
 */
router.get("/findUser/:uid", getUserByIdValidator, getUserById);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Devuelve una lista de todos los usuarios registrados.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - getUserValidation
 *     x-roles:
 *       - admin
 */
router.get("/", getUserValidation, getUsers);

/**
 * @swagger
 * /deleteUserAdmin/{uid}:
 *   delete:
 *     summary: Elimina un usuario por ID (admin)
 *     description: Permite a un administrador eliminar un usuario específico por su ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - deleteUserValidatorAdmin
 *     x-roles:
 *       - admin
 */
router.delete("/deleteUserAdmin/:uid", deleteUserValidatorAdmin, deleteUserAdmin);

/**
 * @swagger
 * /deleteUserClient:
 *   delete:
 *     summary: Elimina el usuario autenticado (cliente)
 *     description: Permite a un usuario autenticado eliminar su propia cuenta.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       401:
 *         description: No autenticado
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - deleteUserValidatorClient
 *     x-roles:
 *       - user
 */
router.delete("/deleteUserClient", deleteUserValidatorClient, deleteUserClient);

/**
 * @swagger
 * /updatePassword:
 *   patch:
 *     summary: Actualiza la contraseña del usuario autenticado
 *     description: Permite a un usuario cambiar su contraseña.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: "Contraseña actual"
 *               newPassword:
 *                 type: string
 *                 description: "Nueva contraseña"
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       401:
 *         description: No autenticado
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - updatePasswordValidator
 *     x-roles:
 *       - user
 */
router.patch("/updatePassword", updatePasswordValidator, updatePassword);

/**
 * @swagger
 * /updateUser:
 *   put:
 *     summary: Actualiza los datos del usuario autenticado
 *     description: Permite a un usuario actualizar su propia información.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: "Nuevo nombre de usuario"
 *               email:
 *                 type: string
 *                 description: "Nuevo correo electrónico"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       401:
 *         description: No autenticado
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - deleteUserValidatorClient
 *     x-roles:
 *       - user
 */
router.put("/updateUser", deleteUserValidatorClient, updateUserUser);

/**
 * @swagger
 * /updateUserAdmin/{uid}:
 *   put:
 *     summary: Actualiza los datos de un usuario por ID (admin)
 *     description: Permite a un administrador actualizar la información de un usuario específico.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: "Nuevo nombre de usuario"
 *               email:
 *                 type: string
 *                 description: "Nuevo correo electrónico"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - deleteUserValidatorAdmin
 *     x-roles:
 *       - admin
 */
router.put("/updateUserAdmin/:uid", deleteUserValidatorAdmin, updateUserAdmin);

/**
 * @swagger
 * /createUser:
 *   post:
 *     summary: Crea un nuevo usuario (admin)
 *     description: Permite a un administrador crear un nuevo usuario en el sistema.
 *     tags:
 *       - User
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
 *                 description: "Nombre de usuario"
 *               email:
 *                 type: string
 *                 description: "Correo electrónico"
 *               password:
 *                 type: string
 *                 description: "Contraseña"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       409:
 *         description: El usuario o email ya existe
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - createUserValidation
 *     x-roles:
 *       - admin
 */
router.post("/createUser", createUserValidation, register);

/**
 * @swagger
 * /updateRole/{uid}:
 *   patch:
 *     summary: Actualiza el rol de un usuario por ID
 *     description: Permite a un administrador actualizar el rol de un usuario específico.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 description: "Nuevo rol del usuario (ej: user, admin)"
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *     x-validations:
 *       - updateRoleValidator
 *     x-roles:
 *       - admin
 */
router.patch("/updateRole/:uid", updateRoleValidator, updateRole);

export default router;