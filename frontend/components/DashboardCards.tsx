'use client'

import { BookOpen, Users, BarChart, TrendingUp } from 'lucide-react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface DashboardStats {
  totalMangas: number
  activeUsers: number
  todayReads: number
  newUsers: number
}

export default function DashboardCards() {
  const { data, error } = useSWR<DashboardStats>('/api/dashboard/stats', fetcher)

  if (error) return <div>Error al cargar las estadísticas</div>
  if (!data) return <div>Cargando...</div>

  return (
    <>
      <DashboardCard title="Total Mangas" value={data.totalMangas} icon={<BookOpen size={24} />} />
      <DashboardCard title="Usuarios Activos" value={data.activeUsers} icon={<Users size={24} />} />
      <DashboardCard title="Lecturas Hoy" value={data.todayReads} icon={<BarChart size={24} />} />
      <DashboardCard title="Nuevos Usuarios" value={data.newUsers} icon={<TrendingUp size={24} />} />
    </>
  )
}

function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
        <div className="p-3 bg-blue-100 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  )
}