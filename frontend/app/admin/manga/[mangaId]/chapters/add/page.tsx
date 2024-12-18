'use client'

import { useEffect, useState } from 'react'
import ChapterForm from '@/components/admin/ChapterForm'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Manga {
  _id: string
  title: string
  chapters: any[]
}

export default function AddChapterPage({ params }: { params: { mangaId: string } }) {
  const [manga, setManga] = useState<Manga | null>(null)
  const { mangaId } = params

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/manga/${mangaId}`)
        if (!response.ok) throw new Error('Failed to fetch manga')
        const data = await response.json()
        setManga(data)
      } catch (error) {
        console.error("Error fetching manga:", error)
      }
    }

    if (mangaId) {
      fetchManga()
    }
  }, [mangaId])

  const nextChapterNumber = manga?.chapters ? manga.chapters.length + 1 : 1

  return (
    <div className="container mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Agregar Capítulo</CardTitle>
        </CardHeader>
        <CardContent>
          {manga ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">Añadiendo capítulo para: {manga.title}</h2>
              <ChapterForm mangaId={mangaId} nextChapterNumber={nextChapterNumber} />
            </>
          ) : (
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}