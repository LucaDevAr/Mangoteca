'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Book, Globe, Eye, Loader2 } from 'lucide-react'
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
}

export default function ChapterList({ mangaId }: ChapterListProps) {
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
      } catch (err) {
        console.error('Error al cargar los capítulos:', err)
        setError('Error al cargar los capítulos')
        setLoading(false)
      }
    }

    fetchChapters()
  }, [mangaId])

  const handleLanguageChange = (chapterId: string, lang: string) => {
    setSelectedLanguages((prev) => ({ ...prev, [chapterId]: lang }))
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
    <Accordion type="single" collapsible className="w-full rounded-lg">
      {chapters.map((chapter, index) => {
        const selectedLanguage = selectedLanguages[chapter._id] || chapter.languages[0]?.lang
        const currentLanguageData = chapter.languages.find(lang => lang.lang === selectedLanguage)
        const isFirstItem = index === 0
        const isLastItem = index === chapters.length - 1

        return (
          <AccordionItem 
            key={chapter._id} 
            value={chapter._id} 
            className={`
              group 
              ${isFirstItem ? 'rounded-t-lg border-t-0' : ''}
              ${isLastItem ? 'rounded-b-lg border-b-0' : ''}
              ${!isFirstItem && !isLastItem ? 'border-y-0' : ''}
              hover:bg-accent/10 hover:border-primary border transition-colors duration-300
            `}
          >
            <AccordionTrigger className="px-4 py-4">
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
                        <Button asChild>
                          <Link href={`/manga/${mangaId}/chapter/${chapter._id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Leer
                          </Link>
                        </Button>
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