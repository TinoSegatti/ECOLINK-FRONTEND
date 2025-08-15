"use client"

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EmailVerification from "../../components/auth/EmailVerification";

// Componente hijo que usa useSearchParams
function VerificarSolicitudContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = React.useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    console.log("🔍 VerificarSolicitudContent: Token recibido:", token);
    
    if (!token) {
      console.log("❌ No hay token, estableciendo error");
      setStatus("error");
      setMessage("Token de verificación no encontrado");
      return;
    }

    console.log("✅ Token encontrado, iniciando verificación...");
    
    // Simular verificación temporalmente para debug
    const verificarSolicitud = async () => {
      try {
        console.log("🔄 Llamando a la API...");
        
        // Importación dinámica para evitar problemas de build
        const { verificarEmailSolicitud } = await import("../../services/api/auth");
        const response = await verificarEmailSolicitud(token);
        
        console.log("📡 Respuesta de la API:", response);
        
        if (response.success) {
          console.log("✅ Verificación exitosa");
          setStatus("success");
          setMessage(response.data!.message);
          // Redirigir después de 3 segundos
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        } else {
          console.log("❌ Error en la respuesta:", response.errors);
          setStatus("error");
          setMessage(response.errors?.[0]?.message || "Error al verificar la solicitud");
        }
      } catch (error) {
        console.error("💥 Error durante la verificación:", error);
        setStatus("error");
        setMessage("Error al conectar con el servidor");
      }
    };

    verificarSolicitud();
  }, [token]);

  console.log("🎨 Renderizando componente con status:", status, "y message:", message);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Verificación de Solicitud</h2>
            <p className="text-center mb-3">Token: {token ? `${token.substring(0, 20)}...` : 'No encontrado'}</p>
            <EmailVerification status={status} message={message} isSolicitud={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente principal con Suspense
export default function VerificarSolicitudPage() {
  console.log("🚀 VerificarSolicitudPage: Componente principal renderizado");
  
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
