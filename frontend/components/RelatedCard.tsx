import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from 'lucide-react'

interface RelatedMangaCardProps {
  manga: {
    _id: string
    title: string
    coverImage: string
    averageRating: number
    chapterCount: number
  }
  relationshipType: string
}

const relationshipTranslations: { [key: string]: string } = {
  'prequel': 'Precuela',
  'sequel': 'Secuela',
  'side_story': 'Historia paralela',
  'spin_off': 'Spin-off',
  'alternate_version': 'Versión alternativa',
  'shared_universe': 'Universo compartido'
}

export default function RelatedMangaCard({ manga, relationshipType }: RelatedMangaCardProps) {
  return (
    <Link href={`/manga/${manga._id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-4 flex flex-col">
          <div className="relative w-full mb-2">
            <img
              src={manga.coverImage || '/placeholder.svg?height=300&width=200'}
              alt={manga.title}
              className="rounded-lg object-cover"
            />
          </div>
          <h3 className="font-semibold text-sm mb-1 line-clamp-2">{manga.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{manga.averageRating.toFixed(1)}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{manga.chapterCount} capítulos</p>
          <Badge variant="secondary" className="mt-auto self-start">
            {relationshipTranslations[relationshipType] || relationshipType}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  )
}