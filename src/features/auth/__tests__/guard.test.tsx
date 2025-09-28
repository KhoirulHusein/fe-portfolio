import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { AppProviders } from '@/components/layouts/AppProviders'
import DashboardLayout from '@/app/(dashboard)/layout'
import { useAuth } from '@/features/auth/hooks/useAuth'

// Mock the auth hook
vi.mock('@/features/auth/hooks/useAuth')

// Mock next/navigation
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock the DashboardShell component
vi.mock('@/components/templates/DashboardShell', () => ({
  DashboardShell: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-shell">{children}</div>
  ),
}))

const TestChild = () => <div data-testid="dashboard-content">Dashboard Content</div>

const renderDashboardLayout = () => {
  return render(
    <AppProviders>
      <DashboardLayout>
        <TestChild />
      </DashboardLayout>
    </AppProviders>
  )
}

describe('Dashboard Layout Guard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockPush.mockClear()
  })

  it('should show loading skeleton when status is loading', async () => {
    const mockUseAuth = vi.mocked(useAuth)
    mockUseAuth.mockReturnValue({
      user: null,
      status: 'loading',
      refreshMe: vi.fn(),
      login: vi.fn(),
      register: vi.fn(),
      forgotPassword: vi.fn(),
      logout: vi.fn(),
      setStatus: vi.fn(),
    })

    renderDashboardLayout()
    
    // Should show skeleton elements
    expect(screen.getByTestId).toBeDefined()
    expect(screen.queryByTestId('dashboard-content')).not.toBeInTheDocument()
  })

  it('should show loading skeleton when status is idle', async () => {
    const mockRefreshMe = vi.fn().mockResolvedValue(undefined)
    const mockUseAuth = vi.mocked(useAuth)
    mockUseAuth.mockReturnValue({
      user: null,
      status: 'idle',
      refreshMe: mockRefreshMe,
      login: vi.fn(),
      register: vi.fn(),
      forgotPassword: vi.fn(),
      logout: vi.fn(),
      setStatus: vi.fn(),
    })

    renderDashboardLayout()
    
    expect(mockRefreshMe).toHaveBeenCalled()
    expect(screen.queryByTestId('dashboard-content')).not.toBeInTheDocument()
  })

  it('should redirect to login when user is unauthenticated', async () => {
    const mockUseAuth = vi.mocked(useAuth)
    mockUseAuth.mockReturnValue({
      user: null,
      status: 'unauthenticated',
      refreshMe: vi.fn(),
      login: vi.fn(),
      register: vi.fn(),
      forgotPassword: vi.fn(),
      logout: vi.fn(),
      setStatus: vi.fn(),
    })

    renderDashboardLayout()
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login')
    })
  })

  it('should render dashboard content when user is authenticated', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      username: 'testuser',
      role: 'admin',
    }

    const mockUseAuth = vi.mocked(useAuth)
    mockUseAuth.mockReturnValue({
      user: mockUser,
      status: 'authenticated',
      refreshMe: vi.fn(),
      login: vi.fn(),
      register: vi.fn(),
      forgotPassword: vi.fn(),
      logout: vi.fn(),
      setStatus: vi.fn(),
    })

    renderDashboardLayout()
    
    await waitFor(() => {
      expect(screen.getByTestId('dashboard-shell')).toBeInTheDocument()
      expect(screen.getByTestId('dashboard-content')).toBeInTheDocument()
    })

    expect(mockPush).not.toHaveBeenCalled()
  })

  it('should call refreshMe on mount when status is idle', async () => {
    const mockRefreshMe = vi.fn().mockResolvedValue(undefined)
    const mockUseAuth = vi.mocked(useAuth)
    
    // First render with idle status
    mockUseAuth.mockReturnValue({
      user: null,
      status: 'idle',
      refreshMe: mockRefreshMe,
      login: vi.fn(),
      register: vi.fn(),
      forgotPassword: vi.fn(),
      logout: vi.fn(),
      setStatus: vi.fn(),
    })

    const { rerender } = renderDashboardLayout()
    
    expect(mockRefreshMe).toHaveBeenCalledTimes(1)

    // Simulate auth check completion with authenticated user
    mockUseAuth.mockReturnValue({
      user: {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        role: 'admin',
      },
      status: 'authenticated',
      refreshMe: mockRefreshMe,
      login: vi.fn(),
      register: vi.fn(),
      forgotPassword: vi.fn(),
      logout: vi.fn(),
      setStatus: vi.fn(),
    })

    rerender(
      <AppProviders>
        <DashboardLayout>
          <TestChild />
        </DashboardLayout>
      </AppProviders>
    )

    await waitFor(() => {
      expect(screen.getByTestId('dashboard-content')).toBeInTheDocument()
    })
  })
})