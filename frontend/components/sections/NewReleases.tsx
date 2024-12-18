"use client"

import { useEffect, useState } from 'react'
import NewReleaseCard  from '@/components/cards/NewCard'

export default function NewReleases() {
  const [newReleases, setNewReleases] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/manga/new-releases')
      .then(res => res.json())
      .then(data => setNewReleases(data))
  }, [])

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-primary">New Releases</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {newReleases.map(manga => (
          <NewReleaseCard
            key={manga._id}
            id={manga._id}
            manga={manga}
          />
        ))}
      </div>
    </section>
  )
}