import { Usuario } from '../../types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ecolink-backend.onrender.com'
const API_URL = `${API_BASE_URL}/api`

export const usuariosApi = {
  // Obtener todos los usuarios
  obtenerUsuarios: async (): Promise<Usuario[]> => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      throw new Error('No hay token de autenticación')
    }

    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Error al obtener usuarios')
    }

    return response.json()
  },

  // Obtener usuario por ID
  obtenerUsuarioPorId: async (id: number): Promise<Usuario> => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      throw new Error('No hay token de autenticación')
    }

    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Error al obtener usuario')
    }

    return response.json()
  },

  // Crear nuevo usuario
  crearUsuario: async (usuario: Omit<Usuario, 'id' | 'createdAt' | 'updatedAt'> & { password: string }): Promise<Usuario> => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      throw new Error('No hay token de autenticación')
    }

    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(usuario),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Error al crear usuario')
    }

    return response.json()
  },

  // Actualizar usuario
  actualizarUsuario: async (id: number, usuario: Partial<Usuario>): Promise<Usuario> => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      throw new Error('No hay token de autenticación')
    }

    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(usuario),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Error al actualizar usuario')
    }

    return response.json()
  },

  // Cambiar estado del usuario (activo/inactivo)
  cambiarEstadoUsuario: async (id: number, activo: boolean): Promise<Usuario> => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      throw new Error('No hay token de autenticación')
    }

    const response = await fetch(`${API_URL}/usuarios/${id}/estado`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ activo }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Error al cambiar estado del usuario')
    }

    return response.json()
  },

  // Eliminar usuario
  eliminarUsuario: async (id: number): Promise<{ message: string }> => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      throw new Error('No hay token de autenticación')
    }

    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Error al eliminar usuario')
    }

    return response.json()
  },

  // Obtener estadísticas de usuarios
  obtenerEstadisticas: async (): Promise<{
    total: number
    activos: number
    verificados: number
    porRol: Array<{ rol: string; cantidad: number }>
  }> => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      throw new Error('No hay token de autenticación')
    }

    const response = await fetch(`${API_URL}/usuarios/estadisticas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Error al obtener estadísticas')
    }

    return response.json()
  },
}
