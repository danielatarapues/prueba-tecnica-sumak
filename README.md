# 📦 CRUD de Productos - Sumak Technology

Este proyecto es una aplicación web para la gestión de inventario de productos, desarrollada como parte de la prueba técnica para **Sumak Technology**. Permite realizar operaciones CRUD completas (Crear, Leer, Actualizar y Eliminar) integradas con Supabase.

## 🚀 Tecnologías Utilizadas

**Framework:** [Next.js](https://nextjs.org/) (App Router).


**Lenguaje:** TypeScript para asegurar la integridad de los datos.


**Estilos:** [Tailand CSS](https://tailwindcss.com/) para un diseño limpio y responsivo.

 
**Backend:** [Supabase](https://supabase.com/) (Base de datos y Autenticación).


**Gestión de Estado:** React Hooks (`useState`, `useEffect`).



## 🛠️ Configuración y Ejecución

Sigue estos pasos para ejecutar el proyecto localmente:

### 1. Clonar el repositorio

```bash
git clone https://github.com/danielatarapues/prueba-tecnica-sumak.git
cd prueba-tecnica-sumak

```

### 2. Instalar dependencias

```bash
npm install

```

### 3. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto y añade tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_llave_anonima

```

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev

```

La aplicación estará disponible en [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).


## 🗄️ Configuración de la Base de Datos (Supabase)

Para que el sistema funcione correctamente, se debe configurar la tabla en el dashboard de Supabase de la siguiente manera:

1. **Tabla `products`**:


* `id`: uuid o int8 (Primary Key).
* `name`: text (Nombre del producto).
* `description`: text (Descripción del producto).
* `price`: numeric o float8 (Precio del producto).
* `created_at`: timestamp (Para ordenamiento de registros).


2. **Políticas de Seguridad (RLS)**:
   
Dado que el proyecto incluye autenticación, las políticas deben configurarse para usuarios autenticados. Habilitar RLS y crear políticas que permitan a los usuarios authenticated:

**SELECT**: Para visualizar el listado de productos.


**INSERT**: Para la creación de nuevos registros.


**UPDATE**: Para permitir la edición de productos existentes.


**DELETE**: Para habilitar la eliminación de registros.




## 💡 Decisiones Técnicas y Justificación

De acuerdo con los requerimientos de la prueba:

 
**Client-side Rendering (CSR):** Se optó por realizar el fetch de datos en el cliente mediante `useEffect` y el SDK de Supabase. Esta decisión se tomó para facilitar el manejo de estados en tiempo real durante las operaciones CRUD y para gestionar la protección de rutas mediante la sesión activa del usuario de forma inmediata.

  
**Organización de Código:** Se implementó una arquitectura limpia separando la lógica de negocio en servicios (`/services`), componentes reutilizables (`/components`) y definición de tipos (`/types`) para mejorar la escalabilidad y legibilidad.


**Autenticación:** Aunque era opcional, se integró Supabase Auth para demostrar un flujo completo de gestión de productos protegido por sesión.



## 📋 Características Implementadas

**Listado:** Visualización dinámica de productos desde la base de datos.


**Creación/Edición:** Formulario reactivo que valida y sincroniza datos con el backend.


**Eliminación:** Borrado seguro con diálogo de confirmación previo.


**UX/UI:** Diseño moderno basado en la propuesta visual de la prueba.



---

Desarrollado por **Daniela Tarapues** para Sumak Technology.
