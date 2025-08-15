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
              <th>Creado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td><strong>{usuario.nombre}</strong></td>
                <td><code>{usuario.email}</code></td>
                <td>
                  <span className={getRolColor(usuario.rol)}>
                    {usuario.rol}
                  </span>
                </td>
                <td>
                  <span className={`badge ${usuario.activo ? 'bg-success' : 'bg-secondary'}`}>
                    {usuario.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>{formatearFecha(usuario.createdAt)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleEliminarClick(usuario)}
                    disabled={isEliminando}
                  >
                    <i className="bi bi-trash me-1"></i>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal simple de confirmación */}
      {usuarioAEliminar && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Confirmar eliminación
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCancelarEliminacion}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  ¿Estás seguro de que quieres eliminar al usuario{' '}
                  <strong>{usuarioAEliminar.nombre}</strong>?
                </p>
                <div className="alert alert-warning">
                  <strong>Esta acción no se puede deshacer.</strong>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelarEliminacion}
                  disabled={isEliminando}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmarEliminacion}
                  disabled={isEliminando}
                >
                  {isEliminando ? 'Eliminando...' : 'Sí, eliminar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
