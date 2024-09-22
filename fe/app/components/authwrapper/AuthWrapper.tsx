"use client";

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session && !isPublicRoute(pathname)) {
        router.push('/login')
      }
      setIsLoading(false)
    }

    checkSession()
  }, [supabase, router, pathname])

  const isPublicRoute = (path: string) => {
    const publicRoutes = ['/login', '/register', '/', '/tools', '/about', '/news', '/docs', '/blog']
    return publicRoutes.includes(path)
  }

  if (isLoading) {
    return <div>Loading...</div> // 或者你的加载组件
  }

  return <>{children}</>
}
