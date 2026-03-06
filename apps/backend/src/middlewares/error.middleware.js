import { AppError } from "../utils/AppError.js";

export function errorHandler(err, _req, res, _next) {
  const isAppError = err instanceof AppError;

  const statusCode = isAppError ? err.statusCode : 500;

  // En producción no conviene filtrar detalles internos (seguridad)
  const message = 
    isAppError || process.env.NODE_ENV === "development"
    ? err.message
    : "Error interno del servidor";

    // (Opcional) log útil
    if(!isAppError) {
      console.log("Error Inesperado: ", err);
    }

    res.status(statusCode).json({ 
      message: err.message || "Error interno del servidor",
      details: err.details, // <- importante para errores de validación
    });
}

// Manejamos la clase de Error personaizado 
// Y despues enganchamos el middleware en app.js