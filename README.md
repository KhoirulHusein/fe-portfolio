# Portfolio Frontend

A modern portfolio dashboard built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- 🔐 **Complete Authentication System** - Login, Register, Forgot Password with JWT/cookie auth
- 📱 **Responsive Dashboard** - Collapsible sidebar with mobile support
- 🎨 **Modern UI Components** - Built with shadcn/ui and Tailwind CSS
- 🚀 **App Router & Server Components** - Next.js 15 with optimized performance
- 📊 **State Management** - Zustand for auth, React Query for server state
- 🧪 **Testing Suite** - Vitest + Testing Library for unit and integration tests
- 🎯 **Type Safety** - Full TypeScript with Zod validation
- 🌙 **Dark Mode** - Built-in theme switching
- 📐 **Atomic Design** - Organized component architecture

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** Zustand + React Query
- **Forms:** React Hook Form + Zod
- **HTTP:** ky with credential support
- **Testing:** Vitest + Testing Library + MSW
- **Icons:** Lucide React

## Prerequisites

- Node.js 18+ 
- pnpm (recommended)
- Backend API running on port 4000

## Environment Setup

1. **Clone and install dependencies:**
```bash
git clone <repository>
cd fe-portfolio
pnpm install
```

2. **Environment Variables:**
Create `.env.local` in the root directory:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

3. **Backend Integration:**
Ensure your backend API is running on `http://localhost:4000` with these endpoints:
```
POST /api/v1/auth/login
POST /api/v1/auth/register  
POST /api/v1/auth/forgot-password
GET  /api/v1/auth/me
POST /api/v1/auth/logout
GET  /api/v1/admin/dashboard/stats
GET  /api/v1/admin/projects
GET  /api/v1/admin/experiences
GET  /api/v1/admin/about
```

## Development

**Start development server:**
```bash
pnpm dev
```
Visit [http://localhost:3000](http://localhost:3000)

**Available Scripts:**
```bash
pnpm dev          # Development server
pnpm build        # Production build  
pnpm start        # Start production server
pnpm lint         # ESLint
pnpm test:unit    # Run all tests
pnpm test:watch   # Test watch mode
pnpm test:auth    # Test auth service only
pnpm test:guard   # Test dashboard guard only
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes (login, register)
│   ├── (dashboard)/       # Protected dashboard routes
│   └── layout.tsx         # Root layout with providers
├── components/            # Atomic Design components
│   ├── atoms/            # Basic form inputs
│   ├── molecules/        # Compound components
│   ├── organisms/        # Complex UI sections
│   ├── templates/        # Page-level layouts
│   ├── layouts/          # App-wide providers
│   └── ui/               # shadcn/ui components
├── features/             # Feature-based modules
│   └── auth/            # Authentication feature
│       ├── components/   # Auth-specific components  
│       ├── hooks/        # Zustand auth store
│       └── __tests__/    # Feature tests
├── lib/                  # Utilities and services
│   ├── endpoint.ts       # API endpoint constants
│   ├── http.ts           # HTTP client (ky)
│   ├── admin.service.ts  # Dashboard API calls
│   └── ui-store.ts       # UI state (sidebar)
└── middleware/           # Guards and HOCs
```

## Authentication Flow

1. **Login/Register:** Forms validate with Zod schemas
2. **HTTP Requests:** ky client sends credentials with all requests  
3. **Cookie Storage:** Backend sets HttpOnly cookies for security
4. **Auth Store:** Zustand manages user state with persistence
5. **Route Guard:** Dashboard layout checks auth on mount
6. **Auto Redirect:** Unauthenticated users redirect to `/login`

## API Integration

- **HTTP Client:** ky with automatic credential inclusion
- **Error Handling:** Centralized error mapping with user-friendly messages  
- **Response Normalization:** Handles different backend response formats
- **React Query:** Caching, retries, and optimistic updates
- **Loading States:** Skeleton UI during API calls

## Testing Strategy

**Auth Service Tests (`test:auth`):**
- Login success/failure scenarios
- User state management  
- Error handling and mapping
- Store integration

**Dashboard Guard Tests (`test:guard`):**
- Route protection logic
- Loading states and redirects
- Auth state transitions
- Component rendering conditions

**Run Tests:**
```bash
# All tests
pnpm test:unit

# Specific test suites  
pnpm test:auth
pnpm test:guard

# Watch mode during development
pnpm test:watch
```

## Deployment

1. **Build for production:**
```bash
pnpm build
```

2. **Environment Variables:**
Set `NEXT_PUBLIC_API_BASE_URL` to your production API URL

3. **Deploy:**
The app can be deployed to Vercel, Netlify, or any Node.js hosting platform.

## Key Features Implemented

✅ **Authentication System**
- Complete login/register/forgot password flow
- JWT/cookie-based auth with HttpOnly cookies
- Client-side auth state management with persistence
- Protected route guards

✅ **Dashboard Interface**  
- Responsive collapsible sidebar
- Dashboard overview with stats
- Projects and experiences management
- Settings page placeholder

✅ **API Integration**
- RESTful API client with error handling
- React Query for server state management
- Loading states and error boundaries
- Optimistic updates

✅ **Testing Coverage**
- Auth service unit tests
- Route guard integration tests  
- MSW for API mocking
- Component rendering tests

## Contributing

This project follows atomic design principles and feature-based architecture. When adding new features:

1. Create components in the appropriate atomic level
2. Add feature modules under `src/features/`
3. Write tests for critical paths
4. Update API services for new endpoints
5. Maintain TypeScript strict mode compliance

## License

This project is for portfolio demonstration purposes.
