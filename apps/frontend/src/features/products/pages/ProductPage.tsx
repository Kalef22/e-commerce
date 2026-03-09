import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/product.service";
import type { ProductDetail } from "../types/product";

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        if (!id) {
          throw new Error("ID no valido");
        }

        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrio un error al cargar el producto");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <section className="product-detail">
      <div className="product-detail-image-wrapper">
        {product.mainImage ? (
          <img
            src={product.mainImage}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="product-image-placeholder">Sin imagen</div>
        )}
      </div>

      <div>
        <h1>{product.name}</h1>
        <p className="product-price">Desde €{product.basePrice.toFixed(2)}</p>
        <p>{product.inStock ? "Disponible" : "Agotado"}</p>
        <p>Stock total: {product.totalStock}</p>
        {product.description ? <p>{product.description}</p> : null}
      </div>
    </section>
  );
}
