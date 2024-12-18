'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { User, LogOut, ArrowLeft } from 'lucide-react'
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardHeader() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  if (!mounted) {
    return null
  }

  const showBackArrow = pathname !== '/admin' && pathname !== '/admin/manga'

  const getCurrentSection = () => {
    if (pathname.startsWith('/admin/manga')) return 'Gestión de Mangas'
    if (pathname.startsWith('/admin/user')) return 'Gestión de Usuarios'
    return 'Dashboard'
  }

  return (
    <header className={`flex justify-between items-center p-4 bg-background text-foreground ml-[255px] pl-4 border-b fixed top-0 z-50 w-[calc(100vw-255px)] pr-8`}>
      <div className="flex items-center">
        {showBackArrow && (
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        )}
        <h2 className="text-xl font-semibold">{getCurrentSection()}</h2>
      </div>
      <div className="flex items-center space-x-4">
        {status === 'loading' ? (
          <div className="w-10 h-10 rounded-full bg-muted animate-pulse"></div>
        ) : session && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src={session.user?.image || '/default-avatar.png'} alt="User profile" />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ThemeToggle />
      </div>
    </header>
  )
}