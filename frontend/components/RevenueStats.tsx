'use client'

import { TrendingUp } from 'lucide-react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface RevenueStat {
  title: string
  value: string
  change: string
  up: boolean
}

export default function RevenueStats() {
  const { data: stats, error } = useSWR<RevenueStat[]>('/api/revenue/stats', fetcher)

  if (error) return <div>Error al cargar las estadísticas de ingresos</div>
  if (!stats) return <div>Cargando...</div>

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Estadísticas de Ingresos</h3>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
            <div className={`flex items-center ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
              {stat.up ? <TrendingUp size={16} /> : <TrendingUp size={16} className="transform rotate-180" />}
              <span className="ml-1 text-sm font-medium">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}