import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./product.service.js";

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
export async function getAll(_req, res, next) {
  try {
    const products = await getProducts();

    res.status(200).json(products);
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