"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Form } from "react-bootstrap"
import { type Cliente, type ColumnasFiltrables, columnasFiltrables, type ClienteTableProps } from "../types"
import { fetchCategorias } from "../services/api/clientes"

// Funciones de conversión de fechas
const formatDateToBackend = (date: string): string => {
  if (!date) return ""
  const [year, month, day] = date.split("-")
  return `${day}/${month}/${year}`
}

const formatDateFromBackend = (date: string): string => {
  if (!date) return ""
  const [day, month, year] = date.split("/")
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
}

interface ExtendedClienteTableProps extends ClienteTableProps {
  onEditarCliente: (cliente: Cliente) => void
  handleFiltroFechaChange: (
    columna: "fechaDeuda" | "ultimaRecoleccion" | "contratacion",
    valor: { desde: string; hasta: string },
    checked: boolean,
  ) => void
  canCreateEdit: boolean
}

// Mover esta línea ANTES de la función del componente
const columnasDeFecha: (keyof Cliente)[] = ["fechaDeuda", "ultimaRecoleccion", "contratacion"]

export default function ClienteTable({
  clientes,
  onEditarCliente,
  filtros,
  handleFiltroChange,
  handleFiltroFechaChange,
  getUniqueValues,
  canCreateEdit,
}: ExtendedClienteTableProps) {
  console.log("Clientes recibidos:", {
    clientesLength: clientes.length,
    filtros,
    hasHandleFiltroFechaChange: !!handleFiltroFechaChange,
  })

  const columnas: (keyof Cliente)[] = [
    "nombre",              // <- sticky
    "estadoTurno",         // <- sticky
    "prioridad",
    "zona",
    "barrio",
    "direccion",
    "detalleDireccion",
    "telefono",
    "semana",
    "tipoCliente",
    "observaciones",
    "horario",
    "debe",
    "fechaDeuda",
    "ultimaRecoleccion",
    "precio",
    "estado",
    "gestionComercial",
    "contratacion",
  
    "CUIT",
    "condicion",
    "factura",
    "pago",
    "origenFacturacion",
    "nombreEmpresa",
    "emailAdministracion",
    "emailComercial",
    "rubro",
    "categoria",
  ]

  const [filtroAbierto, setFiltroAbierto] = useState<keyof Cliente | null>(null)
  const [filtrosTemporales, setFiltrosTemporales] = useState<Record<ColumnasFiltrables, Set<string>>>(() =>
    columnasFiltrables.reduce(
      (acc: Record<ColumnasFiltrables, Set<string>>, col: ColumnasFiltrables) => {
        acc[col] = new Set((filtros[col] as Set<string>) || [])
        return acc
      },
      {} as Record<ColumnasFiltrables, Set<string>>,
    ),
  )

  // Estado separado para filtros de fecha aplicados
  const [filtrosFechaAplicados, setFiltrosFechaAplicados] = useState<
    Record<keyof Cliente, { desde: string; hasta: string }>
  >(() =>
    columnasDeFecha.reduce(
      (acc, col) => {
        const filtroActual = filtros[col] as { desde: string; hasta: string } | undefined
        acc[col] = filtroActual || { desde: "", hasta: "" }
        return acc
      },
      {} as Record<keyof Cliente, { desde: string; hasta: string }>,
    ),
  )

  const [filtrosTemporalesFechas, setFiltrosTemporalesFechas] = useState<
    Record<keyof Cliente, { desde: string; hasta: string }>
  >(() =>
    columnasDeFecha.reduce(
      (acc, col) => {
        acc[col] = { desde: "", hasta: "" }
        return acc
      },
      {} as Record<keyof Cliente, { desde: string; hasta: string }>,
    ),
  )

  const [showEmpresaColumns, setShowEmpresaColumns] = useState(false)

  const [categoriaColores, setCategoriaColores] = useState<Record<ColumnasFiltrables, Record<string, string | null>>>(
    () =>
      columnasFiltrables.reduce(
        (acc, col) => {
          acc[col] = {}
          return acc
        },
        {} as Record<ColumnasFiltrables, Record<string, string | null>>,
      ),
  )
  const filtroRef = useRef<HTMLDivElement | null>(null)
  const tableWrapperRef = useRef<HTMLDivElement | null>(null)
  
  // Estados para el desplazamiento horizontal con clic derecho
  const [isRightClickDragging, setIsRightClickDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartScrollLeft, setDragStartScrollLeft] = useState(0)

  // Calcular altura mínima para la tabla
  const calcularAlturaMinima = () => {
    const alturaHeader = 60 // Altura aproximada del header
    const alturaFila = 45 // Altura aproximada de cada fila
    const alturaFiltro = 400 // Altura máxima del dropdown de filtros + margen
    const filasMinimas = Math.max(8, Math.ceil(alturaFiltro / alturaFila)) // Mínimo 8 filas o las necesarias para los filtros
    return alturaHeader + filasMinimas * alturaFila
  }

  // Efecto para sincronizar filtros aplicados con los filtros del padre
  useEffect(() => {
    setFiltrosFechaAplicados((prev) => {
      const newState = { ...prev }
      columnasDeFecha.forEach((col) => {
        const filtroActual = filtros[col] as { desde: string; hasta: string } | undefined
        newState[col] = filtroActual || { desde: "", hasta: "" }
      })
      return newState
    })
  }, [filtros])

  // Cargar colores de categorías
  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const promises = columnasFiltrables.map(async (campo) => {
          const categorias = await fetchCategorias(campo)
          console.log(`Categorías cargadas para ${campo}:`, categorias)
          const colorMap = categorias.reduce(
            (acc, cat) => {
              acc[cat.valor] = cat.color
              return acc
            },
            {} as Record<string, string | null>,
          )
          return { campo, colorMap }
        })

        const resultados = await Promise.all(promises)
        setCategoriaColores((prev) => {
          const newColores = { ...prev }
          resultados.forEach(({ campo, colorMap }) => {
            newColores[campo] = colorMap
            console.log(`Colores para ${campo}:`, colorMap)
          })
          return newColores
        })
      } catch (error) {
        console.error("Error al cargar colores de categorías:", error)
      }
    }
    loadCategorias()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filtroRef.current && !filtroRef.current.contains(event.target as Node)) {
        setFiltroAbierto(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handlers para desplazamiento horizontal con clic derecho
  const handleRightMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 2 && tableWrapperRef.current) {
      e.preventDefault() // Prevenir el menú contextual
      setIsRightClickDragging(true)
      setDragStartX(e.clientX)
      setDragStartScrollLeft(tableWrapperRef.current.scrollLeft)
      // Cambiar el cursor para indicar que se puede arrastrar
      if (tableWrapperRef.current) {
        tableWrapperRef.current.style.cursor = "grabbing"
        tableWrapperRef.current.style.userSelect = "none"
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isRightClickDragging && tableWrapperRef.current) {
      e.preventDefault()
      const x = e.clientX
      const walk = (x - dragStartX) * 1.5 // Factor de velocidad del desplazamiento
      tableWrapperRef.current.scrollLeft = dragStartScrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    if (isRightClickDragging) {
      setIsRightClickDragging(false)
      if (tableWrapperRef.current) {
        tableWrapperRef.current.style.cursor = "default"
        tableWrapperRef.current.style.userSelect = "auto"
      }
    }
  }

  // Efecto para manejar el mousemove y mouseup globales (por si el usuario arrastra fuera del componente)
  useEffect(() => {
    if (isRightClickDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        if (tableWrapperRef.current) {
          e.preventDefault()
          const x = e.clientX
          const walk = (x - dragStartX) * 1.5 // Factor de velocidad del desplazamiento
          tableWrapperRef.current.scrollLeft = dragStartScrollLeft - walk
        }
      }

      const handleGlobalMouseUp = () => {
        setIsRightClickDragging(false)
        if (tableWrapperRef.current) {
          tableWrapperRef.current.style.cursor = "default"
          tableWrapperRef.current.style.userSelect = "auto"
        }
      }

      const handleContextMenu = (e: Event) => {
        e.preventDefault() // Prevenir menú contextual durante el arrastre
      }

      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
      document.addEventListener("contextmenu", handleContextMenu)
      
      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove)
        document.removeEventListener("mouseup", handleGlobalMouseUp)
        document.removeEventListener("contextmenu", handleContextMenu)
      }
    }
  }, [isRightClickDragging, dragStartX, dragStartScrollLeft])

  const sortedClientes = [...clientes].sort((a, b) => {
    const estadoA = a.estado?.toUpperCase()
    const estadoB = b.estado?.toUpperCase()
    if (estadoA === "INACTIVO" && estadoB !== "INACTIVO") return 1
    if (estadoA !== "INACTIVO" && estadoB === "INACTIVO") return -1
    if (estadoA === "BAJA" && estadoB !== "BAJA") return 1
    if (estadoA !== "BAJA" && estadoB === "BAJA") return -1
    return 0
  })

  const toggleFiltro = (columna: keyof Cliente) => {
    setFiltroAbierto(filtroAbierto === columna ? null : columna)
    if (filtroAbierto !== columna && columnasFiltrables.includes(columna as ColumnasFiltrables)) {
      setFiltrosTemporales((prev) => ({
        ...prev,
        [columna]: new Set((filtros[columna as ColumnasFiltrables] as Set<string>) || []),
      }))
    }
    if (filtroAbierto !== columna && columnasDeFecha.includes(columna)) {
      const filtroAplicado = filtrosFechaAplicados[columna]
      setFiltrosTemporalesFechas((prev) => ({
        ...prev,
        [columna]: {
          desde: filtroAplicado.desde ? formatDateFromBackend(filtroAplicado.desde) : "",
          hasta: filtroAplicado.hasta ? formatDateFromBackend(filtroAplicado.hasta) : "",
        },
      }))
    }
  }

  const handleFiltroTemporalChange = (
    columna: keyof Cliente,
    valor: string,
    checked: boolean,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.stopPropagation()
    if (columnasFiltrables.includes(columna as ColumnasFiltrables)) {
      setFiltrosTemporales((prev) => {
        const newSet = new Set(prev[columna as ColumnasFiltrables])
        if (checked) {
          newSet.add(valor)
        } else {
          newSet.delete(valor)
        }
        return { ...prev, [columna]: newSet }
      })
    }
  }

  const handleFiltroFechaChangeLocal = (columna: keyof Cliente, campo: "desde" | "hasta", valor: string) => {
    setFiltrosTemporalesFechas((prev) => ({
      ...prev,
      [columna]: { ...prev[columna], [campo]: valor },
    }))
  }

  const aplicarFiltros = (columna: keyof Cliente) => {
    if (columnasFiltrables.includes(columna as ColumnasFiltrables)) {
      filtrosTemporales[columna as ColumnasFiltrables].forEach((valor) => {
        if (!(filtros[columna as ColumnasFiltrables] as Set<string> | undefined)?.has(valor)) {
          handleFiltroChange(columna, valor, true)
        }
      })
      ;(filtros[columna as ColumnasFiltrables] as Set<string> | undefined)?.forEach((valor) => {
        if (!filtrosTemporales[columna as ColumnasFiltrables].has(valor)) {
          handleFiltroChange(columna, valor, false)
        }
      })
      setFiltroAbierto(null)
    }
  }

  const aplicarFiltrosFecha = (columna: keyof Cliente) => {
    if (columnasDeFecha.includes(columna)) {
      const { desde, hasta } = filtrosTemporalesFechas[columna]
      const formattedFilter = {
        desde: desde ? formatDateToBackend(desde).trim() : "",
        hasta: hasta ? formatDateToBackend(hasta).trim() : "",
      }
      console.log(`Aplicando filtro de fecha para ${columna}:`, {
        input: { desde, hasta },
        formatted: formattedFilter,
      })
      setFiltrosFechaAplicados((prev) => ({
        ...prev,
        [columna]: formattedFilter,
      }))
      handleFiltroFechaChange(
        columna as "fechaDeuda" | "ultimaRecoleccion" | "contratacion",
        formattedFilter,
        !!(desde || hasta),
      )
      setFiltroAbierto(null)
    }
  }

  const limpiarYFiltros = (columna: keyof Cliente) => {
    if (columnasFiltrables.includes(columna as ColumnasFiltrables)) {
      setFiltrosTemporales((prev) => ({
        ...prev,
        [columna]: new Set(),
      }))
      ;(filtros[columna as ColumnasFiltrables] as Set<string> | undefined)?.forEach((valor) => {
        handleFiltroChange(columna, valor, false)
      })
      setFiltroAbierto(null)
    }
  }

  const limpiarFiltrosFecha = (columna: keyof Cliente) => {
    if (columnasDeFecha.includes(columna)) {
      console.log(`Limpiando filtro de ${columna}`)
      setFiltrosTemporalesFechas((prev) => ({
        ...prev,
        [columna]: { desde: "", hasta: "" },
      }))
      setFiltrosFechaAplicados((prev) => ({
        ...prev,
        [columna]: { desde: "", hasta: "" },
      }))
      handleFiltroFechaChange(
        columna as "fechaDeuda" | "ultimaRecoleccion" | "contratacion",
        { desde: "", hasta: "" },
        false,
      )
      setFiltroAbierto(null)
    }
  }

  const getCellStyle = (columna: keyof Cliente, valor: unknown) => {
    if (!columnasFiltrables.includes(columna as ColumnasFiltrables)) {
      return {}
    }
    const color = categoriaColores[columna as ColumnasFiltrables]?.[String(valor)]
    if (!color) {
      return {}
    }
    return {
      backgroundColor: color,
      color: getContrastColor(color),
      fontWeight: "500" as const,
      borderRadius: "4px",
      padding: "4px 8px",
      margin: "2px 0",
    }
  }

  const getContrastColor = (hexColor: string): string => {
    if (!hexColor || hexColor === "transparent") return "inherit"
    const hex = hexColor.replace("#", "")
    const r = Number.parseInt(hex.substr(0, 2), 16)
    const g = Number.parseInt(hex.substr(2, 2), 16)
    const b = Number.parseInt(hex.substr(4, 2), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5 ? "#000000" : "#ffffff"
  }

  const getDiasTranscurridos = (fechaString: string): number => {
    if (!fechaString) return 0
    try {
      const [dia, mes, año] = fechaString.split("/").map(Number)
      if (!dia || !mes || !año || isNaN(dia) || isNaN(mes) || isNaN(año)) {
        throw new Error("Formato de fecha inválido")
      }
      const fechaRecoleccion = new Date(año, mes - 1, dia)
      const hoy = new Date()
      if (isNaN(fechaRecoleccion.getTime())) {
        throw new Error("Fecha inválida")
      }
      fechaRecoleccion.setHours(0, 0, 0, 0)
      hoy.setHours(0, 0, 0, 0)
      const diferenciaTiempo = hoy.getTime() - fechaRecoleccion.getTime()
      const diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 3600 * 24))
      console.log(`Fecha: ${fechaString}, Días transcurridos: ${diferenciaDias}`)
      return diferenciaDias
    } catch (error) {
      console.error(`Error calculando días para fecha: ${fechaString}`, error)
      return 0
    }
  }

  const getDateCellStyle = (columna: keyof Cliente, valor: unknown) => {
    if (columna === "ultimaRecoleccion" && valor) {
      const diasTranscurridos = getDiasTranscurridos(String(valor))
      if (diasTranscurridos >= 90) {
        return {
          backgroundColor: "#D01212",
          color: "#ffffff",
          fontWeight: "500",
          borderRadius: "4px",
          padding: "4px 8px",
          margin: "2px 0",
          border: "1px solid #A00000",
        }
      }
    }
    return {}
  }

  const displayedColumns = showEmpresaColumns ? columnas : columnas.slice(0, 18)

  return (
    <div style={{ maxWidth: "2000px", overflowX: "auto" }}>
      <style jsx>{`
         /* === Sticky para NOMBRE === */
          .sticky-col-nombre {
            position: sticky;
            left: 0;
            background: var(--card-background);
            z-index: 1;
            border-right: 1px solid var(--border-color);
            min-width: 150px;
          }
          .sticky-header-nombre {
            position: sticky !important;
            left: 0 !important;
            background: var(--primary-green) !important;
            color: white !important;
            z-index: 2 !important;
            border-right: 1px solid var(--border-color) !important;
            min-width: 150px;
          }

          /* === Sticky para ESTADO TURNO, al lado === */
          .sticky-col-estadoTurno {
            position: sticky;
            left: 150px;
            background: var(--card-background);
            z-index: 1;
            border-right: 1px solid var(--border-color);
            min-width: 150px;
          }
          .sticky-header-estadoTurno {
            position: sticky !important;
            left: 150px !important;
            background: var(--primary-green) !important;
            color: white !important;
            z-index: 2 !important;
            border-right: 1px solid var(--border-color) !important;
            min-width: 150px;
          }
            .sticky-actions-header {
            position: sticky !important;
            right: 0 !important;
            background: var(--primary-green) !important;
            color: white !important;
            z-index: 2 !important;
            border-left: 1px solid var(--border-color) !important;
            min-width: 120px;   /* asegurate que coincida con sticky-actions */
            text-align: center;
          }
        .switch-container {
          position: sticky;
          left: 0;
          display: flex;
          justify-content: flex-start;
          margin-bottom: 10px;
          margin-left: 10px;
          z-index: 3;
          background: var(--card-background);
          width: 250px;
          padding: 10px;
          border-radius: var(--radius);
          border: 1px solid var(--border-color);
        }
        .table-container {
          min-height: ${calcularAlturaMinima()}px;
          position: relative;
        }
        .table-custom {
          background-color: var(--card-background);
          border: 1px solid var(--border-color);
          table-layout: auto;
          width: 100%;
        }
        .table-custom thead th {
          background-color: var(--primary-green);
          color: white;
          border-color: var(--border-color);
          font-weight: 600;
          position: relative;
          padding: 8px 12px;
          white-space: nowrap !important;
          overflow: visible !important;
          text-overflow: unset !important;
          vertical-align: middle;
          min-width: fit-content;
        }
        .table-custom tbody tr:hover {
          background-color: var(--muted);
        }
        .table-custom tbody td {
          border-color: var(--border-color);
          color: var(--foreground);
          padding: 6px 8px;
          vertical-align: top;
        }
        .dropdown-menu-custom {
          background-color: var(--card-background);
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }
        .form-control-custom {
          border: 1px solid var(--border-color);
          background-color: var(--card-background);
          color: var(--foreground);
        }
        .form-control-custom:focus {
          border-color: var(--primary-green);
          box-shadow: 0 0 0 0.2rem rgba(122, 201, 67, 0.25);
        }
        .switch-container label {
          white-space: nowrap;
        }
        .table-responsive-wrapper {
          min-height: ${calcularAlturaMinima()}px;
          position: relative;
          overflow-x: auto;
          overflow-y: visible;
          cursor: grab;
        }
        .table-responsive-wrapper:active {
          cursor: grabbing;
        }
        .colored-cell {
          display: inline-block;
          white-space: nowrap !important;
        }
        .col-nombre {
          min-width: 150px;
          width: auto;
        }
        .col-zona {
          min-width: 80px;
          width: auto;
        }
        .col-barrio {
          min-width: 120px;
          width: auto;
        }
        .col-direccion {
          min-width: 120px;
          width: auto;
        }
        .col-detalleDireccion {
          min-width: 180px;
          width: auto;
        }
        .col-telefono {
          min-width: 130px;
          width: auto;
        }
        .col-semana {
          min-width: 90px;
          width: auto;
        }
        .col-horario {
          min-width: 90px;
          width: auto;
        }
        .col-observaciones {
          min-width: 150px;
          width: auto;
        }
        .col-tipoCliente {
          min-width: 120px;
          width: auto;
        }
        .col-debe {
          min-width: 80px;
          width: auto;
        }
        .col-fechaDeuda {
          min-width: 120px;
          width: auto;
        }
        .col-precio {
          min-width: 90px;
          width: auto;
        }
        .col-ultimaRecoleccion {
          min-width: 140px;
          width: auto;
        }
        .col-contratacion {
          min-width: 140px;
          width: auto;
        }
        .col-estadoTurno {
          min-width: 140px;
          width: auto;
        }
        .col-prioridad {
          min-width: 120px;
          width: auto;
        }
        .col-estado {
          min-width: 100px;
          width: auto;
        }
        .col-gestionComercial {
          min-width: 160px;
          width: auto;
        }
        .header-with-filter {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          position: relative;
          white-space: nowrap !important;
        }
        .header-text {
          flex: 1;
          margin-right: 8px;
          white-space: nowrap !important;
          overflow: visible !important;
          text-overflow: unset !important;
        }
        .filter-icon {
          flex-shrink: 0;
          cursor: pointer;
          padding: 2px;
          border-radius: 2px;
          transition: background-color 0.2s;
        }
        .filter-icon:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .cell-content {
          white-space: normal;
          word-wrap: break-word;
          word-break: break-word;
          line-height: 1.4;
          padding: 4px 0;
        }
        .cell-content .colored-cell {
          white-space: nowrap !important;
          display: inline-block;
        }
      `}</style>
      <div className="switch-container">
        <Form.Check
          type="switch"
          id="empresa-switch"
          label="Mostrar datos de empresa"
          checked={showEmpresaColumns}
          onChange={() => setShowEmpresaColumns(!showEmpresaColumns)}
          aria-label={showEmpresaColumns ? "Ocultar datos de empresa" : "Mostrar datos de empresa"}
          style={{ color: "var(--foreground)", whiteSpace: "nowrap" }}
        />
      </div>

      <div 
        className="table-responsive-wrapper"
        ref={tableWrapperRef}
        onMouseDown={handleRightMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onContextMenu={(e) => {
          // Prevenir el menú contextual para permitir el desplazamiento con clic derecho
          e.preventDefault()
        }}
      >
        <table className="table table-striped table-bordered mt-4 table-sm table-custom">
          <thead>
            <tr>
              {displayedColumns.map((columna) => (
                <th
                key={columna}
                className={
                  columna === "nombre"
                    ? "sticky-header-nombre col-nombre"
                    : columna === "estadoTurno"
                    ? "sticky-header-estadoTurno col-estadoTurno"
                    : `col-${columna}`}
                >
                  <div className="header-with-filter">
                    <span className="header-text small">
                      {String(columna)
                        .charAt(0)
                        .toUpperCase() +
                        String(columna)
                          .slice(1)
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
                    </span>
                    {(columnasFiltrables.includes(columna as ColumnasFiltrables) ||
                      columnasDeFecha.includes(columna)) && (
                      <span className="filter-icon" onClick={() => toggleFiltro(columna)}>
                        <i
                          className={
                            columnasDeFecha.includes(columna)
                              ? (filtros[columna] as { desde: string; hasta: string } | undefined)?.desde ||
                                (filtros[columna] as { desde: string; hasta: string } | undefined)?.hasta
                                ? "bi bi-funnel-fill"
                                : "bi bi-funnel"
                              : (filtros[columna as ColumnasFiltrables] as Set<string> | undefined) &&
                                  (filtros[columna as ColumnasFiltrables] as Set<string>)!.size > 0
                                ? "bi bi-funnel-fill"
                                : "bi bi-funnel"
                          }
                          style={{
                            color:
                              (columnasDeFecha.includes(columna) &&
                                ((filtros[columna] as { desde: string; hasta: string } | undefined)?.desde ||
                                  (filtros[columna] as { desde: string; hasta: string } | undefined)?.hasta)) ||
                              ((filtros[columna as ColumnasFiltrables] as Set<string> | undefined) &&
                                (filtros[columna as ColumnasFiltrables] as Set<string>)!.size > 0)
                                ? "var(--accent-magenta)"
                                : "white",
                            fontSize: "12px",
                          }}
                        ></i>
                        {filtroAbierto === columna && (
                          <div
                            ref={filtroRef}
                            className="dropdown-menu show p-3 dropdown-menu-custom"
                            style={{
                              minWidth: "250px",
                              maxHeight: "350px",
                              overflowY: "auto",
                              position: "absolute",
                              top: "100%",
                              right: "0",
                              left: "auto",
                              zIndex: 1000,
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {columnasDeFecha.includes(columna) ? (
                              <div>
                                <div className="form-group mb-3">
                                  <label className="small fw-bold mb-2" style={{ color: "var(--foreground)" }}>
                                    Desde
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control form-control-sm form-control-custom"
                                    value={filtrosTemporalesFechas[columna].desde}
                                    onChange={(e) => handleFiltroFechaChangeLocal(columna, "desde", e.target.value)}
                                  />
                                </div>
                                <div className="form-group mb-3">
                                  <label className="small fw-bold mb-2" style={{ color: "var(--foreground)" }}>
                                    Hasta
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control form-control-sm form-control-custom"
                                    value={filtrosTemporalesFechas[columna].hasta}
                                    onChange={(e) => handleFiltroFechaChangeLocal(columna, "hasta", e.target.value)}
                                  />
                                </div>
                                <div className="d-flex gap-2 mt-3">
                                  <button
                                    className="btn btn-sm w-50"
                                    style={{
                                      backgroundColor: "var(--primary-green)",
                                      color: "white",
                                      border: "none",
                                    }}
                                    onClick={() => aplicarFiltrosFecha(columna)}
                                  >
                                    <i className="bi bi-check-circle me-1"></i>
                                    Aplicar
                                  </button>
                                  <button
                                    className="btn btn-sm w-50"
                                    style={{
                                      backgroundColor: "var(--secondary-text)",
                                      color: "white",
                                      border: "none",
                                    }}
                                    onClick={() => limpiarFiltrosFecha(columna)}
                                  >
                                    <i className="bi bi-x-circle me-1"></i>
                                    Limpiar
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                                  {getUniqueValues(columna).map((valor) => (
                                    <div key={valor} className="form-check mb-2">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`${columna}-${valor}`}
                                        checked={filtrosTemporales[columna as ColumnasFiltrables]?.has(valor) || false}
                                        onChange={(e) =>
                                          handleFiltroTemporalChange(columna, valor, e.target.checked, e)
                                        }
                                        style={{ accentColor: "var(--primary-green)" }}
                                      />
                                      <label
                                        className="form-check-label small"
                                        htmlFor={`${columna}-${valor}`}
                                        style={{ color: "var(--foreground)" }}
                                      >
                                        {valor}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                                <div
                                  className="d-flex gap-2 mt-3 pt-2 border-top"
                                  style={{ borderColor: "var(--border-color)" }}
                                >
                                  <button
                                    className="btn btn-sm w-50"
                                    style={{
                                      backgroundColor: "var(--primary-green)",
                                      color: "white",
                                      border: "none",
                                    }}
                                    onClick={() => aplicarFiltros(columna)}
                                  >
                                    <i className="bi bi-check-circle me-1"></i>
                                    Aplicar
                                  </button>
                                  <button
                                    className="btn btn-sm w-50"
                                    style={{
                                      backgroundColor: "var(--secondary-text)",
                                      color: "white",
                                      border: "none",
                                    }}
                                    onClick={() => limpiarYFiltros(columna)}
                                  >
                                    <i className="bi bi-x-circle me-1"></i>
                                    Limpiar
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="sticky-actions-header small">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(sortedClientes || []).map((cliente) => (
              <tr key={cliente.id}>
                {displayedColumns.map((columna) => {
                  const esColumnaGestionable = columnasFiltrables.includes(columna as ColumnasFiltrables)
                  const valor = cliente[columna]

                  return (
                    <td
                      key={columna}
                      className={
                        columna === "nombre"
                          ? "sticky-col-nombre fw-bold col-nombre"
                          : columna === "estadoTurno"
                          ? "sticky-col-estadoTurno fw-bold col-estadoTurno"
                          : `col-${columna} small`
                      }
                      title={String(valor || "")}
                    >
                      <div className="cell-content">
                        {columna === "nuevo" ? (
                          valor ? (
                            <span style={{ color: "var(--primary-green)" }}>✓ Sí</span>
                          ) : (
                            <span style={{ color: "var(--secondary-text)" }}>✗ No</span>
                          )
                        ) : valor === null || valor === undefined ? (
                          <span style={{ color: "var(--secondary-text)" }}>-</span>
                        ) : (
                          <span
                            className={esColumnaGestionable ? "colored-cell" : ""}
                            style={{
                              ...getCellStyle(columna, valor),
                              ...getDateCellStyle(columna, valor),
                            }}
                          >
                            {valor}
                          </span>
                        )}
                      </div>
                    </td>
                  )
                })}
                <td className="sticky-actions">
                  {canCreateEdit ? (
                    <button
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "var(--accent-magenta)",
                        color: "white",
                        border: "none",
                      }}
                      onClick={() => onEditarCliente(cliente)}
                      aria-label={`Editar cliente ${cliente.nombre}`}
                    >
                      <i className="bi bi-pencil-square me-1"></i>
                      Editar
                    </button>
                  ) : (
                    <span className="text-muted small">
                      <i className="bi bi-eye me-1"></i>
                      Solo lectura
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}