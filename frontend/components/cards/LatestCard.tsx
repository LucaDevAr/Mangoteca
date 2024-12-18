import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Clock, BookOpen, ChevronRight, MessageSquare } from "lucide-react"

interface Chapter {
  _id: string
  number: number
  title: string
  updatedAt: string
}

interface Manga {
  _id: string
  title: string
  coverImage: string
  latestChapter: Chapter
  chapterCount: number
  comments: string[] // Array of comment IDs
  languages: string[]
}

export default function LatestUpdateCard({ manga }: { manga: Manga }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    console.log(manga)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  return (
    <Link href={`/manga/${manga._id}/chapter/${manga?.latestChapter?._id}`}>
      <Card className="w-full max-w-[600px] overflow-hidden transition-all duration-300 hover:shadow-lg group hover:border-primary">
        <div className="flex">
          <img
            src={manga.coverImage}
            alt={manga.title}
            className="w-[100px] h-[150px] object-cover"
          />
          <CardContent className="flex-1 p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg mb-2">{manga?.title}</h3>
              <div className="flex items-center mb-2">
                <BookOpen className="w-4 h-4 mr-1 text-primary" />
                <span className="font-semibold">Chapter {manga.latestChapter?.number}</span>
                <span className="ml-2 text-sm text-muted-foreground">of {manga.chapterCount}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{manga.latestChapter?.title}</p>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <span>{formatDate(manga.latestChapter?.updatedAt)}</span>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <MessageSquare className="w-4 h-4 mr-1" />
                <span>{manga.comments.length} comments</span>
                <span className="ml-2 text-muted-foreground">({manga.languages.length} languages)</span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}