'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { TextField } from '@/components/atoms/forms/TextField'
import { AuthCard } from '@/components/molecules/AuthCard'

import { useAuth } from '../hooks/useAuth'
import { forgotSchema, ForgotFormData } from '../auth.schema'

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { forgotPassword } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  })

  const onSubmit = async (data: ForgotFormData) => {
    setIsLoading(true)
    try {
      await forgotPassword(data)
      setIsSubmitted(true)
      toast.success('Password reset instructions sent to your email')
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset email')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <AuthCard
        title="Check Your Email"
        description={`We've sent password reset instructions to ${getValues('email')}`}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Click the link in the email to reset your password. If you don&apos;t see the email, 
            check your spam folder.
          </p>
          <Button asChild className="w-full">
            <Link href="/login">Back to Sign In</Link>
          </Button>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Forgot Password"
      description="Enter your email address and we'll send you a link to reset your password"
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>

        <div className="text-center text-sm">
          Remember your password?{' '}
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