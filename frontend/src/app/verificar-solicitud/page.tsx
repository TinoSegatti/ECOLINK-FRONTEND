"use client"

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { verificarEmailSolicitud } from "../../services/api/auth";
import EmailVerification from "../../components/auth/EmailVerification";

// Componente hijo que usa useSearchParams
function VerificarSolicitudContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = React.useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token de verificación no encontrado");
      return;
    }

    const verificarSolicitud = async () => {
      try {
        const response = await verificarEmailSolicitud(token);
        if (response.success) {
          setStatus("success");
          setMessage(response.data!.message);
          // Redirigir después de 3 segundos
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        } else {
          setStatus("error");
          setMessage(response.errors?.[0]?.message || "Error al verificar la solicitud");
        }
      } catch (error) {
        console.error("Error:", error);
        setStatus("error");
        setMessage("Error al conectar con el servidor");
      }
    };

    verificarSolicitud();
  }, [token]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <EmailVerification status={status} message={message} isSolicitud={true} />
        </div>
      </div>
    </div>
  );
}

// Componente principal con Suspense
export default function VerificarSolicitudPage() {
  return (
    <Suspense fallback={
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-2">Verificando solicitud...</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <VerificarSolicitudContent />
    </Suspense>
  );
}
