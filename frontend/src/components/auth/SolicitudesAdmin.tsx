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
  }, [loadSolicitudes])

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
      <h2 className="mb-4" style={{ color: "var(--foreground)" }}>Solicitudes de Registro</h2>

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
          <div className="alert alert-info" style={{ backgroundColor: "rgba(23, 162, 184, 0.1)", borderColor: "var(--accent-cyan)", color: "var(--foreground)" }}>
            No hay solicitudes pendientes
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover solicitudes-table">
              <thead>
                <tr>
                  <th style={{ backgroundColor: "var(--muted)", color: "var(--foreground)", borderBottom: "2px solid var(--border-color)", fontWeight: 600 }}>Nombre</th>
                  <th style={{ backgroundColor: "var(--muted)", color: "var(--foreground)", borderBottom: "2px solid var(--border-color)", fontWeight: 600 }}>Email</th>
                  <th style={{ backgroundColor: "var(--muted)", color: "var(--foreground)", borderBottom: "2px solid var(--border-color)", fontWeight: 600 }}>Rol</th>
                  <th style={{ backgroundColor: "var(--muted)", color: "var(--foreground)", borderBottom: "2px solid var(--border-color)", fontWeight: 600 }}>Fecha</th>
                  <th style={{ backgroundColor: "var(--muted)", color: "var(--foreground)", borderBottom: "2px solid var(--border-color)", fontWeight: 600 }}>Email Verificado</th>
                  <th style={{ backgroundColor: "var(--muted)", color: "var(--foreground)", borderBottom: "2px solid var(--border-color)", fontWeight: 600 }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
              {solicitudes.map((s) => (
                <tr key={s.id} style={{ color: "var(--foreground)" }}>
                  <td style={{ color: "var(--foreground)", borderColor: "var(--border-color)" }}>{s.nombre}</td>
                  <td style={{ color: "var(--foreground)", borderColor: "var(--border-color)" }}>{s.email}</td>
                  <td style={{ borderColor: "var(--border-color)" }}><span className="badge bg-secondary">{s.rol}</span></td>
                  <td style={{ color: "var(--foreground)", borderColor: "var(--border-color)" }}>{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td style={{ borderColor: "var(--border-color)" }}>
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
                  <td style={{ borderColor: "var(--border-color)" }}>
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
        <div className="modal d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content" style={{ backgroundColor: "var(--card-background)", border: "1px solid var(--border-color)" }}>
              <form onSubmit={handleAprobar}>
                <div className="modal-header" style={{ backgroundColor: "var(--primary-green)", color: "white", borderBottom: "1px solid var(--border-color)" }}>
                  <h5 className="modal-title" style={{ color: "white", fontWeight: 600 }}>
                    <i className="bi bi-check-circle me-2"></i>Aprobar Solicitud
                  </h5>
                  <button type="button" className="btn-close" onClick={resetModalState} style={{ filter: "brightness(0) invert(1)" }}></button>
                </div>
                <div className="modal-body" style={{ backgroundColor: "var(--card-background)", color: "var(--foreground)" }}>
                  <div className="alert alert-info" style={{ backgroundColor: "rgba(23, 162, 184, 0.1)", borderColor: "var(--accent-cyan)", color: "var(--foreground)" }}>
                    ¿Aprobar a <strong>{selectedSolicitud.nombre}</strong> ({selectedSolicitud.email}) como <strong>{selectedSolicitud.rol}</strong>?
                  </div>
                  {!selectedSolicitud.emailVerificado && (
                    <div className="alert alert-warning" style={{ backgroundColor: "rgba(255, 193, 7, 0.1)", borderColor: "#ffc107", color: "var(--foreground)" }}>
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      <strong>Importante:</strong> El email de esta solicitud aún no ha sido verificado. 
                      El usuario debe verificar su email antes de que puedas aprobar la solicitud.
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label" style={{ color: "var(--foreground)" }}>Contraseña inicial *</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isProcessing}
                      style={{ backgroundColor: "var(--card-background)", color: "var(--foreground)", borderColor: "var(--border-color)" }}
                    />
                    <div className="form-text" style={{ color: "var(--secondary-text)" }}>
                      Esta contraseña será asignada al usuario y podrá usarla para iniciar sesión.
                    </div>
                  </div>
                </div>
                <div className="modal-footer" style={{ backgroundColor: "var(--card-background)", borderTop: "1px solid var(--border-color)" }}>
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
        <div className="modal d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content" style={{ backgroundColor: "var(--card-background)", border: "1px solid var(--border-color)" }}>
              <form onSubmit={handleRechazar}>
                <div className="modal-header" style={{ backgroundColor: "#dc3545", color: "white", borderBottom: "1px solid var(--border-color)" }}>
                  <h5 className="modal-title" style={{ color: "white", fontWeight: 600 }}>
                    <i className="bi bi-x-circle me-2"></i>Rechazar Solicitud
                  </h5>
                  <button type="button" className="btn-close" onClick={resetModalState} style={{ filter: "brightness(0) invert(1)" }}></button>
                </div>
                <div className="modal-body" style={{ backgroundColor: "var(--card-background)", color: "var(--foreground)" }}>
                  <div className="alert alert-warning" style={{ backgroundColor: "rgba(255, 193, 7, 0.1)", borderColor: "#ffc107", color: "var(--foreground)" }}>
                    ¿Rechazar a <strong>{selectedSolicitud.nombre}</strong> ({selectedSolicitud.email})?
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: "var(--foreground)" }}>Motivo (opcional)</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={motivo}
                      onChange={(e) => setMotivo(e.target.value)}
                      disabled={isProcessing}
                      style={{ backgroundColor: "var(--card-background)", color: "var(--foreground)", borderColor: "var(--border-color)" }}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer" style={{ backgroundColor: "var(--card-background)", borderTop: "1px solid var(--border-color)" }}>
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
