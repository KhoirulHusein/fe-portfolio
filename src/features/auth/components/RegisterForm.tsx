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
import { registerSchema, RegisterFormData } from '../auth.schema'

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { register: registerUser } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      await registerUser(data)
      toast.success('Registration successful! Please sign in with your new account.')
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      title="Create Account"
      description="Enter your details to create a new account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          required
          autoComplete="email"
        />
        
        <TextField
          label="Username"
          {...register('username')}
          error={errors.username?.message}
          required
          autoComplete="username"
        />

        <PasswordField
          label="Password"
          {...register('password')}
          error={errors.password?.message}
          required
          autoComplete="new-password"
        />

        <PasswordField
          label="Confirm Password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          required
          autoComplete="new-password"
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create Account'}
        </Button>

        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthCard>
  )
}