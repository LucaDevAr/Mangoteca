'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FolderPlus } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

export function CreateListModal() {
  const [open, setOpen] = useState(false)
  const [listName, setListName] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (session) {
      try {
        const response = await axios.post('http://localhost:5000/api/lists', 
          { name: listName, description },
          {
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`
            }
          }
        )
        toast({
          title: "Success",
          description: "List created successfully",
        })
        setOpen(false)
        setListName('')
        setDescription('')
        router.refresh()
      } catch (error) {
        console.error('Error creating list:', error)
        toast({
          title: "Error",
          description: "Failed to create list",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FolderPlus className="mr-2 h-4 w-4" /> Create New List
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New List</DialogTitle>
            <DialogDescription>
              Create a new list to organize your favorite manga.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="listName" className="text-right">
                List Name
              </Label>
              <Input
                id="listName"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create List</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}