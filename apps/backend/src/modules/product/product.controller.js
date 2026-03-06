import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, } from "./product.service.js";
import { Product } from "./product.model.js";

// Sube una imagen y la asocia a un producto.
// Espera:
// - req.params.id -> id del producto
// - req.file -> archivo subido por multer
export async function uploadImage(req, res, next) {
  try {
    const { id } = req.params;

    if(!req.file) {
      return res.status(400).json({
        message: "No se ha enviado ninguna imagen",
      })
    }

    const product = await Product.findById(id);

    if(!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      })
    }

    // Construimos la URL pública relativa
    // Ejemplo: /uploads/products/171000-anillo.jpg
    const imageUrl = `/uploads/products/${req.file.filename}`;

    product.images.push(imageUrl);
    await product.save();

    res.status(200).json({
      message: "Imagen subida correctamente",
      imageUrl,
      product,
    })
  } catch (error) {
    next(error);
  }
}

// Controller = capa HTTP
// Se encarga de recibir req, devolver res y pasar errores con next()

// POST /products
export async function create(req, res, next) {
  try {
    // req.body ya debería venir validado por el middleware validate()
    const product = await createProduct(req.body);

    res.status(201).json(product);
  } catch (error) {
    // Mandamos el error al middleware global
    next(error);
  }
}

// GET /products
export async function getAll(req, res, next) {
  try {
    const { page, limit, search, material } = req.query;

    const result = await getProducts({ page, limit, search, material });

    res.json(result);
  } catch (error) {
    next(error);
  }
} 

// GET /products/:id
export async function getById(req, res, next) {
  try {
    // Extraemos el id desde los params de la URL
    const { id } = req.params;

    const product = await getProductById(id);

    // Si no existe, devolvemos 404
    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

// PATCH /products/:id
export async function update(req, res, next) {
  try {
    const { id } = req.params;

    // req.body debería llegar validado por middleware
    const product = await updateProduct(id, req.body);

    // Si no existe el producto, devolvemos 404
    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

// DELETE /products/:id
export async function remove(req, res, next) {
  try {
    const { id } = req.params;

    const product = await deleteProduct(id);

    // Si no existe, devolvemos 404
    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      message: "Producto borrado",
    });
  } catch (error) {
    next(error);
  }
}