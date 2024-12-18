'use client'

import DashboardCards from '@/components/DashboardCards'
import TopMangasChart from '@/components/TopMangasChart'
import RecentActivity from '@/components/RecentActivity'
import PopularGenres from '@/components/PopularGenres'
import RevenueStats from '@/components/RevenueStats'

export default function Dashboard() {
  return (
    <div className='text-black'>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCards />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TopMangasChart />
        <RecentActivity />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PopularGenres />
        <RevenueStats />
      </div>
    </div>
  )
}