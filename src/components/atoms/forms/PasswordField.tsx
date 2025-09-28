'use client'

import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface PasswordFieldProps {
  label: string
  error?: string
  id?: string
  required?: boolean
}

export const PasswordField = forwardRef<
  HTMLInputElement,
  PasswordFieldProps & Omit<React.ComponentProps<typeof Input>, 'type'>
>(({ label, error, id, required, className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}>
        {label}
      </Label>
      <div className="relative">
        <Input
          ref={ref}
          id={id}
          type={showPassword ? 'text' : 'password'}
          className={`pr-10 ${className}`}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
})

PasswordField.displayName = 'PasswordField'