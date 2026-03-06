import express from "express";
import { z } from "zod";

import { validate } from "../../middlewares/validate.middleware.js"
import {
  createProductBodySchema,
  updateProductBodySchema,
  objectIdSchema,
} from "./product.schema.js";

import { create, getAll, getById, update, remove } from "./product.controller.js";

const router = express.Router();

// helper para params
const paramsIdSchema = z.object({ id: objectIdSchema });

// GET /api/products
router.get("/", getAll);

// GET /api/products/:id
router.get("/:id", validate({ params: paramsIdSchema }), getById);

// POST /api/products
router.post("/", validate({ body: createProductBodySchema }), create);

// PATCH /api/products/:id
router.patch(
  "/:id",
  validate({ params: paramsIdSchema, body: updateProductBodySchema }),
  update
);

// DELETE /api/products/:id
router.delete("/:id", validate({ params: paramsIdSchema }), remove);

export default router;

// Siguiente paso registrar la ruta, solo 1 vez por modulo ej. modulo product