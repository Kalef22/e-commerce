import multer from "multer";
import path from "node:path"; // herramienta nativa de Node.js que ayuda a gestionar las rutas de los archivos
import fs from "node:fs"; // herramienta nativa de Node.js que permite interactuar con el sistema de archivos

// Ruta absoluta donde se guardarán las imágenes
// Buena práctica: asegurarnos de que la carpeta exista.
const uploadDir = path.resolve("uploads/products");

if(!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true});
}

// storage define:
// - dónde guarda el archivo
// - con qué nombre se guarda
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    // Creamos un nombre único para evitar colisiones:
    // Date.now() + nombre saneado
    const ext = path.extname(file.originalname);
    const baseName = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

      cb(null, `${Date.now()}-${baseName}${ext}`)
  }
})

// fileFilter permite aceptar solo imágenes
const fileFilter = (_req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes JPG, PNG O WEBP"))
  }
}

// limits evita archivos demasiado grandes, 5 MB por imagen
export const uploadProductImage = multer({
  storage,
  fileFilter,
  limit: {
    fileSize: 5 * 1024 * 1024
  },
});

// diskStorage le dice a Multer que guarde el archivo en disco. 
// fileFilter nos ayuda a aceptar solo tipos válidos, 
// y el límite de tamaño evita subidas absurdamente grandes. 
// Multer se usa precisamente para procesar formularios multipart/form-data, 
// que es el formato típico de subida de archivos.
