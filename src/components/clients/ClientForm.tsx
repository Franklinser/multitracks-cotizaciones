import { useState, useEffect } from 'react'
import { clientStorage, Client } from '@/lib/storage'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ClientFormProps {
  clientId?: string | null
  onSuccess: () => void
  onClose: () => void
}

export function ClientForm({ clientId, onSuccess, onClose }: ClientFormProps) {
  const [clientType, setClientType] = useState<'consumer' | 'company'>('consumer')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    rut: '',
    businessName: '',
    nit: '',
    nrc: '',
  })

  useEffect(() => {
    if (clientId) {
      const client = clientStorage.getById(clientId)
      if (client) {
        setClientType(client.type)
        setFormData({
          name: client.name,
          email: client.email,
          phone: client.phone,
          address: client.address,
          city: client.city,
          rut: client.rut || '',
          businessName: client.businessName || '',
          nit: client.nit || '',
          nrc: client.nrc || '',
        })
      }
    }
  }, [clientId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone) {
      alert('Por favor completa todos los campos requeridos')
      return
    }

    const clientData = {
      type: clientType,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      ...(clientType === 'consumer' && { rut: formData.rut }),
      ...(clientType === 'company' && {
        businessName: formData.businessName,
        nit: formData.nit,
        nrc: formData.nrc,
      }),
    }

    if (clientId) {
      clientStorage.update(clientId, clientData)
    } else {
      clientStorage.create(clientData)
    }

    onSuccess()
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{clientId ? 'Editar Cliente' : 'Nuevo Cliente'}</DialogTitle>
        <DialogDescription>
          {clientId
            ? 'Actualiza los datos del cliente'
            : 'Crea un nuevo cliente consumidor final o empresa'}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Tipo de Cliente *</Label>
          <Select
            value={clientType}
            onValueChange={(value) => setClientType(value as 'consumer' | 'company')}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consumer">Consumidor Final</SelectItem>
              <SelectItem value="company">Empresa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Common Fields */}
        <div>
          <Label>{clientType === 'consumer' ? 'Nombre Completo' : 'Nombre de Contacto'} *</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nombre del cliente"
            required
          />
        </div>

        <div>
          <Label>Email *</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="correo@ejemplo.com"
            required
          />
        </div>

        <div>
          <Label>Teléfono *</Label>
          <Input
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="1234-5678 o +503 1234-5678"
            required
          />
        </div>

        <div>
          <Label>Dirección</Label>
          <Input
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Dirección completa"
          />
        </div>

        <div>
          <Label>Ciudad</Label>
          <Input
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Ciudad"
          />
        </div>

        {/* Consumer Fields */}
        {clientType === 'consumer' && (
          <div>
            <Label>RUT/DUI</Label>
            <Input
              value={formData.rut}
              onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
              placeholder="Documento de identidad"
            />
          </div>
        )}

        {/* Company Fields */}
        {clientType === 'company' && (
          <>
            <div>
              <Label>Razón Social</Label>
              <Input
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="Nombre legal de la empresa"
              />
            </div>
            <div>
              <Label>NIT</Label>
              <Input
                value={formData.nit}
                onChange={(e) => setFormData({ ...formData, nit: e.target.value })}
                placeholder="NIT de la empresa"
              />
            </div>
            <div>
              <Label>NRC</Label>
              <Input
                value={formData.nrc}
                onChange={(e) => setFormData({ ...formData, nrc: e.target.value })}
                placeholder="NRC de la empresa"
              />
            </div>
          </>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {clientId ? 'Actualizar Cliente' : 'Crear Cliente'}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}
