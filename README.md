# 🎮 Level UP - Tienda Gamer Online

Proyecto de tienda online de productos gamer desarrollado con React + Vite, migrado desde una versión original en HTML/CSS/JS vanilla.

## 📋 Descripción

Aplicación web tipo e-commerce con:
- 🛒 Carrito de compras con persistencia en localStorage
- 👤 Sistema de registro e inicio de sesión
- 📦 Catálogo de productos con filtros por categoría
- 🔍 Búsqueda de productos por nombre
- 📬 Formulario de contacto
- 🎨 Diseño responsive con Bootstrap 5

## 🚀 Tecnologías utilizadas

- **React 19** - Framework de UI
- **Vite 7** - Build tool y dev server
- **React Router 7** - Navegación entre páginas
- **Bootstrap 5** - Estilos y componentes responsive
- **Vitest 3** - Framework de testing
- **Testing Library** - Utilidades para testear componentes React
- **jsdom** - Entorno DOM para tests


## ⚙️ Instalación y uso

### Requisitos previos
- Node.js 18+ 
- npm

### Instalación

```bash
# Clonar el repositorio
git clone <URL_DEL_REPO>
cd level-up-react-v2

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (http://localhost:5173)
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar tests unitarios (modo watch)
npm test

# Ejecutar tests con interfaz gráfica
npm run test:ui

# Generar reporte de cobertura
npm run coverage