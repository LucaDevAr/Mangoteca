'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Book, Globe, Eye, Trash2, Edit, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Language {
  lang: string
  title: string
  description: string
}

interface Chapter {
  _id: string
  number: number
  languages: Language[]
}

interface ChapterListProps {
  mangaId: string
  onChaptersLoad?: (hasChapters: boolean) => void
}

export default function ChapterList({ mangaId, onChaptersLoad }: ChapterListProps) {
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/chapter/${mangaId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch chapters')
        }
        const data = await response.json()
        setChapters(data)
        setLoading(false)
        if (onChaptersLoad) {
          onChaptersLoad(data.length > 0)
        }
      } catch (err) {
        console.error('Error al cargar los capítulos:', err)
        setError('Error al cargar los capítulos')
        setLoading(false)
        if (onChaptersLoad) {
          onChaptersLoad(false)
        }
      }
    }

    fetchChapters()
  }, [mangaId, onChaptersLoad])

  const handleLanguageChange = (chapterId: string, lang: string) => {
    setSelectedLanguages((prev) => ({ ...prev, [chapterId]: lang }))
  }

  const handleDeleteChapter = async (chapterId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/chapter/${mangaId}/${chapterId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setChapters(chapters.filter(chapter => chapter._id !== chapterId))
      } else {
        throw new Error('Failed to delete chapter')
      }
    } catch (err) {
      console.error('Error al eliminar el capítulo:', err)
      setError('Error al eliminar el capítulo')
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin" /></div>
  }
  
  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (chapters.length === 0) {
    return <div className="text-center text-muted-foreground">No hay capítulos disponibles para este manga.</div>
  }

  return (
    <Accordion type="single" collapsible className="w-full border rounded-lg">
      {chapters.map((chapter) => {
        const selectedLanguage = selectedLanguages[chapter._id] || chapter.languages[0]?.lang
        const currentLanguageData = chapter.languages.find(lang => lang.lang === selectedLanguage)

        return (
          <AccordionItem key={chapter._id} value={chapter._id} className='hover:bg-accent/10 group'>
            <AccordionTrigger className="p-4">
              <div className="flex items-center space-x-3">
                <Book className="text-primary" />
                <span className='text-xl font-semibold'>{`Capítulo ${chapter.number}`}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className='border-none group-hover:bg-accent/0'>
                <CardContent className="p-4">
                  {currentLanguageData && (
                    <>
                      <h3 className="text-lg font-semibold mb-2">{currentLanguageData.title}</h3>
                      <p className="text-muted-foreground mb-4">{currentLanguageData.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Globe className="text-primary w-4" />
                          <Select
                            value={selectedLanguage}
                            onValueChange={(value) => handleLanguageChange(chapter._id, value)}
                          >
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Idioma" />
                            </SelectTrigger>
                            <SelectContent>
                              {chapter.languages.map((language) => (
                                <SelectItem key={language.lang} value={language.lang}>
                                  {language.lang.toUpperCase()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex space-x-2">
                          <Button asChild variant="outline">
                            <Link href={`/admin/manga/${mangaId}/chapters/${chapter._id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver
                            </Link>
                          </Button>
                          <Button asChild variant="outline">
                            <Link href={`/admin/manga/${mangaId}/chapters/edit/${chapter._id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Esto eliminará permanentemente el capítulo.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteChapter(chapter._id)}>
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}