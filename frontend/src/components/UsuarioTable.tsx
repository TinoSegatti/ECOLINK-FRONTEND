"use client"

import { useState } from 'react'
import { Usuario, RolUsuario } from '../types'

interface UsuarioTableProps {
  usuarios: Usuario[]
  onEliminarUsuario: (id: number) => Promise<{ success: boolean; error?: string }>
}

export default function UsuarioTable({ usuarios, onEliminarUsuario }: UsuarioTableProps) {
  const [usuarioAEliminar, setUsuarioAEliminar] = useState<Usuario | null>(null)
  const [isEliminando, setIsEliminando] = useState(false)

  const handleEliminarClick = (usuario: Usuario) => {
    setUsuarioAEliminar(usuario)
  }

  const handleConfirmarEliminacion = async () => {
    if (!usuarioAEliminar) return

    setIsEliminando(true)
    try {
      const result = await onEliminarUsuario(usuarioAEliminar.id)
      if (result.success) {
        setUsuarioAEliminar(null)
        alert('Usuario eliminado exitosamente')
      } else {
        alert('Error al eliminar usuario: ' + result.error)
      }
    } finally {
      setIsEliminando(false)
    }
  }

  const handleCancelarEliminacion = () => {
    setUsuarioAEliminar(null)
  }

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const getRolColor = (rol: RolUsuario) => {
    switch (rol) {
      case RolUsuario.ADMIN:
        return 'badge bg-danger'
      case RolUsuario.OPERADOR:
        return 'badge bg-warning text-dark'
      case RolUsuario.LECTOR:
        return 'badge bg-info text-dark'
      default:
        return 'badge bg-secondary'
    }
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Verificado</th>
              <th>Creado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>
                  <span className={getRolColor(usuario.rol)}>
                    {usuario.rol}
                  </span>
                </td>
                <td>
                  <span className={`badge ${usuario.activo ? 'bg-success' : 'bg-danger'}`}>
                    {usuario.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <span className={`badge ${usuario.verificado ? 'bg-success' : 'bg-warning'}`}>
                    {usuario.verificado ? 'Sí' : 'No'}
                  </span>
                </td>
                <td>{formatearFecha(usuario.createdAt)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminarClick(usuario)}
                    disabled={isEliminando}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación para eliminar */}
      {usuarioAEliminar && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminación</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancelarEliminacion}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  ¿Estás seguro de que quieres eliminar al usuario{' '}
                  <strong>{usuarioAEliminar.nombre}</strong> ({usuarioAEliminar.email})?
                </p>
                <p className="text-danger">
                  <strong>⚠️ Advertencia:</strong> Esta acción también eliminará la solicitud de registro asociada y no se puede deshacer.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelarEliminacion}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmarEliminacion}
                  disabled={isEliminando}
                >
                  {isEliminando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Eliminando...
                    </>
                  ) : (
                    'Eliminar Usuario'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
