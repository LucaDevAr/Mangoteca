"use client"

import { useEffect, useState } from 'react'
import LatestUpdateCard  from '@/components/cards/LatestCard'

export default function LatestUpdates() {
  const [latestUpdates, setLatestUpdates] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/manga/latest-updates')
      .then(res => res.json())
      .then(data => setLatestUpdates(data))
      .then()
  }, [])

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-primary">Latest Updates</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {latestUpdates.map(manga => (
          <>
            {console.log(latestUpdates)}
            <LatestUpdateCard
              key={manga._id}
              id={manga._id}
              manga={manga}
            />
          </>
        ))}
      </div>
    </section>
  )
}