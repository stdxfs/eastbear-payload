import { cn } from '@/utilities/ui'
import * as React from 'react'

type InputVariant = 'default' | 'filled' | 'underline'

const variantStyles: Record<InputVariant, string> = {
  default: 'border border-border bg-background rounded',
  filled: 'border-0 bg-palette-secondary rounded',
  underline: 'border-0 border-b-2 border-border rounded-none bg-transparent focus-visible:border-palette-accent',
}

const Input: React.FC<
  {
    ref?: React.Ref<HTMLInputElement>
    variant?: InputVariant
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ type, className, ref, variant = 'default', ...props }) => {
  return (
    <input
      className={cn(
        'flex h-10 w-full px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-palette-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    />
  )
}

export { Input }
export type { InputVariant }
