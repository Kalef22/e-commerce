import { createProduct } from "./product.service.js";

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
