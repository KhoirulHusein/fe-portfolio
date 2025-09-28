'use client'

import { forwardRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TextFieldProps {
  label: string
  error?: string
  id?: string
  required?: boolean
}

export const TextField = forwardRef<
  HTMLInputElement,
  TextFieldProps & React.ComponentProps<typeof Input>
>(({ label, error, id, required, className, ...props }, ref) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}>
        {label}
      </Label>
      <Input
        ref={ref}
        id={id}
        className={className}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
})

TextField.displayName = 'TextField'