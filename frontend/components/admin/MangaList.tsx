"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MangaCard from '@/components/admin/MangaCard'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

const ITEMS_PER_PAGE = 12

export default function MangaList() {
  const [mangas, setMangas] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchMangas = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:5000/api/manga?page=${currentPage}&limit=${ITEMS_PER_PAGE}`)
        if (!response.ok) {
          throw new Error('Failed to fetch mangas')
        }
        const data = await response.json()
        console.log(data.mangas)
        setMangas(data.mangas)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error('Error fetching mangas:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMangas()
  }, [currentPage])

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/manga/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setMangas(mangas.filter(manga => manga._id !== id))
      } else {
        console.error("Error al eliminar el manga")
      }
    } catch (error) {
      console.error("Error de servidor:", error)
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <Card className='flex flex-col min-h-[calc(100vh-71px-56px)]'>
      <CardContent className='flex-grow p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className="text-3xl font-bold">Lista de Mangas</h2>
          <div className="flex items-center space-x-4">
            <Button asChild>
              <Link href='/admin/manga/add'>
                <Plus className="mr-2 h-4 w-4" /> Agregar Manga
              </Link>
            </Button>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {mangas.map((manga) => (
              <MangaCard key={manga._id} manga={manga} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </CardContent>
      <CardContent className="flex justify-center items-center py-4 w-full">
        <Pagination>
          <PaginationContent className='w-full justify-center'>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='cursor-pointer'
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className='w-auto px-4'>
                Página {currentPage} de {totalPages || 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className='cursor-pointer'
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  )
}