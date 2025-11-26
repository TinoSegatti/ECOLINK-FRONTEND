"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "./landing.css"

// Datos de los videos
const videos = [
  {
    id: "8GloYsroYyo",
    title: "SOLICITUD DE ACCESO",
    part: "PARTE 1"
  },
  {
    id: "61tPferT_2A",
    title: "VISTA GENERAL DE USUARIO INVITADO",
    part: "PARTE 2"
  },
  {
    id: "JZutpmh6SdY",
    title: "CREACIÓN DE CLIENTES",
    part: "PARTE 3"
  },
  {
    id: "N1ke5hWeO08",
    title: "EDICIÓN DE CLIENTES",
    part: "PARTE 4"
  },
  {
    id: "SOMaLnp8wME",
    title: "EDICIÓN DE CATEGORIAS",
    part: "PARTE 5"
  },
  {
    id: "P-Sw2GW2x9A",
    title: "CAMBIO DE PRECIOS MASIVOS",
    part: "PARTE 6"
  },
  {
    id: "l1H1S7GJA6Q",
    title: "SISTEMA DE FILTROS DE CLIENTES",
    part: "PARTE 7"
  }
]

// Componente del Carrusel de Videos
function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentVideo = videos[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1))
  }

  const goToVideo = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="video-carousel-container">
      {/* Controles de navegación superior */}
      <div className="carousel-header">
        <div className="carousel-title-section">
          <h3 className="carousel-main-title">
            <span className="part-badge">{currentVideo.part}</span>
            {currentVideo.title}
          </h3>
          <div className="carousel-counter">
            {currentIndex + 1} / {videos.length}
          </div>
        </div>
        <div className="carousel-controls-top">
          <button
            className="carousel-btn carousel-btn-prev"
            onClick={goToPrevious}
            aria-label="Video anterior"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="carousel-btn carousel-btn-next"
            onClick={goToNext}
            aria-label="Video siguiente"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Contenedor del video */}
      <div className="video-carousel-wrapper glass-card">
        <div className="video-carousel-item">
          <div className="video-embed-container">
            <iframe
              key={currentVideo.id}
              className="video-embed-iframe"
              src={`https://www.youtube.com/embed/${currentVideo.id}?rel=0&autoplay=0`}
              title={currentVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Indicadores de videos (dots) */}
      <div className="carousel-indicators">
        {videos.map((video, index) => (
          <button
            key={video.id}
            className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToVideo(index)}
            aria-label={`Ir a ${video.title}`}
            title={video.title}
          >
            <span className="indicator-dot"></span>
            <span className="indicator-label">{index + 1}</span>
          </button>
        ))}
      </div>

      {/* Lista de videos (thumbnails) */}
      <div className="carousel-thumbnails">
        {videos.map((video, index) => (
          <button
            key={video.id}
            className={`thumbnail-item glass-card ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToVideo(index)}
          >
            <div className="thumbnail-number">{index + 1}</div>
            <div className="thumbnail-info">
              <div className="thumbnail-part">{video.part}</div>
              <div className="thumbnail-title">{video.title}</div>
            </div>
            {index === currentIndex && (
              <div className="thumbnail-active-indicator">
                <i className="bi bi-play-circle-fill"></i>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

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
                  <div className="stat-value">+ $20.000</div>
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
            <VideoCarousel />
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
                    <span className="credential-value">Invitado2024</span>
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

      {/* Disclaimer Section */}
      <section id="disclaimer" className="section-disclaimer">
        <div className="container-custom">
          <div className="disclaimer-card glass-card">
            <div className="disclaimer-icon">
              <i className="bi bi-info-circle-fill"></i>
            </div>
            <h3 className="disclaimer-title">Aviso Importante sobre Disponibilidad del Servicio</h3>
            <div className="disclaimer-content">
              <p>
                Este sistema está alojado en servicios de hosting gratuitos (Render para el backend y Aiven para la base de datos).
                Por limitaciones de estos servicios, si el sistema permanece inactivo por más de 7 días consecutivos, los servicios
                pueden entrar en un estado de pausa automática.
              </p>
              <p>
                <strong>Si experimentas problemas al iniciar sesión:</strong>
              </p>
              <ul className="disclaimer-list">
                <li>
                  <i className="bi bi-arrow-repeat me-2"></i>
                  Intenta nuevamente después del primer error, ya que los servicios pueden estar reactivándose automáticamente
                </li>
                <li>
                  <i className="bi bi-envelope me-2"></i>
                  Si el problema persiste, contacta a{" "}
                  <a href="mailto:valentinosegatti@gmail.com" className="disclaimer-link">
                    valentinosegatti@gmail.com
                  </a>{" "}
                  para solicitar la reactivación de los servicios
                </li>
                <li>
                  <i className="bi bi-clock me-2"></i>
                  Recibirás una notificación cuando los servicios estén nuevamente disponibles
                </li>
              </ul>
              <p className="disclaimer-note">
                <i className="bi bi-lightbulb me-2"></i>
                <strong>Nota:</strong> Este es un sistema de demostración. Para uso en producción, se recomienda utilizar servicios
                de hosting con planes que no incluyan pausas automáticas.
              </p>
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
              <p>© 2025 ECOLINK. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

