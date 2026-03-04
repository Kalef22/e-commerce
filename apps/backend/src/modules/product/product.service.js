import { Product } from "./product.model.js";
/*
Sevice encargado de la lógica de negocio
El controlador solo recibe la request.
Aquí ocurre la creación real del producto.
*/

export async function createProduct(data) {
  // Validación básica profesional
  // Un producto debe tener al menos una variante
	if (!data.variants || data.variants.length === 0) {
		throw new Error("El producto debe contener al menos una variante");
	}
	// Creamos el producto en MongoDB
	const product = await Product.create(data);
	return product;
}

export async function getProducts() {
  // find() devuelve todos los documentos de la colección
  const products = await Product.find().lean(); // lean() devuelve solo el dato objetos JSON normales, es más rápido, consume menos memoria.
  return products;
}

//obtener un producto por ID
export async function getProductById(id) {
  // findById busca un documento usando el _id de MongoDB
  const product = await Product.findById(id).lean();
  return product;
}

// El service:
// contiene la lógica de negocio
// mantiene el controller limpio
// permite reutilizar la lógica en otros lugares
