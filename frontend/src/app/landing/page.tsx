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
  const [isTransitioning, setIsTransitioning] = useState(false)

  const currentVideo = videos[currentIndex]

  const goToPrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1))
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1))
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const goToVideo = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  return (
    <div className="video-carousel-container">
      {/* Header con título y controles */}
      <div className="carousel-header-modern">
        <div className="carousel-title-wrapper">
          <div className="carousel-badge-modern">
            <span className="badge-number">{currentIndex + 1}</span>
            <span className="badge-separator">/</span>
            <span className="badge-total">{videos.length}</span>
          </div>
          <div className="carousel-title-content">
            <div className="carousel-part-label">{currentVideo.part}</div>
            <h3 className="carousel-main-title-modern">{currentVideo.title}</h3>
          </div>
        </div>
        <div className="carousel-nav-buttons">
          <button
            className="carousel-nav-btn carousel-nav-prev"
            onClick={goToPrevious}
            aria-label="Video anterior"
            disabled={isTransitioning}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="carousel-nav-btn carousel-nav-next"
            onClick={goToNext}
            aria-label="Video siguiente"
            disabled={isTransitioning}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Contenedor del video con animación */}
      <div className={`video-carousel-wrapper-modern ${isTransitioning ? "transitioning" : ""}`}>
        <div className="video-embed-container-modern">
          <div className="video-overlay">
            <div className="video-play-icon">
              <i className="bi bi-play-circle-fill"></i>
            </div>
          </div>
          <iframe
            key={currentVideo.id}
            className="video-embed-iframe-modern"
            src={`https://www.youtube.com/embed/${currentVideo.id}?rel=0&autoplay=0`}
            title={currentVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Indicadores modernos */}
      <div className="carousel-indicators-modern">
        {videos.map((video, index) => (
          <button
            key={video.id}
            className={`carousel-indicator-modern ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToVideo(index)}
            aria-label={`Ir a ${video.title}`}
            title={video.title}
          >
            <span className="indicator-progress"></span>
            <span className="indicator-number">{index + 1}</span>
          </button>
        ))}
      </div>

      {/* Grid de thumbnails moderno */}
      <div className="carousel-thumbnails-modern">
        {videos.map((video, index) => (
          <button
            key={video.id}
            className={`thumbnail-item-modern ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToVideo(index)}
          >
            <div className="thumbnail-header">
              <div className="thumbnail-number-modern">
                <span>{index + 1}</span>
              </div>
              {index === currentIndex && (
                <div className="thumbnail-active-badge">
                  <i className="bi bi-play-fill"></i>
                </div>
              )}
            </div>
            <div className="thumbnail-content">
              <div className="thumbnail-part-modern">{video.part}</div>
              <div className="thumbnail-title-modern">{video.title}</div>
            </div>
            <div className="thumbnail-hover-effect"></div>
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
                  <div className="stat-value">+ U$D 20.000</div>
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
              
              {/* Cards de Valor Agregado */}
              <div className="valor-agregado-section">
                <h3 className="valor-agregado-title">
                  <i className="bi bi-star-fill me-2"></i>
                  Valor Agregado que Transforma tu Negocio
                </h3>
                <div className="valor-agregado-grid">
                  <div className="valor-card glass-card">
                    <div className="valor-icon">
                      <i className="bi bi-database-check"></i>
                    </div>
                    <h4>Base de Datos Unificada</h4>
                    <p>
                      Elimina la dispersión de información. Toda la data de tus clientes en un solo lugar seguro y accesible, 
                      sin duplicados ni inconsistencias. Una única fuente de verdad para toda tu operación.
                    </p>
                    <div className="valor-benefit">
                      <i className="bi bi-check-circle-fill"></i>
                      <span>100% de información centralizada</span>
                    </div>
                  </div>

                  <div className="valor-card glass-card">
                    <div className="valor-icon">
                      <i className="bi bi-folder-check"></i>
                    </div>
                    <h4>Organización Profesional</h4>
                    <p>
                      Estructura tus datos con categorías personalizables, filtros avanzados y búsquedas instantáneas. 
                      Encuentra cualquier cliente en segundos, no en horas.
                    </p>
                    <div className="valor-benefit">
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Búsqueda instantánea en toda la base</span>
                    </div>
                  </div>

                  <div className="valor-card glass-card">
                    <div className="valor-icon">
                      <i className="bi bi-shield-check"></i>
                    </div>
                    <h4>Seguridad y Confiabilidad</h4>
                    <p>
                      Protege la información sensible de tus clientes con autenticación robusta, roles de acceso granulares 
                      y respaldos automáticos. Cumple con estándares de seguridad empresarial.
                    </p>
                    <div className="valor-benefit">
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Control de acceso por roles y permisos</span>
                    </div>
                  </div>

                  <div className="valor-card glass-card">
                    <div className="valor-icon">
                      <i className="bi bi-globe"></i>
                    </div>
                    <h4>Acceso desde Cualquier Lugar</h4>
                    <p>
                      Tu equipo puede trabajar desde la oficina, en campo o desde casa. Acceso 24/7 desde cualquier dispositivo 
                      con conexión a internet. Sin instalaciones complicadas.
                    </p>
                    <div className="valor-benefit">
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Plataforma web responsive y multiplataforma</span>
                    </div>
                  </div>

                  <div className="valor-card glass-card">
                    <div className="valor-icon">
                      <i className="bi bi-arrow-up-circle"></i>
                    </div>
                    <h4>Escalabilidad Garantizada</h4>
                    <p>
                      Crece sin límites. El sistema maneja desde 10 hasta 10,000+ clientes sin perder rendimiento. 
                      Arquitectura moderna preparada para el crecimiento de tu empresa.
                    </p>
                    <div className="valor-benefit">
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Infraestructura preparada para crecer</span>
                    </div>
                  </div>

                  <div className="valor-card glass-card">
                    <div className="valor-icon">
                      <i className="bi bi-graph-up"></i>
                    </div>
                    <h4>Decisiones Basadas en Datos</h4>
                    <p>
                      Visualiza el estado real de tu negocio: deudas pendientes, clientes activos, zonas más rentables. 
                      Toma decisiones estratégicas con información precisa y actualizada en tiempo real.
                    </p>
                    <div className="valor-benefit">
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Reportes y métricas en tiempo real</span>
                    </div>
                  </div>

                  <div className="valor-card glass-card">
                    <div className="valor-icon">
                      <i className="bi bi-people"></i>
                    </div>
                    <h4>Colaboración en Equipo</h4>
                    <p>
                      Múltiples usuarios trabajando simultáneamente sin conflictos. Sistema de roles que permite que cada 
                      miembro del equipo acceda solo a lo que necesita, manteniendo la seguridad.
                    </p>
                    <div className="valor-benefit">
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Trabajo colaborativo sin interferencias</span>
                    </div>
                  </div>

                  <div className="valor-card glass-card">
                    <div className="valor-icon">
                      <i className="bi bi-lightning-charge"></i>
                    </div>
                    <h4>Automatización Inteligente</h4>
                    <p>
                      Reduce tareas repetitivas al mínimo. Actualización masiva de precios, gestión de categorías, 
                      seguimiento automático de estados. Tu equipo se enfoca en lo que realmente importa.
                    </p>
                    <div className="valor-benefit">
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Operaciones masivas en un solo clic</span>
                    </div>
                  </div>

                  <div className="valor-card glass-card">
                    <div className="valor-icon">
                      <i className="bi bi-award"></i>
                    </div>
                    <h4>Imagen Profesional</h4>
                    <p>
                      Proyecta seriedad y modernidad. Un sistema profesional mejora la percepción de tu empresa ante clientes 
                      y socios comerciales. Tecnología que refleja el nivel de tu servicio.
                    </p>
                    <div className="valor-benefit">
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Interfaz moderna y profesional</span>
                    </div>
                  </div>
                </div>
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

      {/* Futuras Mejoras Section */}
      <section id="futuras-mejoras" className="section-futuras-mejoras">
        <div className="container-custom">
          <div className="glass-card content-card">
            <h2 className="section-title">
              <i className="bi bi-lightbulb-fill me-3"></i>
              Proyecciones y Futuras Mejoras
            </h2>
            <div className="mejoras-intro">
              <p>
                ECOLINK está diseñado con una arquitectura escalable que permite su evolución continua. 
                A continuación, se detallan las funcionalidades que actualmente no están incluidas en el 
                alcance inicial del proyecto, pero que están contempladas para futuras versiones:
              </p>
            </div>
            <div className="mejoras-grid">
              <div className="mejora-card glass-card">
                <div className="mejora-icon">
                  <i className="bi bi-people"></i>
                </div>
                <h3>Gestión Interna de Empleados</h3>
                <p>
                  Sistema completo para la gestión de recursos humanos de la empresa, incluyendo 
                  contratos, horarios, asistencia, nóminas y evaluación de desempeño.
                </p>
                <div className="mejora-status">
                  <span className="status-badge">Futura Versión</span>
                </div>
              </div>

              <div className="mejora-card glass-card">
                <div className="mejora-icon">
                  <i className="bi bi-bell-fill"></i>
                </div>
                <h3>Notificaciones Automáticas</h3>
                <p>
                  Sistema de alertas y notificaciones automáticas sobre el estado del sistema, 
                  servicios y eventos importantes mediante correo electrónico, WhatsApp u otros canales de comunicación.
                </p>
                <div className="mejora-status">
                  <span className="status-badge">Futura Versión</span>
                </div>
              </div>

              <div className="mejora-card glass-card">
                <div className="mejora-icon">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <h3>Cálculo de Costos Logísticos</h3>
                <p>
                  Herramienta avanzada para el cálculo y optimización de costos logísticos de 
                  recorridos y rutas de recolección, incluyendo análisis de eficiencia y planificación de rutas.
                </p>
                <div className="mejora-status">
                  <span className="status-badge">Futura Versión</span>
                </div>
              </div>

              <div className="mejora-card glass-card">
                <div className="mejora-icon">
                  <i className="bi bi-plus-circle-fill"></i>
                </div>
                <h3>Nuevas Funcionalidades</h3>
                <p>
                  Incorporación de funcionalidades adicionales no previstas en los objetivos iniciales 
                  del proyecto, adaptadas a las necesidades específicas de cada cliente.
                </p>
                <div className="mejora-status">
                  <span className="status-badge">Futura Versión</span>
                </div>
              </div>

              <div className="mejora-card glass-card">
                <div className="mejora-icon">
                  <i className="bi bi-phone"></i>
                </div>
                <h3>Compatibilidad Móvil Nativa</h3>
                <p>
                  Desarrollo de aplicaciones móviles nativas para tablets y smartphones (iOS y Android) 
                  que permitan acceso completo al sistema desde dispositivos móviles con experiencia optimizada.
                </p>
                <div className="mejora-status">
                  <span className="status-badge">Futura Versión</span>
                </div>
              </div>
            </div>
            <div className="mejoras-note">
              <div className="note-icon">
                <i className="bi bi-info-circle-fill"></i>
              </div>
              <div className="note-content">
                <p>
                  <strong>Nota importante:</strong> Estas funcionalidades están planificadas para futuras 
                  versiones del sistema. La arquitectura actual de ECOLINK está diseñada para facilitar 
                  la incorporación de estas mejoras sin afectar el funcionamiento existente.
                </p>
                <p>
                  Si alguna de estas funcionalidades es prioritaria para su empresa, podemos discutir 
                  su implementación como parte de un plan de desarrollo personalizado.
                </p>
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
              <a href="#futuras-mejoras">Futuras Mejoras</a>
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

