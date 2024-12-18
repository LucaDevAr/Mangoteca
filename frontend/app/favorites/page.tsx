'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, BookOpen, Heart } from 'lucide-react'
import axios from 'axios'

interface Manga {
  _id: string
  title: string
  coverImage: string
  author: string
  lastRead?: string
}

export default function FavoritesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('lastRead')
  const [favorites, setFavorites] = useState<Manga[]>([])

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/api/favorites', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setFavorites(response.data)
      } catch (error) {
        console.error('Error fetching favorites:', error)
      }
    }

    fetchFavorites()
  }, [])

  const filteredAndSortedManga = favorites
    .filter(manga => manga.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'lastRead') {
        return new Date(b.lastRead || '').getTime() - new Date(a.lastRead || '').getTime()
      } else {
        return a.title.localeCompare(b.title)
      }
    })

  const removeFavorite = async (mangaId: string) => {
    try {
      await axios.delete(`/api/favorites/${mangaId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setFavorites(favorites.filter(manga => manga._id !== mangaId))
    } catch (error) {
      console.error('Error removing favorite:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:w-1/3">
          <Input
            type="text"
            placeholder="Search favorites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-1/3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastRead">Last Read</SelectItem>
              <SelectItem value="title">Title</SelectItem>
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
        {filteredAndSortedManga.map(manga => (
          viewMode === 'grid' ? (
            <Card key={manga._id}>
              <CardHeader>
                <img src={manga.coverImage} alt={manga.title} className="w-full h-48 object-cover" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg">{manga.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{manga.author}</p>
                <p className="text-sm text-muted-foreground">Last read: {manga.lastRead || 'N/A'}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" /> Continue
                </Button>
                <Button variant="outline" onClick={() => removeFavorite(manga._id)}>
                  <Heart className="mr-2 h-4 w-4" /> Remove
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card key={manga._id}>
              <div className="flex items-center p-4">
                <img src={manga.coverImage} alt={manga.title} className="w-20 h-30 object-cover mr-4" />
                <div>
                  <CardTitle>{manga.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{manga.author}</p>
                  <p className="text-sm text-muted-foreground">Last read: {manga.lastRead || 'N/A'}</p>
                </div>
                <div className="ml-auto flex space-x-2">
                  <Button variant="outline">
                    <BookOpen className="mr-2 h-4 w-4" /> Continue
                  </Button>
                  <Button variant="outline" onClick={() => removeFavorite(manga._id)}>
                    <Heart className="mr-2 h-4 w-4" /> Remove
                  </Button>
                </div>
              </div>
            </Card>
          )
        ))}
      </div>
    </div>
  )
}