
  # Admin Dashboard for Digital Services

  This is a code bundle for Admin Dashboard for Digital Services. The original project is available at https://www.figma.com/design/q92hIOH7iAhwuGpWLVnjpu/Admin-Dashboard-for-Digital-Services.

## Manejo de package-lock.json y resolución de conflictos

El archivo `package-lock.json` es fundamental para asegurar que todos los desarrolladores y entornos de despliegue utilicen exactamente las mismas versiones de dependencias. Por ello, **debe mantenerse en el repositorio**.

### Buenas prácticas para evitar conflictos

- Antes de instalar, actualizar o eliminar dependencias, ejecuta siempre:
  ```sh
  git pull
  ```
- Si modificas dependencias (con `npm install`, `npm uninstall`, etc.), revisa los cambios en `package-lock.json` antes de hacer commit.
- Si ocurre un conflicto en `package-lock.json` al hacer merge o pull:
  1. Lee cuidadosamente las marcas de conflicto (`<<<<<<<`, `=======`, `>>>>>>>`).
  2. Elige la versión correcta de cada bloque, asegurando que las dependencias reflejen el estado deseado.
  3. Guarda el archivo y ejecuta:
    ```sh
    npm install
    ```
    Esto actualizará y limpiará el archivo según el estado final de `package.json`.
  4. Haz commit del archivo resuelto.

### ¿Qué hacer si el conflicto es muy grande o complejo?
1. Haz una copia de seguridad de tus cambios si es necesario.
2. Restaura el archivo a la última versión confirmada:
  ```sh
  git restore --staged package-lock.json
  git restore package-lock.json
  ```
3. Ejecuta:
  ```sh
  npm install
  ```
4. Haz commit del nuevo archivo generado.

### Notas adicionales
- **No edites manualmente `package-lock.json`**. Usa siempre los comandos de npm.
- Si tienes dudas, consulta con tu equipo antes de forzar un cambio.

Seguir estas recomendaciones evitará errores difíciles de reproducir y mantendrá el proyecto estable para todos.

  ## Running the code

## CI/CD y flujos de ramas

- **main**: Cada push o pull request a esta rama ejecuta lint y test automáticos (GitHub Actions). Solo si todo pasa, Vercel despliega automáticamente a producción.
- **develop**: Cada push o pull request ejecuta lint y test automáticos (GitHub Actions). Vercel solo genera previews, nunca despliega a producción.

### Comandos disponibles (en `/facelad`)

- `npm run lint`: Ejecuta eslint sobre todo el proyecto.
- `npm run test`: Ejecuta los tests con Vitest.
- `npm run coverage`: Ejecuta los tests y muestra el reporte de cobertura.

### Archivos de configuración

- `.github/workflows/ci-main.yml`: CI para rama main.
- `.github/workflows/ci-develop.yml`: CI para rama develop.

### Recomendaciones

- Solo hacer merge a main si develop está estable y pasa todos los checks.
- Si un workflow falla, revisa los logs en GitHub Actions antes de hacer merge.

El flujo asegura calidad y despliegues controlados en producción.

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.