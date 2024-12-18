'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

interface Manga {
  id: string
  title: string
  description: string
  author: string
  coverImage: string
  bannerImage: string
}

interface ApiResponse {
  mangas: Manga[]
  currentPage: number
  totalPages: number
  totalMangas: number
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Hero() {
  const { data, error } = useSWR<ApiResponse>('http://localhost:5000/api/manga/', fetcher)

  if (error) return <div className="text-center py-10 text-destructive">Error loading featured mangas</div>
  if (!data) return (
    <div className="w-full h-[500px] mt-[71px] mb-12">
      <Skeleton className="w-full h-full" />
    </div>
  )

  const featuredMangas = data.mangas.slice(0, 5) // Limit to 5 featured mangas

  return (
    <section className="w-full h-[500px] relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full h-full"
      >
        {featuredMangas.map((manga) => (
          <SwiperSlide key={manga._id}>
            <Card className="relative w-full h-full overflow-hidden rounded-none">
              <img
                src={manga.bannerImage}
                alt={manga.title}
                className='object-cover w-full h-full'
              />
              <CardContent className="absolute inset-0 bg-black/50 flex items-center px-10">
                <div className="flex items-start space-x-10">
                  <img
                    src={manga.coverImage}
                    alt="Cover Image"
                    className="object-cover rounded-sm w-[190px] h-[300px]"
                  />
                  <div className='flex flex-col justify-between h-[300px]'>
                    <div className='flex flex-col'>
                    <h2 className="text-4xl font-bold text-white mb-4">{manga.title}</h2>
                    <p className="text-xl text-white mb-4 break-words pr-4 line-clamp-4">{manga.description}</p>
                    <p className="text-lg text-white mb-6 italic">{manga.author}</p>
                    </div>
                    <div>
                      <Button asChild>
                        <Link href={`/manga/${manga._id}`}>
                          Read Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}