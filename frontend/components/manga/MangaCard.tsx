import Image from 'next/image'
import Link from 'next/link'
import { Star, Eye, Clock } from 'lucide-react'

interface BaseMangaCardProps {
  id: string
  title: string
  coverImage: string
  author: string
}

export function BaseMangaCard({ id, title, coverImage, author }: BaseMangaCardProps) {
  return (
    <Link href={`/manga/${id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
        <img
          src={coverImage}
          alt={title}
          className="object-cover transition-transform group-hover:scale-105 w-full h-full"
        />
      </div>
      <div className="mt-2">
        <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
        <p className="text-xs text-muted-foreground">{author}</p>
      </div>
    </Link>
  )
}