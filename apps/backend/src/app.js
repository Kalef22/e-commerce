import express from "express";
import cors from "cors";
import productRoutes from "./modules/product/product.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import path from "node:path";

export function createApp() {
  const app = express();

  // Permite que el frontend pueda comunicarse con el backend
  app.use(cors());

  // Permite recibir JSON en las peticiones
  app.use(express.json());

  // Exponemos la carpeta uploads para que el navegador pueda acceder a las imágenes
  app.use("/uploads", express.static(path.resolve("uploads")));

  // Endpoint de salud del servidor
  app.get("/health", (_req, res) => {
    res.status(200).json({ok: true});
  });
  
  // Registro de rutas
  app.use("/api/products", productRoutes)

  // SIEMPRE AL FINAL, despues de routes
  app.use(errorHandler);

  return app;
}

// Buenas prácticas aquí:
  // Separar createApp() del servidor
  // Middleware antes de rutas
  // Endpoint health para monitoreo

// Usamos next(error) en los controllers (para que llegue al handler), 
// el cual buscara al primer middleware de errores que encuentre despues de su endpoint
