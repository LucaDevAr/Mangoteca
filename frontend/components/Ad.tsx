import { Card, CardContent } from "@/components/ui/card"

interface AdComponentProps {
  size: 'small' | 'medium' | 'large'
}

export default function AdComponent({ size }: AdComponentProps) {
  const sizeClasses = {
    small: 'h-16 w-full',
    medium: 'h-32 w-full',
    large: 'h-64 w-full'
  }

  return (
    <Card className={`my-4 ${sizeClasses[size]} bg-accent/10`}>
      <CardContent className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Espacio publicitario ({size})</p>
      </CardContent>
    </Card>
  )
}