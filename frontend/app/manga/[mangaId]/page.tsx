'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Book, Globe, Eye, Star, MessageSquare, Bookmark, Flag } from 'lucide-react'
import Header from '@/components/Header'
import ChapterList from '@/components/ChapterList'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import RelatedMangaCard from '@/components/RelatedCard'
import AdComponent from '@/components/Ad'

interface Tag {
  type: string
  value: string
}

interface Chapter {
  _id: string
  number: number
  title: string
  publishedAt: string
}

interface Comment {
  _id: string
  user: {
    _id: string
    username: string
    profileImage: string
  }
  content: string
  createdAt: string
}

interface RelatedManga {
  manga: {
    _id: string
    title: string
    coverImage: string
    averageRating: number
    chapterCount: number
  }
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
  publicationState: string
  version: number
  chapterCount: number
  coverImage: string
  bannerImage: string
  publishedAt: string
  finishedAt?: string
  contentRating: string
  views: number
  readCount: number
  comments: Comment[]
  ratings: {
    total: number
    average: number
  }
  averageRating: number
  popularityScore: number
  relatedManga: RelatedManga[]
  bookmarkedBy: string[]
  chapters: Chapter[]
}

export default function MangaPage({ params }: { params: { mangaId: string } }) {
  const [manga, setManga] = useState<Manga | null>(null)
  const [relatedMangaDetails, setRelatedMangaDetails] = useState<RelatedManga[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userRating, setUserRating] = useState<number>(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [newComment, setNewComment] = useState('')

  const { mangaId } = params

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/manga/${mangaId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch manga')
        }
        const data = await response.json()
        setManga(data)
        console.log(data)
        // Here you could check if the current user has bookmarked this manga
        // setIsBookmarked(data.bookmarkedBy.includes(currentUserId))

        // Fetch related manga details
        const relatedMangaPromises = data.relatedManga.map(async (related: RelatedManga) => {
          const relatedResponse = await fetch(`http://localhost:5000/api/manga/${related.manga}`)
          if (!relatedResponse.ok) {
            throw new Error(`Failed to fetch related manga: ${related.manga}`)
          }
          const relatedData = await relatedResponse.json()
          return {
            manga: {
              _id: relatedData._id,
              title: relatedData.title,
              coverImage: relatedData.coverImage,
              averageRating: relatedData.averageRating,
              chapterCount: relatedData.chapterCount
            },
            relationshipType: related.relationshipType
          }
        })

        const relatedMangaData = await Promise.all(relatedMangaPromises)
        setRelatedMangaDetails(relatedMangaData)
      } catch (error) {
        console.error("Error fetching manga:", error)
        setError("No se pudo cargar la información del manga")
      } finally {
        setLoading(false)
      }
    }

    if (mangaId) {
      fetchManga()
    }
  }, [mangaId])

  const handleRating = async (rating: number) => {
    try {
      const response = await fetch(`/api/manga/${mangaId}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score: rating }),
      })
      if (!response.ok) {
        throw new Error('Failed to rate manga')
      }
      setUserRating(rating)
      // Optionally, update the manga's average rating here
    } catch (error) {
      console.error("Error rating manga:", error)
    }
  }

  const toggleBookmark = async () => {
    try {
      const response = await fetch(`/api/manga/${mangaId}/bookmark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Failed to toggle bookmark')
      }
      setIsBookmarked(!isBookmarked)
    } catch (error) {
      console.error("Error toggling bookmark:", error)
    }
  }

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/manga/${mangaId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      })
      if (!response.ok) {
        throw new Error('Failed to submit comment')
      }
      const data = await response.json()
      setManga(prevManga => {
        if (prevManga) {
          return { ...prevManga, comments: [...prevManga.comments, data.comment] }
        }
        return prevManga
      })
      setNewComment('')
    } catch (error) {
      console.error("Error submitting comment:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    )
  }

  if (error || !manga) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card>
          <CardContent className="p-6">
            <p className="font-bold text-destructive">Error:</p>
            <p>{error || "No se encontró el manga"}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <div className="w-full h-64 md:h-96 relative overflow-hidden">
          <img
            src={manga.bannerImage || '/placeholder.svg?height=400&width=1200'} 
            alt={`${manga.title} Banner`}
            className='object-cover w-full h-full'
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-48 flex-shrink-0">
                  <img
                    src={manga.coverImage || '/placeholder.svg?height=300&width=200'} 
                    alt={manga.title} 
                    width={192}
                    height={288}
                    className="rounded-lg shadow-lg border-4 border-background object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h1 className="text-4xl font-bold">{manga.title}</h1>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={isBookmarked ? "default" : "outline"}
                            size="icon"
                            onClick={toggleBookmark}
                          >
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-xl mb-4">por {manga.author}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center cursor-pointer">
                              <Star className="w-5 h-5 text-yellow-400 mr-1" />
                              <span>{manga.averageRating.toFixed(1)} ({manga.ratings.total} calificaciones)</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Button
                                  key={star}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRating(star)}
                                >
                                  <Star className={`w-4 h-4 ${star <= userRating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                                </Button>
                              ))}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-5 h-5 text-primary mr-1" />
                      <span>{manga.readCount} lecturas</span>
                    </div>
                    {manga.contentRating === 'erotica' || manga.contentRating === 'pornographic' ? (
                      <Badge variant="destructive">
                        <Flag className="w-4 h-4 mr-1" />
                        NSFW
                      </Badge>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-semibold">Estado:</p>
                      <p>{manga.status}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Demografía:</p>
                      <p>{manga.demographic}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Fecha de Publicación:</p>
                      <p>{new Date(manga.publishedAt).toLocaleDateString()}</p>
                    </div>
                    {manga.finishedAt && (
                      <div>
                        <p className="font-semibold">Fecha de Finalización:</p>
                        <p>{new Date(manga.finishedAt).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {manga.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag.value}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-lg mb-4">{manga.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <AdComponent size="large" />

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6">Capítulos</h2>
          <ChapterList mangaId={mangaId} />
        </div>

        <AdComponent size="medium" />

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6">Comentarios</h2>
          <form onSubmit={submitComment} className="mb-8">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe tu comentario..."
              className="mb-2"
            />
            <Button type="submit">Enviar comentario</Button>
          </form>
          <ul className="space-y-6">
            {manga.comments.map((comment, index) => (
              <li key={comment._id}>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={comment.user.profileImage} alt={comment.user.username} />
                        <AvatarFallback>{comment.user.username[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{comment.user.username}</p>
                        <p className="text-sm text-muted-foreground">{new Date(comment.createdAt).toLocaleString()}</p>
                        <p className="mt-2">{comment.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {index % 5 === 4 && <AdComponent size="small" />}
              </li>
            ))}
          </ul>
        </div>

        {relatedMangaDetails.length > 0 && (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Mangas relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {relatedMangaDetails.map((relatedManga) => (
                <RelatedMangaCard
                  key={relatedManga.manga._id}
                  manga={relatedManga.manga}
                  
                  relationshipType={relatedManga.relationshipType}
                />
              ))}
            </div>
          </div>
        )}

        <AdComponent size="large" />
      </div>
    </>
  )
}