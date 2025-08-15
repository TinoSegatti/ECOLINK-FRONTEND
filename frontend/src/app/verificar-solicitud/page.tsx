"use client"

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verificarEmailSolicitud } from "../../services/api/auth";
import EmailVerification from "../../components/auth/EmailVerification";

export default function VerificarSolicitudPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Token de verificación no encontrado")
      return
    }

    const verificarSolicitud = async () => {
      try {
        const response = await verificarEmailSolicitud(token)
        if (response.success) {
          setStatus("success")
          setMessage(response.data!.message)
          // Redirigir después de 3 segundos
          setTimeout(() => {
            window.location.href = "/login"
          }, 3000)
        } else {
          setStatus("error")
          setMessage(response.errors?.[0]?.message || "Error al verificar la solicitud")
        }
      } catch (error) {
        console.error("Error:", error)
        setStatus("error")
        setMessage("Error al conectar con el servidor")
      }
    }

    verificarSolicitud()
  }, [token])

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <EmailVerification status={status} message={message} isSolicitud={true} />
        </div>
      </div>
    </div>
  )
}
