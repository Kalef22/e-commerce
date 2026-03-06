import express from "express";
import { z } from "zod";
import { validate } from "../../middlewares/validate.middleware.js"
import { createProductBodySchema, updateProductBodySchema, objectIdSchema, } from "./product.schema.js";
import { create, getAll, getById, update, remove, uploadImage, updateMainImage } from "./product.controller.js";
import { uploadProductImage } from "../../middlewares/upload.middleware.js";

const router = express.Router();

// helper para params
const paramsIdSchema = z.object({ id: objectIdSchema });

// GET /api/products , listar todos los productos
router.get("/", getAll);

// GET /api/products/:id , obtener producto por id
router.get("/:id", validate({ params: paramsIdSchema }), getById);

// POST /api/products , crear producto
router.post("/", validate({ body: createProductBodySchema }), create);

// PATCH /api/products/:id , actualizar producto
router.patch(
  "/:id",
  validate({ params: paramsIdSchema, body: updateProductBodySchema }),
  update
);

// DELETE /api/products/:id , borrar producto
router.delete("/:id", validate({ params: paramsIdSchema }), remove);

// Subir imagen a un producto
router.post("/:id/images", uploadProductImage.single("image"), uploadImage);

// Actualizar imagen principal
router.patch("/:id/main-image", updateMainImage);

export default router;

// Siguiente paso registrar la ruta, solo 1 vez por modulo ej. modulo product