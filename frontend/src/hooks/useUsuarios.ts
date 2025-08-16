import { useState, useEffect } from 'react'
import { Usuario } from '../types'
import { usuariosApi } from '../services/api/usuarios'

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [estadisticas, setEstadisticas] = useState<{
    total: number
    activos: number
    verificados: number
    porRol: Array<{ rol: string; cantidad: number }>
  } | null>(null)

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

  const obtenerEstadisticas = async () => {
    try {
      setError(null)
      const data = await usuariosApi.obtenerEstadisticas()
      setEstadisticas(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    }
  }

  const crearUsuario = async (usuario: Omit<Usuario, 'id' | 'createdAt' | 'updatedAt'> & { password: string }) => {
    try {
      setError(null)
      const nuevoUsuario = await usuariosApi.crearUsuario(usuario)
      setUsuarios(prev => [nuevoUsuario, ...prev])
      return { success: true, usuario: nuevoUsuario }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const actualizarUsuario = async (id: number, datos: Partial<Usuario>) => {
    try {
      setError(null)
      const usuarioActualizado = await usuariosApi.actualizarUsuario(id, datos)
      setUsuarios(prev => prev.map(u => u.id === id ? usuarioActualizado : u))
      return { success: true, usuario: usuarioActualizado }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const cambiarEstadoUsuario = async (id: number, activo: boolean) => {
    try {
      setError(null)
      const usuarioActualizado = await usuariosApi.cambiarEstadoUsuario(id, activo)
      setUsuarios(prev => prev.map(u => u.id === id ? usuarioActualizado : u))
      return { success: true, usuario: usuarioActualizado }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const eliminarUsuario = async (id: number) => {
    try {
      setError(null)
      await usuariosApi.eliminarUsuario(id)
      // Actualizar la lista de usuarios después de eliminar
      setUsuarios(prev => prev.filter(usuario => usuario.id !== id))
      // Actualizar estadísticas
      if (estadisticas) {
        setEstadisticas(prev => prev ? {
          ...prev,
          total: prev.total - 1,
          activos: prev.activos - (usuarios.find(u => u.id === id)?.activo ? 1 : 0),
          verificados: prev.verificados - (usuarios.find(u => u.id === id)?.verificado ? 1 : 0),
        } : null)
      }
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  useEffect(() => {
    obtenerUsuarios()
    obtenerEstadisticas()
  }, [])

  return {
    usuarios,
    estadisticas,
    isLoading,
    error,
    obtenerUsuarios,
    obtenerEstadisticas,
    crearUsuario,
    actualizarUsuario,
    cambiarEstadoUsuario,
    eliminarUsuario,
  }
}
