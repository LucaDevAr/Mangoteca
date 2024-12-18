import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, Star, MessageSquare } from "lucide-react"

interface Manga {
  _id: string
  title: string
  coverImage: string
  author: string
  publishedAt: string
  description: string
  chapterCount: number
  averageRating: number
  comments: string[] // Array of comment IDs
  contentRating: string
}

export default function NewReleaseCard({ manga }: { manga: Manga }) {
  return (
    <Link href={`/manga/${manga._id}`} className="block w-[200px] h-[370px]">
      <Card className="w-full h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg relative group hover:border-primary">
        <div className="flex flex-col h-full">
          <div className="relative overflow-hidden h-[370px] transition-all duration-300 ease-in-out group-hover:h-[280px]">
            <img
              src={manga.coverImage}
              alt={manga.title}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <Badge className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground">New</Badge>
            <Badge className="absolute top-2 left-2 z-10" variant="secondary">{manga.contentRating}</Badge>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          <CardContent className="px-4 bg-card text-primary-foreground absolute bottom-0 left-0 right-0 transform translate-y-[calc(100%-42px)] transition-transform duration-300 ease-in-out group-hover:translate-y-0 pb-2 group-hover:bg-primary">
            <h3 className="font-bold text-lg text-card-foreground group-hover:text-primary-foreground line-clamp-2 py-2 group-hover:pb-0 transition-[padding] duration-300">{manga.title}</h3>
            <p className="text-sm line-clamp-2 mb-2">{manga.description}</p>
            <div className="flex items-center justify-between text-sm">
              <div className='flex items-center'>
                <BookOpen className='w-4 h-4 mr-1' />
                <span>{manga.chapterCount}</span>
              </div>
              <div className='flex items-center'>
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(manga.publishedAt).toLocaleDateString().slice(0, 5)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <div className='flex items-center'>
                <Star className='w-4 h-4 mr-1 fill-yellow-400 stroke-yellow-400' />
                <span>{manga.averageRating.toFixed(1)}</span>
              </div>
              <div className='flex items-center'>
                <MessageSquare className="w-4 h-4 mr-1" />
                <span>{manga.comments.length}</span>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}