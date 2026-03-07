// Servicio para hablar con la API
import type { ProductsResponse } from "../types/product"

const API_URL =  "http://localhost:3000/api/products";

// Obtiene la lista de productos desde el backend.
// Devolvemos la respues típada para que TypeScript
// no ayude a detectar errores desde el principio.

export async function getProducts(): Promise<ProductsResponse> {
  const response = await fetch( API_URL);

  // Buena práctica: si la respuesta HTTP falla lanzamos un error claro.
  // fetch no lanza un error automáticamente si el servidor responde con un 404 (No encontrado) 
  // o un 500 (Error del servidor). Sin este if, el código intentaría procesar una respuesta fallida 
  // como si fuera válida, lo que causaría errores más difíciles de depurar después.
  if(!response.ok) {
    throw new Error("No se pudieron cargar los productos");
  }
  
  const data: ProductsResponse = await response.json();
  return data;
}