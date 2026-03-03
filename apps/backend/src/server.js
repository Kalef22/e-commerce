import "dotenv/config"; // importacion magica
import { createApp } from "./app.js";

const PORT = process.env.PORT || 4000;

const app = createApp();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Buenas prácticas:
  // Usar variable de entorno
  // No hardcodear puerto
  // Separar app de server