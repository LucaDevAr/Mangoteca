'use client'

import { Clock } from 'lucide-react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Activity {
  user: string
  action: string
  manga: string
  time: string
}

export default function RecentActivity() {
  const { data: activities, error } = useSWR<Activity[]>('/api/activity/recent', fetcher)

  if (error) return <div>Error al cargar la actividad reciente</div>
  if (!activities) return <div>Cargando...</div>

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
      <ul className="space-y-4">
        {activities.map((activity, index) => (
          <li key={index} className="flex items-start">
            <Clock size={16} className="mr-2 mt-1 text-gray-400" />
            <div>
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                {activity.manga && <span className="font-medium">{activity.manga}</span>}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}