"use client"

import { useEffect, useState } from 'react'
import PopularMangaCard from '@/components/cards/PopularCard'

interface Manga {
  _id: string
  title: string
  coverImage: string
  status: string
  averageRating: number
  popularityScore: number
  views: number
  demographic: string
}

export default function PopularMangas() {
  const [popularMangas, setPopularMangas] = useState<Manga[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/api/manga/popular')
      .then(res => res.json())
      .then(data => setPopularMangas(data))
  }, [])

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-primary">Popular Mangas</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {popularMangas.map((manga, index) => (
          <PopularMangaCard
            key={manga._id}
            id={manga._id}
            manga={manga}
            rank={index + 1}
          />
        ))}
      </div>
    </section>
  )
}