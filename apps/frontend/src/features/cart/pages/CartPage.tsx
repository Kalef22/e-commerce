export default function CartPage() {
  return (
    <section>
      <h2>Tu carrito</h2>
      <p>Esta es una vista demo para la presentacion.</p>

      <div className="cart-box">
        <p>Anillo Eternal Aura x1 - €4,500.00</p>
        <p>Collar Cascada x1 - €3,200.00</p>
        <hr />
        <p><strong>Total: €7,700.00</strong></p>
        <button className="checkout-btn" type="button">Proceder al pago</button>
      </div>
    </section>
  );
}
