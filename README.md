# To-Do App — Prueba Técnica Legalario

**Autor:** Francisco Acosta  
**Fecha de realización:** Lunes 14 de abril, de 11:00 a 17:00 hrs  
**Repositorio:** [GitHub - FranciscoAcosta-ctrl/to-do-app (v2-animate-filter)](https://github.com/FranciscoAcosta-ctrl/to-do-app/tree/v2-animate-filter)

## 🧠 Objetivo

Esta aplicación fue desarrollada como parte de la prueba técnica de Legalario. El objetivo es demostrar habilidades en:

- Estructuración de un proyecto con Next.js y TypeScript
- Desarrollo de componentes reutilizables
- Manejo del estado y persistencia en `localStorage`
- Diseño limpio y experiencia de usuario efectiva

---

## 🚀 Funcionalidades Implementadas

- ✅ Crear nuevas tareas con validación de campos
- ✅ Editar tareas existentes (título, descripción, estado)
- ✅ Eliminar tareas
- ✅ Cambiar estado de las tareas entre: Por hacer, En curso, Completada
- ✅ Visualización de las tareas en formato de tabla
- ✅ Filtro de tareas por estado
- ✅ Búsqueda por título o descripción
- ✅ Persistencia de los datos en `localStorage`

---

## 📦 Tecnologías Utilizadas

- **Framework:** Next.js 14 + React 18
- **Lenguaje:** TypeScript
- **Almacenamiento:** localStorage
- **Estilos:** Tailwind
- **Versión de Node:** `v22.14.0`

---

🧠 Decisiones Técnicas

- Persistencia: Usé localStorage para mantener los datos entre sesiones, manejado a través de un custom hook.
- Visualización: Las tareas se muestran en un formato de tabla que mejora la legibilidad y organización.
- Estructura: Separación clara de lógica, presentación y tipos. Uso de componentes funcionales reutilizables.

---

🛠 Instalación y Ejecución

# Clona el repositorio

git clone https://github.com/FranciscoAcosta-ctrl/to-do-app.git
cd to-do-app

# Cambia a la rama usada para la prueba

git checkout v2-animate-filter

# Asegúrate de usar Node v22.14.0

nvm use 22.14.0

# Instala dependencias

npm i

# Inicia el servidor local

npm run dev

📝 Mejoras Futuras

Implementar funcionalidad de arrastrar y soltar (drag & drop) para cambiar tareas de estado visualmente
Agregar test unitarios y pruebas de integración
Mejoras de accesibilidad (a11y)
Dark mode / White mode
