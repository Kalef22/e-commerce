import express from "express";
import { create } from "./product.controller.js";

const router = express.Router();
/*
POST /api/products
crear producto
*/

router.post("/", create);

export default router;

// Siguiente paso registrar la ruta