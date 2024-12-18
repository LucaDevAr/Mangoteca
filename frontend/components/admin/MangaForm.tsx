"use client"

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
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

export default function MangaForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    tags: [] as Tag[],
    demographic: 'shounen',
    status: 'ongoing',
    publicationState: 'draft',
    coverImage: '',
    bannerImage: '',
    publishedAt: '',
    finishedAt: '',
    contentRating: 'safe',
    relatedManga: [] as RelatedManga[],
  })

  const [newlyCreatedMangaId, setNewlyCreatedMangaId] = useState<string | null>(null)
  const [newRelatedManga, setNewRelatedManga] = useState({ manga: '', mangaTitle: '', relationshipType: 'prequel' })
  const [newTag, setNewTag] = useState({ type: 'genre', value: '' })
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [mangaSearch, setMangaSearch] = useState('')
  const [filteredMangaOptions, setFilteredMangaOptions] = useState<{ _id: string; title: string }[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [relatedMangaDetails, setRelatedMangaDetails] = useState<{ [key: string]: string }>({})

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTagChange = (tag: Tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.some(t => t.value === tag.value)
        ? prev.tags.filter(t => t.value !== tag.value)
        : [...prev.tags, tag],
    }))
  }

  const handleAddNewTag = () => {
    if (newTag.value.trim() !== '') {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }))
      setNewTag({ type: 'genre', value: '' })
    }
  }

  const handleRemoveTag = (tagToRemove: Tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag.value !== tagToRemove.value),
    }))
  }

  const handleMangaSearch = (value: string) => {
    setMangaSearch(value)
    debouncedSearch(value)
  }

  const handleSelectRelatedManga = async (mangaId: string, mangaTitle: string) => {
    setNewRelatedManga(prev => ({ ...prev, manga: mangaId, mangaTitle: mangaTitle }))
    setMangaSearch(mangaTitle)
    setFilteredMangaOptions([])

    // Fetch and store the related manga details
    try {
      const response = await fetch(`http://localhost:5000/api/manga/${mangaId}`)
      if (response.ok) {
        const data = await response.json()
        setRelatedMangaDetails(prev => ({ ...prev, [mangaId]: data.title }))
      }
    } catch (error) {
      console.error(`Error fetching related manga ${mangaId}:`, error)
    }
  }

  const handleAddRelatedManga = () => {
    if (newRelatedManga.manga !== '') {
      setFormData(prev => ({
        ...prev,
        relatedManga: [...prev.relatedManga, newRelatedManga],
      }))
      setNewRelatedManga({ manga: '', mangaTitle: '', relationshipType: 'prequel' })
      setMangaSearch('')
    }
  }

  const handleRemoveRelatedManga = (mangaIdToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      relatedManga: prev.relatedManga.filter(rm => rm.manga !== mangaIdToRemove),
    }))
  }

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!formData.title.trim()) errors.title = "El título es obligatorio"
    if (!formData.description.trim()) errors.description = "La descripción es obligatoria"
    if (!formData.author.trim()) errors.author = "El autor es obligatorio"
    if (!formData.coverImage.trim()) errors.coverImage = "La imagen de portada es obligatoria"
    if (formData.tags.length < 1) errors.tags = "Se requiere al menos 1 tag"
    if (!formData.publishedAt) errors.publishedAt = "La fecha de publicación es obligatoria"
    if (formData.status === 'completed' && !formData.finishedAt) {
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
      const mangaDataToSend = {
        ...formData,
        relatedManga: formData.relatedManga.map(({ manga, relationshipType }) => ({ manga, relationshipType }))
      }

      const response = await fetch('http://localhost:5000/api/manga', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mangaDataToSend),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al crear el manga')
      }

      const data = await response.json()
      console.log('Manga creado:', data)
      setNewlyCreatedMangaId(data.manga._id)

      // Reiniciar el formulario
      setFormData({
        title: '',
        description: '',
        author: '',
        tags: [],
        demographic: 'shounen',
        status: 'ongoing',
        publicationState: 'draft',
        coverImage: '',
        bannerImage: '',
        publishedAt: '',
        finishedAt: '',
        contentRating: 'safe',
        relatedManga: [],
      })
      setMangaSearch('')
    } catch (error) {
      console.error('Error:', error)
      setError(`Error al crear el manga: ${error.message}`)
    }
  }

  const handleAddChapter = () => {
    if (newlyCreatedMangaId) {
      router.push(`/admin/manga/${newlyCreatedMangaId}/chapters/add`)
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Crear Nuevo Manga</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 space-y-6">
              <div className="relative aspect-[2/3] bg-muted rounded-lg overflow-hidden">
                {formData.coverImage ? (
                  <img src={formData.coverImage} alt="Vista previa de la portada" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <span>Portada</span>
                  </div>
                )}
              </div>
              <Input
                type="text"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="URL de la imagen de portada"
                required
              />
              {formErrors.coverImage && <p className="text-red-500 text-sm">{formErrors.coverImage}</p>}
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              <div className="relative aspect-[16/9] bg-muted rounded-lg overflow-hidden">
                {formData.bannerImage ? (
                  <img src={formData.bannerImage} alt="Vista previa del banner" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <span>Banner</span>
                  </div>
                )}
              </div>
              <Input
                type="text"
                name="bannerImage"
                value={formData.bannerImage}
                onChange={handleChange}
                placeholder="URL de la imagen de banner"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Título"
                required
              />
              {formErrors.title && <p className="text-red-500 text-sm">{formErrors.title}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Autor</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Autor"
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
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción"
              rows={4}
              required
            />
            {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="demographic">Demografía</Label>
              <Select name="demographic" value={formData.demographic} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, demographic: value }))}>
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
              <Label htmlFor="status">Estado del Manga</Label>
              <Select name="status" value={formData.status}
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
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
            <div  className="space-y-2">
              <Label htmlFor="contentRating">Clasificación de Contenido</Label>
              <Select name="contentRating" value={formData.contentRating}
                onValueChange={(value) => setFormData(prev => ({ ...prev, contentRating: value }))}>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="publicationState">Estado de Publicación</Label>
            <Select name="publicationState" value={formData.publicationState}
              onValueChange={(value) => setFormData(prev => ({ ...prev, publicationState: value }))}>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="publishedAt">Fecha de Publicación</Label>
              <Input
                id="publishedAt"
                type="date"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleChange}
                required
              />
              {formErrors.publishedAt && <p className="text-red-500 text-sm">{formErrors.publishedAt}</p>}
            </div>
            {formData.status === 'completed' && (
              <div className="space-y-2">
                <Label htmlFor="finishedAt">Fecha de Finalización</Label>
                <Input
                  id="finishedAt"
                  type="date"
                  name="finishedAt"
                  value={formData.finishedAt}
                  onChange={handleChange}
                  required
                />
                {formErrors.finishedAt && <p className="text-red-500 text-sm">{formErrors.finishedAt}</p>}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Mangas Relacionados</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.relatedManga.map((relatedManga, index) => (
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

          <div className="flex justify-between items-center">
            <Button type="submit">
              Crear Manga
            </Button>
            {newlyCreatedMangaId && (
              <Button onClick={handleAddChapter} variant="secondary">
                <Plus className="w-5 h-5 mr-2" />
                Agregar Capítulo
              </Button>
            )}
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}