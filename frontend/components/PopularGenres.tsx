'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => { res.json();  console.log(res)})

interface Genre {
  name: string
  percentage: number
}

export default function PopularGenres() {
  const { data: genres, error } = useSWR<Genre[]>('/api/genres/popular', fetcher)

  if (error) return <div>Error al cargar los géneros populares</div>
  if (!genres) return <div>Cargando...</div>

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Géneros Populares</h3>
      <div className="space-y-4">
        {genres.map((genre, index) => (
          <div key={index} className="flex items-center">
            <span className="text-sm w-20">{genre.name}</span>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${genre.percentage}%` }}
                ></div>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-600">{genre.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}