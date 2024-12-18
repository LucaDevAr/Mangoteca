'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface TopManga {
  name: string
  reads: number
}

export default function TopMangasChart() {
  const { data: topMangas, error } = useSWR<TopManga[]>('/api/manga/top', fetcher)

  if (error) return <div>Error al cargar los mangas más populares</div>
  if (!topMangas) return <div>Cargando...</div>

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Top Mangas (Lecturas)</h3>
      <div className="space-y-4">
        {topMangas.map((manga, index) => (
          <div key={index} className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${(manga.reads / topMangas[0].reads) * 100}%` }}
              ></div>
            </div>
            <span className="min-w-[100px] text-sm ml-4">{manga.name}</span>
            <span className="text-sm font-medium text-gray-600 ml-auto">{manga.reads}</span>
          </div>
        ))}
      </div>
    </div>
  )
}