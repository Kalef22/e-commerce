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

// Obtener productos con paginación y búsqueda

export async function getProducts({ page= 1, limit = 10, search}) {
  
  // Convertimos page y limit a número
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  // query es el filtro que MongoDB usará
  const query = {};

  // Si existe búsqueda
  if(search) {
    query.name = {
      $regex: search,
      $options: "i" // búsqueda sin importar mayúsculas
    };
  }

  const skip = (pageNumber - 1) * limitNumber;

  const products = await Product.find(query).skip(skip).limit(limitNumber);

  const total = await Product.countDocuments(query);
  
  // lean() devuelve solo el dato objetos JSON normales, es más rápido, consume menos memoria.
  return {
    products,
    page: pageNumber,
    totalPages: Math.ceil(total / limitNumber),
    total
  };
} // despues modificamos el controller

// Obtener un producto por ID
export async function getProductById(id) {
  // findById busca un documento usando el _id de MongoDB
  const product = await Product.findById(id).lean();
  return product;
}

// Actualizar producto por ID
export async function updateProduct(id, data) {
  /*
  findByIdAndUpdate:
  1. busca el documento por _id
  2. aplica los cambios
  3. devuelve el documento actualizado
  */
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,  // devuelve el documento actualizado, sin esto MongoDB devolvería el documento antiguo.
    runValidators: true   // ejecuta las validaciones del schema
  }).lean();

  return product;
}

// Eliminar producto por ID
export async function deleteProduct(id) {
  // devuelve el producto eliminado o null si no existe.
  const product = await Product.findByIdAndDelete(id);
  return product;
}

// El service:
// contiene la lógica de negocio
// mantiene el controller limpio
// permite reutilizar la lógica en otros lugares
