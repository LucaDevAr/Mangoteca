'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Trash2, X, Edit2, Check, Plus } from 'lucide-react'

interface Manga {
  id: string
  title: string
  coverUrl: string
  author: string
  status: 'Reading' | 'Completed' | 'On Hold' | 'Dropped' | 'Plan to Read'
  progress: number
  totalChapters: number
}

interface CustomList {
  id: string
  name: string
  mangas: Manga[]
}

// Default data for testing
const defaultList: CustomList = {
  id: '1',
  name: 'My Favorite Manga',
  mangas: [
    {
      id: '1',
      title: 'One Piece',
      coverUrl: '/placeholder.svg?height=150&width=100',
      author: 'Eiichiro Oda',
      status: 'Reading',
      progress: 1015,
      totalChapters: 1050,
    },
    {
      id: '2',
      title: 'Berserk',
      coverUrl: '/placeholder.svg?height=150&width=100',
      author: 'Kentaro Miura',
      status: 'On Hold',
      progress: 300,
      totalChapters: 364,
    },
    {
      id: '3',
      title: 'Fullmetal Alchemist',
      coverUrl: '/placeholder.svg?height=150&width=100',
      author: 'Hiromu Arakawa',
      status: 'Completed',
      progress: 109,
      totalChapters: 109,
    },
  ]
}

export default function CustomList() {
  const [list, setList] = useState<CustomList>(defaultList)
  const [isEditing, setIsEditing] = useState(false)
  const [newListName, setNewListName] = useState(list.name)
  const [showAddManga, setShowAddManga] = useState(false)
  const [newManga, setNewManga] = useState<Manga>({
    id: '',
    title: '',
    coverUrl: '/placeholder.svg?height=150&width=100',
    author: '',
    status: 'Plan to Read',
    progress: 0,
    totalChapters: 0,
  })

  const handleRemoveList = () => {
    // In a real application, you would remove the list from the parent component
    alert('List removed')
  }

  const handleRemoveMangaFromList = (mangaId: string) => {
    setList(prevList => ({
      ...prevList,
      mangas: prevList.mangas.filter(manga => manga.id !== mangaId)
    }))
  }

  const handleEditListName = () => {
    if (isEditing) {
      setList(prevList => ({ ...prevList, name: newListName }))
    }
    setIsEditing(!isEditing)
  }

  const handleAddManga = () => {
    if (newManga.title && newManga.author) {
      setList(prevList => ({
        ...prevList,
        mangas: [...prevList.mangas, { ...newManga, id: Date.now().toString() }]
      }))
      setNewManga({
        id: '',
        title: '',
        coverUrl: '/placeholder.svg?height=150&width=100',
        author: '',
        status: 'Plan to Read',
        progress: 0,
        totalChapters: 0,
      })
      setShowAddManga(false)
    }
  }

  return (
    <div className="bg-card p-4 rounded-lg shadow border border-border pt-36">
      <div className="flex justify-between items-center mb-4">
        {isEditing ? (
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            className="text-xl font-semibold bg-background border border-border rounded px-2 py-1"
          />
        ) : (
          <h3 className="text-xl font-semibold">{list.name}</h3>
        )}
        <div className="flex space-x-2">
          <button
            onClick={handleEditListName}
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label={isEditing ? "Save list name" : "Edit list name"}
          >
            {isEditing ? <Check className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
          </button>
          <button
            onClick={handleRemoveList}
            className="text-muted-foreground hover:text-error transition-colors duration-200"
            aria-label="Delete list"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      {list.mangas.length === 0 ? (
        <p className="text-muted-foreground">This list is empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {list.mangas.map(manga => (
            <div key={manga.id} className="relative group border border-border">
              <div className="aspect-w-1 aspect-h-3 rounded-md overflow-hidden">
                <img
                  src="https://mangadex.org/covers/538812c5-54c2-43c2-938b-5079ec21b04e/43d2789f-6f5c-493e-9c35-b4248075b0a6.jpg.256.jpg"
                  alt={manga.title}
                  className="transition-transform duration-200 group-hover:scale-105 object-cover"
                />
              </div>
              <button
                onClick={() => handleRemoveMangaFromList(manga.id)}
                className="absolute top-1 right-1 bg-background text-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-error hover:text-error-foreground"
                aria-label={`Remove ${manga.title} from list`}
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mt-2">
                <p className="text-sm font-medium truncate">{manga.title}</p>
                <p className="text-xs text-muted-foreground truncate">{manga.author}</p>
                <p className="text-xs text-muted-foreground">{manga.status}</p>
                <p className="text-xs text-muted-foreground">{manga.progress} / {manga.totalChapters}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {showAddManga ? (
        <div className="mt-4 p-4 bg-background rounded-lg border border-border">
          <h4 className="text-lg font-semibold mb-2">Add New Manga</h4>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Title"
              value={newManga.title}
              onChange={(e) => setNewManga({ ...newManga, title: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border rounded"
            />
            <input
              type="text"
              placeholder="Author"
              value={newManga.author}
              onChange={(e) => setNewManga({ ...newManga, author: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border rounded"
            />
            <select
              value={newManga.status}
              onChange={(e) => setNewManga({ ...newManga, status: e.target.value as Manga['status'] })}
              className="w-full px-3 py-2 bg-background border border-border rounded"
            >
              <option value="Reading">Reading</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
              <option value="Dropped">Dropped</option>
              <option value="Plan to Read">Plan to Read</option>
            </select>
            <div className="flex space-x-2">
              <button
                onClick={handleAddManga}
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors duration-200"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddManga(false)}
                className="px-4 py-2 bg-muted text-muted-foreground rounded hover:bg-muted/90 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAddManga(true)}
          className="mt-4 flex items-center text-primary hover:text-primary/90 transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" /> Add Manga to List
        </button>
      )}
    </div>
  )
}