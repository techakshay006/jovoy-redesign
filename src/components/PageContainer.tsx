import type { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'nav' | 'header' | 'footer'
}

export function PageContainer({ children, className = '', as: Tag = 'div' }: PageContainerProps) {
  return <Tag className={`page-container ${className}`.trim()}>{children}</Tag>
}
