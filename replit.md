# CodeScaffold - Interactive Coding Education Platform

## Overview

CodeScaffold is a desktop-first coding education web application designed for beginner and intermediate programmers to learn through interactive code scaffolding. The application provides a professional IDE-like experience with a 3-panel layout featuring code components, an editor, and output console.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for development and production
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: React Context API for file/project management, TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Code Editor**: Monaco Editor (VS Code editor) loaded dynamically from CDN

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL session store
- **Development**: Hot module replacement with Vite middleware integration

### Layout Structure
The application uses a fixed-height, full-width desktop layout with four main zones:
1. **Top Navigation Bar**: Logo, breadcrumb, language selector, run/save buttons
2. **Left Sidebar**: Collapsible code component sections (Variables, Loops, Conditionals, Functions, etc.)
3. **Center Editor Panel**: Monaco Editor with syntax highlighting and IntelliSense
4. **Bottom Console Panel**: Output display with execution results and error messages

## Key Components

### Core Components
- **TopNavigation**: Contains language selector, run/save buttons, and project controls
- **CodeSidebar**: Displays collapsible sections of code snippets organized by category
- **CodeEditor**: Monaco Editor wrapper with language-specific configurations
- **OutputConsole**: Terminal-style output display with execution results
- **FileManager**: File creation, deletion, and management interface
- **ProjectModal**: Project creation and management interface

### Context Management
- **FileContext**: Manages projects, files, active file state, and unsaved changes
- **Project Structure**: Each project contains multiple files with language-specific configurations
- **File Management**: Create, delete, rename files with automatic language detection

### Code Execution System
- **Python**: Uses Pyodide (Python in WebAssembly) for client-side execution
- **JavaScript**: Direct evaluation in browser environment
- **Other Languages**: Syntax highlighting only (C++, Java) with extensible architecture

## Data Flow

### Project Management Flow
1. Projects are stored in localStorage with automatic persistence
2. Each project contains metadata (name, language, creation date) and file collection
3. Active project and file state managed through React Context
4. Unsaved changes tracking with automatic warning prompts

### Code Execution Flow
1. User clicks "Run" button in TopNavigation
2. Active file content is sent to language-specific execution engine
3. Results (output, errors, execution time) are captured and formatted
4. OutputConsole receives and displays results with appropriate styling
5. Custom events handle communication between components

### File Operations Flow
1. File operations trigger context updates
2. Changes are immediately reflected in UI
3. Local storage is updated automatically
4. Unsaved changes are tracked per file with visual indicators

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form with Zod validation
- **UI Components**: Radix UI primitives, Lucide React icons, class-variance-authority
- **Development Tools**: Vite, TypeScript, Tailwind CSS, PostCSS
- **Code Execution**: Pyodide for Python, Monaco Editor for editing experience
- **State Management**: TanStack Query for async state, Wouter for routing

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM with PostgreSQL dialect, Neon Database serverless
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Dependencies
- **Replit Integration**: Custom Vite plugins for Replit environment
- **Error Handling**: Runtime error overlay for development
- **Code Quality**: TypeScript strict mode, ESLint configuration

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with HMR and TypeScript checking
- **Database**: Neon Database with connection pooling
- **Environment Variables**: DATABASE_URL required for database connectivity
- **Port Configuration**: Express server with Vite middleware integration

### Production Build
- **Frontend**: Vite build with optimized bundle splitting and asset optimization
- **Backend**: esbuild compilation to single JavaScript file with external dependencies
- **Database**: Drizzle migrations with push-based schema updates
- **Static Assets**: Served from dist/public directory

### Deployment Configuration
- **Build Scripts**: Separate development and production build processes
- **Database Management**: Drizzle Kit for schema management and migrations
- **Process Management**: Node.js process for production with environment-specific configurations
- **Error Handling**: Comprehensive error boundaries and logging

### Architecture Decisions

#### Frontend Architecture Choices
- **React Context over Redux**: Simpler state management for educational application scope
- **Monaco Editor**: Professional code editing experience familiar to developers
- **Tailwind CSS**: Rapid UI development with consistent design system
- **Client-side Execution**: Immediate feedback without server roundtrips for Python/JavaScript

#### Backend Architecture Choices
- **Express.js**: Minimal, flexible framework suitable for educational content delivery
- **Drizzle ORM**: Type-safe database operations with PostgreSQL integration
- **Neon Database**: Serverless PostgreSQL for scalable, managed database solution
- **Session-based Auth**: Simple authentication suitable for educational platform

#### Database Design Choices
- **PostgreSQL**: ACID compliance and advanced features for user data management
- **Drizzle Schema**: Type-safe database schema with automatic TypeScript generation
- **Session Storage**: PostgreSQL-backed sessions for reliable user state persistence

The application prioritizes developer experience and educational value, with a clean, IDE-like interface that scales well for desktop use while maintaining performance through efficient code execution and state management.