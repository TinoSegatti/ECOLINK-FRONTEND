"use client"

import { useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { GestionableField, GestionableFieldKey } from "types"
// Se comenta la importación de tipos porque no se encuentra el módulo '../types'
// import type { GestionableFieldKey, GestionableField } from "../types"

interface PrecioFormProps {
  show: boolean
  onHide: () => void
  precioForm: { tipoCliente: string; nuevoPrecio: number | null }
  setPrecioForm: (form: { tipoCliente: string; nuevoPrecio: number | null }) => void
  onActualizarPrecios: () => Promise<{ success: boolean; errors?: { field: string; message: string }[]; message?: string }>
  gestionFields: Record<GestionableFieldKey, GestionableField>
}

export default function PrecioForm({
  show,
  onHide,
  precioForm,
  setPrecioForm,
  onActualizarPrecios,
  gestionFields,
}: PrecioFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    const result = await onActualizarPrecios()
    if (result.success && result.message) {
      setSuccessMessage(result.message)
      setTimeout(() => {
        onHide()
        setSuccessMessage(null)
      }, 2000)
    } else {
      setError(result.errors?.[0]?.message || "Error al actualizar precios")
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Precios</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Cliente</Form.Label>
            <Form.Select
              value={precioForm.tipoCliente}
              onChange={(e) => setPrecioForm({ ...precioForm, tipoCliente: e.target.value })}
              required
            >
              <option value="">Seleccione un tipo de cliente</option>
              {gestionFields.tipoCliente.options.map((option) => (
                <option key={option.valor} value={option.valor}>
                  {option.valor}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nuevo Precio</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="0.01"
              value={precioForm.nuevoPrecio ?? ""}
              onChange={(e) =>
                setPrecioForm({
                  ...precioForm,
                  nuevoPrecio: e.target.value ? Number.parseFloat(e.target.value) : null,
                })
              }
              required
            />
          </Form.Group>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button
              style={{
                backgroundColor: "var(--primary-green)",
                border: "none",
              }}
              type="submit"
            >
              Actualizar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}