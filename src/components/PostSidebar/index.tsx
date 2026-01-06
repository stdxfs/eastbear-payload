import React from 'react'
import { cn } from '@/utilities/ui'
import { GetQuoteForm } from '@/components/GetQuoteForm'

interface PostSidebarProps {
  className?: string
  children?: React.ReactNode
}

export function PostSidebar({ className, children }: PostSidebarProps) {
  return (
    <aside className={cn('lg:sticky lg:top-24 space-y-6', className)}>
      <GetQuoteForm />
      {children}
    </aside>
  )
}
