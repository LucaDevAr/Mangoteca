import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Star, TrendingUp, BookOpen } from "lucide-react"

interface Manga {
  _id: string
  title: string
  coverImage: string
  status: string
  averageRating: number
  popularityScore: number
  reads: number
  demographic: string
  chapterCount: number
  languages: string[]
}

interface PopularMangaCardProps {
  manga: Manga
  rank: number
}

export default function PopularMangaCard({ manga, rank }: PopularMangaCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/manga/${manga._id}`} className='w-[200px] h-[300px]'>
      <Card 
        className="w-full h-full overflow-hidden transition-all duration-300 hover:shadow-lg group hover:scale-110"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-full">
          <img
            src={manga.coverImage}
            alt={manga.title}
            className="w-full h-full object-cover"
          />
          <div 
            className={`absolute inset-0 bg-primary/70 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-bold text-md mb-2 line-clamp-2">{manga.title}</h3>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{manga.reads.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                  <span>{manga.averageRating.toFixed(1)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span>{manga.chapterCount}</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>{manga.popularityScore.toFixed(0)}</span>
                </div>
              </div>
            </CardContent>
          </div>
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground font-bold px-2 py-1 rounded-full text-sm flex items-center group-hover:bg-primary-foreground group-hover:text-primary transition-colors duration-300">
            <span>#{rank.toString().padStart(2, '0')}</span>
          </div>
          <div className="absolute top-2 right-2 bg-primary-foreground text-primary px-2 py-1 rounded-full text-sm flex items-center font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>{manga.demographic}</span>
          </div>
          <Badge 
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            variant="secondary"
          >
            {manga.languages.length} lang
          </Badge>
        </div>
      </Card>
    </Link>
  )
}