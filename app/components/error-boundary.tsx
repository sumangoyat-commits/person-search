'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ErrorBoundary({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Caught in error boundary:', event.error)
      // You can add more sophisticated error handling here
      // For example, you could send the error to an error tracking service
    }

    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [router])

  return <>{children}</>
}

