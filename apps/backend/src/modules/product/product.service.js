import { Product } from "./product.model.js";
import { AppError } from "../../utils/AppError.js"
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
export async function getProducts({ page= 1, limit = 10, search, material}) {
  
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

  // filtro por material
  if(material) {
    query["variants.attributes.material"] = material;
  }

  const skip = (pageNumber - 1) * limitNumber;

  // lean() mejora el rendimiento, Esto devuelve objetos JSON planos, que consumen menos memoria, en este caso no se usara porque salta las opciones del schema
  const products = await Product.find(query).skip(skip).limit(limitNumber);
  const cleanedProducts = products.map(p => p.toJSON());

  const total = await Product.countDocuments(query);
  
  // lean() devuelve solo el dato objetos JSON normales, es más rápido, consume menos memoria.
  return {
    products: cleanedProducts,
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

// Actualizar imagen principal
export async function updateProductMainImage(id, mainImage) {
  // Buscamos el producto por id
  const product = await Product.findById(id);

  // Si no existe, devolvemos null para que el controller responda 404
  if(!product) {
    return null;
  }

  // Validamos que la imagen exista dentro del array images
  const imageExists = product.images.includes(mainImage);

  // Si la imágen no pertenece al producto, lanzamos error de negocio
  if(!imageExists) {
    throw new AppError("La imagen indicada no existe en este producto", 400);
  }

  // Actualizamos la imagen principal
  product.mainImage = mainImage;

  await product.save();

  return product;
}

// El service:
// contiene la lógica de negocio
// mantiene el controller limpio
// permite reutilizar la lógica en otros lugares
