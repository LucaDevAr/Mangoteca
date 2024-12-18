'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ChaptersList from '@/components/admin/ChaptersList'
import { Pencil, Plus, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface Tag {
  type: string
  value: string
}

interface RelatedManga {
  manga: string
  mangaTitle: string
  relationshipType: string
}

interface Manga {
  _id: string
  title: string
  author: string
  description: string
  tags: Tag[]
  demographic: string
  status: string
  contentRating: string
  coverImage: string
  bannerImage: string
  publishedAt: string
  finishedAt?: string
  averageRating: number
  chapterCount: number
  relatedManga: RelatedManga[]
}

const relationshipTypeMap: { [key: string]: string } = {
  prequel: 'Precuela',
  sequel: 'Secuela',
  side_story: 'Historia paralela',
  spin_off: 'Spin-off',
  alternate_version: 'Versión alternativa',
  shared_universe: 'Universo compartido'
};

export default function MangaDetailPage({ params }: { params: { mangaId: string } }) {
  const [manga, setManga] = useState<Manga | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedMangaDetails, setRelatedMangaDetails] = useState<{ [key: string]: string }>({})
  const { mangaId } = params
  const router = useRouter()

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/manga/${mangaId}`)
        if (!response.ok) throw new Error('Failed to fetch manga')
        const data = await response.json()
        setManga(data)
        fetchRelatedMangaDetails(data.relatedManga)
      } catch (error) {
        console.error("Error fetching manga:", error)
      } finally {
        setLoading(false)
      }
    }

    const fetchRelatedMangaDetails = async (relatedManga: RelatedManga[]) => {
      const details: { [key: string]: string } = {}
      for (const related of relatedManga) {
        try {
          const response = await fetch(`http://localhost:5000/api/manga/${related.manga}`)
          if (response.ok) {
            const data = await response.json()
            details[related.manga] = data.title
          }
        } catch (error) {
          console.error(`Error fetching related manga ${related.manga}:`, error)
        }
      }
      setRelatedMangaDetails(details)
    }

    if (mangaId) {
      fetchManga()
    }
  }, [mangaId])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!manga) {
    return <div className="text-center text-lg">No se encontró el manga</div>
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="w-full relative h-[400px]">
        <img 
          src={manga.bannerImage || '/placeholder.svg?height=400&width=1200'} 
          alt={`${manga.title} Banner`} 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <img 
          src={manga.coverImage || '/placeholder.svg?height=400&width=300'} 
          alt={manga.title} 
          className="absolute bottom-[-50px] left-8 h-[300px] w-[200px] object-cover shadow-lg rounded-lg border-4 border-background"
        />
      </div>
      <div className='flex flex-col w-full px-6 py-8 pt-20'>
        <Card className="container py-8">
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold">{manga.title}</h1>
              <Button asChild>
                <Link href={`/admin/manga/edit/${mangaId}`}>
                  <Pencil className="mr-2 h-4 w-4" /> Editar Manga
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <p className="text-lg"><strong>Autor:</strong> {manga.author}</p>
                <p className="text-lg"><strong>Descripción:</strong> {manga.description}</p>
                <div className="flex flex-wrap gap-2">
                  <strong className="w-full">Etiquetas:</strong>
                  {manga.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag.value}
                    </Badge>
                  ))}
                </div>
                <p className="text-lg"><strong>Demografía:</strong> {manga.demographic}</p>
                <p className="text-lg">
                  <strong>Estado:</strong> {
                    manga.status === 'ongoing' ? 'En curso' :
                    manga.status === 'completed' ? 'Completado' :
                    manga.status === 'hiatus' ? 'En pausa' : 'Desconocido'
                  }
                </p>
                <p className="text-lg">
                  <strong>Clasificación de contenido:</strong> {manga.contentRating}
                </p>
                <p className="text-lg">
                  <strong>Fecha de Publicación:</strong> {new Date(manga.publishedAt).toLocaleDateString()}
                </p>
                {manga.finishedAt && (
                  <p className="text-lg">
                    <strong>Fecha de Finalización:</strong> {new Date(manga.finishedAt).toLocaleDateString()}
                  </p>
                )}
                <p className="text-lg">
                  <strong>Calificación promedio:</strong> {manga.averageRating.toFixed(2)}
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Mangas Relacionados</h2>
                {manga.relatedManga.length > 0 ? (
                  <ul className="space-y-2">
                    {manga.relatedManga.map((related, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Link href={`/admin/manga/${related.manga}`} className="hover:underline">
                          {relatedMangaDetails[related.manga] || 'Cargando...'}
                        </Link>
                        <Badge>{relationshipTypeMap[related.relationshipType] || related.relationshipType}</Badge>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay mangas relacionados</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="container mx-auto px-4 py-8 mt-12">
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Capítulos ({manga.chapterCount})</h2>
              <Button onClick={() => router.push(`/admin/manga/${mangaId}/chapters/add`)}>
                <Plus className="mr-2 h-4 w-4" /> Agregar Capítulo
              </Button>
            </div>
            <ChaptersList mangaId={mangaId} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}