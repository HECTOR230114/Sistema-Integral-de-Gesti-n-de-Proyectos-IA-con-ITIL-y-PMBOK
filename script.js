// ========================================
// SISTEMA INTEGRAL DE GESTIÓN IA
// ITIL & PMBOK - Todo en Español
// ========================================

// Variables Globales
let proyectos = [];
let incidentes = [];
let cambios = [];
let riesgos = [];
let metricasHistoricas = [];
let ventanasAbiertas = [];
let zIndexCounter = 100;

// ========================================
// DATOS PRECARGADOS EN ESPAÑOL
// ========================================

const DATOS_INICIALES = {
    proyectos: [
        {
            id: 1,
            nombre: "Sistema de Detección de Fraude Bancario con ML",
            cliente: "Banco Nacional del Perú",
            tipo: "Machine Learning Predictivo",
            estado: "En Progreso",
            progreso: 65,
            fechaInicio: "2024-03-15",
            fechaFin: "2024-12-20",
            presupuesto: 350000,
            gastado: 220000,
            equipo: ["Carlos Mendoza", "Ana García", "Luis Torres", "María Rodríguez"],
            tareas: 28,
            tareasCompletadas: 18
        },
        {
            id: 2,
            nombre: "Chatbot Inteligente para Atención al Cliente con NLP",
            cliente: "Telefónica Perú",
            tipo: "Procesamiento de Lenguaje Natural",
            estado: "En Progreso",
            progreso: 40,
            fechaInicio: "2024-05-10",
            fechaFin: "2025-02-28",
            presupuesto: 280000,
            gastado: 95000,
            equipo: ["Roberto Silva", "Patricia Gómez", "Diego Martínez"],
            tareas: 24,
            tareasCompletadas: 10
        },
        {
            id: 3,
            nombre: "Sistema de Reconocimiento Facial para Control de Acceso",
            cliente: "Ministerio del Interior",
            tipo: "Visión por Computadora",
            estado: "Completado",
            progreso: 100,
            fechaInicio: "2023-11-01",
            fechaFin: "2024-08-15",
            presupuesto: 420000,
            gastado: 405000,
            equipo: ["Sofía Ramírez", "Miguel Ángel Castro", "Laura Fernández", "Jorge Vega"],
            tareas: 32,
            tareasCompletadas: 32
        }
    ],
    
    incidentes: [
        {
            id: "INC-001",
            titulo: "Precisión del modelo cayó 8% después de deployment",
            descripcion: "El modelo de detección de fraude muestra una caída significativa en la precisión desde su despliegue en producción hace 3 días.",
            prioridad: "Alta",
            estado: "En Progreso",
            categoria: "Rendimiento",
            proyecto: "Sistema de Detección de Fraude Bancario con ML",
            asignado: "Ana García",
            fechaCreacion: "2024-11-18",
            tiempoEstimado: "4 horas"
        },
        {
            id: "INC-002",
            titulo: "Error de memoria en servidor GPU durante entrenamiento",
            descripcion: "OutOfMemoryError al intentar entrenar el modelo con batch_size=128. Sistema se detiene a mitad del proceso.",
            prioridad: "Crítica",
            estado: "Nuevo",
            categoria: "Infraestructura",
            proyecto: "Chatbot Inteligente para Atención al Cliente con NLP",
            asignado: "Luis Torres",
            fechaCreacion: "2024-11-19",
            tiempoEstimado: "2 horas"
        },
        {
            id: "INC-003",
            titulo: "API de predicciones responde con timeout",
            descripcion: "Las llamadas a la API de predicciones están tardando más de 5 segundos, excediendo el timeout configurado de 3 segundos.",
            prioridad: "Media",
            estado: "Resuelto",
            categoria: "Rendimiento",
            proyecto: "Sistema de Detección de Fraude Bancario con ML",
            asignado: "María Rodríguez",
            fechaCreacion: "2024-11-17",
            tiempoEstimado: "3 horas"
        },
        {
            id: "INC-004",
            titulo: "Dataset de producción contiene valores nulos no esperados",
            descripcion: "Se detectaron 1,245 registros con valores NULL en columnas críticas que deberían validarse en el pipeline de entrada.",
            prioridad: "Alta",
            estado: "En Progreso",
            categoria: "Datos",
            proyecto: "Chatbot Inteligente para Atención al Cliente con NLP",
            asignado: "Patricia Gómez",
            fechaCreacion: "2024-11-18",
            tiempoEstimado: "6 horas"
        },
        {
            id: "INC-005",
            titulo: "Modelo muestra sesgo en predicciones por género",
            descripcion: "Análisis de fairness revela que el modelo tiene un 12% más de falsos positivos para usuarios de género femenino.",
            prioridad: "Alta",
            estado: "Nuevo",
            categoria: "Precisión",
            proyecto: "Sistema de Detección de Fraude Bancario con ML",
            asignado: "Carlos Mendoza",
            fechaCreacion: "2024-11-19",
            tiempoEstimado: "8 horas"
        }
    ],
    
    metricas: {
        accuracy: 92.5,
        precision: 89.3,
        recall: 91.8,
        f1Score: 90.5,
        aucRoc: 0.95,
        loss: 0.12,
        tiempoInferencia: 85,
        usoMemoria: 1.8
    }
};

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    cargarDatosIniciales();
    inicializarReloj();
    inicializarEventos();
    mostrarNotificacion('Sistema iniciado correctamente', 'Bienvenido al Sistema de Gestión IA', 'exito');
    
    // Abrir dashboard ejecutivo por defecto
    setTimeout(() => abrirVentana('dashboard-ejecutivo'), 500);
});

function cargarDatosIniciales() {
    proyectos = DATOS_INICIALES.proyectos;
    incidentes = DATOS_INICIALES.incidentes;
    actualizarContadores();
}

function inicializarReloj() {
    function actualizarReloj() {
        const ahora = new Date();
        const opciones = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        document.getElementById('reloj').textContent = ahora.toLocaleDateString('es-PE', opciones);
    }
    actualizarReloj();
    setInterval(actualizarReloj, 1000);
}

function inicializarEventos() {
    // Búsqueda global Ctrl+K
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            abrirBusqueda();
        }
    });
}

function actualizarContadores() {
    document.getElementById('contadorProyectos').textContent = proyectos.filter(p => p.estado !== 'Completado').length;
    document.getElementById('contadorIncidentes').textContent = incidentes.filter(i => i.estado !== 'Resuelto' && i.estado !== 'Cerrado').length;
}

// ========================================
// GESTIÓN DE VENTANAS
// ========================================

function abrirVentana(tipo) {
    const ventanaExistente = document.querySelector(`[data-ventana="${tipo}"]`);
    if (ventanaExistente) {
        traerVentanaAlFrente(ventanaExistente);
        return;
    }
    
    const template = document.getElementById('template-ventana');
    const ventana = template.content.cloneNode(true).querySelector('.ventana');
    ventana.setAttribute('data-ventana', tipo);
    ventana.style.left = `${50 + ventanasAbiertas.length * 30}px`;
    ventana.style.top = `${50 + ventanasAbiertas.length * 30}px`;
    ventana.style.zIndex = ++zIndexCounter;
    
    const contenidoConfig = obtenerContenidoVentana(tipo);
    ventana.querySelector('.ventana-titulo').textContent = contenidoConfig.titulo;
    ventana.querySelector('.ventana-contenido').innerHTML = contenidoConfig.contenido;
    
    document.getElementById('areaTrabajo').appendChild(ventana);
    ventanasAbiertas.push(ventana);
    
    hacerVentanaArrastrable(ventana);
    
    if (contenidoConfig.onLoad) {
        contenidoConfig.onLoad();
    }
    
    mostrarNotificacion(`Ventana abierta: ${contenidoConfig.titulo}`, '', 'info');
}

function obtenerContenidoVentana(tipo) {
    const configs = {
        'dashboard-ejecutivo': {
            titulo: '📊 Dashboard Ejecutivo',
            contenido: generarDashboardEjecutivo(),
            onLoad: () => {
                crearGraficosEjecutivos();
            }
        },
        'dashboard-tecnico': {
            titulo: '🤖 Dashboard Técnico IA',
            contenido: generarDashboardTecnico(),
            onLoad: () => {
                crearGraficosTecnicos();
            }
        },
        'dashboard-itil': {
            titulo: '🎯 Dashboard ITIL',
            contenido: generarDashboardITIL(),
            onLoad: () => {
                crearGraficosITIL();
            }
        },
        'dashboard-financiero': {
            titulo: '💰 Dashboard Financiero',
            contenido: generarDashboardFinanciero(),
            onLoad: () => {
                crearGraficosFinancieros();
            }
        },
        'generador': {
            titulo: '⚡ Centro de Automatización',
            contenido: generarCentroAutomatizacion(),
            onLoad: null
        },
        'lista-proyectos': {
            titulo: '🚀 Lista de Proyectos',
            contenido: generarListaProyectos(),
            onLoad: null
        },
        'gantt': {
            titulo: '📅 Diagrama de Gantt',
            contenido: '<div class="grafico-contenedor"><canvas id="graficoGantt"></canvas></div>',
            onLoad: () => crearGraficoGantt()
        },
        'incidentes': {
            titulo: '🎯 Gestión de Incidentes ITIL',
            contenido: generarGestionIncidentes(),
            onLoad: null
        },
        'metricas-ia': {
            titulo: '📈 Métricas de Modelos IA',
            contenido: generarMetricasIA(),
            onLoad: () => crearGraficosMetricasIA()
        },
        'matriz-confusion': {
            titulo: '🎯 Matriz de Confusión',
            contenido: '<div class="grafico-contenedor"><canvas id="graficoMatrizConfusion"></canvas></div>',
            onLoad: () => crearMatrizConfusion()
        },
        'comparador': {
            titulo: '⚖️ Comparador de Modelos',
            contenido: generarComparadorModelos(),
            onLoad: () => crearGraficoComparacion()
        },
        'riesgos': {
            titulo: '⚠️ Gestión de Riesgos',
            contenido: generarGestionRiesgos(),
            onLoad: () => crearMatrizRiesgos()
        },
        'centro-graficos': {
            titulo: '📊 Centro de Gráficos',
            contenido: generarCentroGraficos(),
            onLoad: null
        },
        'calculadoras': {
            titulo: '🧮 Calculadoras IA',
            contenido: generarCalculadoras(),
            onLoad: null
        },
        'monitor-tiempo-real': {
            titulo: '⚡ Monitor en Tiempo Real',
            contenido: '<div class="grafico-contenedor"><canvas id="graficoTiempoReal"></canvas></div>',
            onLoad: () => iniciarMonitorTiempoReal()
        },
        'tutorial': {
            titulo: '📚 Tutorial Interactivo',
            contenido: generarTutorial(),
            onLoad: null
        },
        'glosario': {
            titulo: '📖 Glosario de Términos',
            contenido: generarGlosario(),
            onLoad: null
        }
    };
    
    return configs[tipo] || {titulo: 'Ventana', contenido: '<p>Contenido en desarrollo...</p>'};
}

function hacerVentanaArrastrable(ventana) {
    const header = ventana.querySelector('.ventana-header');
    let posX = 0, posY = 0, initialX = 0, initialY = 0;
    
    header.onmousedown = iniciarArrastre;
    
    function iniciarArrastre(e) {
        e.preventDefault();
        traerVentanaAlFrente(ventana);
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmousemove = arrastrar;
        document.onmouseup = detenerArrastre;
    }
    
    function arrastrar(e) {
        e.preventDefault();
        posX = initialX - e.clientX;
        posY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        ventana.style.top = (ventana.offsetTop - posY) + 'px';
        ventana.style.left = (ventana.offsetLeft - posX) + 'px';
    }
    
    function detenerArrastre() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function traerVentanaAlFrente(ventana) {
    ventana.style.zIndex = ++zIndexCounter;
    document.querySelectorAll('.ventana').forEach(v => v.classList.remove('activa'));
    ventana.classList.add('activa');
}

function cerrarVentana(btn) {
    const ventana = btn.closest('.ventana');
    ventana.style.animation = 'ventanaFadeOut 0.2s ease-out';
    setTimeout(() => {
        ventana.remove();
        ventanasAbiertas = ventanasAbiertas.filter(v => v !== ventana);
    }, 200);
}

function minimizarVentana(btn) {
    const ventana = btn.closest('.ventana');
    ventana.classList.add('minimizada');
}

function maximizarVentana(btn) {
    const ventana = btn.closest('.ventana');
    ventana.classList.toggle('maximizada');
}

// ========================================
// GENERADORES DE CONTENIDO
// ========================================

function generarDashboardEjecutivo() {
    return `
        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-titulo">Proyectos Activos</div>
                <div class="kpi-valor">${proyectos.filter(p => p.estado !== 'Completado').length}</div>
                <div class="kpi-cambio positivo">↑ 2 este mes</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">Incidentes Abiertos</div>
                <div class="kpi-valor">${incidentes.filter(i => i.estado !== 'Resuelto').length}</div>
                <div class="kpi-cambio negativo">↑ 3 últimas 24h</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">Accuracy Promedio</div>
                <div class="kpi-valor">92.5%</div>
                <div class="kpi-cambio positivo">↑ 1.2%</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">Cumplimiento SLA</div>
                <div class="kpi-valor">94%</div>
                <div class="kpi-cambio positivo">↑ 3%</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">Presupuesto Utilizado</div>
                <div class="kpi-valor">68%</div>
                <div class="kpi-cambio">→ En plan</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">Tareas Completadas</div>
                <div class="kpi-valor">${proyectos.reduce((acc, p) => acc + p.tareasCompletadas, 0)}</div>
                <div class="kpi-cambio positivo">↑ 15 esta semana</div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px;">
            <div>
                <h3>📊 Progreso de Proyectos</h3>
                <div class="grafico-contenedor" style="height: 300px;">
                    <canvas id="graficoProgresoProyectos"></canvas>
                </div>
            </div>
            <div>
                <h3>🎯 Estado de Incidentes</h3>
                <div class="grafico-contenedor" style="height: 300px;">
                    <canvas id="graficoEstadoIncidentes"></canvas>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 30px;">
            <h3>📈 Curva S de Avance del Proyecto</h3>
            <div class="grafico-contenedor" style="height: 300px;">
                <canvas id="graficoCurvaS"></canvas>
            </div>
        </div>
    `;
}

function generarDashboardTecnico() {
    return `
        <h2>🤖 Métricas de Modelos en Producción</h2>
        
        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-titulo">Accuracy</div>
                <div class="kpi-valor">${DATOS_INICIALES.metricas.accuracy}%</div>
                <div class="kpi-cambio positivo">↑ 0.8%</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">Precision</div>
                <div class="kpi-valor">${DATOS_INICIALES.metricas.precision}%</div>
                <div class="kpi-cambio negativo">↓ 0.5%</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">Recall</div>
                <div class="kpi-valor">${DATOS_INICIALES.metricas.recall}%</div>
                <div class="kpi-cambio positivo">↑ 1.2%</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">F1-Score</div>
                <div class="kpi-valor">${DATOS_INICIALES.metricas.f1Score}%</div>
                <div class="kpi-cambio positivo">↑ 0.3%</div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px;">
            <div>
                <h3>📊 Evolución de Métricas</h3>
                <div class="grafico-contenedor" style="height: 300px;">
                    <canvas id="graficoEvolucionMetricas"></canvas>
                </div>
            </div>
            <div>
                <h3>🎯 Curva ROC</h3>
                <div class="grafico-contenedor" style="height: 300px;">
                    <canvas id="graficoCurvaROC"></canvas>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 30px;">
            <h3>📉 Curvas de Aprendizaje</h3>
            <div class="grafico-contenedor" style="height: 300px;">
                <canvas id="graficoCurvasAprendizaje"></canvas>
            </div>
        </div>
    `;
}

function generarDashboardITIL() {
    return `
        <h2>🎯 Dashboard ITIL Service Management</h2>
        
        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-titulo">Incidentes Nuevos (Hoy)</div>
                <div class="kpi-valor">8</div>
                <div class="kpi-cambio negativo">↑ 2</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">Tiempo Promedio Resolución</div>
                <div class="kpi-valor">3.5h</div>
                <div class="kpi-cambio positivo">↓ 0.8h</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">SLA Cumplido</div>
                <div class="kpi-valor">94%</div>
                <div class="kpi-cambio positivo">↑ 3%</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">Cambios Pendientes</div>
                <div class="kpi-valor">12</div>
                <div class="kpi-cambio">→ Estable</div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px;">
            <div>
                <h3>📊 Tendencia de Incidentes</h3>
                <div class="grafico-contenedor" style="height: 300px;">
                    <canvas id="graficoTendenciaIncidentes"></canvas>
                </div>
            </div>
            <div>
                <h3>🎯 Distribución por Categoría</h3>
                <div class="grafico-contenedor" style="height: 300px;">
                    <canvas id="graficoDistribucionIncidentes"></canvas>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 30px;">
            <h3>⏱️ Tiempo de Resolución por Prioridad</h3>
            <div class="grafico-contenedor" style="height: 300px;">
                <canvas id="graficoTiempoResolucion"></canvas>
            </div>
        </div>
    `;
}

function generarDashboardFinanciero() {
    return `
        <h2>💰 Dashboard Financiero</h2>
        
        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-titulo">Presupuesto Total</div>
                <div class="kpi-valor">$${(proyectos.reduce((acc, p) => acc + p.presupuesto, 0) / 1000).toFixed(0)}K</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">Gastado</div>
                <div class="kpi-valor">$${(proyectos.reduce((acc, p) => acc + p.gastado, 0) / 1000).toFixed(0)}K</div>
                <div class="kpi-cambio">68% utilizado</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">Disponible</div>
                <div class="kpi-valor">$${((proyectos.reduce((acc, p) => acc + p.presupuesto, 0) - proyectos.reduce((acc, p) => acc + p.gastado, 0)) / 1000).toFixed(0)}K</div>
                <div class="kpi-cambio positivo">32% restante</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">ROI Estimado</div>
                <div class="kpi-valor">245%</div>
                <div class="kpi-cambio positivo">Excelente</div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px;">
            <div>
                <h3>📊 Distribución de Presupuesto</h3>
                <div class="grafico-contenedor" style="height: 300px;">
                    <canvas id="graficoPresupuesto"></canvas>
                </div>
            </div>
            <div>
                <h3>💸 Gasto Mensual</h3>
                <div class="grafico-contenedor" style="height: 300px;">
                    <canvas id="graficoGastoMensual"></canvas>
                </div>
            </div>
        </div>
    `;
}

function generarCentroAutomatizacion() {
    return `
        <h2>⚡ Centro de Automatización</h2>
        <p style="color: var(--text-secundario); margin-bottom: 30px;">
            Genera datos automáticamente para simular el comportamiento del sistema
        </p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div style="background: var(--bg-principal); padding: 24px; border-radius: 12px;">
                <h3>🚀 Generador de Proyectos</h3>
                <p style="color: var(--text-secundario); margin: 12px 0;">
                    Crea un proyecto IA completo con tareas, equipo y métricas
                </p>
                <button class="btn btn-primario btn-grande" onclick="generarProyectoAleatorio()" style="width: 100%; margin-top: 16px;">
                    🎲 Generar Proyecto IA Aleatorio
                </button>
            </div>
            
            <div style="background: var(--bg-principal); padding: 24px; border-radius: 12px;">
                <h3>🎯 Generador de Incidentes</h3>
                <p style="color: var(--text-secundario); margin: 12px 0;">
                    Simula 3-8 incidentes ITIL del día con prioridades variadas
                </p>
                <button class="btn btn-primario btn-grande" onclick="generarIncidentesDelDia()" style="width: 100%; margin-top: 16px;">
                    ⚡ Simular Incidentes del Día
                </button>
            </div>
            
            <div style="background: var(--bg-principal); padding: 24px; border-radius: 12px;">
                <h3>📊 Generador de Métricas</h3>
                <p style="color: var(--text-secundario); margin: 12px 0;">
                    Actualiza todas las métricas de modelos con valores realistas
                </p>
                <button class="btn btn-primario btn-grande" onclick="actualizarMetricas()" style="width: 100%; margin-top: 16px;">
                    📈 Actualizar Métricas de Modelos
                </button>
            </div>
            
            <div style="background: var(--bg-principal); padding: 24px; border-radius: 12px;">
                <h3>⏭️ Simulador de Tiempo</h3>
                <p style="color: var(--text-secundario); margin: 12px 0;">
                    Avanza el timeline 1 semana y simula eventos
                </p>
                <button class="btn btn-primario btn-grande" onclick="avanzarTimeline()" style="width: 100%; margin-top: 16px;">
                    ⏩ Avanzar Timeline (1 semana)
                </button>
            </div>
        </div>
        
        <div style="margin-top: 30px; background: var(--bg-principal); padding: 24px; border-radius: 12px;">
            <h3>📋 Log de Generaciones Recientes</h3>
            <div id="logGeneraciones" style="max-height: 200px; overflow-y: auto; margin-top: 16px; font-size: 13px; font-family: monospace;">
                <div style="color: var(--text-secundario);">[Sistema] Esperando acciones de automatización...</div>
            </div>
        </div>
        
        <div style="margin-top: 20px; padding: 16px; background: rgba(255,193,7,0.1); border-left: 4px solid var(--color-advertencia); border-radius: 6px;">
            <strong>💡 Consejo:</strong> Usa estos generadores para poblar el sistema con datos realistas y explorar todas las funcionalidades de visualización.
        </div>
    `;
}

function generarListaProyectos() {
    let html = '<h2>🚀 Proyectos de IA Activos</h2>';
    html += '<table class="tabla"><thead><tr>';
    html += '<th>ID</th><th>Nombre</th><th>Cliente</th><th>Tipo</th><th>Progreso</th><th>Estado</th><th>Presupuesto</th><th>Equipo</th></tr></thead><tbody>';
    
    proyectos.forEach(p => {
        const colorEstado = p.estado === 'Completado' ? 'exito' : p.estado === 'En Progreso' ? 'info' : 'advertencia';
        html += `<tr>
            <td>${p.id}</td>
            <td><strong>${p.nombre}</strong></td>
            <td>${p.cliente}</td>
            <td>${p.tipo}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="flex: 1; background: #e0e0e0; height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="width: ${p.progreso}%; background: var(--color-primario); height: 100%;"></div>
                    </div>
                    <span style="font-weight: 600;">${p.progreso}%</span>
                </div>
            </td>
            <td><span class="badge badge-${colorEstado}">${p.estado}</span></td>
            <td>${(p.gastado/1000).toFixed(0)}K / ${(p.presupuesto/1000).toFixed(0)}K</td>
            <td>${p.equipo.length} miembros</td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    return html;
}

function generarGestionIncidentes() {
    let html = '<h2>🎯 Gestión de Incidentes ITIL</h2>';
    html += '<div style="margin: 20px 0;"><button class="btn btn-exito" onclick="generarIncidentesDelDia()">➕ Simular Nuevo Incidente</button></div>';
    html += '<table class="tabla"><thead><tr>';
    html += '<th>ID</th><th>Título</th><th>Prioridad</th><th>Estado</th><th>Categoría</th><th>Asignado</th><th>Fecha</th></tr></thead><tbody>';
    
    incidentes.forEach(inc => {
        const colorPrioridad = inc.prioridad === 'Crítica' ? 'peligro' : inc.prioridad === 'Alta' ? 'advertencia' : 'info';
        const colorEstado = inc.estado === 'Resuelto' ? 'exito' : inc.estado === 'En Progreso' ? 'info' : 'secundario';
        html += `<tr>
            <td><strong>${inc.id}</strong></td>
            <td style="max-width: 300px;">${inc.titulo}</td>
            <td><span class="badge badge-${colorPrioridad}">${inc.prioridad}</span></td>
            <td><span class="badge badge-${colorEstado}">${inc.estado}</span></td>
            <td>${inc.categoria}</td>
            <td>${inc.asignado}</td>
            <td>${inc.fechaCreacion}</td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    return html;
}

function generarMetricasIA() {
    const m = DATOS_INICIALES.metricas;
    return `
        <h2>📈 Métricas Detalladas de Modelos IA</h2>
        
        <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr);">
            <div class="kpi-card">
                <div class="kpi-titulo">Accuracy</div>
                <div class="kpi-valor">${m.accuracy}%</div>
                <div class="kpi-cambio positivo">↑ 0.8% vs anterior</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">Precision</div>
                <div class="kpi-valor">${m.precision}%</div>
                <div class="kpi-cambio negativo">↓ 0.5% vs anterior</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">Recall</div>
                <div class="kpi-valor">${m.recall}%</div>
                <div class="kpi-cambio positivo">↑ 1.2% vs anterior</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">F1-Score</div>
                <div class="kpi-valor">${m.f1Score}%</div>
                <div class="kpi-cambio positivo">↑ 0.3% vs anterior</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">AUC-ROC</div>
                <div class="kpi-valor">${m.aucRoc}</div>
                <div class="kpi-cambio positivo">Excelente</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">Loss</div>
                <div class="kpi-valor">${m.loss}</div>
                <div class="kpi-cambio positivo">↓ 0.03 vs anterior</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">Tiempo Inferencia</div>
                <div class="kpi-valor">${m.tiempoInferencia}ms</div>
                <div class="kpi-cambio positivo">Dentro de SLA</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-titulo">Uso Memoria</div>
                <div class="kpi-valor">${m.usoMemoria}GB</div>
                <div class="kpi-cambio">Normal</div>
            </div>
        </div>
        
        <div style="margin-top: 30px;">
            <h3>📊 Importancia de Características</h3>
            <div class="grafico-contenedor">
                <canvas id="graficoImportanciaCaracteristicas"></canvas>
            </div>
        </div>
        
        <div style="margin-top: 30px;">
            <h3>📉 Distribución de Predicciones</h3>
            <div class="grafico-contenedor">
                <canvas id="graficoDistribucionPredicciones"></canvas>
            </div>
        </div>
    `;
}

function generarComparadorModelos() {
    return `
        <h2>⚖️ Comparador de Modelos de IA</h2>
        
        <table class="tabla" style="margin: 20px 0;">
            <thead>
                <tr>
                    <th>Métrica</th>
                    <th>Modelo v1.0</th>
                    <th>Modelo v1.1</th>
                    <th>Modelo v1.2 (Actual)</th>
                    <th>Mejor</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Accuracy</strong></td>
                    <td>89.2%</td>
                    <td>91.3%</td>
                    <td style="background: rgba(40,167,69,0.1);"><strong>92.5%</strong></td>
                    <td>🏆 v1.2</td>
                </tr>
                <tr>
                    <td><strong>Precision</strong></td>
                    <td>85.1%</td>
                    <td>88.7%</td>
                    <td style="background: rgba(40,167,69,0.1);"><strong>89.3%</strong></td>
                    <td>🏆 v1.2</td>
                </tr>
                <tr>
                    <td><strong>Recall</strong></td>
                    <td>87.5%</td>
                    <td>90.2%</td>
                    <td style="background: rgba(40,167,69,0.1);"><strong>91.8%</strong></td>
                    <td>🏆 v1.2</td>
                </tr>
                <tr>
                    <td><strong>F1-Score</strong></td>
                    <td>86.3%</td>
                    <td>89.4%</td>
                    <td style="background: rgba(40,167,69,0.1);"><strong>90.5%</strong></td>
                    <td>🏆 v1.2</td>
                </tr>
                <tr>
                    <td><strong>AUC-ROC</strong></td>
                    <td>0.91</td>
                    <td>0.93</td>
                    <td style="background: rgba(40,167,69,0.1);"><strong>0.95</strong></td>
                    <td>🏆 v1.2</td>
                </tr>
                <tr>
                    <td><strong>Tiempo Inferencia</strong></td>
                    <td style="background: rgba(40,167,69,0.1);"><strong>75ms</strong></td>
                    <td>92ms</td>
                    <td>85ms</td>
                    <td>🏆 v1.0</td>
                </tr>
            </tbody>
        </table>
        
        <div style="margin-top: 30px;">
            <h3>📊 Comparación Visual de Métricas</h3>
            <div class="grafico-contenedor">
                <canvas id="graficoComparacionRadar"></canvas>
            </div>
        </div>
        
        <div style="margin-top: 20px; text-align: center;">
            <button class="btn btn-exito btn-grande">✅ Promover v1.2 a Producción</button>
        </div>
    `;
}

function generarGestionRiesgos() {
    const riesgosData = [
        { id: 1, nombre: "Overfitting por dataset pequeño", probabilidad: 70, impacto: 80, estado: "Alto" },
        { id: 2, nombre: "Sesgo algorítmico en subgrupos", probabilidad: 60, impacto: 90, estado: "Alto" },
        { id: 3, nombre: "Degradación por drift de datos", probabilidad: 50, impacto: 70, estado: "Medio" },
        { id: 4, nombre: "Falta de interpretabilidad", probabilidad: 40, impacto: 60, estado: "Medio" },
        { id: 5, nombre: "Dependencia de proveedor único", probabilidad: 30, impacto: 85, estado: "Medio" },
        { id: 6, nombre: "Cambios en regulación de IA", probabilidad: 25, impacto: 95, estado: "Medio" }
    ];
    
    let html = '<h2>⚠️ Gestión de Riesgos del Proyecto</h2>';
    html += '<table class="tabla"><thead><tr>';
    html += '<th>ID</th><th>Riesgo</th><th>Probabilidad</th><th>Impacto</th><th>Nivel</th><th>Acciones</th></tr></thead><tbody>';
    
    riesgosData.forEach(r => {
        const colorRiesgo = r.estado === 'Alto' ? 'peligro' : r.estado === 'Medio' ? 'advertencia' : 'exito';
        html += `<tr>
            <td>R-${r.id}</td>
            <td><strong>${r.nombre}</strong></td>
            <td>${r.probabilidad}%</td>
            <td>${r.impacto}%</td>
            <td><span class="badge badge-${colorRiesgo}">${r.estado}</span></td>
            <td><button class="btn btn-secundario" style="padding: 6px 12px; font-size: 12px;">Ver Plan</button></td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    html += '<div style="margin-top: 30px;"><h3>🎯 Matriz de Riesgos</h3><div class="grafico-contenedor"><canvas id="graficoMatrizRiesgos"></canvas></div></div>';
    
    return html;
}

function generarCentroGraficos() {
    return `
        <h2>📊 Centro de Gráficos Disponibles</h2>
        <p style="color: var(--text-secundario); margin-bottom: 30px;">
            Selecciona un gráfico para abrirlo en una ventana independiente
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
            <div class="kpi-card" onclick="abrirVentana('gantt')" style="cursor: pointer;">
                <h3>📅 Diagrama de Gantt</h3>
                <p style="color: var(--text-secundario); font-size: 13px;">Cronograma interactivo del proyecto</p>
            </div>
            <div class="kpi-card" onclick="abrirVentana('matriz-confusion')" style="cursor: pointer;">
                <h3>🎯 Matriz de Confusión</h3>
                <p style="color: var(--text-secundario); font-size: 13px;">Análisis de clasificación del modelo</p>
            </div>
            <div class="kpi-card" onclick="crearVentanaGrafico('curva-roc')" style="cursor: pointer;">
                <h3>📈 Curva ROC</h3>
                <p style="color: var(--text-secundario); font-size: 13px;">Análisis de desempeño ROC-AUC</p>
            </div>
            <div class="kpi-card" onclick="crearVentanaGrafico('burndown')" style="cursor: pointer;">
                <h3>🔥 Gráfico Burndown</h3>
                <p style="color: var(--text-secundario); font-size: 13px;">Trabajo pendiente vs tiempo</p>
            </div>
            <div class="kpi-card" onclick="crearVentanaGrafico('recursos')" style="cursor: pointer;">
                <h3>👥 Recursos por Rol</h3>
                <p style="color: var(--text-secundario); font-size: 13px;">Asignación de equipo</p>
            </div>
            <div class="kpi-card" onclick="abrirVentana('riesgos')" style="cursor: pointer;">
                <h3>⚠️ Matriz de Riesgos</h3>
                <p style="color: var(--text-secundario); font-size: 13px;">Probabilidad vs Impacto</p>
            </div>
            <div class="kpi-card" onclick="crearVentanaGrafico('heatmap')" style="cursor: pointer;">
                <h3>🔥 Heatmap de Incidentes</h3>
                <p style="color: var(--text-secundario); font-size: 13px;">Patrón temporal de incidentes</p>
            </div>
            <div class="kpi-card" onclick="crearVentanaGrafico('importancia')" style="cursor: pointer;">
                <h3>📊 Importancia Features</h3>
                <p style="color: var(--text-secundario); font-size: 13px;">Características más influyentes</p>
            </div>
            <div class="kpi-card" onclick="crearVentanaGrafico('residuos')" style="cursor: pointer;">
                <h3>📉 Gráfico de Residuos</h3>
                <p style="color: var(--text-secundario); font-size: 13px;">Análisis de errores del modelo</p>
            </div>
        </div>
    `;
}

function generarCalculadoras() {
    return `
        <h2>🧮 Calculadoras para Proyectos IA</h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 30px;">
            <div style="background: var(--bg-principal); padding: 24px; border-radius: 12px;">
                <h3>📊 Calculadora de Tamaño de Dataset</h3>
                <div class="form-group">
                    <label class="form-label">Número de Features:</label>
                    <input type="number" class="form-control" id="numFeatures" value="50">
                </div>
                <div class="form-group">
                    <label class="form-label">Complejidad del Modelo:</label>
                    <select class="form-control" id="complejidad">
                        <option>Baja (Linear)</option>
                        <option selected>Media (Random Forest)</option>
                        <option>Alta (Deep Learning)</option>
                    </select>
                </div>
                <button class="btn btn-primario" onclick="calcularDataset()">Calcular</button>
                <div id="resultadoDataset" style="margin-top: 16px; padding: 16px; background: rgba(0,102,204,0.1); border-radius: 6px; display: none;">
                    <strong>Recomendación:</strong>
                    <p id="textoDataset" style="margin-top: 8px;"></p>
                </div>
            </div>
            
            <div style="background: var(--bg-principal); padding: 24px; border-radius: 12px;">
                <h3>⚡ Estimador de Tiempo GPU</h3>
                <div class="form-group">
                    <label class="form-label">Tamaño del Dataset (registros):</label>
                    <input type="number" class="form-control" id="tamDataset" value="100000">
                </div>
                <div class="form-group">
                    <label class="form-label">Épocas de Entrenamiento:</label>
                    <input type="number" class="form-control" id="epocas" value="50">
                </div>
                <div class="form-group">
                    <label class="form-label">Tipo de GPU:</label>
                    <select class="form-control" id="tipoGpu">
                        <option>T4</option>
                        <option selected>V100</option>
                        <option>A100</option>
                    </select>
                </div>
                <button class="btn btn-primario" onclick="calcularTiempoGPU()">Estimar</button>
                <div id="resultadoGPU" style="margin-top: 16px; padding: 16px; background: rgba(0,102,204,0.1); border-radius: 6px; display: none;">
                    <strong>Tiempo Estimado:</strong>
                    <p id="textoGPU" style="margin-top: 8px;"></p>
                </div>
            </div>
            
            <div style="background: var(--bg-principal); padding: 24px; border-radius: 12px;">
                <h3>💰 Calculadora de ROI IA</h3>
                <div class="form-group">
                    <label class="form-label">Inversión Inicial ($):</label>
                    <input type="number" class="form-control" id="inversion" value="250000">
                </div>
                <div class="form-group">
                    <label class="form-label">Ahorro Mensual Estimado ($):</label>
                    <input type="number" class="form-control" id="ahorro" value="35000">
                </div>
                <div class="form-group">
                    <label class="form-label">Período (meses):</label>
                    <input type="number" class="form-control" id="periodo" value="24">
                </div>
                <button class="btn btn-primario" onclick="calcularROI()">Calcular ROI</button>
                <div id="resultadoROI" style="margin-top: 16px; padding: 16px; background: rgba(0,102,204,0.1); border-radius: 6px; display: none;">
                    <strong>Resultados:</strong>
                    <p id="textoROI" style="margin-top: 8px;"></p>
                </div>
            </div>
            
            <div style="background: var(--bg-principal); padding: 24px; border-radius: 12px;">
                <h3>☁️ Calculadora de Costo Cloud</h3>
                <div class="form-group">
                    <label class="form-label">Horas GPU al Mes:</label>
                    <input type="number" class="form-control" id="horasGpu" value="200">
                </div>
                <div class="form-group">
                    <label class="form-label">Instancias Compute:</label>
                    <input type="number" class="form-control" id="instancias" value="4">
                </div>
                <div class="form-group">
                    <label class="form-label">Storage (TB):</label>
                    <input type="number" class="form-control" id="storage" value="5">
                </div>
                <button class="btn btn-primario" onclick="calcularCostoCloud()">Estimar Costo</button>
                <div id="resultadoCloud" style="margin-top: 16px; padding: 16px; background: rgba(0,102,204,0.1); border-radius: 6px; display: none;">
                    <strong>Costo Mensual Estimado:</strong>
                    <p id="textoCloud" style="margin-top: 8px;"></p>
                </div>
            </div>
        </div>
    `;
}

function generarTutorial() {
    return `
        <h2>📚 Tutorial Interactivo del Sistema</h2>
        
        <div style="background: var(--bg-principal); padding: 24px; border-radius: 12px; margin: 20px 0;">
            <h3>👋 Paso 1: Generación Automática de Datos</h3>
            <p>El sistema incluye un potente generador automático. Ve al <strong>Centro de Automatización</strong> y genera:</p>
            <ul>
                <li>Proyectos IA completos con tareas y equipos</li>
                <li>Incidentes ITIL realistas</li>
                <li>Métricas de modelos actualizadas</li>
                <li>Eventos del timeline</li>
            </ul>
            <button class="btn btn-primario" onclick="abrirVentana('generador')">Ir al Centro de Automatización</button>
        </div>
        
        <div style="background: var(--bg-principal); padding: 24px; border-radius: 12px; margin: 20px 0;">
            <h3>📊 Paso 2: Explora los Dashboards</h3>
            <p>El sistema tiene 4 dashboards especializados:</p>
            <ul>
                <li><strong>Dashboard Ejecutivo:</strong> Vista general de KPIs</li>
                <li><strong>Dashboard Técnico IA:</strong> Métricas de modelos</li>
                <li><strong>Dashboard ITIL:</strong> Gestión de servicios</li>
                <li><strong>Dashboard Financiero:</strong> Presupuestos y ROI</li>
            </ul>
            <button class="btn btn-primario" onclick="abrirVentana('dashboard-ejecutivo')">Ver Dashboard Ejecutivo</button>
        </div>
        
        <div style="background: var(--bg-principal); padding: 24px; border-radius: 12px; margin: 20px 0;">
            <h3>📈 Paso 3: Visualiza Datos con Gráficos</h3>
            <p>Accede a más de 20 tipos de gráficos diferentes:</p>
            <ul>
                <li>Diagrama de Gantt interactivo</li>
                <li>Matriz de Confusión animada</li>
                <li>Curvas ROC y de Aprendizaje</li>
                <li>Matriz de Riesgos</li>
                <li>Heatmaps de incidentes</li>
            </ul>
            <button class="btn btn-primario" onclick="abrirVentana('centro-graficos')">Ver Centro de Gráficos</button>
        </div>
        
        <div style="background: var(--bg-principal); padding: 24px; border-radius: 12px; margin: 20px 0;">
            <h3>🎯 Paso 4: Gestiona Incidentes ITIL</h3>
            <p>Sistema completo de gestión de incidentes:</p>
            <ul>
                <li>Crea y asigna incidentes</li>
                <li>Establece prioridades</li>
                <li>Monitorea SLAs</li>
                <li>Genera reportes</li>
            </ul>
            <button class="btn btn-primario" onclick="abrirVentana('incidentes')">Ver Incidentes</button>
        </div>
        
        <div style="padding: 16px; background: rgba(0,102,204,0.1); border-left: 4px solid var(--color-primario); border-radius: 6px; margin-top: 20px;">
            <strong>💡 Consejo Pro:</strong> Usa <kbd>Ctrl+K</kbd> para abrir la búsqueda global y encuentra cualquier cosa rápidamente.
        </div>
    `;
}

function generarGlosario() {
    return `
        <h2>📖 Glosario de Términos IA, ITIL y PMBOK</h2>
        
        <div style="margin-top: 20px;">
            <h3 style="color: var(--color-primario);">🤖 Términos de Inteligencia Artificial</h3>
            
            <div style="background: var(--bg-principal); padding: 16px; border-radius: 8px; margin: 12px 0;">
                <strong>Accuracy (Exactitud):</strong>
                <p style="color: var(--text-secundario); margin-top: 8px;">
                    Proporción de predicciones correctas sobre el total de predicciones. Métrica general de desempeño del modelo.
                </p>
            </div>
            
            <div style="background: var(--bg-principal); padding: 16px; border-radius: 8px; margin: 12px 0;">
                <strong>Precision (Precisión):</strong>
                <p style="color: var(--text-secundario); margin-top: 8px;">
                    De todas las predicciones positivas, cuántas son realmente correctas. Importante cuando los falsos positivos son costosos.
                </p>
            </div>
            
            <div style="background: var(--bg-principal); padding: 16px; border-radius: 8px; margin: 12px 0;">
                <strong>Recall (Exhaustividad):</strong>
                <p style="color: var(--text-secundario); margin-top: 8px;">
                    De todos los casos positivos reales, cuántos fueron identificados correctamente. Crítico en detección de fraude o enfermedades.
                </p>
            </div>
            
            <div style="background: var(--bg-principal); padding: 16px; border-radius: 8px; margin: 12px 0;">
                <strong>F1-Score:</strong>
                <p style="color: var(--text-secundario); margin-top: 8px;">
                    Media armónica de Precision y Recall. Balance entre ambas métricas, útil con clases desbalanceadas.
                </p>
            </div>
            
            <div style="background: var(--bg-principal); padding: 16px; border-radius: 8px; margin: 12px 0;">
                <strong>Overfitting (Sobreajuste):</strong>
                <p style="color: var(--text-secundario); margin-top: 8px;">
                    Cuando el modelo aprende demasiado de los datos de entrenamiento, incluyendo ruido, perdiendo capacidad de generalización.
                </p>
            </div>
            
            <div style="background: var(--bg-principal); padding: 16px; border-radius: 8px; margin: 12px 0;">
                <strong>Data Drift:</strong>
                <p style="color: var(--text-secundario); margin-top: 8px;">
                    Cambio en la distribución de los datos de entrada con el tiempo, degradando el desempeño del modelo en producción.
                </p>
            </div>
        </div>
        
        <div style="margin-top: 30px;">
            <h3 style="color: var(--color-primario);">🎯 Términos ITIL</h3>
            
            <div style="background: var(--bg-principal); padding: 16px; border-radius: 8px; margin: 12px 0;">
                <strong>Incidente:</strong>
                <p style="color: var(--text-secundario); margin-top: 8px;">
                    Interrupción no planificada o reducción en la calidad de un servicio TI. Requiere restauración rápida del servicio.
                </p>
            </div>
            
            <div style="background: var(--bg-principal); padding: 16px; border-radius: 8px; margin: 12px 0;">
                <strong>SLA (Service Level Agreement):</strong>
                <p style="color: var(--text-secundario); margin-top: 8px;">
                    Acuerdo documentado entre el proveedor de servicio y cliente sobre niveles de servicio esperados y tiempos de respuesta.
                </p>
            </div>
            
            <div style="background: var(--bg-principal); padding: 16px; border-radius: 8px; margin: 12px 0;">
                <strong>Gestión de Cambios:</strong>
                <p style="color: var(--text-secundario); margin-top: 8px;">
                    Proceso para controlar el ciclo de vida de todos los cambios, minimizando disrupciones e implementaciones fallidas.
                </p>
            </div>
        </div>
        
        <div style="margin-top: 30px;">
            <h3 style="color: var(--color-primario);">📊 Términos PMBOK</h3>
            
            <div style="background: var(--bg-principal); padding: 16px; border-radius: 8px; margin: 12px 0;">
                <strong>WBS (Work Breakdown Structure):</strong>
                <p style="color: var(--text-secundario); margin-top: 8px;">
                    Descomposición jerárquica del trabajo del proyecto en entregables y componentes más pequeños y manejables.
                </p>
            </div>
            
            <div style="background: var(--bg-principal); padding: 16px; border-radius: 8px; margin: 12px 0;">
                <strong>Diagrama de Gantt:</strong>
                <p style="color: var(--text-secundario); margin-top: 8px;">
                    Gráfico de barras que muestra el cronograma del proyecto, tareas, duraciones, dependencias y progreso.
                </p>
            </div>
            
            <div style="background: var(--bg-principal); padding: 16px; border-radius: 8px; margin: 12px 0;">
                <strong>Earned Value (Valor Ganado):</strong>
                <p style="color: var(--text-secundario); margin-top: 8px;">
                    Medida del trabajo realizado en términos del presupuesto autorizado. Indica el valor del trabajo completado hasta la fecha.
                </p>
            </div>
        </div>
    `;
}

// ========================================
// FUNCIONES DE AUTOMATIZACIÓN
// ========================================

function generarProyectoAleatorio() {
    const tipos = [
        "Sistema de Predicción de Demanda con ML",
        "Plataforma de Análisis de Sentimientos con NLP",
        "Sistema de Recomendación Personalizado",
        "Detector de Anomalías en IoT",
        "Chatbot con Comprensión de Lenguaje Natural",
        "Sistema de Clasificación de Imágenes Médicas",
        "Predictor de Churn de Clientes",
        "Sistema de Detección de Objetos en Tiempo Real"
    ];
    
    const clientes = [
        "Banco de Crédito del Perú", "Interbank", "BBVA Perú", "Scotiabank Perú",
        "Claro Perú", "Movistar", "Entel Perú",
        "Saga Falabella", "Ripley", "Oechsle",
        "Ministerio de Educación", "SUNAT", "RENIEC"
    ];
    
    const tiposIA = [
        "Machine Learning Predictivo",
        "Procesamiento de Lenguaje Natural",
        "Visión por Computadora",
        "Deep Learning",
        "Reinforcement Learning"
    ];
    
    const nombresTecnicos = [
        "Carlos", "Ana", "Luis", "María", "Roberto", "Patricia", "Diego", "Sofía",
        "Miguel", "Laura", "Jorge", "Carmen", "Fernando", "Gabriela", "Ricardo", "Elena"
    ];
    
    const apellidos = [
        "Mendoza", "García", "Torres", "Rodríguez", "Silva", "Gómez", "Martínez",
        "Ramírez", "Castro", "Fernández", "Vega", "López", "Sánchez", "Pérez"
    ];
    
    const nuevoProyecto = {
        id: proyectos.length + 1,
        nombre: tipos[Math.floor(Math.random() * tipos.length)],
        cliente: clientes[Math.floor(Math.random() * clientes.length)],
        tipo: tiposIA[Math.floor(Math.random() * tiposIA.length)],
        estado: "En Progreso",
        progreso: Math.floor(Math.random() * 60) + 10,
        fechaInicio: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        fechaFin: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        presupuesto: (Math.floor(Math.random() * 400) + 100) * 1000,
        gastado: 0,
        equipo: [],
        tareas: Math.floor(Math.random() * 20) + 15,
        tareasCompletadas: 0
    };
    
    nuevoProyecto.gastado = Math.floor(nuevoProyecto.presupuesto * (nuevoProyecto.progreso / 100));
    nuevoProyecto.tareasCompletadas = Math.floor(nuevoProyecto.tareas * (nuevoProyecto.progreso / 100));
    
    const numEquipo = Math.floor(Math.random() * 5) + 3;
    for (let i = 0; i < numEquipo; i++) {
        const nombre = nombresTecnicos[Math.floor(Math.random() * nombresTecnicos.length)];
        const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
        nuevoProyecto.equipo.push(`${nombre} ${apellido}`);
    }
    
    proyectos.push(nuevoProyecto);
    actualizarContadores();
    agregarLog(`✅ Proyecto generado: "${nuevoProyecto.nombre}"`);
    mostrarNotificacion('Proyecto Generado', `Se creó: ${nuevoProyecto.nombre}`, 'exito');
    
    // Actualizar ventana si está abierta
    const ventanaProyectos = document.querySelector('[data-ventana="lista-proyectos"]');
    if (ventanaProyectos) {
        ventanaProyectos.querySelector('.ventana-contenido').innerHTML = generarListaProyectos();
    }
}

function generarIncidentesDelDia() {
    const titulosIncidentes = [
        "Modelo presenta overfitting en datos de producción",
        "Caída de accuracy del 12% detectada",
        "Latencia de API supera los 500ms",
        "Error de memoria OutOfMemory en servidor GPU",
        "Dataset contiene 15% de valores nulos",
        "Sesgo detectado en predicciones por edad",
        "Pipeline de datos interrumpido",
        "Modelo genera falsos positivos elevados",
        "Servidor de inferencia no responde",
        "Data drift detectado en features principales",
        "Degradación de F1-Score en producción",
        "Error en deserialización del modelo",
        "Timeout en conexión a base de datos"
    ];
    
    const categorias = ["Rendimiento", "Precisión", "Infraestructura", "Datos", "Seguridad"];
    const prioridades = ["Crítica", "Alta", "Media", "Baja"];
    const estados = ["Nuevo", "En Progreso"];
    
    const numIncidentes = Math.floor(Math.random() * 6) + 3;
    
    for (let i = 0; i < numIncidentes; i++) {
        const nuevoIncidente = {
            id: `INC-${String(incidentes.length + 1).padStart(3, '0')}`,
            titulo: titulosIncidentes[Math.floor(Math.random() * titulosIncidentes.length)],
            descripcion: "Descripción detallada del incidente generado automáticamente por el simulador del sistema.",
            prioridad: prioridades[Math.floor(Math.random() * prioridades.length)],
            estado: estados[Math.floor(Math.random() * estados.length)],
            categoria: categorias[Math.floor(Math.random() * categorias.length)],
            proyecto: proyectos[Math.floor(Math.random() * proyectos.length)].nombre,
            asignado: proyectos[0].equipo[Math.floor(Math.random() * proyectos[0].equipo.length)],
            fechaCreacion: new Date().toISOString().split('T')[0],
            tiempoEstimado: `${Math.floor(Math.random() * 8) + 1} horas`
        };
        
        incidentes.push(nuevoIncidente);
    }
    
    actualizarContadores();
    agregarLog(`🎯 Generados ${numIncidentes} incidentes del día`);
    mostrarNotificacion('Incidentes Generados', `Se crearon ${numIncidentes} nuevos incidentes`, 'advertencia');
    
    // Actualizar ventana si está abierta
    const ventanaIncidentes = document.querySelector('[data-ventana="incidentes"]');
    if (ventanaIncidentes) {
        ventanaIncidentes.querySelector('.ventana-contenido').innerHTML = generarGestionIncidentes();
    }
}

function actualizarMetricas() {
    const variacion = () => (Math.random() - 0.5) * 3;
    
    DATOS_INICIALES.metricas.accuracy = Math.max(85, Math.min(98, DATOS_INICIALES.metricas.accuracy + variacion()));
    DATOS_INICIALES.metricas.precision = Math.max(80, Math.min(95, DATOS_INICIALES.metricas.precision + variacion()));
    DATOS_INICIALES.metricas.recall = Math.max(75, Math.min(94, DATOS_INICIALES.metricas.recall + variacion()));
    DATOS_INICIALES.metricas.f1Score = (DATOS_INICIALES.metricas.precision + DATOS_INICIALES.metricas.recall) / 2;
    DATOS_INICIALES.metricas.aucRoc = Math.max(0.85, Math.min(0.99, DATOS_INICIALES.metricas.aucRoc + (Math.random() - 0.5) * 0.05));
    DATOS_INICIALES.metricas.loss = Math.max(0.05, Math.min(0.30, DATOS_INICIALES.metricas.loss + (Math.random() - 0.5) * 0.05));
    DATOS_INICIALES.metricas.tiempoInferencia = Math.max(10, Math.min(500, DATOS_INICIALES.metricas.tiempoInferencia + (Math.random() - 0.5) * 30));
    DATOS_INICIALES.metricas.usoMemoria = Math.max(0.5, Math.min(4, DATOS_INICIALES.metricas.usoMemoria + (Math.random() - 0.5) * 0.3));
    
    agregarLog(`📊 Métricas actualizadas - Accuracy: ${DATOS_INICIALES.metricas.accuracy.toFixed(1)}%`);
    mostrarNotificacion('Métricas Actualizadas', 'Todas las métricas de modelos han sido recalculadas', 'exito');
    
    // Actualizar ventana si está abierta
    const ventanaMetricas = document.querySelector('[data-ventana="metricas-ia"]');
    if (ventanaMetricas) {
        ventanaMetricas.querySelector('.ventana-contenido').innerHTML = generarMetricasIA();
        setTimeout(() => crearGraficosMetricasIA(), 100);
    }
}

function avanzarTimeline() {
    // Simular avance de una semana
    proyectos.forEach(p => {
        if (p.estado === "En Progreso") {
            p.progreso = Math.min(100, p.progreso + Math.floor(Math.random() * 10) + 5);
            p.tareasCompletadas = Math.floor(p.tareas * (p.progreso / 100));
            p.gastado = Math.floor(p.presupuesto * (p.progreso / 100));
            
            if (p.progreso >= 100) {
                p.estado = "Completado";
                p.progreso = 100;
            }
        }
    });
    
    // Resolver algunos incidentes aleatorios
    incidentes.forEach(inc => {
        if (inc.estado === "En Progreso" && Math.random() > 0.5) {
            inc.estado = "Resuelto";
        } else if (inc.estado === "Nuevo" && Math.random() > 0.3) {
            inc.estado = "En Progreso";
        }
    });
    
    actualizarContadores();
    agregarLog(`⏩ Timeline avanzado 1 semana - ${proyectos.filter(p => p.estado === "En Progreso").length} proyectos en progreso`);
    mostrarNotificacion('Timeline Avanzado', 'El sistema simuló el paso de 1 semana', 'info');
}

function agregarLog(mensaje) {
    const logContainer = document.getElementById('logGeneraciones');
    if (logContainer) {
        const timestamp = new Date().toLocaleTimeString('es-PE');
        const logEntry = document.createElement('div');
        logEntry.style.marginBottom = '8px';
        logEntry.style.color = 'var(--text-principal)';
        logEntry.innerHTML = `[${timestamp}] ${mensaje}`;
        logContainer.insertBefore(logEntry, logContainer.firstChild);
        
        // Limitar a 20 entradas
        while (logContainer.children.length > 20) {
            logContainer.removeChild(logContainer.lastChild);
        }
    }
}

// ========================================
// FUNCIONES DE GRÁFICOS CON CHART.JS
// ========================================

function crearGraficosEjecutivos() {
    // Gráfico de Progreso de Proyectos
    const ctxProgreso = document.getElementById('graficoProgresoProyectos');
    if (ctxProgreso) {
        new Chart(ctxProgreso, {
            type: 'bar',
            data: {
                labels: proyectos.map(p => p.nombre.substring(0, 30) + '...'),
                datasets: [{
                    label: 'Progreso (%)',
                    data: proyectos.map(p => p.progreso),
                    backgroundColor: 'rgba(0, 102, 204, 0.7)',
                    borderColor: 'rgba(0, 102, 204, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Progreso de Proyectos Activos'
                    }
                }
            }
        });
    }
    
    // Gráfico de Estado de Incidentes
    const ctxIncidentes = document.getElementById('graficoEstadoIncidentes');
    if (ctxIncidentes) {
        const conteoEstados = {
            'Nuevo': incidentes.filter(i => i.estado === 'Nuevo').length,
            'En Progreso': incidentes.filter(i => i.estado === 'En Progreso').length,
            'Resuelto': incidentes.filter(i => i.estado === 'Resuelto').length
        };
        
        new Chart(ctxIncidentes, {
            type: 'doughnut',
            data: {
                labels: Object.keys(conteoEstados),
                datasets: [{
                    data: Object.values(conteoEstados),
                    backgroundColor: [
                        'rgba(108, 117, 125, 0.7)',
                        'rgba(23, 162, 184, 0.7)',
                        'rgba(108, 117, 125, 0.7)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Distribución del Presupuesto por Categoría'
                    }
                }
            }
        });
    }
    
    // Gasto Mensual
    const ctxGasto = document.getElementById('graficoGastoMensual');
    if (ctxGasto) {
        new Chart(ctxGasto, {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Gasto Mensual ($K)',
                    data: [45, 52, 48, 65, 72, 68, 75, 82, 78, 85, 90, 95],
                    backgroundColor: 'rgba(0, 102, 204, 0.7)',
                    borderColor: 'rgba(0, 102, 204, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return ''rgba(40, 167, 69, 0.7)'
                    ],
                    borderColor: [
                        'rgb(108, 117, 125)',
                        'rgb(23, 162, 184)',
                        'rgb(40, 167, 69)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Distribución de Incidentes por Estado'
                    }
                }
            }
        });
    }
    
    // Curva S
    const ctxCurvaS = document.getElementById('graficoCurvaS');
    if (ctxCurvaS) {
        const semanas = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'];
        
        new Chart(ctxCurvaS, {
            type: 'line',
            data: {
                labels: semanas,
                datasets: [
                    {
                        label: 'Valor Planificado (VP)',
                        data: [0, 12, 25, 38, 52, 65, 80, 100],
                        borderColor: 'rgba(108, 117, 125, 1)',
                        backgroundColor: 'rgba(108, 117, 125, 0.1)',
                        borderDash: [5, 5],
                        tension: 0.4
                    },
                    {
                        label: 'Valor Ganado (VG)',
                        data: [0, 10, 23, 42, 58, 70, 85, 95],
                        borderColor: 'rgba(0, 102, 204, 1)',
                        backgroundColor: 'rgba(0, 102, 204, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Costo Real (CR)',
                        data: [0, 11, 26, 40, 56, 68, 82, 92],
                        borderColor: 'rgba(40, 167, 69, 1)',
                        backgroundColor: 'rgba(40, 167, 69, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Curva S - Análisis de Valor Ganado'
                    }
                }
            }
        });
    }
}

function crearGraficosTecnicos() {
    // Evolución de Métricas
    const ctxEvolucion = document.getElementById('graficoEvolucionMetricas');
    if (ctxEvolucion) {
        const versiones = ['v1.0', 'v1.1', 'v1.2', 'v1.3', 'v1.4'];
        
        new Chart(ctxEvolucion, {
            type: 'line',
            data: {
                labels: versiones,
                datasets: [
                    {
                        label: 'Accuracy',
                        data: [89.2, 90.5, 91.8, 92.5, 92.8],
                        borderColor: 'rgba(0, 102, 204, 1)',
                        backgroundColor: 'rgba(0, 102, 204, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Precision',
                        data: [85.1, 87.3, 88.9, 89.3, 90.1],
                        borderColor: 'rgba(40, 167, 69, 1)',
                        backgroundColor: 'rgba(40, 167, 69, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Recall',
                        data: [87.5, 89.2, 90.6, 91.8, 92.2],
                        borderColor: 'rgba(255, 193, 7, 1)',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'F1-Score',
                        data: [86.3, 88.2, 89.7, 90.5, 91.1],
                        borderColor: 'rgba(220, 53, 69, 1)',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 80,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Evolución de Métricas por Versión del Modelo'
                    }
                }
            }
        });
    }
    
    // Curva ROC
    const ctxROC = document.getElementById('graficoCurvaROC');
    if (ctxROC) {
        const puntos = [];
        for (let i = 0; i <= 100; i += 5) {
            const fpr = i / 100;
            const tpr = Math.pow(fpr, 0.6);
            puntos.push({x: fpr, y: tpr});
        }
        
        new Chart(ctxROC, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Curva ROC (AUC = 0.95)',
                        data: puntos,
                        borderColor: 'rgba(0, 102, 204, 1)',
                        backgroundColor: 'rgba(0, 102, 204, 0.2)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0
                    },
                    {
                        label: 'Línea Base (AUC = 0.5)',
                        data: [{x: 0, y: 0}, {x: 1, y: 1}],
                        borderColor: 'rgba(108, 117, 125, 1)',
                        borderDash: [5, 5],
                        fill: false,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'linear',
                        title: {
                            display: true,
                            text: 'Tasa de Falsos Positivos (FPR)'
                        },
                        min: 0,
                        max: 1
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Tasa de Verdaderos Positivos (TPR)'
                        },
                        min: 0,
                        max: 1
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Curva ROC - Receiver Operating Characteristic'
                    }
                }
            }
        });
    }
    
    // Curvas de Aprendizaje
    const ctxAprendizaje = document.getElementById('graficoCurvasAprendizaje');
    if (ctxAprendizaje) {
        const epocas = Array.from({length: 50}, (_, i) => i + 1);
        const lossEntrenamiento = epocas.map(e => 0.5 * Math.exp(-e / 15) + 0.05);
        const lossValidacion = epocas.map(e => 0.5 * Math.exp(-e / 15) + 0.08 + Math.random() * 0.02);
        
        new Chart(ctxAprendizaje, {
            type: 'line',
            data: {
                labels: epocas,
                datasets: [
                    {
                        label: 'Loss Entrenamiento',
                        data: lossEntrenamiento,
                        borderColor: 'rgba(0, 102, 204, 1)',
                        backgroundColor: 'rgba(0, 102, 204, 0.1)',
                        tension: 0.4,
                        pointRadius: 1
                    },
                    {
                        label: 'Loss Validación',
                        data: lossValidacion,
                        borderColor: 'rgba(220, 53, 69, 1)',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        tension: 0.4,
                        pointRadius: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Épocas'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Loss'
                        },
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Curvas de Aprendizaje - Loss vs Épocas'
                    }
                }
            }
        });
    }
}

function crearGraficosITIL() {
    // Tendencia de Incidentes
    const ctxTendencia = document.getElementById('graficoTendenciaIncidentes');
    if (ctxTendencia) {
        const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        
        new Chart(ctxTendencia, {
            type: 'line',
            data: {
                labels: dias,
                datasets: [
                    {
                        label: 'Crítica',
                        data: [2, 3, 1, 4, 2, 1, 0],
                        borderColor: 'rgba(220, 53, 69, 1)',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Alta',
                        data: [5, 7, 6, 8, 6, 3, 2],
                        borderColor: 'rgba(255, 193, 7, 1)',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Media',
                        data: [8, 10, 9, 11, 10, 5, 4],
                        borderColor: 'rgba(23, 162, 184, 1)',
                        backgroundColor: 'rgba(23, 162, 184, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Tendencia de Incidentes por Prioridad'
                    }
                }
            }
        });
    }
    
    // Distribución por Categoría
    const ctxDistribucion = document.getElementById('graficoDistribucionIncidentes');
    if (ctxDistribucion) {
        const categorias = {};
        incidentes.forEach(inc => {
            categorias[inc.categoria] = (categorias[inc.categoria] || 0) + 1;
        });
        
        new Chart(ctxDistribucion, {
            type: 'pie',
            data: {
                labels: Object.keys(categorias),
                datasets: [{
                    data: Object.values(categorias),
                    backgroundColor: [
                        'rgba(0, 102, 204, 0.7)',
                        'rgba(40, 167, 69, 0.7)',
                        'rgba(220, 53, 69, 0.7)',
                        'rgba(255, 193, 7, 0.7)',
                        'rgba(23, 162, 184, 0.7)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Incidentes por Categoría'
                    }
                }
            }
        });
    }
    
    // Tiempo de Resolución
    const ctxTiempo = document.getElementById('graficoTiempoResolucion');
    if (ctxTiempo) {
        new Chart(ctxTiempo, {
            type: 'bar',
            data: {
                labels: ['Crítica', 'Alta', 'Media', 'Baja'],
                datasets: [
                    {
                        label: 'Tiempo Promedio (horas)',
                        data: [2.5, 4.2, 6.8, 12.5],
                        backgroundColor: 'rgba(0, 102, 204, 0.7)',
                        borderColor: 'rgba(0, 102, 204, 1)',
                        borderWidth: 2
                    },
                    {
                        label: 'SLA (horas)',
                        data: [4, 8, 16, 24],
                        backgroundColor: 'rgba(40, 167, 69, 0.3)',
                        borderColor: 'rgba(40, 167, 69, 1)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    title: {
                        display: true,
                        text: 'Tiempo de Resolución vs SLA por Prioridad'
                    }
                }
            }
        });
    }
}

function crearGraficosFinancieros() {
    // Distribución de Presupuesto
    const ctxPresupuesto = document.getElementById('graficoPresupuesto');
    if (ctxPresupuesto) {
        new Chart(ctxPresupuesto, {
            type: 'doughnut',
            data: {
                labels: ['Personal', 'Hardware/GPU', 'Software/Licencias', 'Datos', 'Infraestructura Cloud', 'Otros'],
                datasets: [{
                    data: [45, 20, 12, 8, 10, 5],
                    backgroundColor: [
                        'rgba(0, 102, 204, 0.7)',
                        'rgba(40, 167, 69, 0.7)',
                        'rgba(255, 193, 7, 0.7)',
                        'rgba(220, 53, 69, 0.7)',
                        'rgba(23, 162, 184, 0.7)',
                         + value + 'K';
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Gasto Mensual Acumulado 2024'
                    }
                }
            }
        });
    }
}

function crearGraficosMetricasIA() {
    // Importancia de Características
    const ctxImportancia = document.getElementById('graficoImportanciaCaracteristicas');
    if (ctxImportancia) {
        const features = [
            'transaction_amount', 'time_since_last', 'location_risk', 'device_score',
            'merchant_category', 'user_age', 'account_age', 'velocity_1h',
            'avg_transaction_30d', 'ip_country', 'card_present', 'weekend_flag',
            'hour_of_day', 'distance_from_home', 'suspicious_pattern'
        ];
        
        const importancia = features.map(() => Math.random() * 0.3 + 0.05).sort((a, b) => b - a);
        
        new Chart(ctxImportancia, {
            type: 'bar',
            data: {
                labels: features,
                datasets: [{
                    label: 'Importancia',
                    data: importancia,
                    backgroundColor: 'rgba(0, 102, 204, 0.7)',
                    borderColor: 'rgba(0, 102, 204, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    title: {
                        display: true,
                        text: 'Importancia de Características del Modelo'
                    },
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Distribución de Predicciones
    const ctxDistPredicciones = document.getElementById('graficoDistribucionPredicciones');
    if (ctxDistPredicciones) {
        const bins = Array.from({length: 20}, (_, i) => (i + 1) * 5);
        const counts = bins.map(() => Math.floor(Math.random() * 500) + 100);
        
        new Chart(ctxDistPredicciones, {
            type: 'bar',
            data: {
                labels: bins.map(b => b + '%'),
                datasets: [{
                    label: 'Frecuencia',
                    data: counts,
                    backgroundColor: 'rgba(0, 102, 204, 0.7)',
                    borderColor: 'rgba(0, 102, 204, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Probabilidad Predicha (%)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Número de Predicciones'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Distribución de Probabilidades Predichas'
                    },
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

function crearGraficoGantt() {
    const ctx = document.getElementById('graficoGantt');
    if (!ctx) return;
    
    const tareas = [
        {nombre: 'Recolección de Datos', inicio: 0, duracion: 10},
        {nombre: 'Análisis Exploratorio', inicio: 8, duracion: 8},
        {nombre: 'Ingeniería de Features', inicio: 14, duracion: 12},
        {nombre: 'Entrenamiento Modelo', inicio: 24, duracion: 15},
        {nombre: 'Validación y Ajuste', inicio: 36, duracion: 10},
        {nombre: 'Deployment', inicio: 44, duracion: 6},
        {nombre: 'Monitoreo Post-Deploy', inicio: 48, duracion: 8}
    ];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tareas.map(t => t.nombre),
            datasets: [{
                label: 'Duración (días)',
                data: tareas.map(t => ({x: [t.inicio, t.inicio + t.duracion], y: t.nombre})),
                backgroundColor: 'rgba(0, 102, 204, 0.7)',
                borderColor: 'rgba(0, 102, 204, 1)',
                borderWidth: 2,
                barThickness: 30
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Días desde inicio del proyecto'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Diagrama de Gantt - Cronograma del Proyecto',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    });
}

function crearMatrizConfusion() {
    const ctx = document.getElementById('graficoMatrizConfusion');
    if (!ctx) return;
    
    // Datos de matriz de confusión 2x2
    const vp = 850; // Verdaderos Positivos
    const fp = 95;  // Falsos Positivos
    const fn = 78;  // Falsos Negativos
    const vn = 920; // Verdaderos Negativos
    
    const contenedor = ctx.parentElement;
    contenedor.innerHTML = `
        <div style="max-width: 500px; margin: 0 auto;">
            <h3 style="text-align: center; margin-bottom: 20px;">Matriz de Confusión</h3>
            <div style="display: grid; grid-template-columns: 100px 1fr 1fr; gap: 10px; text-align: center;">
                <div></div>
                <div style="font-weight: 600; padding: 10px;">Predicho Negativo</div>
                <div style="font-weight: 600; padding: 10px;">Predicho Positivo</div>
                
                <div style="font-weight: 600; padding: 10px; writing-mode: vertical-rl; transform: rotate(180deg);">Real Negativo</div>
                <div style="background: linear-gradient(135deg, rgba(40, 167, 69, 0.8), rgba(40, 167, 69, 0.6)); padding: 30px; border-radius: 8px; font-size: 32px; font-weight: 700; color: white;">
                    ${vn}
                    <div style="font-size: 14px; margin-top: 8px;">Verdaderos Negativos</div>
                </div>
                <div style="background: linear-gradient(135deg, rgba(220, 53, 69, 0.8), rgba(220, 53, 69, 0.6)); padding: 30px; border-radius: 8px; font-size: 32px; font-weight: 700; color: white;">
                    ${fp}
                    <div style="font-size: 14px; margin-top: 8px;">Falsos Positivos</div>
                </div>
                
                <div style="font-weight: 600; padding: 10px; writing-mode: vertical-rl; transform: rotate(180deg);">Real Positivo</div>
                <div style="background: linear-gradient(135deg, rgba(220, 53, 69, 0.8), rgba(220, 53, 69, 0.6)); padding: 30px; border-radius: 8px; font-size: 32px; font-weight: 700; color: white;">
                    ${fn}
                    <div style="font-size: 14px; margin-top: 8px;">Falsos Negativos</div>
                </div>
                <div style="background: linear-gradient(135deg, rgba(40, 167, 69, 0.8), rgba(40, 167, 69, 0.6)); padding: 30px; border-radius: 8px; font-size: 32px; font-weight: 700; color: white;">
                    ${vp}
                    <div style="font-size: 14px; margin-top: 8px;">Verdaderos Positivos</div>
                </div>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: var(--bg-principal); border-radius: 8px;">
                <h4>Métricas Calculadas:</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px;">
                    <div>
                        <strong>Accuracy:</strong> ${((vp + vn) / (vp + vn + fp + fn) * 100).toFixed(2)}%
                    </div>
                    <div>
                        <strong>Precision:</strong> ${(vp / (vp + fp) * 100).toFixed(2)}%
                    </div>
                    <div>
                        <strong>Recall:</strong> ${(vp / (vp + fn) * 100).toFixed(2)}%
                    </div>
                    <div>
                        <strong>Specificity:</strong> ${(vn / (vn + fp) * 100).toFixed(2)}%
                    </div>
                </div>
            </div>
        </div>
    `;
}

function crearGraficoComparacion() {
    const ctx = document.getElementById('graficoComparacionRadar');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'Velocidad', 'Eficiencia'],
            datasets: [
                {
                    label: 'Modelo v1.0',
                    data: [89, 85, 88, 86, 95, 90],
                    borderColor: 'rgba(108, 117, 125, 1)',
                    backgroundColor: 'rgba(108, 117, 125, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'Modelo v1.1',
                    data: [91, 89, 90, 89, 88, 85],
                    borderColor: 'rgba(255, 193, 7, 1)',
                    backgroundColor: 'rgba(255, 193, 7, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'Modelo v1.2 (Actual)',
                    data: [93, 89, 92, 91, 85, 88],
                    borderColor: 'rgba(0, 102, 204, 1)',
                    backgroundColor: 'rgba(0, 102, 204, 0.2)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Comparación Multidimensional de Modelos'
                }
            }
        }
    });
}

function crearMatrizRiesgos() {
    const ctx = document.getElementById('graficoMatrizRiesgos');
    if (!ctx) return;
    
    const riesgos = [
        {nombre: 'Overfitting', probabilidad: 70, impacto: 80},
        {nombre: 'Sesgo', probabilidad: 60, impacto: 90},
        {nombre: 'Drift', probabilidad: 50, impacto: 70},
        {nombre: 'Interpretabilidad', probabilidad: 40, impacto: 60},
        {nombre: 'Proveedor', probabilidad: 30, impacto: 85},
        {nombre: 'Regulación', probabilidad: 25, impacto: 95}
    ];
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Riesgos',
                data: riesgos.map(r => ({
                    x: r.probabilidad,
                    y: r.impacto,
                    label: r.nombre
                })),
                backgroundColor: riesgos.map(r => {
                    const nivel = r.probabilidad * r.impacto;
                    if (nivel > 5000) return 'rgba(220, 53, 69, 0.7)';
                    if (nivel > 3000) return 'rgba(255, 193, 7, 0.7)';
                    return 'rgba(40, 167, 69, 0.7)';
                }),
                borderColor: riesgos.map(r => {
                    const nivel = r.probabilidad * r.impacto;
                    if (nivel > 5000) return 'rgb(220, 53, 69)';
                    if (nivel > 3000) return 'rgb(255, 193, 7)';
                    return 'rgb(40, 167, 69)';
                }),
                borderWidth: 2,
                pointRadius: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Probabilidad (%)'
                    },
                    min: 0,
                    max: 100
                },
                y: {
                    title: {
                        display: true,
                        text: 'Impacto (%)'
                    },
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Matriz de Riesgos - Probabilidad vs Impacto'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return riesgos[context.dataIndex].nombre + 
                                   ` (P: ${context.parsed.x}%, I: ${context.parsed.y}%)`;
                        }
                    }
                }
            }
        }
    });
}

function iniciarMonitorTiempoReal() {
    const ctx = document.getElementById('graficoTiempoReal');
    if (!ctx) return;
    
    const data = {
        labels: [],
        datasets: [
            {
                label: 'Predicciones/seg',
                data: [],
                borderColor: 'rgba(0, 102, 204, 1)',
                backgroundColor: 'rgba(0, 102, 204, 0.1)',
                tension: 0.4
            },
            {
                label: 'Latencia (ms)',
                data: [],
                borderColor: 'rgba(40, 167, 69, 1)',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                tension: 0.4,
                yAxisID: 'y1'
            }
        ]
    };
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: true
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Predicciones/seg'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Latencia (ms)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Monitor en Tiempo Real - Actualización cada 5 segundos'
                }
            }
        }
    });
    
    // Actualizar cada 5 segundos
    let contador = 0;
    setInterval(() => {
        const tiempo = new Date().toLocaleTimeString('es-PE');
        const predicciones = Math.floor(Math.random() * 50) + 80;
        const latencia = Math.floor(Math.random() * 30) + 70;
        
        data.labels.push(tiempo);
        data.datasets[0].data.push(predicciones);
        data.datasets[1].data.push(latencia);
        
        // Mantener últimos 20 puntos
        if (data.labels.length > 20) {
            data.labels.shift();
            data.datasets[0].data.shift();
            data.datasets[1].data.shift();
        }
        
        chart.update();
        contador++;
    }, 5000);
}

// ========================================
// FUNCIONES DE CALCULADORAS
// ========================================

function calcularDataset() {
    const numFeatures = parseInt(document.getElementById('numFeatures').value);
    const complejidad = document.getElementById('complejidad').value;
    
    let multiplicador = 10;
    if (complejidad.includes('Media')) multiplicador = 20;
    if (complejidad.includes('Alta')) multiplicador = 50;
    
    const datasetRecomendado = numFeatures * multiplicador * 100;
    
    document.getElementById('resultadoDataset').style.display = 'block';
    document.getElementById('textoDataset').innerHTML = `
        Para un modelo con <strong>${numFeatures} características</strong> y complejidad <strong>${complejidad}</strong>,
        se recomienda un dataset mínimo de <strong>${datasetRecomendado.toLocaleString()}</strong> registros.<br><br>
        <em>Ideal: ${(datasetRecomendado * 2).toLocaleString()} - ${(datasetRecomendado * 5).toLocaleString()} registros</em>
    `;
}

function calcularTiempoGPU() {
    const tamDataset = parseInt(document.getElementById('tamDataset').value);
    const epocas = parseInt(document.getElementById('epocas').value);
    const tipoGpu = document.getElementById('tipoGpu').value;
    
    let velocidad = 1000; // registros por segundo
    if (tipoGpu === 'V100') velocidad = 2500;
    if (tipoGpu === 'A100') velocidad = 5000;
    
    const tiempoSegundos = (tamDataset / velocidad) * epocas;
    const horas = Math.floor(tiempoSegundos / 3600);
    const minutos = Math.floor((tiempoSegundos % 3600) / 60);
    
    document.getElementById('resultadoGPU').style.display = 'block';
    document.getElementById('textoGPU').innerHTML = `
        Con <strong>${tamDataset.toLocaleString()}</strong> registros, <strong>${epocas}</strong> épocas 
        y GPU <strong>${tipoGpu}</strong>:<br><br>
        ⏱️ Tiempo estimado: <strong>${horas}h ${minutos}m</strong><br>
        💰 Costo estimado (cloud): <strong>${(tiempoSegundos * 0.002).toFixed(2)}</strong>
    `;
}

function calcularROI() {
    const inversion = parseFloat(document.getElementById('inversion').value);
    const ahorro = parseFloat(document.getElementById('ahorro').value);
    const periodo = parseInt(document.getElementById('periodo').value);
    
    const ahorroTotal = ahorro * periodo;
    const roi = ((ahorroTotal - inversion) / inversion * 100).toFixed(1);
    const payback = (inversion / ahorro).toFixed(1);
    
    document.getElementById('resultadoROI').style.display = 'block';
    document.getElementById('textoROI').innerHTML = `
        <strong>Inversión:</strong> ${inversion.toLocaleString()}<br>
        <strong>Ahorro Total (${periodo} meses):</strong> ${ahorroTotal.toLocaleString()}<br>
        <strong>Beneficio Neto:</strong> ${(ahorroTotal - inversion).toLocaleString()}<br><br>
        📊 <strong>ROI:</strong> ${roi}%<br>
        ⏱️ <strong>Payback Period:</strong> ${payback} meses<br><br>
        ${roi > 100 ? '✅ <strong>Proyecto muy rentable</strong>' : roi > 50 ? '✅ Proyecto rentable' : '⚠️ Rentabilidad moderada'}
    `;
}

function calcularCostoCloud() {
    const horasGpu = parseFloat(document.getElementById('horasGpu').value);
    const instancias = parseInt(document.getElementById('instancias').value);
    const storage = parseFloat(document.getElementById('storage').value);
    
    const costoGpu = horasGpu * 2.5; // $2.5/hora GPU
    const costoCompute = instancias * 100; // $100/instancia/mes
    const costoStorage = storage * 50; // $50/TB/mes
    
    const costoTotal = costoGpu + costoCompute + costoStorage;
    
    document.getElementById('resultadoCloud').style.display = 'block';
    document.getElementById('textoCloud').innerHTML = `
        💻 <strong>GPU:</strong> ${costoGpu.toFixed(2)} (${horasGpu}h × $2.5/h)<br>
        🖥️ <strong>Compute:</strong> ${costoCompute.toFixed(2)} (${instancias} × $100)<br>
        💾 <strong>Storage:</strong> ${costoStorage.toFixed(2)} (${storage}TB × $50)<br><br>
        💰 <strong>Total Mensual:</strong> ${costoTotal.toFixed(2)}<br>
        📅 <strong>Total Anual:</strong> ${(costoTotal * 12).toFixed(2)}
    `;
}

// ========================================
// FUNCIONES AUXILIARES
// ========================================

function mostrarNotificacion(titulo, mensaje, tipo = 'info') {
    const contenedor = document.getElementById('contenedorNotificaciones');
    const notif = document.createElement('div');
    notif.className = `notificacion ${tipo}`;
    notif.innerHTML = `
        <div class="notificacion-titulo">${titulo}</div>
        ${mensaje ? `<div class="notificacion-mensaje">${mensaje}</div>` : ''}
    `;
    
    contenedor.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notif.remove(), 300);
    }, 5000);
}

function toggleTema() {
    document.body.classList.toggle('tema-oscuro');
    const tema = document.body.classList.contains('tema-oscuro') ? 'oscuro' : 'claro';
    mostrarNotificacion('Tema Cambiado', `Tema ${tema} activado`, 'info');
}

function abrirBusqueda() {
    mostrarNotificacion('Búsqueda Global', 'Función de búsqueda en desarrollo', 'info');
}

function nuevoProyecto() {
    generarProyectoAleatorio();
}

function exportarDatos() {
    const datos = {
        proyectos,
        incidentes,
        metricas: DATOS_INICIALES.metricas,
        fecha: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(datos, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sistema-gestion-ia-${Date.now()}.json`;
    a.click();
    
    mostrarNotificacion('Datos Exportados', 'Archivo JSON descargado correctamente', 'exito');
}

function generarReporte() {
    mostrarNotificacion('Generando Reporte', 'El reporte semanal se está generando...', 'info');
    setTimeout(() => {
        mostrarNotificacion('Reporte Generado', 'Reporte semanal listo para descargar', 'exito');
    }, 2000);
}

function exportarReporte() {
    generarReporte();
}

function crearVentanaGrafico(tipo) {
    mostrarNotificacion('Abriendo Gráfico', `Cargando gráfico: ${tipo}`, 'info');
}

// ========================================
// ANIMACIÓN CSS ADICIONAL
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes ventanaFadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
`;
document.head.appendChild(style);

console.log('✅ Sistema de Gestión IA iniciado correctamente');
console.log('📊 Proyectos cargados:', proyectos.length);
console.log('🎯 Incidentes cargados:', incidentes.length);
console.log('🤖 Sistema listo para uso');'rgba(40, 167, 69, 0.7)'
                    ],
                    borderColor: [
                        'rgb(108, 117, 125)',
                        'rgb(23, 162, 184)',
                        'rgb(40, 167, 69)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Distribución de Incidentes por Estado'
                    }
                }
            }
        });
    }
    
    // Curva S
    const ctxCurvaS = document.getElementById('graficoCurvaS');
    if (ctxCurvaS) {
        const semanas = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'];
        
        new Chart(ctxCurvaS, {
            type: 'line',
            data: {
                labels: semanas,
                datasets: [
                    {
                        label: 'Valor Planificado (VP)',
                        data: [0, 12, 25, 38, 52, 65, 80, 100],
                        borderColor: 'rgba(108, 117, 125, 1)',
                        backgroundColor: 'rgba(108, 117, 125, 0.1)',
                        borderDash: [5, 5],
                        tension: 0.4
                    },
                    {
                        label: 'Valor Ganado (VG)',
                        data: [0, 10, 23, 42, 58, 70, 85, 95],
                        borderColor: 'rgba(0, 102, 204, 1)',
                        backgroundColor: 'rgba(0, 102, 204, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Costo Real (CR)',
                        data: [0, 11, 26, 40, 56, 68, 82, 92],
                        borderColor: 'rgba(40, 167, 69, 1)',
                        backgroundColor: 'rgba(40, 167, 69, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Curva S - Análisis de Valor Ganado'
                    }
                }
            }
        });
    }
}

function crearGraficosTecnicos() {
    // Evolución de Métricas
    const ctxEvolucion = document.getElementById('graficoEvolucionMetricas');
    if (ctxEvolucion) {
        const versiones = ['v1.0', 'v1.1', 'v1.2', 'v1.3', 'v1.4'];
        
        new Chart(ctxEvolucion, {
            type: 'line',
            data: {
                labels: versiones,
                datasets: [
                    {
                        label: 'Accuracy',
                        data: [89.2, 90.5, 91.8, 92.5, 92.8],
                        borderColor: 'rgba(0, 102, 204, 1)',
                        backgroundColor: 'rgba(0, 102, 204, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Precision',
                        data: [85.1, 87.3, 88.9, 89.3, 90.1],
                        borderColor: 'rgba(40, 167, 69, 1)',
                        backgroundColor: 'rgba(40, 167, 69, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Recall',
                        data: [87.5, 89.2, 90.6, 91.8, 92.2],
                        borderColor: 'rgba(255, 193, 7, 1)',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'F1-Score',
                        data: [86.3, 88.2, 89.7, 90.5, 91.1],
                        borderColor: 'rgba(220, 53, 69, 1)',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 80,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Evolución de Métricas por Versión del Modelo'
                    }
                }
            }
        });
    }
    
    // Curva ROC
    const ctxROC = document.getElementById('graficoCurvaROC');
    if (ctxROC) {
        const puntos = [];
        for (let i = 0; i <= 100; i += 5) {
            const fpr = i / 100;
            const tpr = Math.pow(fpr, 0.6);
            puntos.push({x: fpr, y: tpr});
        }
        
        new Chart(ctxROC, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Curva ROC (AUC = 0.95)',
                        data: puntos,
                        borderColor: 'rgba(0, 102, 204, 1)',
                        backgroundColor: 'rgba(0, 102, 204, 0.2)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0
                    },
                    {
                        label: 'Línea Base (AUC = 0.5)',
                        data: [{x: 0, y: 0}, {x: 1, y: 1}],
                        borderColor: 'rgba(108, 117, 125, 1)',
                        borderDash: [5, 5],
                        fill: false,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'linear',
                        title: {
                            display: true,
                            text: 'Tasa de Falsos Positivos (FPR)'
                        },
                        min: 0,
                        max: 1
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Tasa de Verdaderos Positivos (TPR)'
                        },
                        min: 0,
                        max: 1
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Curva ROC - Receiver Operating Characteristic'
                    }
                }
            }
        });
    }
    
    // Curvas de Aprendizaje
    const ctxAprendizaje = document.getElementById('graficoCurvasAprendizaje');
    if (ctxAprendizaje) {
        const epocas = Array.from({length: 50}, (_, i) => i + 1);
        const lossEntrenamiento = epocas.map(e => 0.5 * Math.exp(-e / 15) + 0.05);
        const lossValidacion = epocas.map(e => 0.5 * Math.exp(-e / 15) + 0.08 + Math.random() * 0.02);
        
        new Chart(ctxAprendizaje, {
            type: 'line',
            data: {
                labels: epocas,
                datasets: [
                    {
                        label: 'Loss Entrenamiento',
                        data: lossEntrenamiento,
                        borderColor: 'rgba(0, 102, 204, 1)',
                        backgroundColor: 'rgba(0, 102, 204, 0.1)',
                        tension: 0.4,
                        pointRadius: 1
                    },
                    {
                        label: 'Loss Validación',
                        data: lossValidacion,
                        borderColor: 'rgba(220, 53, 69, 1)',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        tension: 0.4,
                        pointRadius: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Épocas'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Loss'
                        },
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Curvas de Aprendizaje - Loss vs Épocas'
                    }
                }
            }
        });
    }
}

function crearGraficosITIL() {
    // Tendencia de Incidentes
    const ctxTendencia = document.getElementById('graficoTendenciaIncidentes');
    if (ctxTendencia) {
        const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        
        new Chart(ctxTendencia, {
            type: 'line',
            data: {
                labels: dias,
                datasets: [
                    {
                        label: 'Crítica',
                        data: [2, 3, 1, 4, 2, 1, 0],
                        borderColor: 'rgba(220, 53, 69, 1)',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Alta',
                        data: [5, 7, 6, 8, 6, 3, 2],
                        borderColor: 'rgba(255, 193, 7, 1)',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Media',
                        data: [8, 10, 9, 11, 10, 5, 4],
                        borderColor: 'rgba(23, 162, 184, 1)',
                        backgroundColor: 'rgba(23, 162, 184, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Tendencia de Incidentes por Prioridad'
                    }
                }
            }
        });
    }
    
    // Distribución por Categoría
    const ctxDistribucion = document.getElementById('graficoDistribucionIncidentes');
    if (ctxDistribucion) {
        const categorias = {};
        incidentes.forEach(inc => {
            categorias[inc.categoria] = (categorias[inc.categoria] || 0) + 1;
        });
        
        new Chart(ctxDistribucion, {
            type: 'pie',
            data: {
                labels: Object.keys(categorias),
                datasets: [{
                    data: Object.values(categorias),
                    backgroundColor: [
                        'rgba(0, 102, 204, 0.7)',
                        'rgba(40, 167, 69, 0.7)',
                        'rgba(220, 53, 69, 0.7)',
                        'rgba(255, 193, 7, 0.7)',
                        'rgba(23, 162, 184, 0.7)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Incidentes por Categoría'
                    }
                }
            }
        });
    }
    
    // Tiempo de Resolución
    const ctxTiempo = document.getElementById('graficoTiempoResolucion');
    if (ctxTiempo) {
        new Chart(ctxTiempo, {
            type: 'bar',
            data: {
                labels: ['Crítica', 'Alta', 'Media', 'Baja'],
                datasets: [
                    {
                        label: 'Tiempo Promedio (horas)',
                        data: [2.5, 4.2, 6.8, 12.5],
                        backgroundColor: 'rgba(0, 102, 204, 0.7)',
                        borderColor: 'rgba(0, 102, 204, 1)',
                        borderWidth: 2
                    },
                    {
                        label: 'SLA (horas)',
                        data: [4, 8, 16, 24],
                        backgroundColor: 'rgba(40, 167, 69, 0.3)',
                        borderColor: 'rgba(40, 167, 69, 1)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    title: {
                        display: true,
                        text: 'Tiempo de Resolución vs SLA por Prioridad'
                    }
                }
            }
        });
    }
}

function crearGraficosFinancieros() {
    // Distribución de Presupuesto
    const ctxPresupuesto = document.getElementById('graficoPresupuesto');
    if (ctxPresupuesto) {
        new Chart(ctxPresupuesto, {
            type: 'doughnut',
            data: {
                labels: ['Personal', 'Hardware/GPU', 'Software/Licencias', 'Datos', 'Infraestructura Cloud', 'Otros'],
                datasets: [{
                    data: [45, 20, 12, 8, 10, 5],
                    backgroundColor: [
                        'rgba(0, 102, 204, 0.7)',
                        'rgba(40, 167, 69, 0.7)',
                        'rgba(255, 193, 7, 0.7)',
                        'rgba(220, 53, 69, 0.7)',
                        'rgba(23, 162, 184, 0.7)',
                        'rgba(108, 117, 125, 0.7)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Distribución del Presupuesto por Categoría'
                    }
                }
            }
        });
    }
    
    // Gasto Mensual
    const ctxGasto = document.getElementById('graficoGastoMensual');
    if (ctxGasto) {
        new Chart(ctxGasto, {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Gasto Mensual ($K)',
                    data: [45, 52, 48, 65, 72, 68, 75, 82, 78, 85, 90, 95],
                    backgroundColor: 'rgba(0, 102, 204, 0.7)',
                    borderColor: 'rgba(0, 102, 204, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value + 'K';
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Gasto Mensual Acumulado 2024'
                    }
                }
            }
        });
    }
}

function crearGraficosMetricasIA() {
    // Importancia de Características
    const ctxImportancia = document.getElementById('graficoImportanciaCaracteristicas');
    if (ctxImportancia) {
        const features = [
            'transaction_amount', 'time_since_last', 'location_risk', 'device_score',
            'merchant_category', 'user_age', 'account_age', 'velocity_1h',
            'avg_transaction_30d', 'ip_country', 'card_present', 'weekend_flag',
            'hour_of_day', 'distance_from_home', 'suspicious_pattern'
        ];
        
        const importancia = features.map(() => Math.random() * 0.3 + 0.05).sort((a, b) => b - a);
        
        new Chart(ctxImportancia, {
            type: 'bar',
            data: {
                labels: features,
                datasets: [{
                    label: 'Importancia',
                    data: importancia,
                    backgroundColor: 'rgba(0, 102, 204, 0.7)',
                    borderColor: 'rgba(0, 102, 204, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    title: {
                        display: true,
                        text: 'Importancia de Características del Modelo'
                    },
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Distribución de Predicciones
    const ctxDistPredicciones = document.getElementById('graficoDistribucionPredicciones');
    if (ctxDistPredicciones) {
        const bins = Array.from({length: 20}, (_, i) => (i + 1) * 5);
        const counts = bins.map(() => Math.floor(Math.random() * 500) + 100);
        
        new Chart(ctxDistPredicciones, {
            type: 'bar',
            data: {
                labels: bins.map(b => b + '%'),
                datasets: [{
                    label: 'Frecuencia',
                    data: counts,
                    backgroundColor: 'rgba(0, 102, 204, 0.7)',
                    borderColor: 'rgba(0, 102, 204, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Probabilidad Predicha (%)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Número de Predicciones'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Distribución de Probabilidades Predichas'
                    },
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

function crearGraficoGantt() {
    const ctx = document.getElementById('graficoGantt');
    if (!ctx) return;
    
    const tareas = [
        {nombre: 'Recolección de Datos', inicio: 0, duracion: 10},
        {nombre: 'Análisis Exploratorio', inicio: 8, duracion: 8},
        {nombre: 'Ingeniería de Features', inicio: 14, duracion: 12},
        {nombre: 'Entrenamiento Modelo', inicio: 24, duracion: 15},
        {nombre: 'Validación y Ajuste', inicio: 36, duracion: 10},
        {nombre: 'Deployment', inicio: 44, duracion: 6},
        {nombre: 'Monitoreo Post-Deploy', inicio: 48, duracion: 8}
    ];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tareas.map(t => t.nombre),
            datasets: [{
                label: 'Duración (días)',
                data: tareas.map(t => ({x: [t.inicio, t.inicio + t.duracion], y: t.nombre})),
                backgroundColor: 'rgba(0, 102, 204, 0.7)',
                borderColor: 'rgba(0, 102, 204, 1)',
                borderWidth: 2,
                barThickness: 30
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Días desde inicio del proyecto'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Diagrama de Gantt - Cronograma del Proyecto',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    });
}

function crearMatrizConfusion() {
    const ctx = document.getElementById('graficoMatrizConfusion');
    if (!ctx) return;
    
    // Datos de matriz de confusión 2x2
    const vp = 850; // Verdaderos Positivos
    const fp = 95;  // Falsos Positivos
    const fn = 78;  // Falsos Negativos
    const vn = 920; // Verdaderos Negativos
    
    const contenedor = ctx.parentElement;
    contenedor.innerHTML = `
        <div style="max-width: 500px; margin: 0 auto;">
            <h3 style="text-align: center; margin-bottom: 20px;">Matriz de Confusión</h3>
            <div style="display: grid; grid-template-columns: 100px 1fr 1fr; gap: 10px; text-align: center;">
                <div></div>
                <div style="font-weight: 600; padding: 10px;">Predicho Negativo</div>
                <div style="font-weight: 600; padding: 10px;">Predicho Positivo</div>
                
                <div style="font-weight: 600; padding: 10px; writing-mode: vertical-rl; transform: rotate(180deg);">Real Negativo</div>
                <div style="background: linear-gradient(135deg, rgba(40, 167, 69, 0.8), rgba(40, 167, 69, 0.6)); padding: 30px; border-radius: 8px; font-size: 32px; font-weight: 700; color: white;">
                    ${vn}
                    <div style="font-size: 14px; margin-top: 8px;">Verdaderos Negativos</div>
                </div>
                <div style="background: linear-gradient(135deg, rgba(220, 53, 69, 0.8), rgba(220, 53, 69, 0.6)); padding: 30px; border-radius: 8px; font-size: 32px; font-weight: 700; color: white;">
                    ${fp}
                    <div style="font-size: 14px; margin-top: 8px;">Falsos Positivos</div>
                </div>
                
                <div style="font-weight: 600; padding: 10px; writing-mode: vertical-rl; transform: rotate(180deg);">Real Positivo</div>
                <div style="background: linear-gradient(135deg, rgba(220, 53, 69, 0.8), rgba(220, 53, 69, 0.6)); padding: 30px; border-radius: 8px; font-size: 32px; font-weight: 700; color: white;">
                    ${fn}
                    <div style="font-size: 14px; margin-top: 8px;">Falsos Negativos</div>
                </div>
                <div style="background: linear-gradient(135deg, rgba(40, 167, 69, 0.8), rgba(40, 167, 69, 0.6)); padding: 30px; border-radius: 8px; font-size: 32px; font-weight: 700; color: white;">
                    ${vp}
                    <div style="font-size: 14px; margin-top: 8px;">Verdaderos Positivos</div>
                </div>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: var(--bg-principal); border-radius: 8px;">
                <h4>Métricas Calculadas:</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px;">
                    <div>
                        <strong>Accuracy:</strong> ${((vp + vn) / (vp + vn + fp + fn) * 100).toFixed(2)}%
                    </div>
                    <div>
                        <strong>Precision:</strong> ${(vp / (vp + fp) * 100).toFixed(2)}%
                    </div>
                    <div>
                        <strong>Recall:</strong> ${(vp / (vp + fn) * 100).toFixed(2)}%
                    </div>
                    <div>
                        <strong>Specificity:</strong> ${(vn / (vn + fp) * 100).toFixed(2)}%
                    </div>
                </div>
            </div>
        </div>
    `;
}

function crearGraficoComparacion() {
    const ctx = document.getElementById('graficoComparacionRadar');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'Velocidad', 'Eficiencia'],
            datasets: [
                {
                    label: 'Modelo v1.0',
                    data: [89, 85, 88, 86, 95, 90],
                    borderColor: 'rgba(108, 117, 125, 1)',
                    backgroundColor: 'rgba(108, 117, 125, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'Modelo v1.1',
                    data: [91, 89, 90, 89, 88, 85],
                    borderColor: 'rgba(255, 193, 7, 1)',
                    backgroundColor: 'rgba(255, 193, 7, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'Modelo v1.2 (Actual)',
                    data: [93, 89, 92, 91, 85, 88],
                    borderColor: 'rgba(0, 102, 204, 1)',
                    backgroundColor: 'rgba(0, 102, 204, 0.2)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Comparación Multidimensional de Modelos'
                }
            }
        }
    });
}

function crearMatrizRiesgos() {
    const ctx = document.getElementById('graficoMatrizRiesgos');
    if (!ctx) return;
    
    const riesgos = [
        {nombre: 'Overfitting', probabilidad: 70, impacto: 80},
        {nombre: 'Sesgo', probabilidad: 60, impacto: 90},
        {nombre: 'Drift', probabilidad: 50, impacto: 70},
        {nombre: 'Interpretabilidad', probabilidad: 40, impacto: 60},
        {nombre: 'Proveedor', probabilidad: 30, impacto: 85},
        {nombre: 'Regulación', probabilidad: 25, impacto: 95}
    ];
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Riesgos',
                data: riesgos.map(r => ({
                    x: r.probabilidad,
                    y: r.impacto,
                    label: r.nombre
                })),
                backgroundColor: riesgos.map(r => {
                    const nivel = r.probabilidad * r.impacto;
                    if (nivel > 5000) return 'rgba(220, 53, 69, 0.7)';
                    if (nivel > 3000) return 'rgba(255, 193, 7, 0.7)';
                    return 'rgba(40, 167, 69, 0.7)';
                }),
                borderColor: riesgos.map(r => {
                    const nivel = r.probabilidad * r.impacto;
                    if (nivel > 5000) return 'rgb(220, 53, 69)';
                    if (nivel > 3000) return 'rgb(255, 193, 7)';
                    return 'rgb(40, 167, 69)';
                }),
                borderWidth: 2,
                pointRadius: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Probabilidad (%)'
                    },
                    min: 0,
                    max: 100
                },
                y: {
                    title: {
                        display: true,
                        text: 'Impacto (%)'
                    },
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Matriz de Riesgos - Probabilidad vs Impacto'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return riesgos[context.dataIndex].nombre + 
                                   ` (P: ${context.parsed.x}%, I: ${context.parsed.y}%)`;
                        }
                    }
                }
            }
        }
    });
}

function iniciarMonitorTiempoReal() {
    const ctx = document.getElementById('graficoTiempoReal');
    if (!ctx) return;
    
    const data = {
        labels: [],
        datasets: [
            {
                label: 'Predicciones/seg',
                data: [],
                borderColor: 'rgba(0, 102, 204, 1)',
                backgroundColor: 'rgba(0, 102, 204, 0.1)',
                tension: 0.4
            },
            {
                label: 'Latencia (ms)',
                data: [],
                borderColor: 'rgba(40, 167, 69, 1)',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                tension: 0.4,
                yAxisID: 'y1'
            }
        ]
    };
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: true
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Predicciones/seg'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Latencia (ms)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Monitor en Tiempo Real - Actualización cada 5 segundos'
                }
            }
        }
    });
    
    // Actualizar cada 5 segundos
    setInterval(() => {
        const tiempo = new Date().toLocaleTimeString('es-PE');
        const predicciones = Math.floor(Math.random() * 50) + 80;
        const latencia = Math.floor(Math.random() * 30) + 70;
        
        data.labels.push(tiempo);
        data.datasets[0].data.push(predicciones);
        data.datasets[1].data.push(latencia);
        
        // Mantener últimos 20 puntos
        if (data.labels.length > 20) {
            data.labels.shift();
            data.datasets[0].data.shift();
            data.datasets[1].data.shift();
        }
        
        chart.update();
    }, 5000);
}

// ========================================
// FUNCIONES DE CALCULADORAS
// ========================================

function calcularDataset() {
    const numFeatures = parseInt(document.getElementById('numFeatures').value);
    const complejidad = document.getElementById('complejidad').value;
    
    let multiplicador = 10;
    if (complejidad.includes('Media')) multiplicador = 20;
    if (complejidad.includes('Alta')) multiplicador = 50;
    
    const datasetRecomendado = numFeatures * multiplicador * 100;
    
    document.getElementById('resultadoDataset').style.display = 'block';
    document.getElementById('textoDataset').innerHTML = `
        Para un modelo con <strong>${numFeatures} características</strong> y complejidad <strong>${complejidad}</strong>,
        se recomienda un dataset mínimo de <strong>${datasetRecomendado.toLocaleString()}</strong> registros.<br><br>
        <em>Ideal: ${(datasetRecomendado * 2).toLocaleString()} - ${(datasetRecomendado * 5).toLocaleString()} registros</em>
    `;
}

function calcularTiempoGPU() {
    const tamDataset = parseInt(document.getElementById('tamDataset').value);
    const epocas = parseInt(document.getElementById('epocas').value);
    const tipoGpu = document.getElementById('tipoGpu').value;
    
    let velocidad = 1000; // registros por segundo
    if (tipoGpu === 'V100') velocidad = 2500;
    if (tipoGpu === 'A100') velocidad = 5000;
    
    const tiempoSegundos = (tamDataset / velocidad) * epocas;
    const horas = Math.floor(tiempoSegundos / 3600);
    const minutos = Math.floor((tiempoSegundos % 3600) / 60);
    
    document.getElementById('resultadoGPU').style.display = 'block';
    document.getElementById('textoGPU').innerHTML = `
        Con <strong>${tamDataset.toLocaleString()}</strong> registros, <strong>${epocas}</strong> épocas 
        y GPU <strong>${tipoGpu}</strong>:<br><br>
        ⏱️ Tiempo estimado: <strong>${horas}h ${minutos}m</strong><br>
        💰 Costo estimado (cloud): <strong>$${(tiempoSegundos * 0.002).toFixed(2)}</strong>
    `;
}

function calcularROI() {
    const inversion = parseFloat(document.getElementById('inversion').value);
    const ahorro = parseFloat(document.getElementById('ahorro').value);
    const periodo = parseInt(document.getElementById('periodo').value);
    
    const ahorroTotal = ahorro * periodo;
    const roi = ((ahorroTotal - inversion) / inversion * 100).toFixed(1);
    const payback = (inversion / ahorro).toFixed(1);
    
    document.getElementById('resultadoROI').style.display = 'block';
    document.getElementById('textoROI').innerHTML = `
        <strong>Inversión:</strong> $${inversion.toLocaleString()}<br>
        <strong>Ahorro Total (${periodo} meses):</strong> $${ahorroTotal.toLocaleString()}<br>
        <strong>Beneficio Neto:</strong> $${(ahorroTotal - inversion).toLocaleString()}<br><br>
        📊 <strong>ROI:</strong> ${roi}%<br>
        ⏱️ <strong>Payback Period:</strong> ${payback} meses<br><br>
        ${roi > 100 ? '✅ <strong>Proyecto muy rentable</strong>' : roi > 50 ? '✅ Proyecto rentable' : '⚠️ Rentabilidad moderada'}
    `;
}

function calcularCostoCloud() {
    const horasGpu = parseFloat(document.getElementById('horasGpu').value);
    const instancias = parseInt(document.getElementById('instancias').value);
    const storage = parseFloat(document.getElementById('storage').value);
    
    const costoGpu = horasGpu * 2.5; // $2.5/hora GPU
    const costoCompute = instancias * 100; // $100/instancia/mes
    const costoStorage = storage * 50; // $50/TB/mes
    
    const costoTotal = costoGpu + costoCompute + costoStorage;
    
    document.getElementById('resultadoCloud').style.display = 'block';
    document.getElementById('textoCloud').innerHTML = `
        💻 <strong>GPU:</strong> $${costoGpu.toFixed(2)} (${horasGpu}h × $2.5/h)<br>
        🖥️ <strong>Compute:</strong> $${costoCompute.toFixed(2)} (${instancias} × $100)<br>
        💾 <strong>Storage:</strong> $${costoStorage.toFixed(2)} (${storage}TB × $50)<br><br>
        💰 <strong>Total Mensual:</strong> $${costoTotal.toFixed(2)}<br>
        📅 <strong>Total Anual:</strong> $${(costoTotal * 12).toFixed(2)}
    `;
}

// ========================================
// FUNCIONES AUXILIARES
// ========================================

function mostrarNotificacion(titulo, mensaje, tipo = 'info') {
    const contenedor = document.getElementById('contenedorNotificaciones');
    const notif = document.createElement('div');
    notif.className = `notificacion ${tipo}`;
    notif.innerHTML = `
        <div class="notificacion-titulo">${titulo}</div>
        ${mensaje ? `<div class="notificacion-mensaje">${mensaje}</div>` : ''}
    `;
    
    contenedor.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notif.remove(), 300);
    }, 5000);
}

function toggleTema() {
    document.body.classList.toggle('tema-oscuro');
    const tema = document.body.classList.contains('tema-oscuro') ? 'oscuro' : 'claro';
    mostrarNotificacion('Tema Cambiado', `Tema ${tema} activado`, 'info');
}

function abrirBusqueda() {
    mostrarNotificacion('Búsqueda Global', 'Función de búsqueda en desarrollo', 'info');
}

function nuevoProyecto() {
    generarProyectoAleatorio();
}

function exportarDatos() {
    const datos = {
        proyectos,
        incidentes,
        metricas: DATOS_INICIALES.metricas,
        fecha: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(datos, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sistema-gestion-ia-${Date.now()}.json`;
    a.click();
    
    mostrarNotificacion('Datos Exportados', 'Archivo JSON descargado correctamente', 'exito');
}

function generarReporte() {
    mostrarNotificacion('Generando Reporte', 'El reporte semanal se está generando...', 'info');
    setTimeout(() => {
        mostrarNotificacion('Reporte Generado', 'Reporte semanal listo para descargar', 'exito');
    }, 2000);
}

function exportarReporte() {
    generarReporte();
}

function crearVentanaGrafico(tipo) {
    mostrarNotificacion('Abriendo Gráfico', `Cargando gráfico: ${tipo}`, 'info');
}

// ========================================
// ANIMACIÓN CSS ADICIONAL
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes ventanaFadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
`;
document.head.appendChild(style);

console.log('✅ Sistema de Gestión IA iniciado correctamente');
console.log('📊 Proyectos cargados:', proyectos.length);
console.log('🎯 Incidentes cargados:', incidentes.length);
console.log('🤖 Sistema listo para uso');
                      
                      
                      
                      
                      
                      
                      
                      
                      ,
