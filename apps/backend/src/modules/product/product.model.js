import mongoose from "mongoose";

/*
Variant Schema
Representa una variante especifica del producto. Ej: Oro 18k talla 12
*/
const variantSchema = new mongoose.Schema(
	{
		// SKU (Stock Keeping Unit) es, por definición, el identificador único de esa variante en el mundo real (y en mi lógica de negocio).
		sku: {
			type: String,
			required: true,
			unique: true,
		},
		// precio especifico de esta variante, en e-commerce reales cada variante puede tener un precio diferente.
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		// Stock independiente por variante. Ej: Oro 18k talla 12 -> 3 unidades
		stock: {
			type: Number,
			required: true,
			default: 0,
		},
		// Atributos flexibles. Permite material, talla, color, etc.
		attributes: {
			material: String,
			size: String,
			color: String,
		},
	},
	{ _id: false },
);

// Product Schema contiene la información general del producto

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			dafault: "",
		},
		// Array de variantes. Un producto puede tener múltiples variantes.
		variants: {
			type: [variantSchema],
			required: true,
		},
		// Imágenes del producto
		images: {
			type: [String],
			default: [],
		},
    mainImage: {
      type: String,
      default: null
    },
	},
	{
		timestamps: true,
	},
);
/*
mongoose.model crea el modelo que usaremos para interactuar con la colección.
Primer parámetro: nombre del modelo.
Segundo: schema definido arriba
*/
export const Product =
	mongoose.models.Product || mongoose.model("Product", productSchema);

// Probar el modelo rápidamente (opcional pero recomendado)
// Puedes probar creando un script temporal dentro de server.js o similar.

// import { Product } from "./modules/product/product.model.js";

// const product = await Product.create({
//   name: "Anillo de Oro",
//   price: 199,
//   stock: 5,
// });

// console.log(product);
// prueba funciona OK