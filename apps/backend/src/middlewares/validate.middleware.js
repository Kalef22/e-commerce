import { ZodError } from "zod";

/*
validate(schema)
- schema: objeto Zod con { body?, params?, query? }
- Buena práctica: validar ANTES del controller para evitar datos corruptos en DB.
*/

export function validate(schema) {
  return (req, _res, next) => {
    try {
      // parse() lanza error si no cumple el schema
      if(schema.body) req.body = schema.body.parse(req.body);
      if(schema.params) req.params = schema.params.parse(req.params);
      if(schema.query) req.query = schema.query.parse(req.query);

      next();
    } catch(err) {
      // Convertimos el ZodError a un error entendible por nuestro errorHandler
      if(err instanceof ZodError) {
        //mensaje simple + lista de errores por campo
        const details = err.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        }));

        // Creamos error estándar (sin wrapper todavía) y lo mandamos al errorHandler
        const error = new Error("Validation error");
        error.statusCode = 400; // Express no lo trae por defecto, lo añadimos nosotros
        error.details = details;
        return next(error);
      }

      next(err);
    }
  }
}

// Clave:
  // Validar aquí evita “basura” en MongoDB.
  // Dejamos el controller limpio.
  // Si falla, devolvemos 400 (cliente mandó mal la data).