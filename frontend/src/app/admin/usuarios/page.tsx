"use client"

import { useAuthContext } from '../../../contexts/AuthContext'
import { RolUsuario } from '../../../types'
import { useUsuarios } from '../../../hooks/useUsuarios'
import UsuarioTable from '../../../components/UsuarioTable'

export default function UsuariosPage() {
  const { usuario, isAuthenticated } = useAuthContext()
  const { 
    usuarios, 
    estadisticas,
    isLoading, 
    error, 
    eliminarUsuario,
    cambiarEstadoUsuario 
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

  const handleCambiarEstado = async (id: number, activo: boolean) => {
    return await cambiarEstadoUsuario(id, activo)
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
              {/* Estadísticas */}
              {estadisticas && (
                <div className="row mb-4">
                  <div className="col-md-3">
                    <div className="card bg-primary text-white">
                      <div className="card-body text-center">
                        <h4>{estadisticas.total}</h4>
                        <small>Total Usuarios</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-success text-white">
                      <div className="card-body text-center">
                        <h4>{estadisticas.activos}</h4>
                        <small>Usuarios Activos</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-info text-white">
                      <div className="card-body text-center">
                        <h4>{estadisticas.verificados}</h4>
                        <small>Usuarios Verificados</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-warning text-white">
                      <div className="card-body text-center">
                        <h4>{estadisticas.porRol.length}</h4>
                        <small>Roles Diferentes</small>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tabla de usuarios */}
              {usuarios.length === 0 ? (
                <p className="text-center text-muted">No hay usuarios registrados.</p>
              ) : (
                <UsuarioTable 
                  usuarios={usuarios} 
                  onEliminarUsuario={handleEliminarUsuario}
                  onCambiarEstado={handleCambiarEstado}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
