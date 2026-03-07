import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image-placeholder">
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
          <span>Sin imagen</span>
        )}
      </div>

      <h3>{product.name}</h3>

      <p className="product-price">Desde €{product.basePrice.toFixed(2)}</p>

      <p>{product.inStock ? "Disponible" : "Agotado"}</p>
    </article>
  );
}