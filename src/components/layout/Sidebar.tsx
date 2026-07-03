import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, FileText, Users, BarChart3, History, Settings, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const links = [
    { href: '/', label: 'Dashboard', icon: BarChart3 },
    { href: '/clients', label: 'Clientes', icon: Users },
    { href: '/quotes', label: 'Cotizaciones', icon: FileText },
    { href: '/history', label: 'Historial', icon: History },
    { href: '/settings', label: 'Configuración', icon: Settings },
  ]

  const isActive = (href: string) => location.pathname === href

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'w-64 bg-card border-r border-border transition-all duration-300 flex flex-col',
          'fixed md:relative h-screen z-30',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-foreground">Multitracks</h1>
          <p className="text-xs text-muted-foreground">Sistema de Cotizaciones</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                )}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Create Quote Button */}
        <div className="p-4 border-t border-border">
          <Link to="/quotes/new" onClick={() => setIsOpen(false)}>
            <Button className="w-full" size="lg">
              <Plus size={18} className="mr-2" />
              Nueva Cotización
            </Button>
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
