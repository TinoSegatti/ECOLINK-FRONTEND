"use client";

import Link from "next/link";

interface Props {
  status: "loading" | "success" | "error";
  message: string;
  isSolicitud?: boolean; // NUEVA PROPIEDAD para distinguir entre verificación de email y solicitud
}

export default function EmailVerification({ status, message, isSolicitud = false }: Props) {
  return (
    <div className="card-custom p-4 shadow text-center">
      {status === "loading" && (
        <>
          <div className="spinner-border mb-3" style={{ color: "var(--primary-green)" }} role="status">
            <span className="visually-hidden">Verificando...</span>
          </div>
          <h3>{isSolicitud ? "Verificando tu solicitud..." : "Verificando tu email..."}</h3>
          <p className="text-muted">
            {isSolicitud 
              ? "Por favor espera mientras verificamos tu solicitud de registro."
              : "Por favor espera mientras verificamos tu cuenta."
            }
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <i
            className="bi bi-check-circle-fill mb-3"
            style={{ fontSize: "4rem", color: "var(--primary-green)" }}
          ></i>
          <h3 className="mb-3" style={{ color: "var(--primary-green)" }}>
            {isSolicitud ? "¡Solicitud verificada!" : "¡Email verificado!"}
          </h3>
          <p className="mb-4">{message}</p>
          <p className="text-muted">
            {isSolicitud 
              ? "Redirigiendo al login..."
              : "Redirigiendo al panel principal..."
            }
          </p>
        </>
      )}

      {status === "error" && (
        <>
          <i className="bi bi-x-circle-fill text-danger mb-3" style={{ fontSize: "4rem" }}></i>
          <h3 className="text-danger mb-3">
            {isSolicitud ? "Error de verificación de solicitud" : "Error de verificación"}
          </h3>
          <p className="mb-4">{message}</p>
          <div className="d-grid gap-2">
            {isSolicitud ? (
              <Link href="/registro" className="btn btn-outline-primary">
                Solicitar nuevo registro
              </Link>
            ) : (
              <Link href="/registro" className="btn btn-outline-primary">
                Solicitar nuevo enlace
              </Link>
            )}
            <Link href="/login" className="btn btn-secondary">
              Volver al login
            </Link>
          </div>
        </>
      )}
    </div>
  );
}