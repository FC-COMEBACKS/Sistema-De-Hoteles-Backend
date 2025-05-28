import { body, param } from "express-validator";
import { validateField } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const createInvoiceValidator = [
    param("reservationId").isMongoId().withMessage("ID de reservación inválido"),
    body("paymentMethod").notEmpty().withMessage("El método de pago es obligatorio")
        .isIn(["CREDIT_CARD", "DEBIT_CARD", "CASH", "BANK_TRANSFER"]).withMessage("Método de pago inválido"),
    body("additionalCharges").optional().isArray().withMessage("Los cargos adicionales deben ser un arreglo"),
    body("additionalCharges.*.serviceType").optional()
        .isIn(["Hotel", "Singleroom", "Doubleroom", "Suite", "Deluxeroom", "Event"]).withMessage("Tipo de servicio adicional inválido"),
    body("additionalCharges.*.description").optional().isString().isLength({ max: 200 }),
    body("additionalCharges.*.amount").optional().isFloat({ min: 0 }),
    validateField,
    handleErrors
];