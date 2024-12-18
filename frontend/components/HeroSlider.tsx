'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Button } from "@/components"

// Importa los estilos de Swiper
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

async function getLatestReleases() {
  // Simular una petición a la API
  return [
    {
      id: 1,
      title: "Nuevo Lanzamiento 1",
      description: "La última sensación en el mundo del manga",
      bannerImage: "/placeholder.svg?height=400&width=1200&text=Banner 1",
      coverImage: "/placeholder.svg?height=300&width=200&text=Cover 1"
    },
    {
      id: 2,
      title: "Nuevo Lanzamiento 2",
      description: "Una historia épica que no puedes perderte",
      bannerImage: "/placeholder.svg?height=400&width=1200&text=Banner 2",
      coverImage: "/placeholder.svg?height=300&width=200&text=Cover 2"
    },
    {
      id: 3,
      title: "Nuevo Lanzamiento 3",
      description: "El manga más esperado del año",
      bannerImage: "/placeholder.svg?height=400&width=1200&text=Banner 3",
      coverImage: "/placeholder.svg?height=300&width=200&text=Cover 3"
    },
  ]
}

export default function HeroSlider() {
  const [slides, setSlides] = useState([])

  useEffect(() => {
    getLatestReleases().then(setSlides)
  }, [])

  if (slides.length === 0) return null

  return (
    <section className="mb-12">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="h-[400px] rounded-lg overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.bannerImage}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end">
                <img
                  src={slide.coverImage}
                  alt={`Portada de ${slide.title}`}
                  className="w-32 h-48 object-cover rounded-lg shadow-lg mr-6"
                />
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">{slide.title}</h2>
                  <p className="text-white mb-4">{slide.description}</p>
                  <Button>Leer ahora</Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}