"use client"

import Dashboard from '@/components/Dashboard'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (!session || session.user?.role !== 'admin') {
      router.push('/')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || session.user?.role !== 'admin') {
    return null
  }

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-4xl font-bold my-4">Admin Panel</h1>
      <h2>Dashboard</h2>
      <Dashboard/>
    </div>
  );
};
