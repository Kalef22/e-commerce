import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

import HomePage from "../features/products/pages/HomePage";
import ProductPage from "../features/products/pages/ProductPage";
import CartPage from "../features/cart/pages/CartPage";

export default function App() {
  return (
    <MainLayout>
      <Routes>

        {/* Página principal */}
        <Route path="/" element={<HomePage />} />

        {/* Página detalle producto */}
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />

      </Routes>
    </MainLayout>
  );
}
// Routes
// Es el contenedor de todas las rutas.
