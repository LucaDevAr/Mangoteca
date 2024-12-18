'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, BookOpen } from 'lucide-react'
import Header from '@/components/Header'

interface Manga {
  id: string
  title: string
  coverUrl: string
  author: string
  genres: string[]
}

const dummyManga: Manga[] = [
  { id: '1', title: 'One Piece', coverUrl: '/placeholder.svg?height=150&width=100', author: 'Eiichiro Oda', genres: ['Action', 'Adventure'] },
  { id: '2', title: 'Berserk', coverUrl: '/placeholder.svg?height=150&width=100', author: 'Kentaro Miura', genres: ['Dark Fantasy', 'Action'] },
  { id: '3', title: 'Fullmetal Alchemist', coverUrl: '/placeholder.svg?height=150&width=100', author: 'Hiromu Arakawa', genres: ['Adventure', 'Fantasy'] },
  // Add more dummy data as needed
]

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [genre, setGenre] = useState('all')

  const filteredManga = dummyManga.filter(manga => 
    manga.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (genre === 'all' || manga.genres.includes(genre))
  )

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Explore Manga</h1>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-1/3">
            <Input
              type="text"
              placeholder="Search manga..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-1/3">
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="Action">Action</SelectItem>
                <SelectItem value="Adventure">Adventure</SelectItem>
                <SelectItem value="Fantasy">Fantasy</SelectItem>
                <SelectItem value="Dark Fantasy">Dark Fantasy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <Button variant={viewMode === 'grid' ? 'default' : 'outline'} onClick={() => setViewMode('grid')}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === 'list' ? 'default' : 'outline'} onClick={() => setViewMode('list')}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4' : 'space-y-4'}>
          {filteredManga.map(manga => (
            viewMode === 'grid' ? (
              <Card key={manga.id}>
                <CardHeader>
                  <img src={manga.coverUrl} alt={manga.title} className="w-full h-48 object-cover" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg">{manga.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{manga.author}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" /> Read
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card key={manga.id}>
                <div className="flex items-center p-4">
                  <img src={manga.coverUrl} alt={manga.title} className="w-20 h-30 object-cover mr-4" />
                  <div>
                    <CardTitle>{manga.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{manga.author}</p>
                    <p className="text-sm">{manga.genres.join(', ')}</p>
                  </div>
                  <Button variant="outline" className="ml-auto">
                    <BookOpen className="mr-2 h-4 w-4" /> Read
                  </Button>
                </div>
              </Card>
            )
          ))}
        </div>
      </div>
    </>
  )
}