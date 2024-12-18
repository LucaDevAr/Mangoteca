'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, Save, Plus, Trash2, X, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import ChaptersList from '@/components/admin/ChaptersList'
import debounce from 'lodash/debounce'

interface Tag {
  type: string
  value: string
}

interface RelatedManga {
  manga: string
  mangaTitle: string
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
  coverImage: string
  bannerImage: string
  publishedAt: string
  finishedAt?: string
  contentRating: string
  relatedManga: RelatedManga[]
}

const DEMOGRAPHICS = ['shounen', 'shoujo', 'seinen', 'josei']
const STATUSES = ['ongoing', 'completed', 'cancelled', 'hiatus']
const CONTENT_RATINGS = ['safe', 'suggestive', 'erotica', 'pornographic']
const PUBLICATION_STATES = ['draft', 'submitted', 'published', 'rejected']

const relationshipTypeMap: { [key: string]: string } = {
  prequel: 'Precuela',
  sequel: 'Secuela',
  side_story: 'Historia paralela',
  spin_off: 'Spin-off',
  alternate_version: 'Versión alternativa',
  shared_universe: 'Universo compartido'
};

const EditMangaPage = ({ params }: { params: { mangaId: string } }) => {
  const [manga, setManga] = useState<Manga>({
    _id: '',
    title: '',
    author: '',
    description: '',
    tags: [],
    demographic: '',
    status: '',
    publicationState: '',
    coverImage: '',
    bannerImage: '',
    publishedAt: '',
    contentRating: '',
    relatedManga: [],
  })
  
  const [newTag, setNewTag] = useState({ type: 'genre', value: '' })
  const [newRelatedManga, setNewRelatedManga] = useState({ manga: '', mangaTitle: '', relationshipType: 'prequel' })
  const [mangaSearch, setMangaSearch] = useState('')
  const [filteredMangaOptions, setFilteredMangaOptions] = useState<{ _id: string; title: string }[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [relatedMangaDetails, setRelatedMangaDetails] = useState<{ [key: string]: string }>({})

  const router = useRouter()
  const { mangaId } = params

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/manga/${mangaId}`)
        if (!response.ok) throw new Error('Failed to fetch manga')
        const data = await response.json()
        setManga({
          ...data,
          publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString().split('T')[0] : '',
          finishedAt: data.finishedAt ? new Date(data.finishedAt).toISOString().split('T')[0] : '',
        })
        fetchRelatedMangaDetails(data.relatedManga)
      } catch (error) {
        console.error("Error fetching manga:", error)
        setError("Error al cargar el manga. Por favor, intente de nuevo más tarde.")
      }
    }

    const fetchRelatedMangaDetails = async (relatedManga: RelatedManga[]) => {
      const details: { [key: string]: string } = {}
      for (const related of relatedManga) {
        try {
          const response = await fetch(`http://localhost:5000/api/manga/${related.manga}`)
          if (response.ok) {
            const data = await response.json()
            details[related.manga] = data.title
          }
        } catch (error) {
          console.error(`Error fetching related manga ${related.manga}:`, error)
        }
      }
      setRelatedMangaDetails(details)
    }

    if (mangaId) {
      fetchManga()
    }
  }, [mangaId])

  const debouncedSearch = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm.length === 0) {
        setFilteredMangaOptions([])
        setIsSearching(false)
        return
      }
      setIsSearching(true)
      try {
        const response = await fetch(`http://localhost:5000/api/manga/search?query=${searchTerm}`)
        if (!response.ok) {
          throw new Error('Error al buscar mangas')
        }
        const data = await response.json()
        setFilteredMangaOptions(data.mangas)
      } catch (error) {
        console.error('Error:', error)
        setError('Error al buscar mangas. Por favor, intente de nuevo más tarde.')
      } finally {
        setIsSearching(false)
      }
    }, 300),
    []
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setManga(prevManga => ({
      ...prevManga,
      [name]: value,
    }))
  }

  const handleTagChange = (tag: Tag) => {
    setManga(prevManga => ({
      ...prevManga,
      tags: prevManga.tags.some(t => t.value === tag.value)
        ? prevManga.tags.filter(t => t.value !== tag.value)
        : [...prevManga.tags, tag],
    }))
  }

  const handleAddNewTag = () => {
    if (newTag.value.trim() !== '') {
      setManga(prevManga => ({
        ...prevManga,
        tags: [...prevManga.tags, newTag],
      }))
      setNewTag({ type: 'genre', value: '' })
    }
  }

  const handleRemoveTag = (tagToRemove: Tag) => {
    setManga(prevManga => ({
      ...prevManga,
      tags: prevManga.tags.filter(tag => tag.value !== tagToRemove.value),
    }))
  }

  const handleMangaSearch = (value: string) => {
    setMangaSearch(value)
    debouncedSearch(value)
  }

  const handleSelectRelatedManga = (mangaId: string, mangaTitle: string) => {
    setNewRelatedManga(prev => ({ ...prev, manga: mangaId, mangaTitle: mangaTitle }))
    setMangaSearch(mangaTitle)
    setFilteredMangaOptions([])
  }

  const handleAddRelatedManga = () => {
    if (newRelatedManga.manga !== '') {
      setManga(prevManga => ({
        ...prevManga,
        relatedManga: [...prevManga.relatedManga, newRelatedManga],
      }))
      setNewRelatedManga({ manga: '', mangaTitle: '', relationshipType: 'prequel' })
      setMangaSearch('')
    }
  }

  const handleRemoveRelatedManga = (mangaIdToRemove: string) => {
    setManga(prevManga => ({
      ...prevManga,
      relatedManga: prevManga.relatedManga.filter(rm => rm.manga !== mangaIdToRemove),
    }))
  }

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!manga.title.trim()) errors.title = "El título es obligatorio"
    if (!manga.description.trim()) errors.description = "La descripción es obligatoria"
    if (!manga.author.trim()) errors.author = "El autor es obligatorio"
    if (!manga.coverImage.trim()) errors.coverImage = "La imagen de portada es obligatoria"
    if (manga.tags.length < 1) errors.tags = "Se requiere al menos 1 tag"
    if (!manga.publishedAt) errors.publishedAt = "La fecha de publicación es obligatoria"
    if (manga.status === 'completed' && !manga.finishedAt) {
      errors.finishedAt = "La fecha de finalización es obligatoria para mangas completados"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!validateForm()) {
      setError("Por favor, complete todos los campos obligatorios.")
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/api/manga/${mangaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(manga),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al actualizar el manga')
      }

      router.push('/admin/manga')
    } catch (error) {
      console.error("Error al actualizar el manga:", error)
      setError(`Error al actualizar el manga: ${error.message}`)
    }
  }

  const handleDeleteManga = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/manga/${mangaId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Error al eliminar el manga')
      }

      router.push('/admin/manga')
    } catch (error) {
      console.error("Error al eliminar el manga:", error)
      setError(`Error al eliminar el manga: ${error.message}`)
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <Pencil className="mr-2" /> Editar Manga
        </h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="mr-2" /> Eliminar Manga
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro de que quieres eliminar este manga?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Se eliminará permanentemente el manga y todos sus capítulos asociados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteManga}>Eliminar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="relative h-[400px] w-full mb-24">
        <img
          src={manga.bannerImage || '/placeholder.svg?height=400&width=800'}
          alt={`${manga.title} Banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <img
          src={manga.coverImage || '/placeholder.svg?height=300&width=200'}
          alt={manga.title}
          className="absolute bottom-[-50px] left-8 h-[300px] w-[200px] object-cover shadow-lg rounded-lg border-4 border-background"
        />
      </div>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="coverImage">URL de la imagen de portada</Label>
                <Input
                  id="coverImage"
                  name="coverImage"
                  value={manga.coverImage}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.coverImage && <p className="text-red-500 text-sm">{formErrors.coverImage}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bannerImage">URL de la imagen del banner</Label>
                <Input
                  id="bannerImage"
                  name="bannerImage"
                  value={manga.bannerImage}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  value={manga.title}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.title && <p className="text-red-500 text-sm">{formErrors.title}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Autor</Label>
                <Input
                  id="author"
                  name="author"
                  value={manga.author}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.author && <p className="text-red-500 text-sm">{formErrors.author}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                
                value={manga.description}
                onChange={handleInputChange}
                rows={4}
                required
              />
              {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
            </div>
            <div className="space-y-2">
              <Label>Etiquetas</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {manga.tags.map((tag, index) => (
                  <Badge key={`${tag.value}-${index}`} variant="secondary" className="flex items-center gap-1">
                    {tag.value}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="text-xs">
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Select  
                  value={newTag.type} 
                  onValueChange={(value) => setNewTag(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo de tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="genre">Género</SelectItem>
                    <SelectItem value="theme">Tema</SelectItem>
                    <SelectItem value="format">Formato</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  value={newTag.value}
                  onChange={(e) => setNewTag(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="Nuevo tag"
                />
                <Button type="button" onClick={handleAddNewTag}>Agregar Tag</Button>
              </div>
              {formErrors.tags && <p className="text-red-500 text-sm">{formErrors.tags}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="demographic">Demografía</Label>
                <Select name="demographic" value={manga.demographic} onValueChange={(value) => setManga(prev => ({ ...prev, demographic: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la demografía" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEMOGRAPHICS.map((demo) => (
                      <SelectItem key={demo} value={demo}>{demo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select name="status" value={manga.status} onValueChange={(value) => setManga(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contentRating">Clasificación de contenido</Label>
                <Select name="contentRating" value={manga.contentRating} onValueChange={(value) => setManga(prev => ({ ...prev, contentRating: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la clasificación" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTENT_RATINGS.map((rating) => (
                      <SelectItem key={rating} value={rating}>{rating}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="publicationState">Estado de publicación</Label>
                <Select name="publicationState" value={manga.publicationState} onValueChange={(value) => setManga(prev => ({ ...prev, publicationState: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el estado de publicación" />
                  </SelectTrigger>
                  <SelectContent>
                    {PUBLICATION_STATES.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="publishedAt">Fecha de publicación</Label>
                <Input
                  type="date"
                  id="publishedAt"
                  name="publishedAt"
                  value={manga.publishedAt}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.publishedAt && <p className="text-red-500 text-sm">{formErrors.publishedAt}</p>}
              </div>
              {manga.status === 'completed' && (
                <div className="space-y-2">
                  <Label htmlFor="finishedAt">Fecha de finalización</Label>
                  <Input
                    type="date"
                    id="finishedAt"
                    name="finishedAt"
                    value={manga.finishedAt}
                    onChange={handleInputChange}
                  />
                  {formErrors.finishedAt && <p className="text-red-500 text-sm">{formErrors.finishedAt}</p>}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Mangas Relacionados</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {manga.relatedManga.map((relatedManga, index) => (
                  <Badge key={`${relatedManga.manga}-${index}`} variant="secondary" className="flex items-center gap-1">
                    {relatedMangaDetails[relatedManga.manga] || relatedManga.mangaTitle} {relationshipTypeMap[relatedManga.relationshipType] || relatedManga.relationshipType}
                    <button type="button" onClick={() => handleRemoveRelatedManga(relatedManga.manga)} className="text-xs">
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <div className="relative w-[200px]">
                  <Input
                    type="text"
                    placeholder="Buscar manga..."
                    value={mangaSearch}
                    onChange={(e) => handleMangaSearch(e.target.value)}
                  />
                  {isSearching && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    </div>
                  )}
                  {filteredMangaOptions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                      {filteredMangaOptions.map((manga) => (
                        <li
                          key={manga._id}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectRelatedManga(manga._id, manga.title)}
                        >
                          {manga.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Select 
                  value={newRelatedManga.relationshipType} 
                  onValueChange={(value) => setNewRelatedManga(prev => ({ ...prev, relationshipType: value }))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo de relación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prequel">Precuela</SelectItem>
                    <SelectItem value="sequel">Secuela</SelectItem>
                    <SelectItem value="side_story">Historia Paralela</SelectItem>
                    <SelectItem value="spin_off">Spin-off</SelectItem>
                    <SelectItem value="alternate_version">Versión Alternativa</SelectItem>
                    <SelectItem value="shared_universe">Universo Compartido</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="button" onClick={handleAddRelatedManga}>Agregar Relación</Button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              <Save className="mr-2" /> Guardar cambios
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card className="mt-12">
        <CardHeader className='flex justify-between items-center flex-row'>
          <CardTitle>Capítulos ({manga.chapterCount})</CardTitle>
          <div className="flex justify-between items-center mb-6">
            <Button onClick={() => router.push(`/admin/manga/${mangaId}/chapters/add`)}>
              <Plus className="mr-2" /> Agregar Capítulo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
            <ChaptersList mangaId={mangaId}/>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  )
}

export default EditMangaPage