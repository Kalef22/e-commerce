import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-row">
        <h1 className="site-logo">
          <Link to="/">Joyeria Victoria</Link>
        </h1>
        <Link to="/cart" className="cart-link">Carrito</Link>
      </div>
    </header>
  );
}
