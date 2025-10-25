"use client"
import { SessionProvider } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Providers({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</> // Retorna children sem SessionProvider durante SSR
  }

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}