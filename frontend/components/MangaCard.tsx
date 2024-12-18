'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import ReactCountryFlag from "react-country-flag"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MangaCardProps {
  manga: {
    coverImage: string
    title: string
    chapters: []
    languages: string[]
    _id: string
    description: string
  }
}

const languageCodes: { [key: string]: string } = {
  en: 'GB',
  es: 'ES',
  jp: 'JP',
  kr: 'KR',
  cn: 'CN',
  bt: 'BR',
  // Add more language codes as needed
}

export default function MangaCard({ manga }: MangaCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/manga/${manga._id}`}>
      <Card 
        className="relative w-48 h-72 overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0 h-full">
          <img
            src={manga.coverImage}
            alt={manga.title}
            className="transition-all duration-300 object-cover w-full h-full"
          />
          <div 
            className={`absolute inset-0 bg-primary/70 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="p-4 flex flex-col justify-between h-full text-primary-foreground">
              <div>
                <h3 className="text-lg font-bold leading-tight mb-1">{manga.title}</h3>
                <p className="text-xs mb-2 line-clamp-[10]">{manga.description}</p>
              </div>
              <div className='flex justify-between items-center w-full'>
                <Badge variant="secondary">
                  {manga.chapterCount} capítulo{manga.chapterCount !== 1 && 's'}
                </Badge>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex items-center p-[0.15rem] bg-white rounded">
                        {manga.languages.map((lang, index) => (
                          <ReactCountryFlag
                            key={lang}
                            countryCode={languageCodes[lang] || lang}
                            svg
                            style={{
                              width: '1.2rem',
                              height: '0.9rem',
                              marginLeft: index > 0 ? '-0.3rem' : '0',
                            }}
                            title={lang}
                          />
                        ))}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {manga.languages.join(', ')}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}