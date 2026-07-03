# Quick Start Guide

Guía rápida para comenzar con el desarrollo en Multitracks Sistema de Cotizaciones.

## 🚀 Inicio Rápido (5 minutos)

### 1. Clonar y configurar

```bash
git clone https://github.com/Franklinser/multitracks-cotizaciones.git
cd multitracks-cotizaciones
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 2. Estructura básica

```
src/
├── components/     # Componentes React reutilizables
├── pages/         # Páginas principales
├── lib/           # Lógica de negocio (storage, utils)
├── types/         # Definiciones TypeScript
└── App.tsx        # Router principal
```

### 3. Crear un nuevo cliente

```typescript
import { clientStorage } from '@/lib/storage'

const newClient = clientStorage.create({
  type: 'consumer',
  name: 'Juan Pérez',
  email: 'juan@example.com',
  phone: '+503 6000-0000',
  address: 'Calle Principal 123',
  city: 'San Salvador',
})

console.log(`Cliente creado: ${newClient.name}`)
```

### 4. Crear una cotización

```typescript
import { quoteStorage, clientStorage } from '@/lib/storage'
import { calculateQuoteTotals } from '@/lib/utils'

const client = clientStorage.getById('client-id')
const products = [
  {
    id: '1',
    name: 'Producto A',
    quantity: 1,
    price: 100,
    total: 100,
  }
]

const totals = calculateQuoteTotals(products, client.type)

const quote = quoteStorage.create({
  clientId: client.id,
  client: client,
  products: products,
  subtotal: totals.subtotal,
  iva: totals.iva,
  total: totals.total,
  status: 'draft',
})
```

## 📝 Agregar un nuevo componente

### Paso 1: Crear el archivo

```typescript
// src/components/mycomponent/MyComponent.tsx

import { Button } from '@/components/ui/button'

export function MyComponent() {
  return (
    <div>
      <h1>Mi componente</h1>
      <Button>Click aquí</Button>
    </div>
  )
}
```

### Paso 2: Usar en una página

```typescript
import { MyComponent } from '@/components/mycomponent/MyComponent'

export function SomePage() {
  return (
    <div>
      <MyComponent />
    </div>
  )
}
```

## 🎨 Trabajar con estilos

### Tailwind CSS

```typescript
// Clases inline en JSX
<div className="p-6 bg-card rounded-lg border border-border">
  <h1 className="text-3xl font-bold text-foreground">Título</h1>
  <p className="text-muted-foreground mt-2">Subtítulo</p>
</div>
```

### Colores disponibles

```
Primario:           primary, primary-foreground
Secundario:         secondary, secondary-foreground
Destructivo:        destructive, destructive-foreground
Mutado:             muted, muted-foreground
Acento:             accent, accent-foreground
Fondo:              background, foreground
Card:               card, card-foreground
Popover:            popover, popover-foreground
Border:             border, input, ring
```

## 🔧 Configuración de TypeScript

### Importaciones de alias

```typescript
// Usa @ para acceder a src/
import { Button } from '@/components/ui/button'
import { clientStorage } from '@/lib/storage'
import { Quote } from '@/types'
```

## 📚 Componentes Shadcn disponibles

```typescript
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
```

## 🔗 Routing

### Navegación

```typescript
import { useNavigate } from 'react-router-dom'

function MyComponent() {
  const navigate = useNavigate()
  
  return (
    <Button onClick={() => navigate('/quotes')}>
      Ir a Cotizaciones
    </Button>
  )
}
```

### Links

```typescript
import { Link } from 'react-router-dom'

<Link to="/quotes/new">
  <Button>Nueva Cotización</Button>
</Link>
```

### Rutas disponibles

| Ruta | Componente |
|------|-----------|
| `/` | Dashboard |
| `/clients` | Clients |
| `/quotes` | Quotes |
| `/quotes/new` | QuoteEditor |
| `/quotes/:id` | QuoteEditor |
| `/history` | History |
| `/settings` | Settings |

## 💾 Trabajar con Storage

### Obtener datos

```typescript
import { clientStorage, quoteStorage, settingsStorage } from '@/lib/storage'

// Clientes
const allClients = clientStorage.getAll()
const client = clientStorage.getById(id)

// Cotizaciones
const allQuotes = quoteStorage.getAll()
const quote = quoteStorage.getById(id)

// Configuración
const settings = settingsStorage.get()
```

### Crear datos

```typescript
// Cliente
const client = clientStorage.create({
  type: 'consumer',
  name: 'Nombre',
  email: 'email@example.com',
  phone: '+503 1234-5678',
  address: 'Dirección',
  city: 'Ciudad',
})

// Cotización
const quote = quoteStorage.create({
  clientId: 'client-id',
  client: clientObject,
  products: [],
  subtotal: 0,
  iva: 0,
  total: 0,
  status: 'draft',
})
```

### Actualizar datos

```typescript
clientStorage.update(id, { name: 'Nuevo nombre' })
quoteStorage.update(id, { status: 'sent' })
settingsStorage.update({ email: 'new@email.com' })
```

### Eliminar datos

```typescript
clientStorage.delete(id)
quoteStorage.delete(id)
```

## 🎯 Patrones comunes

### Listar items con React hooks

```typescript
import { useState } from 'react'
import { quoteStorage } from '@/lib/storage'

export function QuotesList() {
  const [quotes, setQuotes] = useState(quoteStorage.getAll())

  const handleDelete = (id: string) => {
    quoteStorage.delete(id)
    setQuotes(quoteStorage.getAll())
  }

  return (
    <div>
      {quotes.map(quote => (
        <div key={quote.id}>
          {quote.quoteNumber}
          <button onClick={() => handleDelete(quote.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  )
}
```

### Diálogo con formulario

```typescript
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function MyDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Abrir</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={(e) => {
          e.preventDefault()
          // hacer algo
          setIsOpen(false)
        }}>
          {/* formulario */}
        </form>
      </DialogContent>
    </Dialog>
  )
}
```

### Tabla con datos

```typescript
<table className="w-full">
  <thead>
    <tr className="border-b border-border">
      <th className="text-left py-3 px-4">Nombre</th>
      <th className="text-left py-3 px-4">Email</th>
    </tr>
  </thead>
  <tbody>
    {items.map(item => (
      <tr key={item.id} className="border-b border-border hover:bg-muted">
        <td className="py-3 px-4">{item.name}</td>
        <td className="py-3 px-4">{item.email}</td>
      </tr>
    ))}
  </tbody>
</table>
```

## 📱 Responsive design

```typescript
// Clases responsive en Tailwind
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* grid adaptable */}
</div>

// Breakpoints
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## 🔍 Debugging

### Console logs

```typescript
console.log('Valor:', value)
console.table(array)
console.error('Error:', error)
```

### React DevTools

Instala la extensión de React DevTools en tu navegador para inspeccionar componentes.

### Vite Debug

Los source maps están habilitados en desarrollo. Puedes ver el código TypeScript original en DevTools.

## 📊 Formateo de datos

```typescript
import { 
  formatCurrency, 
  formatDate, 
  formatNumber,
  isValidEmail,
  daysUntilExpiration,
  isQuoteExpired
} from '@/lib/utils'

formatCurrency(1500.50)          // "$1,500.50"
formatDate('2026-07-03')         // "3 de julio de 2026"
formatNumber(1234.567, 2)        // "1,234.57"
isValidEmail('test@test.com')    // true
daysUntilExpiration('2026-12-31') // número de días
isQuoteExpired('2026-07-01')     // boolean
```

## 🚀 Compilar para producción

```bash
npm run build
npm run preview
```

Los archivos compilados estarán en la carpeta `dist/`.

## 📦 Agregar dependencias

```bash
npm install nombre-del-paquete
npm install -D nombre-del-dev-package
```

## 🔗 Enlaces útiles

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [React Router](https://reactrouter.com)
- [Vite](https://vitejs.dev)

## ❓ Preguntas frecuentes

**P: ¿Dónde se almacenan los datos?**
R: En LocalStorage del navegador. Se pierden si limpias el caché.

**P: ¿Puedo usar una base de datos?**
R: Sí, el código está preparado para migrar a Firebase, Supabase, etc.

**P: ¿Cómo agrego más productos a una cotización?**
R: Usa `quote.products.push(newProduct)` y luego guarda con `quoteStorage.update()`.

**P: ¿Cómo cambio los colores?**
R: En `/src/styles/index.css` modifica las variables CSS o usa `settingsStorage.update()`.

---

**¿Necesitas ayuda?** Contacta a Multysec@outlook.com
