import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// App: Es mi componente principal, el "padre" de todos los demás componentes que voy a crear.
