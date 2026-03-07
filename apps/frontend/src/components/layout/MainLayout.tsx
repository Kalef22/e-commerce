import type { ReactNode } from "react";
import Header from "./Header";

type MainLayoutProps = {
  children: ReactNode;
};
// Layout principal de la aplicación.
// children representa cualquier contenido que se renderizara dentro del layout.

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
    <Header />
    <main className="container">{children}</main>
    </>
  )
}
// Concepto importante
// children permite que el layout envuelva páginas.
// <> ... </> (Fragments): Se usan para agrupar múltiples elementos (Header y main) 
// sin añadir un nodo extra innecesario al DOM real del navegador