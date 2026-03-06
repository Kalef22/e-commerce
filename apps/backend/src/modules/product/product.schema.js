import { z } from "zod";

/**
 * Buenas prácticas:
 * - z.coerce.number(): convierte strings numéricos a number (Postman / forms suelen mandar "39.99")
 * - trim() en strings para evitar espacios basura
 * - min(1) en arrays cuando es requisito de negocio (variants)
 */

// Export con el nombre exacto que estás importando
export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "ID inválido (ObjectId)");

const nonEmptyTrimmedString = z.string().trim().min(1, "Campo requerido");

// attributes es flexible (material/size/color). En tu modelo no son required.
const attributesSchema = z
  .object({
    material: z.string().trim().optional(),
    size: z.string().trim().optional(),
    color: z.string().trim().optional(),
  })
  .optional();

// Variante: requiere sku, price, stock (como en tu schema)
export const variantSchema = z.object({
  sku: nonEmptyTrimmedString, // required + no vacío
  price: z.coerce.number().min(0, "price debe ser >= 0"), // required + min 0
  stock: z.coerce
    .number()
    .int("stock debe ser entero")
    .min(0, "stock debe ser >= 0")
    .default(0), // en tu modelo default 0
  attributes: attributesSchema,
});

// Product: requiere name y variants; description/images opcionales con defaults
export const createProductBodySchema = z.object({
  name: z.string().trim().min(2, "name debe tener al menos 2 caracteres"),
  // Nota: en tu mongoose schema tienes un typo "dafault". De momento validamos aquí.
  description: z.string().trim().optional(),
  variants: z
    .array(variantSchema)
    .min(1, "El producto debe contener al menos una variante"),
  images: z.array(z.string().url("Cada imagen debe ser una URL válida")).optional(),
});

// Para PATCH (actualización parcial)
export const updateProductBodySchema = createProductBodySchema.partial();

// despues conectamos validación en las rutas en product.router.js (o donde se defina la ruta)