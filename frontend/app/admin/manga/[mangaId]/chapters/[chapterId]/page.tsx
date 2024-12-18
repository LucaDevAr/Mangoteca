'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Book, Calendar, Globe, Edit, Plus, Loader2, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Language {
  lang: string
  title: string
  description: string
}

interface Chapter {
  _id: string
  number: number
  releaseDate: string
  languages: Language[]
}

const ChapterDetailPage = ({ params }: { params: { chapterId: string, mangaId: string } }) => {
  const { chapterId, mangaId } = params
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/chapter/${mangaId}/${chapterId}`)
        if (!response.ok) throw new Error('Error fetching chapter')
        const data = await response.json()
        setChapter(data)
        setSelectedLanguage(data.languages[0]?.lang || '')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (chapterId && mangaId) {
      fetchChapter()
    }
  }, [chapterId, mangaId])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  const currentLanguage = chapter?.languages.find((lang) => lang.lang === selectedLanguage)

  return (
    <div className="container mx-auto px-6 py-8">
      {chapter && (
        <Card>
          <CardHeader className="bg-primary text-primary-foreground flex justify-between flex-row">
            <CardTitle className="text-3xl font-bold flex items-center">
              <Book className="mr-2" />
              Capítulo {chapter.number}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Globe className="text-primary-foreground" />
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[100px] bg-primary-foreground text-primary">
                  <SelectValue placeholder="Idioma" />
                </SelectTrigger>
                <SelectContent>
                  {chapter.languages.map((lang, index) => (
                    <SelectItem key={index} value={lang.lang}>{lang.lang.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {currentLanguage && (
              <>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Título</h2>
                  <p className="text-foreground">{currentLanguage.title}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Descripción</h2>
                  <p className="text-foreground">{currentLanguage.description || 'Sin descripción disponible'}</p>
                </div>
              </>
            )}
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <Calendar className="mr-2" />
                Fecha de publicación
              </h2>
              <p className="text-foreground">{new Date(chapter.releaseDate).toLocaleDateString()}</p>
            </div>
          </CardContent>
          <div className="bg-secondary p-6 flex justify-end space-x-4">
            <Button asChild variant="default">
              <Link href={`/admin/manga/${mangaId}/chapters/${chapterId}/add-language`}>
                <Plus className="mr-2" />
                Agregar Nuevo Idioma
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={`/admin/manga/${mangaId}/chapters/edit/${chapterId}`}>
                <Edit className="mr-2" />
                Editar Capítulo
              </Link>
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

export default ChapterDetailPage