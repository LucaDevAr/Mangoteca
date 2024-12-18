'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/admin/Sidebar'
import DashboardHeader from '@/components/admin/DashboardHeader'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <DashboardHeader />
    <div className="flex min-h-screen bg-background text-text">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden mt-[73px]">
        <main className="flex-1 overflow-x-hidden bg-background pl-64">
          {children}
        </main>
      </div>
    </div>
    </>
  )
}