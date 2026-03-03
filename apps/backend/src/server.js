import "dotenv/config"; // importacion magica
import { connectDB } from "./config/db.js";
import { createApp } from "./app.js";

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  await connectDB(process.env.MONGODB_URI);

  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

bootstrap();

// Buenas prácticas:
  // Usar variable de entorno
  // No hardcodear puerto
  // Separar app de server