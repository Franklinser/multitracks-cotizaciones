# API Documentation - Storage Layer

Documentación completa de la API interna de almacenamiento para gestión de clientes, cotizaciones y configuración.

## Table of Contents

- [Client Storage](#client-storage)
- [Quote Storage](#quote-storage)
- [Settings Storage](#settings-storage)
- [Storage Utils](#storage-utils)
- [Utility Functions](#utility-functions)

---

## Client Storage

API para gestionar clientes (Consumidor Final y Empresa).

### `clientStorage.getAll()`

Obtiene todos los clientes almacenados.

```typescript
const clients = clientStorage.getAll()
// Returns: Client[]
```

**Ejemplo:**
```typescript
const allClients = clientStorage.getAll()
console.log(allClients) // [{ id: '...', name: 'Juan Pérez', ... }]
```

---

### `clientStorage.getById(id)`

Obtiene un cliente específico por su ID.

```typescript
const client = clientStorage.getById(clientId)
// Returns: Client | null
```

**Parámetros:**
- `id` (string): ID único del cliente

**Ejemplo:**
```typescript
const client = clientStorage.getById('123e4567-e89b-12d3-a456-426614174000')
if (client) {
  console.log(client.name) // 'Juan Pérez'
}
```

---

### `clientStorage.create(client)`

Crea un nuevo cliente.

```typescript
const newClient = clientStorage.create({
  type: 'consumer',
  name: 'Juan Pérez',
  email: 'juan@example.com',
  phone: '+503 6000-0000',
  address: 'Calle Principal 123',
  city: 'San Salvador',
})
// Returns: Client (con id y timestamps generados automáticamente)
```

**Parámetros:**
- `client` (Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Datos del cliente

**Retorna:**
- `Client`: Cliente creado con ID y timestamps

**Ejemplo - Consumidor Final:**
```typescript
const consumer = clientStorage.create({
  type: 'consumer',
  name: 'María García',
  email: 'maria@example.com',
  phone: '6123-4567',
  address: 'Col. San Benito',
  city: 'Chalchuapa',
  rut: '09876543-2',
})
```

**Ejemplo - Empresa:**
```typescript
const company = clientStorage.create({
  type: 'company',
  name: 'Contacto Principal',
  email: 'contacto@empresa.com',
  phone: '+503 2100-0000',
  address: 'Avenida Principal 456',
  city: 'Santa Tecla',
  businessName: 'Empresa XYZ S.A. de C.V.',
  nit: '0203-123456-789-0',
  nrc: '123456-7',
})
```

---

### `clientStorage.update(id, updates)`

Actualiza un cliente existente.

```typescript
const updated = clientStorage.update(clientId, {
  email: 'newemail@example.com',
  phone: '+503 6111-1111',
})
// Returns: Client | null
```

**Parámetros:**
- `id` (string): ID del cliente
- `updates` (Partial<Client>): Campos a actualizar

**Retorna:**
- `Client | null`: Cliente actualizado o null si no existe

**Ejemplo:**
```typescript
const client = clientStorage.update('123...', {
  email: 'nuevo@email.com',
  city: 'San Salvador',
})
```

---

### `clientStorage.delete(id)`

Elimina un cliente.

```typescript
const success = clientStorage.delete(clientId)
// Returns: boolean
```

**Parámetros:**
- `id` (string): ID del cliente a eliminar

**Retorna:**
- `boolean`: true si se eliminó, false si no existía

**Ejemplo:**
```typescript
if (clientStorage.delete(clientId)) {
  console.log('Cliente eliminado')
}
```

---

## Quote Storage

API para gestionar cotizaciones.

### `quoteStorage.getAll()`

Obtiene todas las cotizaciones.

```typescript
const quotes = quoteStorage.getAll()
// Returns: Quote[]
```

---

### `quoteStorage.getById(id)`

Obtiene una cotización específica.

```typescript
const quote = quoteStorage.getById(quoteId)
// Returns: Quote | null
```

---

### `quoteStorage.create(quote)`

Crea una nueva cotización.

```typescript
const newQuote = quoteStorage.create({
  clientId: 'client-123',
  client: clientObject,
  products: [
    {
      id: 'prod-1',
      name: 'Laptop',
      quantity: 2,
      price: 500,
      total: 1000,
    }
  ],
  subtotal: 885.39,
  iva: 114.61,
  total: 1000,
  status: 'draft',
})
// Returns: Quote (con número auto-generado y timestamps)
```

**Notas importantes:**
- El `quoteNumber` se genera automáticamente usando el prefijo y número inicial de configuración
- Los `createdAt` y `updatedAt` se establecen automáticamente
- Se requiere un cliente válido

**Ejemplo:**
```typescript
const client = clientStorage.getById(clientId)
if (client) {
  const quote = quoteStorage.create({
    clientId: clientId,
    client: client,
    products: products,
    subtotal: totals.subtotal,
    iva: totals.iva,
    total: totals.total,
    status: 'draft',
  })
  console.log(`Cotización ${quote.quoteNumber} creada`)
}
```

---

### `quoteStorage.update(id, updates)`

Actualiza una cotización.

```typescript
const updated = quoteStorage.update(quoteId, {
  status: 'sent',
  products: newProducts,
  total: newTotal,
})
// Returns: Quote | null
```

---

### `quoteStorage.delete(id)`

Elimina una cotización.

```typescript
const success = quoteStorage.delete(quoteId)
// Returns: boolean
```

---

## Settings Storage

API para gestionar configuración de la empresa.

### `settingsStorage.get()`

Obtiene la configuración actual.

```typescript
const settings = settingsStorage.get()
// Returns: CompanySettings
```

**Retorna valores por defecto si no hay configuración guardada.**

**Ejemplo:**
```typescript
const settings = settingsStorage.get()
console.log(settings.ownerName) // 'ROMERO SERMEÑO, FRANKLIN OSMEL'
console.log(settings.quotePrefix) // 'COT'
```

---

### `settingsStorage.update(updates)`

Actualiza la configuración.

```typescript
const updated = settingsStorage.update({
  ownerName: 'Nuevo Nombre',
  primaryColor: '#FF0000',
})
// Returns: CompanySettings
```

**Parámetros:**
- `updates` (Partial<CompanySettings>): Configuración a actualizar

**Ejemplo:**
```typescript
settingsStorage.update({
  email: 'newemail@empresa.com',
  quotePrefix: 'COTIZACION',
  quoteStartNumber: 2000,
  bankAccounts: [
    {
      id: 'bank-1',
      bank: 'Banco Cuscatlán',
      accountNumber: '12345678',
      accountType: 'Corriente',
      currency: 'USD',
    }
  ],
})
```

---

### `settingsStorage.reset()`

Restaura la configuración por defecto.

```typescript
settingsStorage.reset()
```

**Advertencia:** Esta acción no puede deshacerse.

---

## Storage Utils

Utilidades generales de almacenamiento.

### `storageUtils.clear()`

Limpia todo el almacenamiento.

```typescript
storageUtils.clear()
```

**Elimina:**
- Todos los clientes
- Todas las cotizaciones
- La configuración

---

### `storageUtils.export()`

Exporta todos los datos como JSON.

```typescript
const backup = storageUtils.export()
// Returns: { clients, quotes, settings, timestamp }
```

**Ejemplo:**
```typescript
const data = storageUtils.export()
const json = JSON.stringify(data)
// Guardar en archivo o enviar a servidor
```

---

### `storageUtils.import(data)`

Importa datos de un backup.

```typescript
const success = storageUtils.import(backupData)
// Returns: boolean
```

**Parámetros:**
- `data` (any): Datos a importar (debe tener estructura correcta)

**Ejemplo:**
```typescript
const backupJson = localStorage.getItem('myBackup')
const backupData = JSON.parse(backupJson)
if (storageUtils.import(backupData)) {
  console.log('Datos importados exitosamente')
}
```

---

## Utility Functions

Funciones auxiliares para cálculos y formateo.

### `formatCurrency(value)`

Formatea un número como moneda USD.

```typescript
formatCurrency(1500.50)
// Returns: "$1,500.50"
```

---

### `formatNumber(value, decimals?)`

Formatea un número con separadores.

```typescript
formatNumber(1234567.89, 2)
// Returns: "1,234,567.89"
```

---

### `formatDate(date)`

Formatea una fecha en español.

```typescript
formatDate('2026-07-03')
// Returns: "3 de julio de 2026"
```

---

### `calculateQuoteTotals(products, clientType)`

Calcula subtotal, IVA y total.

```typescript
const totals = calculateQuoteTotals(products, 'company')
// Returns: { subtotal: number, iva: number, total: number }
```

**Notas:**
- Para consumidores: IVA no se muestra por separado
- Para empresas: Se muestra desglose de IVA (13%)

**Ejemplo:**
```typescript
const products = [
  { id: '1', name: 'Producto A', quantity: 2, price: 50, total: 100 },
  { id: '2', name: 'Producto B', quantity: 1, price: 30, total: 30 }
]

const totals = calculateQuoteTotals(products, 'company')
console.log(totals)
// {
//   subtotal: 115.04,
//   iva: 14.96,
//   total: 130
// }
```

---

### `isValidEmail(email)`

Valida un email.

```typescript
isValidEmail('user@example.com')
// Returns: true
```

---

### `daysUntilExpiration(date)`

Calcula días hasta la expiración.

```typescript
daysUntilExpiration('2026-12-31')
// Returns: number
```

---

### `isQuoteExpired(date?)`

Verifica si una cotización está expirada.

```typescript
isQuoteExpired('2026-07-01')
// Returns: boolean
```

---

## Tipos TypeScript

```typescript
interface Client {
  id: string
  type: 'consumer' | 'company'
  name: string
  email: string
  phone: string
  rut?: string // Para consumidor
  businessName?: string // Para empresa
  nit?: string // Para empresa
  nrc?: string // Para empresa
  address: string
  city: string
  createdAt: string
  updatedAt: string
}

interface Product {
  id: string
  name: string
  description?: string
  quantity: number
  price: number
  warranty?: string
  observations?: string
  imageUrl?: string
  total: number
}

interface Quote {
  id: string
  quoteNumber: string
  clientId: string
  client: Client
  products: Product[]
  subtotal: number
  iva: number
  total: number
  notes?: string
  status: 'draft' | 'sent' | 'accepted' | 'rejected'
  createdAt: string
  updatedAt: string
  expiresAt?: string
}

interface CompanySettings {
  id: string
  ownerName: string
  dui: string
  nit: string
  nrc: string
  giro: string
  address: string
  city: string
  department: string
  email: string
  phone: string
  whatsapp: string
  website: string
  checkIssuer: string
  logoUrl?: string
  signatureUrl?: string
  sealUrl?: string
  quotePrefix: string
  quoteStartNumber: number
  bankAccounts: BankAccount[]
  defaultTerms?: string
  defaultPaymentTerms?: string
  primaryColor: string
  accentColor: string
  updatedAt: string
}
```

---

## Ejemplos de Uso Completo

### Crear una cotización completa

```typescript
import { clientStorage, quoteStorage, settingsStorage } from '@/lib/storage'
import { calculateQuoteTotals } from '@/lib/utils'

// 1. Obtener cliente
const client = clientStorage.getById('client-id')
if (!client) return

// 2. Preparar productos
const products = [
  {
    id: '1',
    name: 'Laptop Dell',
    quantity: 1,
    price: 800,
    total: 800,
  },
  {
    id: '2',
    name: 'Mouse inalámbrico',
    quantity: 2,
    price: 25,
    total: 50,
  }
]

// 3. Calcular totales
const totals = calculateQuoteTotals(products, client.type)

// 4. Crear cotización
const quote = quoteStorage.create({
  clientId: client.id,
  client: client,
  products: products,
  subtotal: totals.subtotal,
  iva: totals.iva,
  total: totals.total,
  status: 'draft',
})

console.log(`Cotización ${quote.quoteNumber} creada`)
```

### Backup y restauración

```typescript
// Hacer backup
const backup = storageUtils.export()
const backupFile = JSON.stringify(backup)
localStorage.setItem('backup-' + new Date().toISOString(), backupFile)

// Restaurar desde backup
const savedBackup = localStorage.getItem('backup-2026-07-03T10:30:00.000Z')
if (savedBackup) {
  const data = JSON.parse(savedBackup)
  if (storageUtils.import(data)) {
    console.log('Datos restaurados')
  }
}
```

---

## Notas Importantes

1. **Persistencia**: Todos los datos se almacenan en LocalStorage del navegador
2. **Límite de tamaño**: LocalStorage típicamente tiene límite de 5-10MB
3. **Sincronización**: Los cambios se guardan inmediatamente
4. **IDs**: Se generan automáticamente con UUID v4
5. **Timestamps**: Se generan automáticamente en ISO 8601

---

**Última actualización**: 2026-07-03  
**Versión**: 0.1.0
