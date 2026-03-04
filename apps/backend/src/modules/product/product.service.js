import { Product } from "./product.model.js";
/*
Sevice encargado de la lógica de negocio
El controlador solo recibe la request.
Aquí ocurre la creación real del producto.
*/

export async function createProduct(data) {
	/*
  Validación básica profesional
  Un producto debe tener al menos una variante
  */
	if (!data.variants || data.variants.length === 0) {
		throw new Error("El producto debe contener al menos una variante");
	}

	// Creamos el producto en MongoDB
	const product = await Product.create(data);

	return product;
}

// El service:
// contiene la lógica de negocio
// mantiene el controller limpio
// permite reutilizar la lógica en otros lugares
