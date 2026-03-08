import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { slug } = useParams();

  return (
    <div className="container mt-5">
      <h1>Detalle del producto</h1>
      <p>Slug del producto:</p>

      <strong>{ slug }</strong>
    </div>
  );
}