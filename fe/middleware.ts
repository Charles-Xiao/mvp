import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  // 检查请求是否针对静态文件
  if (req.nextUrl.pathname.startsWith('/public') || 
      req.nextUrl.pathname.endsWith('.svg') ||
      req.nextUrl.pathname.endsWith('.png') ||
      req.nextUrl.pathname.endsWith('.jpg') ||
      req.nextUrl.pathname.endsWith('.jpeg') ||
      req.nextUrl.pathname.endsWith('.gif')) {
    return NextResponse.next()
  }

  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  // 检查请求的路径
  const path = req.nextUrl.pathname

  // 如果路径是 /tools、根路径、public 文件夹，或者用户已登录，允许访问
  if (path.startsWith('/tools') || path === '/' || path.startsWith('/public') || path.startsWith('/about') || path.startsWith('/news') || session) {
    return res
  }

  // 如果是登录或注册页面，也允许访问
  if (path === '/login' || path === '/register') {
    return res
  }

  // 其他情况，重定向到登录页面
  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = '/login'
  redirectUrl.searchParams.set(`redirectedFrom`, path)
  return NextResponse.redirect(redirectUrl)
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }