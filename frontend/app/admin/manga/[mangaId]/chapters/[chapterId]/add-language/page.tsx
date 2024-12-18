'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Pencil, Save, GripVertical, Trash2, Plus, Loader2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface PageItem {
  id: string
  url: string
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

export default function AddLanguagePage({ params }: { params: { chapterId: string } }) {
  const { chapterId } = params
  const [language, setLanguage] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [pages, setPages] = useState<PageItem[]>([])
  const [newPageUrl, setNewPageUrl] = useState<string>('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    if (!language || !title || pages.length === 0) {
      setError('Por favor, rellena todos los campos y asegúrate de que haya al menos una página.')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/api/chapter/${chapterId}/language`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lang: language,
          title: title,
          description: description,
          pages: pages.map(page => page.url),
        }),
      })

      if (response.ok) {
        setSuccess('Idioma añadido exitosamente.')
        setTimeout(() => {
          router.push(`/admin/manga`)
        }, 1500)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Hubo un problema al añadir el idioma.')
      }
    } catch (err) {
      setError('Error al enviar el formulario.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center">
            <Pencil className="mr-2" /> Agregar nuevo idioma
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="default" className="mb-4">
              <AlertTitle>Éxito</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Input
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  placeholder="es, en, fr, etc."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título del capítulo"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción (opcional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción del capítulo"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Páginas</Label>
              <div className="flex space-x-2">
                <Input
                  value={newPageUrl}
                  onChange={(e) => setNewPageUrl(e.target.value)}
                  placeholder="URL de la página"
                />
                <Button type="button" onClick={addPage} variant="secondary">
                  <Plus className="mr-2" /> Agregar página
                </Button>
              </div>
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={pages}
                strategy={verticalListSortingStrategy}
              >
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
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Procesando...
                </>
              ) : (
                <>
                  <Save className="mr-2" /> Agregar Idioma
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}