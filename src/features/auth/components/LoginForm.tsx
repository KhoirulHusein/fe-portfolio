'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { TextField } from '@/components/atoms/forms/TextField'
import { PasswordField } from '@/components/atoms/forms/PasswordField'
import { AuthCard } from '@/components/molecules/AuthCard'

import { useAuth } from '../hooks/useAuth'
import { loginSchema, LoginFormData } from '../auth.schema'

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      await login(data)
      toast.success('Login successful!')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      title="Sign In"
      description="Enter your email or username and password to sign in"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          label="Email or Username"
          {...register('emailOrUsername')}
          error={errors.emailOrUsername?.message}
          required
          autoComplete="email"
        />
        
        <PasswordField
          label="Password"
          {...register('password')}
          error={errors.password?.message}
          required
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <Link
            href="/forgot-password"
            className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>

        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </form>
    </AuthCard>
  )
}