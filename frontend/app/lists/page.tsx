'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from 'lucide-react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { CreateListModal } from '@/components/CreateListModal'
import { useToast } from "@/components/ui/use-toast"

interface MangaList {
  _id: string
  name: string
  description: string
  mangas: string[]
  createdAt: string
  updatedAt: string
}

export default function MyListsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [lists, setLists] = useState<MangaList[]>([])
  const { data: session } = useSession()
  const { toast } = useToast()

  useEffect(() => {
    const fetchLists = async () => {
      if (session) {
        try {
          const response = await axios.get('/api/lists', {
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`
            }
          })
          setLists(response.data)
        } catch (error) {
          console.error('Error fetching lists:', error)
          toast({
            title: "Error",
            description: "Failed to fetch lists",
            variant: "destructive",
          })
        }
      }
    }

    fetchLists()
  }, [session])

  const filteredLists = lists.filter(list => 
    list.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const deleteList = async (listId: string) => {
    if (session) {
      try {
        await axios.delete(`/api/lists/${listId}`, {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`
          }
        })
        setLists(lists.filter(list => list._id !== listId))
        toast({
          title: "Success",
          description: "List deleted successfully",
        })
      } catch (error) {
        console.error('Error deleting list:', error)
        toast({
          title: "Error",
          description: "Failed to delete list",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Lists</h1>
        <CreateListModal />
      </div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search lists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLists.map(list => (
          <Card key={list._id}>
            <CardHeader>
              <CardTitle>{list.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{list.description}</p>
              <p className="text-sm text-muted-foreground">{list.mangas.length} manga</p>
              <p className="text-sm text-muted-foreground">Last updated: {new Date(list.updatedAt).toLocaleDateString()}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/lists/${list._id}`}>
                  View
                </Link>
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/lists/${list._id}/edit`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" onClick={() => deleteList(list._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}