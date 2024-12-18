import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, BookOpen, Eye, Calendar, ChevronRight, MessageSquare } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Manga {
  _id: string
  title: string
  author: string
  description: string
  coverImage: string
  tags: { type: string; value: string }[]
  demographic: string
  status: string
  chapterCount: number
  reads: number
  averageRating: number
  publishedAt: Date
  comments: string[] // Array of comment IDs
  contentRating: string
  languages: string[]
}

export default function RecommendationCard({ manga }: { manga: Manga }) {
  return (
    <Card className="w-full max-w-3xl overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link href={`/manga/${manga._id}`} className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/3 relative">
          <img 
            src={manga.coverImage} 
            alt={manga.title} 
            className="w-full h-64 sm:h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-2">
            <Badge className="bg-primary/80">{manga.demographic}</Badge>
            <Badge 
              variant={manga.status === 'ongoing' ? 'default' : 'secondary'}
            >
              {manga.status}
            </Badge>
            <Badge variant="outline">{manga.contentRating}</Badge>
          </div>
        </div>
        <CardContent className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xl mb-1 line-clamp-1">{manga.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{manga.author}</p>
            <ScrollArea className="h-20 mb-2">
              <p className="text-sm">{manga.description}</p>
            </ScrollArea>
            <div className="flex flex-wrap gap-1 mb-2">
              {manga.tags.map((tag) => (
                <TooltipProvider key={tag.value}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant="outline" className="text-xs">
                        {tag.type === 'genre' ? '🎭' : tag.type === 'theme' ? '🎨' : '📚'} {tag.value}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tag.type.charAt(0).toUpperCase() + tag.type.slice(1)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <span className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                {manga.averageRating.toFixed(1)} rating
              </span>
              <span className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                {manga.chapterCount} chapters
              </span>
              <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {manga.reads} 
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(manga.publishedAt).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                {manga.comments.length} comments
              </span>
              <span className="flex items-center">
                <span className="font-bold mr-1">{manga?.languages?.length}</span> languages
              </span>
            </div>
            <Button className="w-full">
              View Details
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}