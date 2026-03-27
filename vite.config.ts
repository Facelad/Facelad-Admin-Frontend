import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración de Vite
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // puedes cambiar el puerto si lo necesitas
  },
});