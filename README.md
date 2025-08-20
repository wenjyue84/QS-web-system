# QC Web App for Rui Sin Plastic

A comprehensive Quality Control (QC) management system designed specifically for plastic manufacturing operations. This web application provides real-time inspection tracking, quality assurance workflows, and comprehensive reporting capabilities.

## 🌟 Features

### Core Functionality
- **Inspection Queue Management** - Prioritized queue with real-time status updates
- **Digital Inspection Forms** - Customizable inspection templates with measurement tracking
- **Non-Conformance Management** - Track and manage quality holds and non-conformance reports
- **Drop Test Wizard** - Guided standardized drop testing procedures
- **Quality Reports & KPIs** - Real-time dashboard with performance metrics
- **Multi-language Support** - English, Chinese, and Bahasa Malaysia

### Technical Features
- **Offline-First Design** - Continue working even without internet connectivity
- **Responsive UI** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern React Architecture** - Built with TypeScript and modern React patterns
- **Accessible Design** - WCAG compliant with keyboard navigation support
- **Dark Mode Support** - User-friendly interface in light and dark themes

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18.0 or higher)
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/qc-web-app-rui-sin-plastic.git
   cd qc-web-app-rui-sin-plastic
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be available in the `dist` directory.

## 🏗️ Project Structure

```
qc-web-app-rui-sin-plastic/
├── components/           # React components
│   ├── figma/           # Figma-generated components
│   ├── layout/          # Layout components (AppShell, etc.)
│   ├── pages/           # Page components
│   ├── qc/              # QC-specific components
│   └── ui/              # Reusable UI components (shadcn/ui)
├── context/             # React context providers
├── data/                # Mock data and constants
├── styles/              # Global CSS and styling
├── types/               # TypeScript type definitions
├── App.tsx              # Main application component
└── package.json         # Project dependencies and scripts
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Context API
- **Development**: ESLint, TypeScript, Hot Module Replacement

## 🎨 Design System

The application uses a comprehensive design system with:

- **Color Tokens**: Semantic color system with light/dark mode support
- **Typography**: Inter font family with consistent sizing scale
- **Spacing**: 8px grid system for consistent layouts
- **Components**: Accessible, composable UI components
- **Icons**: Consistent iconography using Lucide React

## 📱 Features Overview

### Inspection Queue
- Real-time queue updates with priority indicators
- Status badges (Due, Early, Late, Locked)
- User assignment and locking mechanisms
- Filtering and sorting capabilities

### Inspection Process
- Step-by-step guided workflows
- Digital measurement recording
- Photo attachment support
- Automatic calculation validation
- Out-of-specification detection

### Quality Management
- Non-conformance tracking
- Hold management with release workflows
- Automated label printing integration
- Compliance reporting

### Reporting & Analytics
- First Pass Yield tracking
- On-time inspection metrics
- Active holds monitoring
- Trend analysis and KPI dashboards

## 🌍 Internationalization

The application supports multiple languages:
- **English** (Default)
- **Chinese (中文)**
- **Bahasa Malaysia**

Language switching is available in the top navigation bar.

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://your-api-endpoint.com
VITE_API_KEY=your-api-key

# Printer Configuration
VITE_ZEBRA_PRINTER_IP=192.168.1.100

# Feature Flags
VITE_ENABLE_OFFLINE_MODE=true
VITE_ENABLE_DEBUG_MODE=false
```

### Tailwind Configuration

The project uses a custom Tailwind configuration with design tokens. Modify `tailwind.config.js` to customize the design system.

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

### Code Style

This project follows:
- ESLint configuration for code quality
- TypeScript strict mode
- Prettier for code formatting
- Conventional commit messages

## 📦 Deployment

### Build and Deploy

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting provider:
   - **Netlify**: Drag and drop the dist folder
   - **Vercel**: Connect your GitHub repository
   - **AWS S3**: Upload dist contents to S3 bucket
   - **Apache/Nginx**: Copy dist contents to web server directory

### Docker Deployment

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About Rui Sin Plastic

Rui Sin Plastic is a leading manufacturer of high-quality plastic products. This QC Web Application is designed to support our commitment to excellence in quality assurance and continuous improvement in manufacturing processes.

## 📞 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation wiki

---

**Made with ❤️ for manufacturing excellence**
