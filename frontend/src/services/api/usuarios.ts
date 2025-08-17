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
}
