// Servicio para hablar con la API
import type { ProductsResponse } from "../types/product"
import type { Product } from "../types/product";

const API_URL = "http://localhost:3000/api";

// Obtiene la lista de productos
export async function getProducts(): Promise<ProductsResponse> {
  const response = await fetch(`${API_URL}/products`);

  if(!response.ok) {
    throw new Error("No se pudieron cargar los productos");
  }
  
  const data: ProductsResponse = await response.json();
  return data;
}

// Obtiene un producto por slug
export async function getProductBySlug(slug: string): Promise<Product> {
	const response = await fetch(`${API_URL}/products/${slug}`);

	if (!response.ok) {
		throw new Error("No se pudo cargar el producto");
	}

	return response.json();
}