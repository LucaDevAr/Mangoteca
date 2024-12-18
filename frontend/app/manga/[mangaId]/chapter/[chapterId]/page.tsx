'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Settings, Home, Globe, User, LogOut, Palette, Sun, Moon } from 'lucide-react'
import Manga from '@/components/manga/Manga'

interface Language {
  lang: string
  title: string
  description?: string
  pages: string[]
}

interface Chapter {
  _id: string
  number: number
  releaseDate: string
  readCount: number
  languages: Language[]
}

interface MangaChapterPageProps {
  params: {
    mangaId: string
    chapterId: string
  }
}

export default function MangaChapterPage({ params }: MangaChapterPageProps) {
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  const { mangaId, chapterId } = params

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/chapter/${mangaId}/${chapterId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch chapter')
        }
        const data: Chapter = await response.json()
        setChapter(data)
        setSelectedLanguage(data.languages[0].lang)
      } catch (error) {
        console.error("Error fetching chapter:", error)
        setError("No se pudo cargar el capítulo")
      } finally {
        setLoading(false)
      }
    }

    if (mangaId && chapterId) {
      fetchChapter()
    }
  }, [mangaId, chapterId])

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const handleSignIn = () => {
    router.push('/auth/login')
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
    setIsUserMenuOpen(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !chapter) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          <p className="font-bold">Error:</p>
          <p>{error || "No se encontró el capítulo"}</p>
        </div>
      </div>
    )
  }

  const currentLanguage = chapter.languages.find(lang => lang.lang === selectedLanguage) || chapter.languages[0]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 z-50 w-full">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href={`/manga/${mangaId}`} className="text-primary hover:text-primary/80">
            <ChevronLeft className="w-6 h-6 inline-block mr-2" />
            Volver al manga
          </Link>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedLanguage} 
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-transparent text-foreground border-none focus:outline-none focus:ring-0"
            >
              {chapter.languages.map((lang) => (
                <option key={lang.lang} value={lang.lang}>
                  {lang.lang.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="relative">
              {status === 'loading' ? (
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
              ) : session ? (
                <button 
                  onClick={toggleUserMenu}
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full"
                >
                  <Image
                    src={session.user?.image || '/default-avatar.png'}
                    alt="User profile"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                  />
                </button>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="bg-primary text-background px-4 py-2 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center"
                >
                  <User className="w-5 h-5 mr-2" />
                  Iniciar sesión
                </button>
              )}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-secondary rounded-md shadow-lg">
                  <div className="py-1">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-text hover:bg-secondary">
                      <User className="inline-block w-4 h-4 mr-2" />
                      Perfil
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-secondary"
                    >
                      <LogOut className="inline-block w-4 h-4 mr-2" />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="">
        <Manga images={currentLanguage.pages} />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link 
            href={`/manga/${mangaId}/chapters/${getPreviousChapterId(chapterId)}`} 
            className={`text-primary hover:text-primary/80 ${getPreviousChapterId(chapterId) === '0' ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <ChevronLeft className="w-6 h-6 inline-block mr-1" />
            Anterior
          </Link>
          <Link 
            href={`/manga/${mangaId}/chapters/${getNextChapterId(chapterId)}`} 
            className={`text-primary hover:text-primary/80 ${getNextChapterId(chapterId) === (chapter.number + 1).toString() ? 'opacity-50 pointer-events-none' : ''}`}
          >
            Siguiente
            <ChevronRight className="w-6 h-6 inline-block ml-1" />
          </Link>
        </div>
      </footer>
    </div>
  )
}

function getPreviousChapterId(currentChapterId: string): string {
  const currentId = parseInt(currentChapterId, 10)
  return (currentId - 1).toString()
}

function getNextChapterId(currentChapterId: string): string {
  const currentId = parseInt(currentChapterId, 10)
  return (currentId + 1).toString()
}