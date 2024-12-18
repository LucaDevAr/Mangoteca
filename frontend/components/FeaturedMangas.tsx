// components/FeaturedMangas.tsx
'use client'

import useSWR from 'swr'
import MangaCard from '@/components/MangaCard'
import { Button } from './ui/Button'

const fetcher = (url: string) => fetch(url).then((res) => res.json().mangas)

export default function FeaturedMangas() {
  const { data: mangas, error } = useSWR('http://localhost:5000/api/manga', fetcher)

  if (error) return <div>Failed to load featured mangas</div>
  if (!mangas) return <div>Loading...</div>

  return (
    <section className="py-12">
      <Button variant="primary" rightIcon={<ArrowRight />}>Next</Button>
      <h2 className="text-3xl font-bold mb-6">Featured Mangas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mangas.map((manga) => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </div>
    </section>
  )
}