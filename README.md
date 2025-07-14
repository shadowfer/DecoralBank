DecoralBank
Una aplicación bancaria moderna construida con Next.js, TypeScript y Tailwind CSS.

🚀 Demo
Puedes ver la aplicación en vivo en: v0-merge-coralbank-login.vercel.app

📋 Características
🔐 Sistema de autenticación seguro
💳 Gestión de cuentas bancarias
📊 Dashboard interactivo
🎨 Interfaz moderna y responsive
⚡ Rendimiento optimizado con Next.js 15
🔒 Tipado seguro con TypeScript
🎯 Componentes reutilizables con shadcn/ui
🛠️ Tecnologías
Framework: Next.js 15 (App Router)
Lenguaje: TypeScript
Estilos: Tailwind CSS
Componentes: shadcn/ui
Gestión de paquetes: pnpm
Deployment: Vercel
📁 Estructura del Proyecto
DecoralBank/
├── app/                    # App Router de Next.js
├── components/             # Componentes reutilizables
├── hooks/                  # Custom hooks
├── lib/                    # Utilidades y configuraciones
├── public/                 # Archivos estáticos
├── styles/                 # Estilos globales
├── components.json         # Configuración de shadcn/ui
├── next.config.mjs         # Configuración de Next.js
├── tailwind.config.ts      # Configuración de Tailwind
└── tsconfig.json          # Configuración de TypeScript
🚀 Instalación
Clona el repositorio

git clone https://github.com/shadowfer/DecoralBank.git
cd DecoralBank
Instala las dependencias

pnpm install
Configura las variables de entorno

cp .env.example .env.local
Edita el archivo .env.local con tus configuraciones.

Ejecuta el servidor de desarrollo

pnpm dev
Abre tu navegador

Visita http://localhost:3000 para ver la aplicación.

📝 Scripts Disponibles
pnpm dev          # Inicia el servidor de desarrollo
pnpm build        # Construye la aplicación para producción
pnpm start        # Inicia el servidor de producción
pnpm lint         # Ejecuta el linter
pnpm type-check   # Verifica los tipos de TypeScript
🔧 Configuración
Variables de Entorno
Crea un archivo .env.local en la raíz del proyecto:

# Base de datos
DATABASE_URL="your_database_url"

# Autenticación
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

# API Keys
API_KEY="your_api_key"
Configuración de Base de Datos
[Incluye aquí las instrucciones específicas para configurar la base de datos]

🎨 Componentes
El proyecto utiliza shadcn/ui para los componentes de la interfaz. Los componentes están organizados en:

components/ui/ - Componentes base de shadcn/ui
components/ - Componentes personalizados de la aplicación
🔐 Autenticación
[Describe aquí el sistema de autenticación implementado]

📱 Responsive Design
La aplicación está completamente optimizada para dispositivos móviles y de escritorio, utilizando Tailwind CSS para un diseño responsive.

🧪 Testing
pnpm test        # Ejecuta las pruebas
pnpm test:watch  # Ejecuta las pruebas en modo watch
🚀 Deployment
Vercel (Recomendado)
Conecta tu repositorio con Vercel
Configura las variables de entorno en el dashboard de Vercel
Despliega automáticamente con cada push a main
Otros Proveedores
La aplicación puede desplegarse en cualquier plataforma que soporte Next.js:

Netlify
Railway
AWS
Google Cloud Platform
🤝 Contribuir
Fork el proyecto
Crea una rama para tu feature (git checkout -b feature/AmazingFeature)
Commit tus cambios (git commit -m 'Add some AmazingFeature')
Push a la rama (git push origin feature/AmazingFeature)
Abre un Pull Request
📄 Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

👥 Autores
Fernely Flores
Juan Perez
Esteban Priego
Ian Relloso

🙏 Agradecimientos
Next.js por el increíble framework
shadcn/ui por los componentes
Tailwind CSS por el sistema de estilos
Vercel por el hosting
📞 Soporte
Si tienes alguna pregunta o necesitas ayuda, puedes:

Abrir un issue
Contactar al desarrollador: [tu-email@ejemplo.com]
⭐ ¡No olvides dar una estrella al proyecto si te ha sido útil!
