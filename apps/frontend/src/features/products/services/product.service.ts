// Servicio para hablar con la API
import type { ProductDetail, ProductsResponse } from "../types/product";

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

// Obtiene un producto por id
export async function getProductById(id: string): Promise<ProductDetail> {
	const response = await fetch(`${API_URL}/products/${id}`);

	if (!response.ok) {
		throw new Error("No se pudo cargar el producto");
	}

	const data: ProductDetail = await response.json();
	return data;
}
