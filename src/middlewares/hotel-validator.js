import { body, param } from "express-validator";
import { validateField } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { userExists, isClient } from "../helpers/db-validator.js";

export const createHotelValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Hotel name is required")
                .isLength({ max: 50 }).withMessage("Hotel name must be at most 50 characters"),
    body("description").notEmpty().withMessage("Description is required")
                        .isLength({ max: 500 }).withMessage("Description must be at most 500 characters"),
    body("address").notEmpty().withMessage("Address is required")
                    .isLength({ max: 100 }).withMessage("Address must be at most 100 characters"),
    body("telephone").notEmpty().withMessage("Telephone is required")
                    .isLength({ max: 8 }).withMessage("Telephone must be at most 8 characters"),
    body("services").isArray({ min: 1 }).withMessage("At least one service must be specified"),
    body("services.*.type").notEmpty().withMessage("Service type is required")
                            .isIn(["Hotel", "Singleroom", "Doubleroom", "Suite", "Deluxeroom", "Event"]).withMessage("Invalid service type"),
    body("services.*.price").notEmpty().withMessage("Service price is required")
                            .isFloat({ min: 0 }).withMessage("Service price must be a positive number"),
    validateField,
    deleteFileOnError,
    handleErrors
];

export const getHotelsValidator = [
    validateJWT,
    validateField,
    handleErrors
];

export const getHotelByIdValidator = [
    validateJWT,
    param("hid").isMongoId().withMessage("Invalid hotel ID"),
    validateField,
    handleErrors
];

export const updateHotelValidator = [
    validateJWT,
    param("hid").isMongoId().withMessage("ID inválido"),
    body("name").optional().isString().withMessage("El nombre debe ser texto"),
    body("description").optional().isString().withMessage("La descripción debe ser texto"),
    body("address").optional().isString().withMessage("La dirección debe ser texto"),
    body("telephone").optional().isString().withMessage("El teléfono debe ser texto"),
    body("services").optional().isArray().withMessage("Los servicios deben ser un arreglo"),
    body("services.*.type").optional().isString().withMessage("El tipo de servicio debe ser texto"),
    body("services.*.price").optional().isFloat({ min: 0 }).withMessage("El precio debe ser positivo"),
    validateField,
    handleErrors
];

export const deleteHotelValidator = [
    validateJWT,
    hasRoles("HOST_ROLE", "ADMIN_ROLE"),
    param("hid").isMongoId().withMessage("Invalid hotel ID"),
    validateField,
    handleErrors
];
