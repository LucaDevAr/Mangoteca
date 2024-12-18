import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Mangoteca</h3>
            <p className="text-sm">Tu plataforma de lectura de manga en línea.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:underline">Inicio</Link></li>
              <li><Link href="/genres" className="text-sm hover:underline">Géneros</Link></li>
              <li><Link href="/latest" className="text-sm hover:underline">Últimas Actualizaciones</Link></li>
              <li><Link href="/popular" className="text-sm hover:underline">Populares</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="text-sm">Email: info@mangoteca.com</p>
            <p className="text-sm">Teléfono: +1 234 567 890</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Mangoteca. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}