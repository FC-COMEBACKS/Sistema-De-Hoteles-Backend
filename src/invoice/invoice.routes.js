import { Router } from "express";
import { createInvoice, payInvoice } from "./invoice.controller.js";
import { createInvoiceValidator, payInvoiceValidator } from "../middlewares/invoice-validator.js";

const router = Router();

router.post("/create/:reservationId", createInvoiceValidator, createInvoice);
router.put("/pay/:id", payInvoiceValidator, payInvoice);

export default router;