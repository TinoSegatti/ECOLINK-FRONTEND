"use client"

import { useState } from 'react'
import { Usuario, RolUsuario } from '../types'

interface UsuarioTableProps {
  usuarios: Usuario[]
  onEliminarUsuario: (id: number) => Promise<{ success: boolean; error?: string }>
  onCambiarEstado: (id: number, activo: boolean) => Promise<{ success: boolean; error?: string }>
}

export default function UsuarioTable({ usuarios, onEliminarUsuario, onCambiarEstado }: UsuarioTableProps) {
  const [usuarioAEliminar, setUsuarioAEliminar] = useState<Usuario | null>(null)
  const [isEliminando, setIsEliminando] = useState(false)
  const [usuariosCambiandoEstado, setUsuariosCambiandoEstado] = useState<Set<number>>(new Set())

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

  const handleCambiarEstado = async (usuario: Usuario) => {
    const nuevoEstado = !usuario.activo
    
    setUsuariosCambiandoEstado(prev => new Set(prev).add(usuario.id))
    
    try {
      const result = await onCambiarEstado(usuario.id, nuevoEstado)
      if (result.success) {
        alert(`Usuario ${nuevoEstado ? 'activado' : 'desactivado'} exitosamente`)
      } else {
        alert('Error al cambiar estado: ' + result.error)
      }
    } finally {
      setUsuariosCambiandoEstado(prev => {
        const newSet = new Set(prev)
        newSet.delete(usuario.id)
        return newSet
      })
    }
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
                <td>
                  <span className={`badge ${usuario.verificado ? 'bg-success' : 'bg-warning'}`}>
                    {usuario.verificado ? 'Sí' : 'No'}
                  </span>
                </td>
                <td>{formatearFecha(usuario.createdAt)}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      className={`btn btn-sm ${usuario.activo ? 'btn-outline-warning' : 'btn-outline-success'}`}
                      onClick={() => handleCambiarEstado(usuario)}
                      disabled={usuariosCambiandoEstado.has(usuario.id)}
                      title={usuario.activo ? 'Desactivar usuario' : 'Activar usuario'}
                    >
                      <i className={`bi ${usuario.activo ? 'bi-person-x' : 'bi-person-check'} me-1`}></i>
                      {usuariosCambiandoEstado.has(usuario.id) ? '...' : (usuario.activo ? 'Desactivar' : 'Activar')}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleEliminarClick(usuario)}
                      disabled={isEliminando}
                      title="Eliminar usuario"
                    >
                      <i className="bi bi-trash me-1"></i>
                      Eliminar
                    </button>
                  </div>
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
