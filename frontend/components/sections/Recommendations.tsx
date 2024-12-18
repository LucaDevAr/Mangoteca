'use client'

import useSWR from 'swr'
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import RecommendationCard from '@/components/cards/RecommendationCard'

interface Manga {
  _id: string
  title: string
  coverImage: string
  genres: string[]
  rating: number
}

interface ApiResponse {
  mangas: Manga[]
  currentPage: number
  totalPages: number
  totalMangas: number
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function PersonalizedRecommendations() {
  const { data, error } = useSWR<ApiResponse>('http://localhost:5000/api/manga', fetcher)

  if (error) return <div className="text-destructive">Error al cargar las recomendaciones</div>
  if (!data) return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="h-[300px] w-full" />
      ))}
    </div>
  )
  
  const mangas = data.mangas

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primary">Recomendaciones para ti</h2>
        <Button variant="outline">
          Ver más <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {mangas.map((manga) => (
          <RecommendationCard key={manga._id} id={manga._id} manga={manga} />
        ))}
      </div>
    </section>
  )
}