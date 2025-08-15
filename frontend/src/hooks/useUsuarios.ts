import { useState, useEffect } from 'react'
import { Usuario } from '../types'
import { usuariosApi } from '../services/api/usuarios'

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const obtenerUsuarios = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await usuariosApi.obtenerUsuarios()
      setUsuarios(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  const eliminarUsuario = async (id: number) => {
    try {
      setError(null)
      await usuariosApi.eliminarUsuario(id)
      // Actualizar la lista de usuarios después de eliminar
      setUsuarios(prev => prev.filter(usuario => usuario.id !== id))
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  return {
    usuarios,
    isLoading,
    error,
    obtenerUsuarios,
    eliminarUsuario,
  }
}
