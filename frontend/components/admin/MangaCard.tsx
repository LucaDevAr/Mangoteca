import { useState } from 'react'
import Link from 'next/link'
import { Edit, Eye, Trash2 } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

interface Manga {
  _id: string
  title: string
  author: string
  status: string
  coverImage: string
}

interface MangaCardProps {
  manga: Manga
  onDelete: (id: string) => void
}

export default function MangaCard({ manga, onDelete }: MangaCardProps) {
  const handleDelete = () => {
    console.log(manga._id)
    onDelete(manga._id)
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex h-24">
          <div className="w-16 h-full relative flex-shrink-0">
            <img
              src={manga.coverImage || '/placeholder.svg?height=96&width=64'}
              alt={manga.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow p-2 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-semibold line-clamp-1">{manga.title}</h2>
              <p className="text-xs text-muted-foreground line-clamp-1">{manga.author}</p>
            </div>
            <div className="flex justify-between items-center">
              <Badge variant="secondary">
                {manga.status === 'ongoing' ? 'En curso' : 
                 manga.status === 'completed' ? 'Completado' : 
                 manga.status === 'hiatus' ? 'En pausa' : manga.status === 'cancelled' ? "Cancelado" : "Desconocido"}
              </Badge>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/manga/${manga._id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/manga/edit/${manga._id}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
                      <AlertDialogDescription>
                        ¿Estás seguro de que quieres eliminar el manga "{manga.title}"? Esta acción no se puede deshacer.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}