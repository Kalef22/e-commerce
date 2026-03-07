import MainLayout from "../components/layout/MainLayout";
import HomePage from "../features/products/pages/HomePage";

// App es el punto de entrada de la aplicación React.
// Aquí conectamos el layout principal con las páginas.
// Aqui se añadira el router

export default function App() {
	return (
		<MainLayout>
			<HomePage />
		</MainLayout>
	);
}
