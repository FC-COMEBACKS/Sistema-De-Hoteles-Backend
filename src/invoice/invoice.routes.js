import { Router } from "express";
import { createInvoice, payInvoice } from "./invoice.controller.js";
import { createInvoiceValidator } from "../middlewares/invoice-validator.js";

const router = Router();

router.post("/create/:reservationId", createInvoiceValidator, createInvoice);
router.put("/pay/:id", payInvoice);

export default router;