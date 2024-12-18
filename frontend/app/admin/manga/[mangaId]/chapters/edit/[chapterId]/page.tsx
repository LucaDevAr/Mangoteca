'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Pencil, Save, GripVertical, Trash2, Plus, Loader2, X, Globe } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

interface PageItem {
  id: string
  url: string
}

interface Language {
  lang: string
  title: string
  description: string
  pages: string[]
}

interface Chapter {
  _id: string
  number: number
  releaseDate: string
  languages: Language[]
}

const SortableItem: React.FC<{
  id: string
  url: string
  index: number
  totalPages: number
  onRemove: (id: string) => void
}> = ({ id, url, index, totalPages, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onRemove(id)
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center space-x-2 bg-background p-2 rounded border border-gray-300"
    >
      <span className="cursor-move">
        <GripVertical className="h-5 w-5 text-gray-500" />
      </span>
      <img
        src={url}
        alt={`Preview of page ${totalPages - index}`}
        className="h-16 w-16 object-cover rounded"
      />
      <span className="flex-grow text-sm text-foreground">
        Página {totalPages - index}: {url}
      </span>
      <button
        type="button"
        onClick={handleRemove}
        className="p-1 rounded-full text-red-600 hover:bg-red-100"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </li>
  )
}

export default function EditChapterPage({ params }: { params: { mangaId: string, chapterId: string } }) {
  const router = useRouter()
  const { mangaId, chapterId } = params
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [title, setTitle] = useState<string>('')
  const [number, setNumber] = useState<number>(0)
  const [description, setDescription] = useState<string>('')
  const [pages, setPages] = useState<PageItem[]>([])
  const [newPageUrl, setNewPageUrl] = useState<string>('')
  const [releaseDate, setReleaseDate] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteLanguageModalOpen, setDeleteLanguageModalOpen] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/chapter/${mangaId}/${chapterId}`)
        if (!response.ok) throw new Error('Failed to fetch chapter')
        const data: Chapter = await response.json()
        setChapter(data)
        setNumber(data.number)
        setReleaseDate(new Date(data.releaseDate).toISOString().split('T')[0])
        if (data.languages.length > 0) {
          setSelectedLanguage(data.languages[0].lang)
          updateLanguageData(data.languages[0])
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching chapter:", error)
        setError('Failed to load chapter data')
        setLoading(false)
      }
    }

    if (chapterId) {
      fetchChapter()
    }
  }, [chapterId, mangaId])

  const updateLanguageData = useCallback((lang: Language) => {
    setTitle(lang.title)
    setDescription(lang.description)
    setPages(lang.pages.map((url, index) => ({ id: index.toString(), url })))
  }, [])

  useEffect(() => {
    if (chapter && selectedLanguage) {
      const lang = chapter.languages.find(l => l.lang === selectedLanguage)
      if (lang) {
        updateLanguageData(lang)
      }
    }
  }, [chapter, selectedLanguage, updateLanguageData])

  const addPage = useCallback(() => {
    if (newPageUrl) {
      setPages(prevPages => [{ id: Date.now().toString(), url: newPageUrl }, ...prevPages])
      setNewPageUrl('')
    }
  }, [newPageUrl])

  const removePage = useCallback((id: string) => {
    setPages(prevPages => prevPages.filter(page => page.id !== id))
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setPages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }, [])

  const handleDeleteLanguage = useCallback(async () => {
    if (!chapter || !selectedLanguage) return

    try {
      const response = await fetch(`http://localhost:5000/api/chapter/${chapterId}/language/${selectedLanguage}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete language')
      }

      const updatedLanguages = chapter.languages.filter(lang => lang.lang !== selectedLanguage)
      setChapter({ ...chapter, languages: updatedLanguages })

      if (updatedLanguages.length > 0) {
        setSelectedLanguage(updatedLanguages[0].lang)
        updateLanguageData(updatedLanguages[0])
      } else {
        setSelectedLanguage('')
        setTitle('')
        setDescription('')
        setPages([])
      }

      toast({
        title: "Idioma eliminado",
        description: `El idioma ${selectedLanguage.toUpperCase()} ha sido eliminado exitosamente.`,
      })
    } catch (error) {
      console.error('Error deleting language:', error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el idioma. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setDeleteLanguageModalOpen(false)
    }
  }, [chapter, selectedLanguage, chapterId, mangaId, updateLanguageData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!chapter) return

    const updatedLanguages = chapter.languages.map(lang => 
      lang.lang === selectedLanguage 
        ? { ...lang, title, description, pages: pages.map(page => page.url).reverse() }
        : lang
    )

    const updatedChapter = {
      ...chapter,
      number,
      releaseDate,
      languages: updatedLanguages,
    }

    try {
      const response = await fetch(`http://localhost:5000/api/chapter/${mangaId}/${chapterId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedChapter),
      })

      if (response.ok) {
        router.push(`/admin/manga/${mangaId}/chapters/${chapterId}`)
      } else {
        setError('Error al actualizar el capítulo')
      }
    } 
    catch (error) {
      console.error('Error de servidor:', error)
      setError('Error de servidor al actualizar el capítulo')
    }
  }

  const handleDeleteChapter = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/chapter/manga/${mangaId}/chapter/${chapterId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push(`/admin/manga/${mangaId}`)
      } else {
        setError('Error al eliminar el capítulo')
      }
    } catch (error) {
      console.error('Error de servidor:', error)
      setError('Error de servidor al eliminar el capítulo')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Pencil className="mr-2" /> Editar Capítulo
      </h1>
      <div className="flex justify-between mb-6">
        <Button asChild variant="outline">
          <Link href={`/admin/manga/${mangaId}/chapters/${chapterId}/add-language/`}>
            <Globe className="mr-2" /> Agregar Idioma
          </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="mr-2" /> Eliminar Capítulo
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro de que quieres eliminar este capítulo?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Se eliminará permanentemente el capítulo y todos sus datos asociados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteChapter}>Eliminar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex-grow mr-4">
                <Label htmlFor="language">Idioma</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-full md:w-auto">
                    <SelectValue placeholder="Selecciona el idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    {chapter?.languages.map((lang, index) => (
                      <SelectItem key={index} value={lang.lang}>{lang.lang.toUpperCase()}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {chapter?.languages.length > 1 && (
                <AlertDialog open={deleteLanguageModalOpen} onOpenChange={setDeleteLanguageModalOpen}>
                  <AlertDialogTrigger asChild>
                    <Button type="button" variant="destructive">
                      <X className="mr-2" /> Eliminar idioma
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás seguro de que quieres eliminar este idioma?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Se eliminará permanentemente el idioma {selectedLanguage.toUpperCase()} y todos sus datos asociados para este capítulo.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteLanguage}>Eliminar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título del capítulo</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Número del capítulo</Label>
                <Input id="number" type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="releaseDate">Fecha de publicación</Label>
                <Input id="releaseDate" type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} />
            </div>
            <div className="space-y-2">
              <Label>Páginas</Label>
              <div className="flex space-x-2">
                <Input value={newPageUrl} onChange={(e) => setNewPageUrl(e.target.value)} placeholder="URL de la página" />
                <Button type="button" onClick={addPage} variant="secondary">
                  <Plus className="mr-2" /> Agregar página
                </Button>
              </div>
            </div>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={pages} strategy={verticalListSortingStrategy}>
                <ul className="space-y-2 min-h-[50px]">
                  {pages.map((page, index) => (
                    <SortableItem 
                      key={page.id} 
                      id={page.id} 
                      url={page.url} 
                      index={index} 
                      totalPages={pages.length}
                      onRemove={removePage}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
            <Button type="submit" className="w-full">
              <Save className="mr-2" /> Guardar Cambios
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}