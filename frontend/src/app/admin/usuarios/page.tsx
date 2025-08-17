"use client"

import { useAuthContext } from '../../../contexts/AuthContext'
import { RolUsuario } from '../../../types'
import { useUsuarios } from '../../../hooks/useUsuarios'
import UsuarioTable from '../../../components/UsuarioTable'

export default function UsuariosPage() {
  const { usuario, isAuthenticated } = useAuthContext()
  const { 
    usuarios, 
    isLoading, 
    error, 
    eliminarUsuario
  } = useUsuarios()

  // Verificar si es admin
  if (!isAuthenticated || usuario?.rol !== RolUsuario.ADMIN) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Acceso denegado</h4>
          <p>Solo los administradores pueden acceder a esta página.</p>
        </div>
      </div>
    )
  }

  const handleEliminarUsuario = async (id: number) => {
    return await eliminarUsuario(id)
  }

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-people me-2"></i>
                Gestión de Usuarios
              </h5>
            </div>
            <div className="card-body">
              {/* Tabla de usuarios */}
              {usuarios.length === 0 ? (
                <p className="text-center text-muted">No hay usuarios registrados.</p>
              ) : (
                <UsuarioTable 
                  usuarios={usuarios} 
                  onEliminarUsuario={handleEliminarUsuario}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
