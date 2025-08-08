# Chat Alicorp

Una aplicación de chat moderna construida con las tecnologías más recientes de React y Next.js para interactuar con Alicorp.

## 📋 Prerequisitos

Asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **pnpm** (recomendado)

## 🛠️ Instalación

1. **Clona el repositorio:**

```bash
git clone <url-del-repositorio>
cd chat-alicorp
```

2. **Instala las dependencias:**

```bash
pnpm install
```

3. **Configura las variables de entorno:**

```bash
cp .env.example .env.local
```

## 🔧 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Habilita/deshabilita Mock Service Worker para desarrollo
NEXT_PUBLIC_ENABLE_MSW=true
```

### Variables Disponibles:

- `NEXT_PUBLIC_ENABLE_MSW`: Controla si se usan datos mockeados (`true`) o la API real (`false`)

## 🚀 Desarrollo

**Ejecuta el servidor de desarrollo:**

```bash
pnpm dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## 📝 Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo con Turbopack
- `pnpm build` - Construye la aplicación para producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm lint` - Ejecuta ESLint para revisar el código

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
src/
├── app/                    # App Router de Next.js
│   ├── config/            # Configuración de la aplicación
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
│
├── core/                   # Utilidades y funciones base
│   ├── hooks/             # Hooks reutilizables
│   ├── interfaces/        # Interfaces globales
│   ├── services/          # Servicios base y utilidades
│   ├── styles/            # Estilos globales
│   └── utils/             # Funciones utilitarias
│
├── features/              # Funcionalidades por dominio
│   ├── chat/              # Dominio del chat
│   │   ├── components/    # Componentes específicos del chat
│   │   ├── hooks/         # Hooks del dominio chat
│   │   ├── models/        # Interfaces y tipos del chat
│   │   └── services/      # Servicios API del chat
│   │
│   └── sidebar/           # Dominio del sidebar
│       ├── components/    # Componentes del sidebar
│       ├── hooks/         # Hooks del sidebar
│       ├── models/        # Interfaces del sidebar
│       └── services/      # Servicios del sidebar
│
├── integrations/          # Integraciones y providers
│   └── providers/         # Context providers
│       ├── ChatProvider/  # Provider del contexto de chat
│       ├── MSWProvider/   # Mock Service Worker
│       ├── ReactQueryProvider/  # React Query
│       └── ThemeProvider/ # Temas (claro/oscuro)
│
└── ui/                    # Componentes de UI reutilizables
    ├── Button/
    ├── DropdownMenu/
    ├── Skeleton/
    └── ...
```

### Principios de Arquitectura

1. **Separación por Dominio**: Cada feature tiene su propia carpeta con componentes, hooks y servicios
2. **Providers Centralizados**: Todos los context providers están en `integrations/providers`
3. **Componentes Reutilizables**: UI components genéricos en la carpeta `ui`
4. **Utilidades Core**: Funciones y hooks base en `core`

## 🚀 Tecnologías Principales

### Frontend Framework

- **Next.js 15.4.5** - Framework de React con App Router
- **React 19.1.0** - Biblioteca de interfaces de usuario
- **TypeScript 5** - Superset de JavaScript con tipado estático

### Styling & UI

- **Tailwind CSS 4** - Framework de CSS utilitario
- **Radix UI** - Componentes primitivos accesibles
- **Lucide React** - Iconos SVG
- **next-themes** - Soporte para temas claro/oscuro

### Estado y Datos

- **TanStack Query (React Query)** - Manejo de estado del servidor
- **Context API** - Estado global de la aplicación
- **localStorage** - Persistencia local de datos

### Desarrollo y Testing

- **MSW (Mock Service Worker)** - Mocking de APIs para desarrollo
- **ESLint** - Linter para calidad de código
- **Turbopack** - Bundler ultrarrápido para desarrollo

### Utilidades

- **class-variance-authority** - Utilidad para variantes de clases CSS
- **clsx** - Utilidad para concatenar clases CSS condicionalmente
- **tailwind-merge** - Merge inteligente de clases de Tailwind

## 🧪 Desarrollo con Mock Data

La aplicación incluye **Mock Service Worker (MSW)** para simular respuestas de API durante el desarrollo:

- Los mocks están en `src/integrations/providers/MSWProvider/handlers/mocks/`
- Se puede habilitar/deshabilitar con `NEXT_PUBLIC_ENABLE_MSW`
- Incluye simulación de chat con respuestas automáticas del asistente
- Persistencia local usando localStorage

## 🎨 Características

### Funcionalidades del Chat

- ✅ Envío y recepción de mensajes
- ✅ Historial de conversaciones
- ✅ Crear nuevos chats
- ✅ Eliminar conversaciones
- ✅ Estados de carga y pensamiento
- ✅ Persistencia local de datos

### UI/UX

- ✅ Tema claro/oscuro
- ✅ Diseño responsive
- ✅ Sidebar con historial
- ✅ Animaciones suaves
- ✅ Componentes accesibles

### Desarrollo

- ✅ TypeScript estricto
- ✅ ESLint configurado
- ✅ Hot reload con Turbopack
- ✅ Arquitectura escalable
- ✅ Mocks para desarrollo

## 🚢 Despliegue

Para construir y ejecutar en producción:

```bash
# Construir la aplicación
pnpm build

# Ejecutar en producción
pnpm start
```

La aplicación estará disponible en https://chat-alicorp-592taiuho-iwachs-projects.vercel.app/
