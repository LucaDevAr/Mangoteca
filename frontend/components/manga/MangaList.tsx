'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MangaList() {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/manga'); // Cambia esta URL según tu API
        setMangas(response.data);
      } catch (error) {
        console.error('Error al obtener los mangas:', error);
      }
    };

    fetchMangas();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ul>
      {mangas.map((manga) => (
        <div key={manga._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={manga.coverImage} // Asegúrate de que este campo esté en tu modelo de Manga
            alt={manga.title}
            className="h-200px object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-bold">{manga.title}</h2>
            <p className="text-gray-600">{manga.description}</p>
            <div className="mt-2">
              <Link href={`/manga/${manga._id}`} className="bg-blue-500 text-white py-1 px-3 rounded">
                Leer Más
              </Link>
            </div>
          </div>
        </div>
      ))}
      </ul>
    </div>
  );
}
