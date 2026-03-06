import mongoose from "mongoose";

/*
Image Schema
Representa una imagen del producto.
Buena práctica:
- Guardar objetos y no solo strings para poder añadir metadatos como alt.
*/
const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

/*
Variant Schema
Representa una variante específica del producto.
Ej: Oro 18k, talla 12
*/
const variantSchema = new mongoose.Schema(
  {
    // SKU único de la variante
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Precio específico de la variante
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // Stock independiente por variante
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    // Atributos flexibles para variantes
    attributes: {
      material: {
        type: String,
        trim: true,
      },
      size: {
        type: String,
        trim: true,
      },
      color: {
        type: String,
        trim: true,
      },
    },
  },
  { _id: false }
);

/*
Product Schema
Contiene la información general del producto
*/
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Imagen principal para listados / catálogo
    mainImage: {
      type: String,
      default: null,
      trim: true,
    },

    // Galería de imágenes del producto
    images: {
      type: [imageSchema],
      default: [],
    },

    // Array de variantes
    variants: {
      type: [variantSchema],
      required: true,
      validate: {
        validator: function (value) {
          // Buena práctica:
          // un producto debería tener al menos una variante
          return Array.isArray(value) && value.length > 0;
        },
        message: "El producto debe tener al menos una variante",
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
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