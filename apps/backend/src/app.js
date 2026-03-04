import express from "express";
import cors from "cors";
import productRoutes from "./modules/product/product.routes.js"

export function createApp() {
  const app = express();

  // Permite que el frontend pueda comunicarse con el backend
  app.use(cors());

  // Permite recibir JSON en las peticiones
  app.use(express.json());

  // Endpoint de salud del servidor
  app.get("/health", (_req, res) => {
    res.status(200).json({ok: true});
  });
  
  // Registro de rutas
  app.use("/api/products", productRoutes)
  
  return app;
}

// Buenas prácticas aquí:
  // Separar createApp() del servidor
  // Middleware antes de rutas
  // Endpoint health para monitoreo

