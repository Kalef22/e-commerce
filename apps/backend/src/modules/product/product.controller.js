import { createProduct, getProducts } from "./product.service.js";

// Controller se encarga de manejar la request HTTP

export async function create(req, res, next) {
	try {
		// req.body contiene el JSON enviado por el cliente
		const product = await createProduct(req.body);

		res.status(201).json(product);
	} catch (error) {
		// next envía el error al middleware global
		next(error);
	}
}

// GET /products
// Lista todos los productos

export async function getAll(_req, res, next) {
  try {
    const products = await getProducts();
    res.status(200).json(products)
  } catch (error) {
    next(error);
  }
}