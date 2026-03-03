import mongoose, { Mongoose } from "mongoose";

/* Conectar a MongoDB usando Mongoose
  Buena práctica:
  - Validar uri
  - log claro
  - si falla cerrar el proceso (sin DB no tiene sentido levantar API)
*/

export async function connectDB(uri) {
  if(!uri) {
    throw new Error("MONGODB_URI no está definida. Revisa tu archivo .env");
  }

  // Evita reconectar si ya está conectada
  const isConnected = mongoose.connection.readyState === 1;
  if(isConnected) return;

  try {
    await mongoose.connect(uri);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error de conexion a MongoDB", error.message);
    process.exit(1);
  }
}