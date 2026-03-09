import type { Product } from "../types/product";
import { Link } from "react-router-dom"; 
// Link permite navegar entre páginas sin recargar el navegador

type ProductCardProps = {
	product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
	return (

		// Link convierte toda la tarjeta en un enlace
		<Link to={`/products/${product.id}`} className="product-card">

			<article>

				<div className="product-image-placeholder">
					{product.mainImage ? (
						<img
							src={product.mainImage}
							alt={product.name}
							className="product-image"

							// Si la imagen falla, la ocultamos
							onError={(e) => {
								e.currentTarget.style.display = "none";
							}}
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

		</Link>
	);
}
// pinta cada producto
