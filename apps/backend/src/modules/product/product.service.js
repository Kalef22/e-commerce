import { Product } from "./product.model.js";
import { AppError } from "../../utils/AppError.js"
/*
Sevice encargado de la lógica de negocio
El controlador solo recibe la request.
Aquí ocurre la creación real del producto.
*/
function calculateTotalStock(variants) {
  // Sumamos el stock de todas las variantes
  return variants.reduce((total, variant) => total + variant.stock, 0);
}

function generateSlug(text) {
  return text
    .toLowerCase() // convierte a minúsculas
    .trim() // elimina espacios al inicio y final
    .normalize("NFD") // separa letras de acentos: á -> a + acento
    .replace(/[\u0300-\u036f]/g, "") // elimina los acentos
    .replace(/[^a-z0-9\s-]/g, "") // elimina caracteres raros
    .replace(/\s+/g, "-") // cambia espacios por guiones
    .replace(/-+/g, "-"); // evita guiones duplicados
}

// funcion que calcular el precio base
function calculateBasePrice(variants) {
  const prices = variants.map((variant) => variant.price);
  return Math.min(...prices);
}

export async function createProduct(data) {
  // Un producto debe tener al menos una variante
  if (!data.variants || data.variants.length === 0) {
    throw new AppError("El producto debe contener al menos una variante", 400);
  }

  // Calculamos datos derivados a partir de las variantes y el nombre
  const basePrice = calculateBasePrice(data.variants);
  const totalStock = calculateTotalStock(data.variants);
  const slug = generateSlug(data.name);

  const product = await Product.create({
    ...data,
    basePrice,
    totalStock,
    slug,
  });

  return product;
}

// Obtener productos con paginación y búsqueda
export async function getProducts({ page= 1, limit = 10, search, material}) {
  
  // Convertimos page y limit a número
  const pageNumber = Math.max(1, Number(page) || 1);
  const limitNumber = Math.max(1, Number(limit) || 10);

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
  const product = await Product.findById(id);
  return product;
}

// Actualizar producto por ID
export async function updateProduct(id, data) {
  // Si el update incluye variants, las validamos y recalculamos datos derivados
  if (data.variants) {
    if (!Array.isArray(data.variants) || data.variants.length === 0) {
      throw new AppError("El producto debe contener al menos una variante", 400);
    }

    data.basePrice = calculateBasePrice(data.variants);
    data.totalStock = calculateTotalStock(data.variants);
  }

  // Si el nombre cambia, regeneramos el slug
  if (data.name !== undefined) {
    data.slug = generateSlug(data.name);
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    throw new AppError("Producto no encontrado", 404);
  }

  return updatedProduct;
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
