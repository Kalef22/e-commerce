import express from "express";
import { create, getAll, getById } from "./product.controller.js";

const router = express.Router();

// POST /api/products
// crear producto

router.post("/", create);

// GET /api/products
// Listar productos
router.get("/", getAll);

// GET /api/product/:id
router.get("/:id", getById);

export default router;

// Siguiente paso registrar la ruta