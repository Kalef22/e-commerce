import "dotenv/config";
import mongoose from "mongoose";
import { Product } from "../modules/product/product.model.js"

// Función para conectar a MongoDB
async function connectDB(){
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");
}

async function testProduct(){
  await connectDB()

  // Creamos un producto de prueba con variantes
  const product = await Product.create({
    name: "Anillo Victoria",
    description: "Anillo alegante para ocasiones especiales",

    variants: [
      {
        sku: "ANI-VIC-ORO18-12",
        price: 180,
        stock: 5,
        attributes: {
          material: "Oro 18k",
          size: "12"
        }
      },
      {
        sku: "ANI-VIC-PLATA-12",
        price: 70,
        stock: 10,
        attributes: {
          material: "plata",
          size: "12"
        }
      }
    ],
    images: [
      "https://cdn.joyeria.com/anillo1.jpg"
    ]
  })
  console.log("Producto creado: ");
  console.log(product);

  await mongoose.disconnect();
}

testProduct()

// ejecutar 
// node src/scripts/testProductModel.js