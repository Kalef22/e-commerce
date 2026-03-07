import { useEffect, useState } from "react";
import ProductCard from "../components/product/ProductCard"
import { getProducts } from "../services/product.service";
import type { Product } from "../types/product";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await getProducts();
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}