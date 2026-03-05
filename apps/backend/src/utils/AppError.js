// estandarizar cómo manejar los errores en mi aplicación, 
// permitiéndote diferenciar entre errores "esperados" (del usuario) 
// y errores "inesperados" (del código).
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);

    this.statusCode = statusCode;

    // Buena práctica: marca si es error "esperado" (validación, not found, etc.)
    this.isOperational = true;

    // Buena práctica a tener stack trace limpio de Node
    Error.captureStackTrace(this, this.constructor);
  }
}

// Por qué es buena práctica:
// Diferencias entre errores “esperados” (404, 400…) y errores “críticos” (bugs, caídas).
// Permite devolver respuestas consistentes a frontend.

// Primero creamos nuestra clase de Error personalizado