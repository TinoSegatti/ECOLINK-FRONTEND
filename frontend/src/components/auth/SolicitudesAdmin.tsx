"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useAuthContext } from "../../contexts/AuthContext"
import type { SolicitudRegistro } from "../../types"

export default function SolicitudesAdmin() {
  const {
    solicitudes,
    solicitudesLoading,
    loadSolicitudes,
    aprobarSolicitud,
    rechazarSolicitud,
  } = useAuthContext()

  const [selectedSolicitud, setSelectedSolicitud] = useState<SolicitudRegistro | null>(null)
  const [password, setPassword] = useState("")
  const [motivo, setMotivo] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [showAprobarModal, setShowAprobarModal] = useState(false)
  const [showRechazarModal, setShowRechazarModal] = useState(false)

  useEffect(() => {
    loadSolicitudes()
  }, [])

  const resetModalState = () => {
    setSelectedSolicitud(null)
    setPassword("")
    setMotivo("")
    setIsProcessing(false)
    setShowAprobarModal(false)
    setShowRechazarModal(false)
  }

  const handleAprobar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSolicitud) return

    setIsProcessing(true)
    setMessage(null)

    try {
      const result = await aprobarSolicitud(selectedSolicitud.id, password)
      if (result.success) {
        setMessage({ type: "success", text: result.message })
        resetModalState()
        setTimeout(() => {
          loadSolicitudes()
        }, 500)
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch {
      setMessage({ type: "error", text: "Error al procesar la solicitud" })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRechazar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSolicitud) return

    setIsProcessing(true)
    setMessage(null)

    try {
      const result = await rechazarSolicitud(selectedSolicitud.id, motivo)
      if (result.success) {
        setMessage({ type: "success", text: result.message })
        resetModalState()
        setTimeout(() => {
          loadSolicitudes()
        }, 500)
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch {
      setMessage({ type: "error", text: "Error al procesar la solicitud" })
    } finally {
      setIsProcessing(false)
    }
  }

  const openAprobarModal = (solicitud: SolicitudRegistro) => {
    setSelectedSolicitud(solicitud)
    setMessage(null)
    setPassword("")
    setShowAprobarModal(true)
  }

  const openRechazarModal = (solicitud: SolicitudRegistro) => {
    setSelectedSolicitud(solicitud)
    setMessage(null)
    setMotivo("")
    setShowRechazarModal(true)
  }

  if (solicitudesLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando solicitudes...</p>
      </div>
    )
  }

  return (
    <div className="card-custom p-4 shadow">
      <h2 className="mb-4">Solicitudes de Registro</h2>

      {message && (
        <div className={`alert alert-${message.type === "success" ? "success" : "danger"} mb-4`}>
          {message.text}
          <button
            type="button"
            className="btn-close float-end"
            onClick={() => setMessage(null)}
          ></button>
        </div>
      )}

      {solicitudes.length === 0 ? (
        <div className="alert alert-info">No hay solicitudes pendientes</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Fecha</th>
                <th>Email Verificado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((s) => (
                <tr key={s.id}>
                  <td>{s.nombre}</td>
                  <td>{s.email}</td>
                  <td><span className="badge bg-secondary">{s.rol}</span></td>
                  <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td>
                    {s.emailVerificado ? (
                      <span className="badge bg-success">
                        <i className="bi bi-check-circle me-1"></i>Verificado
                      </span>
                    ) : (
                      <span className="badge bg-warning">
                        <i className="bi bi-exclamation-triangle me-1"></i>Pendiente
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => openAprobarModal(s)}
                      disabled={isProcessing || !s.emailVerificado}
                      title={!s.emailVerificado ? "El email debe estar verificado antes de aprobar" : ""}
                    >
                      <i className="bi bi-check-circle me-1"></i>
                      Aprobar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => openRechazarModal(s)}
                      disabled={isProcessing}
                    >
                      <i className="bi bi-x-circle me-1"></i>
                      Rechazar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Aprobar */}
      {showAprobarModal && selectedSolicitud && (
        <div className="modal d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleAprobar}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="bi bi-check-circle me-2 text-success"></i>Aprobar Solicitud
                  </h5>
                  <button type="button" className="btn-close" onClick={resetModalState}></button>
                </div>
                <div className="modal-body">
                  <div className="alert alert-info">
                    ¿Aprobar a <strong>{selectedSolicitud.nombre}</strong> ({selectedSolicitud.email}) como <strong>{selectedSolicitud.rol}</strong>?
                  </div>
                  {!selectedSolicitud.emailVerificado && (
                    <div className="alert alert-warning">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      <strong>Importante:</strong> El email de esta solicitud aún no ha sido verificado. 
                      El usuario debe verificar su email antes de que puedas aprobar la solicitud.
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Contraseña inicial *</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isProcessing}
                    />
                    <div className="form-text">
                      Esta contraseña será asignada al usuario y podrá usarla para iniciar sesión.
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={resetModalState}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-success" disabled={isProcessing || !password}>
                    {isProcessing ? "Procesando..." : "Aprobar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Rechazar */}
      {showRechazarModal && selectedSolicitud && (
        <div className="modal d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleRechazar}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="bi bi-x-circle me-2 text-danger"></i>Rechazar Solicitud
                  </h5>
                  <button type="button" className="btn-close" onClick={resetModalState}></button>
                </div>
                <div className="modal-body">
                  <div className="alert alert-warning">
                    ¿Rechazar a <strong>{selectedSolicitud.nombre}</strong> ({selectedSolicitud.email})?
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Motivo (opcional)</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={motivo}
                      onChange={(e) => setMotivo(e.target.value)}
                      disabled={isProcessing}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={resetModalState}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-danger" disabled={isProcessing}>
                    {isProcessing ? "Procesando..." : "Rechazar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
