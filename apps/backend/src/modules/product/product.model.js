import mongoose from "mongoose";

/*
El Schema define la estructura de los documentos que se guardan en MongoDB.
Es similar a definir las columnas de una tabla SQL.
*/
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // evita precios negativos
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: "general",
    },
  },
  {
    timestamps: true,
  }
)

/*
mongoose.model crea el modelo que usaremos para interactuar con la colección.
Primer parámetro: nombre del modelo.
Segundo: schema definido arriba
*/
export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

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