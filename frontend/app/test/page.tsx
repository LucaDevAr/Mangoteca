import React from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Sun, Moon, Book, Info } from 'lucide-react'
import Header from '@/components/Header'


export default function SamplePage() {
  return (
    <>
        <Header />
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Color Palette Demo</h1>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Text Examples</h2>
          <p className="text-foreground">This is the default text color.</p>
          <p className="text-primary">This text uses the primary color.</p>
          <p className="text-secondary">This text uses the secondary color.</p>
          <p className="text-muted">This is muted text.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Button Examples</h2>
          <div className="flex space-x-2">
            <Button variant="default">Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Card Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-lg font-semibold mb-2">Default Card</h3>
              <p className="text-muted">This is a default card with muted text.</p>
            </Card>
            <Card variant="primary">
              <h3 className="text-lg font-semibold mb-2">Primary Card</h3>
              <p>This is a primary card with default text.</p>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Input Example</h2>
          <Input placeholder="Enter some text" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Icon Examples</h2>
          <div className="flex space-x-4">
            <Sun className="text-warning" size={24} />
            <Moon className="text-primary" size={24} />
            <Book className="text-secondary" size={24} />
            <Info className="text-info" size={24} />
          </div>
        </section>
      </div>
    </div>
    </>
  )
}