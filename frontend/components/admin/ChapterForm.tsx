'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { GripVertical, Trash2, Plus } from 'lucide-react'

interface ChapterFormProps {
  mangaId: string
  nextChapterNumber: number
}

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
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex items-center space-x-2 bg-background p-2 rounded border border-input">
      <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
      <img src={url} alt={`Preview of page ${totalPages - index}`} className="h-16 w-16 object-cover rounded" />
      <span className="flex-grow text-sm">Página {totalPages - index}: {url}</span>
      <Button variant="ghost" size="icon" onClick={() => onRemove(id)}>
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </li>
  )
}

const ChapterForm: React.FC<ChapterFormProps> = ({ mangaId, nextChapterNumber }) => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    number: nextChapterNumber,
    description: '',
    pages: [] as PageItem[],
    language: 'es',
    releaseDate: new Date().toISOString().split('T')[0],
  })
  const [newPageUrl, setNewPageUrl] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const addPage = useCallback(() => {
    if (newPageUrl) {
      setFormData(prev => ({
        ...prev,
        pages: [{ id: Date.now().toString(), url: newPageUrl }, ...prev.pages]
      }))
      setNewPageUrl('')
    }
  }, [newPageUrl])

  const removePage = useCallback((id: string) => {
    setFormData(prev => ({
      ...prev,
      pages: prev.pages.filter(page => page.id !== id)
    }))
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      setFormData(prev => {
        const oldIndex = prev.pages.findIndex(item => item.id === active.id)
        const newIndex = prev.pages.findIndex(item => item.id === over?.id)
        return {
          ...prev,
          pages: arrayMove(prev.pages, oldIndex, newIndex)
        }
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:5000/api/chapter/${mangaId}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: formData.number,
          releaseDate: formData.releaseDate,
          languages: [{
            lang: formData.language,
            title: formData.title,
            description: formData.description,
            pages: formData.pages.map(page => page.url).reverse(),
          }],
        }),
      })
      if  (response.ok) {
        router.push(`/admin/manga/${mangaId}`)
      } else {
        console.error('Error al agregar el capítulo')
      }
    } catch (error) {
      console.error('Error de servidor:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título del capítulo</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="number">Número del capítulo</Label>
          <Input id="number" name="number" type="number" value={formData.number} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Idioma</Label>
          <Select name="language" value={formData.language} onValueChange={(value) => handleChange({ target: { name: 'language', value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="jp">Japonés</SelectItem>
              <SelectItem value="en">Inglés</SelectItem>
              <SelectItem value="br">Francés</SelectItem>
              <SelectItem value="pt">Portugués</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="releaseDate">Fecha de publicación</Label>
          <Input id="releaseDate" name="releaseDate" type="date" value={formData.releaseDate} onChange={handleChange} required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={4} />
      </div>
      <Card>
        <CardContent className="pt-6">
          <Label>Páginas</Label>
          <div className="flex space-x-2 mt-2">
            <Input value={newPageUrl} onChange={(e) => setNewPageUrl(e.target.value)} placeholder="URL de la página" />
            <Button type="button" onClick={addPage} variant="secondary">
              <Plus className="h-4 w-4 mr-2" /> Agregar página
            </Button>
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={formData.pages} strategy={verticalListSortingStrategy}>
              <ul className="space-y-2 mt-4 min-h-[50px]">
                {formData.pages.map((page, index) => (
                  <SortableItem 
                    key={page.id} 
                    id={page.id} 
                    url={page.url} 
                    index={index} 
                    totalPages={formData.pages.length}
                    onRemove={removePage}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>
      <Button type="submit" className="w-full">Agregar Capítulo</Button>
    </form>
  )
}

export default ChapterForm