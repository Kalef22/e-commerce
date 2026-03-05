import {
	createProduct,
	getProducts,
	getProductById,
  updateProduct,
  deleteProduct,
} from "./product.service.js";

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
		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
}

// GET /products/:id
export async function getById(req, res, next) {
	try {
		// uso de desestructuración para solo traerme una propiedad en este caso id del objeto
		const { id } = req.params;
		const product = await getProductById(id);

		// si no existe devolvemos 404
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
    const product = await updateProduct(id, req.body)

    // si el producto no existe
    if(!product) {
      return res.status(404).json({
        message: "Producto no encontrado"
      })
    }
    
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

// DELETE /product/:id
export async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const product = await deleteProduct(id);
    // si el producto no existe
    if(!product) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    res.status(200).json({
      message: "Producto borrado"
    })
  } catch (error) {
    next(error);
  }
}