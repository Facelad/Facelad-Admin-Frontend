import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Clientes } from "./pages/Clientes";
import { Servicios } from "./pages/Servicios";
import { Plantillas } from "./pages/Plantillas";
import { Cobranza } from "./pages/Cobranza";
import { Reportes } from "./pages/Reportes";
import { Configuracion } from "./pages/Configuracion";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "clientes", Component: Clientes },
      { path: "servicios", Component: Servicios },
      { path: "plantillas", Component: Plantillas },
      { path: "cobranza", Component: Cobranza },
      { path: "reportes", Component: Reportes },
      { path: "configuracion", Component: Configuracion },
    ],
  },
]);
