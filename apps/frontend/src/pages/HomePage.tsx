import { useEffect, useState } from "react";
import { getProducts } from "../services/product.service";
import type { Product } from "../types/product";

/*
HomePage:
- carga los productos desde el backend
- muestra loading
- muestra error
- renderiza la lista
*/
export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await getProducts();

        // El backend devuelve { products: [...] }
        setProducts(response.products);
      } catch (err) {
        setError("Hubo un problema al cargar los productos");
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Nuestros productos</h2>

      {products.length === 0 ? (
        <p>No hay productos disponibles todavía.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-image-placeholder">
                {product.mainImage ? (
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="product-image"
                  />
                ) : (
                  <span>Sin imagen</span>
                )}
              </div>

              <h3>{product.name}</h3>

              <p className="product-price">
                Desde €{product.basePrice.toFixed(2)}
              </p>

              <p>{product.inStock ? "Disponible" : "Agotado"}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}