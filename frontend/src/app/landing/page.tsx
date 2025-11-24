"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "./landing.css"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className={`hero-section ${isVisible ? "fade-in" : ""}`}>
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="glass-card hero-card">
            <h1 className="hero-title">
              <span className="gradient-text">ECOLINK</span>
            </h1>
            <p className="hero-subtitle">
              Sistema de Gestión de Clientes para Servicios de Recolección de Residuos
            </p>
            <p className="hero-description">
              Optimiza la gestión de tu empresa con una solución moderna, eficiente y escalable
            </p>
            <div className="hero-buttons">
              <Link href="/login" className="btn-glass btn-primary-glass">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Acceder al Sistema
              </Link>
              <a
                href="#funcionalidades"
                className="btn-glass btn-secondary-glass"
              >
                <i className="bi bi-play-circle me-2"></i>
                Ver Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problema Section */}
      <section id="problema" className="section-problema">
        <div className="container-custom">
          <div className="glass-card content-card">
            <h2 className="section-title">
              <i className="bi bi-exclamation-triangle-fill me-3"></i>
              El Problema que Resolvemos
            </h2>
            <div className="problema-content">
              <div className="problema-stats">
                <div className="stat-card glass-card">
                  <div className="stat-icon">
                    <i className="bi bi-clock-history"></i>
                  </div>
                  <div className="stat-value">70%</div>
                  <div className="stat-label">Ahorro de Tiempo</div>
                  <div className="stat-description">
                    Reducción en el tiempo de gestión manual de clientes
                  </div>
                </div>
                <div className="stat-card glass-card">
                  <div className="stat-icon">
                    <i className="bi bi-cash-coin"></i>
                  </div>
                  <div className="stat-value">$50K+</div>
                  <div className="stat-label">Ahorro Anual</div>
                  <div className="stat-description">
                    Reducción de costos operativos y errores humanos
                  </div>
                </div>
                <div className="stat-card glass-card">
                  <div className="stat-icon">
                    <i className="bi bi-graph-up-arrow"></i>
                  </div>
                  <div className="stat-value">3x</div>
                  <div className="stat-label">Más Eficiencia</div>
                  <div className="stat-description">
                    Incremento en la productividad del equipo
                  </div>
                </div>
              </div>
              <div className="problema-text">
                <p>
                  Las empresas de servicios de recolección de residuos enfrentan desafíos
                  significativos en la gestión manual de clientes: pérdida de información,
                  errores en facturación, dificultades para realizar seguimientos y falta de
                  visibilidad en tiempo real del estado de los clientes.
                </p>
                <p>
                  <strong>ECOLINK</strong> transforma estos procesos manuales en un sistema
                  digitalizado que centraliza toda la información, automatiza tareas repetitivas
                  y proporciona herramientas avanzadas de búsqueda y filtrado para una gestión
                  eficiente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnologías Section */}
      <section id="tecnologias" className="section-tecnologias">
        <div className="container-custom">
          <div className="glass-card content-card">
            <h2 className="section-title">
              <i className="bi bi-code-slash me-3"></i>
              Tecnologías Utilizadas
            </h2>
            <div className="tech-grid">
              <div className="tech-category">
                <h3 className="tech-category-title">Frontend</h3>
                <div className="tech-items">
                  <div className="tech-item glass-card">
                    <i className="bi bi-filetype-tsx tech-icon"></i>
                    <span>Next.js 15</span>
                  </div>
                  <div className="tech-item glass-card">
                    <i className="bi bi-react tech-icon"></i>
                    <span>React 19</span>
                  </div>
                  <div className="tech-item glass-card">
                    <i className="bi bi-filetype-tsx tech-icon"></i>
                    <span>TypeScript</span>
                  </div>
                  <div className="tech-item glass-card">
                    <i className="bi bi-bootstrap tech-icon"></i>
                    <span>Bootstrap 5</span>
                  </div>
                </div>
              </div>
              <div className="tech-category">
                <h3 className="tech-category-title">Backend</h3>
                <div className="tech-items">
                  <div className="tech-item glass-card">
                    <i className="bi bi-node-minus tech-icon"></i>
                    <span>Node.js</span>
                  </div>
                  <div className="tech-item glass-card">
                    <i className="bi bi-filetype-tsx tech-icon"></i>
                    <span>Express.js</span>
                  </div>
                  <div className="tech-item glass-card">
                    <i className="bi bi-filetype-tsx tech-icon"></i>
                    <span>TypeScript</span>
                  </div>
                  <div className="tech-item glass-card">
                    <i className="bi bi-database tech-icon"></i>
                    <span>Prisma ORM</span>
                  </div>
                </div>
              </div>
              <div className="tech-category">
                <h3 className="tech-category-title">Base de Datos</h3>
                <div className="tech-items">
                  <div className="tech-item glass-card">
                    <i className="bi bi-database tech-icon"></i>
                    <span>MySQL</span>
                  </div>
                </div>
              </div>
              <div className="tech-category">
                <h3 className="tech-category-title">Autenticación</h3>
                <div className="tech-items">
                  <div className="tech-item glass-card">
                    <i className="bi bi-shield-lock tech-icon"></i>
                    <span>JWT</span>
                  </div>
                  <div className="tech-item glass-card">
                    <i className="bi bi-envelope-check tech-icon"></i>
                    <span>Email Verification</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades Section */}
      <section id="funcionalidades" className="section-funcionalidades">
        <div className="container-custom">
          <div className="glass-card content-card">
            <h2 className="section-title">
              <i className="bi bi-list-check me-3"></i>
              Funcionalidades Principales
            </h2>
            <div className="funcionalidades-grid">
              <div className="funcionalidad-card glass-card">
                <div className="funcionalidad-icon">
                  <i className="bi bi-people-fill"></i>
                </div>
                <h3>Gestión de Clientes</h3>
                <ul>
                  <li>CRUD completo de clientes</li>
                  <li>Gestión diferenciada para empresas y particulares</li>
                  <li>Control de deudas y seguimiento</li>
                  <li>Asignación de precios y categorías</li>
                </ul>
              </div>
              <div className="funcionalidad-card glass-card">
                <div className="funcionalidad-icon">
                  <i className="bi bi-search"></i>
                </div>
                <h3>Búsqueda y Filtrado Avanzado</h3>
                <ul>
                  <li>Búsqueda en tiempo real</li>
                  <li>Filtros múltiples simultáneos</li>
                  <li>Filtrado por zona, semana, tipo, estado</li>
                  <li>Exportación de resultados</li>
                </ul>
              </div>
              <div className="funcionalidad-card glass-card">
                <div className="funcionalidad-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h3>Sistema de Roles</h3>
                <ul>
                  <li>ADMIN: Control total del sistema</li>
                  <li>OPERADOR: Gestión de clientes</li>
                  <li>LECTOR: Solo consulta</li>
                  <li>Permisos granulares por funcionalidad</li>
                </ul>
              </div>
              <div className="funcionalidad-card glass-card">
                <div className="funcionalidad-icon">
                  <i className="bi bi-tags-fill"></i>
                </div>
                <h3>Gestión de Categorías</h3>
                <ul>
                  <li>Categorización personalizable</li>
                  <li>Colores para identificación visual</li>
                  <li>Gestión por campos específicos</li>
                </ul>
              </div>
              <div className="funcionalidad-card glass-card">
                <div className="funcionalidad-icon">
                  <i className="bi bi-envelope-paper"></i>
                </div>
                <h3>Autenticación Segura</h3>
                <ul>
                  <li>Registro con verificación de email</li>
                  <li>Recuperación de contraseñas</li>
                  <li>Aprobación de usuarios por administradores</li>
                  <li>Tokens JWT seguros</li>
                </ul>
              </div>
              <div className="funcionalidad-card glass-card">
                <div className="funcionalidad-icon">
                  <i className="bi bi-graph-up"></i>
                </div>
                <h3>Dashboard y Reportes</h3>
                <ul>
                  <li>Vista general de clientes</li>
                  <li>Indicadores de estado</li>
                  <li>Seguimiento de deudas</li>
                  <li>Control de turnos y prioridades</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="section-videos">
        <div className="container-custom">
          <div className="glass-card content-card">
            <h2 className="section-title">
              <i className="bi bi-play-circle-fill me-3"></i>
              Demostración en Video
            </h2>
            <div className="videos-container">
              {/* Video 1: Demo General */}
              <div className="video-wrapper glass-card">
                <h3 className="video-title">
                  <i className="bi bi-play-circle me-2"></i>
                  Demo General del Sistema
                </h3>
                <div className="video-container">
                  {/* INSTRUCCIONES: Reemplaza VIDEO_ID con el ID real de YouTube o usa el formato de Google Drive */}
                  {/* Para YouTube: https://www.youtube.com/watch?v=VIDEO_ID -> usar solo VIDEO_ID */}
                  {/* Para Google Drive: https://drive.google.com/file/d/ARCHIVO_ID/view -> usar ARCHIVO_ID en el formato de abajo */}
                  
                  {/* OPCIÓN 1: YouTube (recomendado) */}
                  <iframe
                    className="video-iframe"
                    src="https://www.youtube.com/embed/VIDEO_ID?rel=0"
                    title="Demo General ECOLINK"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ display: "none" }}
                  ></iframe>
                  
                  {/* OPCIÓN 2: Google Drive (alternativa) */}
                  {/* Descomenta y reemplaza ARCHIVO_ID si prefieres usar Google Drive */}
                  {/* <iframe
                    className="video-iframe"
                    src="https://drive.google.com/file/d/ARCHIVO_ID/preview"
                    title="Demo General ECOLINK"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe> */}
                  
                  {/* Placeholder mientras no hay video */}
                  <div className="video-placeholder-content">
                    <i className="bi bi-play-circle video-placeholder-icon"></i>
                    <p className="video-placeholder-text">
                      <strong>Instrucciones para agregar videos:</strong>
                    </p>
                    <div className="video-instructions-box">
                      <div className="instruction-item">
                        <h4>
                          <i className="bi bi-youtube text-danger me-2"></i>
                          Opción YouTube (Recomendado)
                        </h4>
                        <ol>
                          <li>Sube tu video a YouTube (puede ser privado o no listado)</li>
                          <li>Copia el ID del video de la URL: <code>youtube.com/watch?v=VIDEO_ID</code></li>
                          <li>Reemplaza <code>VIDEO_ID</code> en la línea 293 del archivo <code>page.tsx</code></li>
                          <li>Cambia <code>style={{ display: "none" }}</code> a <code>style={{ display: "block" }}</code></li>
                        </ol>
                      </div>
                      <div className="instruction-item">
                        <h4>
                          <i className="bi bi-google-drive text-primary me-2"></i>
                          Opción Google Drive (Alternativa)
                        </h4>
                        <ol>
                          <li>Sube el video a Google Drive</li>
                          <li>Haz clic derecho → "Obtener enlace" → "Cualquiera con el enlace"</li>
                          <li>Copia el ID del archivo de la URL: <code>drive.google.com/file/d/ARCHIVO_ID/view</code></li>
                          <li>Descomenta el iframe de Google Drive y reemplaza <code>ARCHIVO_ID</code></li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video 2: Funcionalidades Específicas (opcional) */}
              {/* Descomenta este bloque si quieres agregar más videos */}
              {/* 
              <div className="video-wrapper glass-card">
                <h3 className="video-title">
                  <i className="bi bi-list-check me-2"></i>
                  Funcionalidades Específicas
                </h3>
                <div className="video-container">
                  <iframe
                    className="video-iframe"
                    src="https://www.youtube.com/embed/VIDEO_ID_2?rel=0"
                    title="Funcionalidades ECOLINK"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              */}
            </div>
          </div>
        </div>
      </section>

      {/* Repositorios Section */}
      <section id="repositorios" className="section-repositorios">
        <div className="container-custom">
          <div className="glass-card content-card">
            <h2 className="section-title">
              <i className="bi bi-github me-3"></i>
              Repositorios del Proyecto
            </h2>
            <div className="repos-grid">
              <a
                href="https://github.com/TinoSegatti/ECOLINK-FRONTEND.git"
                target="_blank"
                rel="noopener noreferrer"
                className="repo-card glass-card"
              >
                <div className="repo-icon">
                  <i className="bi bi-code-square"></i>
                </div>
                <h3>Frontend</h3>
                <p>Repositorio del cliente web desarrollado con Next.js y React</p>
                <div className="repo-link">
                  <i className="bi bi-arrow-right-circle me-2"></i>
                  Ver en GitHub
                </div>
              </a>
              <a
                href="https://github.com/TinoSegatti/ECOLINK-BACKEND.git"
                target="_blank"
                rel="noopener noreferrer"
                className="repo-card glass-card"
              >
                <div className="repo-icon">
                  <i className="bi bi-server"></i>
                </div>
                <h3>Backend</h3>
                <p>Repositorio de la API REST desarrollada con Node.js y Express</p>
                <div className="repo-link">
                  <i className="bi bi-arrow-right-circle me-2"></i>
                  Ver en GitHub
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Usuario Invitado Section */}
      <section id="usuario-invitado" className="section-invitado">
        <div className="container-custom">
          <div className="glass-card content-card">
            <h2 className="section-title">
              <i className="bi bi-person-check-fill me-3"></i>
              Prueba el Sistema
            </h2>
            <div className="invitado-content">
              <div className="invitado-info glass-card">
                <div className="invitado-icon">
                  <i className="bi bi-key-fill"></i>
                </div>
                <h3>Usuario Invitado</h3>
                <p>
                  Puedes acceder al sistema con un usuario de prueba que tiene todos los
                  permisos excepto:
                </p>
                <ul className="invitado-restrictions">
                  <li>
                    <i className="bi bi-x-circle text-danger me-2"></i>
                    No puede modificar usuarios
                  </li>
                  <li>
                    <i className="bi bi-x-circle text-danger me-2"></i>
                    No puede eliminar usuarios
                  </li>
                  <li>
                    <i className="bi bi-x-circle text-danger me-2"></i>
                    No puede dar de alta nuevos usuarios
                  </li>
                </ul>
                <div className="invitado-credentials glass-card">
                  <div className="credential-item">
                    <span className="credential-label">Email:</span>
                    <span className="credential-value">invitado@ecolink.com</span>
                  </div>
                  <div className="credential-item">
                    <span className="credential-label">Contraseña:</span>
                    <span className="credential-value">Invitado2024!</span>
                  </div>
                </div>
                <Link href="/login" className="btn-glass btn-primary-glass mt-4">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Iniciar Sesión como Invitado
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container-custom">
          <div className="footer-content">
            <div className="footer-brand">
              <h4>ECOLINK</h4>
              <p>Sistema de Gestión de Clientes</p>
            </div>
            <div className="footer-links">
              <a href="#problema">Problema</a>
              <a href="#tecnologias">Tecnologías</a>
              <a href="#funcionalidades">Funcionalidades</a>
              <a href="#videos">Videos</a>
              <a href="#repositorios">Repositorios</a>
            </div>
            <div className="footer-copyright">
              <p>© 2024 ECOLINK. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

