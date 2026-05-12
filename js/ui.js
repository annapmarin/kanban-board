// Mapa de columnes
const COLUMNES = {
    perFer: "columna-perfer",
    enCurs: "columna-encurs",
    fet: "columna-fet"
}

// Mapa de prioritats
const PRIORITAT_ESTILS = {
    alta: { classe: "prioritat-alta", etiqueta: "🔴 Alta" },
    mitjana: { classe: "prioritat-mitjana", etiqueta: "🟡 Mitjana"},
    baixa: { classe: "prioritat-baixa", etiqueta: "🟢 Baixa" }
}

// Callbacks
let onEditar = () => {}
let onEliminar = () => {}
let onCanviarEstat = () => {}

/**
 * Assigna els callbacks de les accions de les targetes.
 * Es crida una vegada des de script.js a l'init.
 *
 * @param {Object} callbacks - { onEditar, onEliminar, onCanviarEstat }
 */
export function assignarCallbacks(callbacks) {
    onEditar = callbacks.onEditar ?? onEditar
    onEliminar = callbacks.onEliminar ?? onEditar
    onCanviarEstat = callbacks.onCanviarEstat ?? onCanviarEstat
}

/**
 * Buida les 3 columnes i les repinta amb les tasques rebudes.
 * Se crida cada vegada  que canvien les dades (crear, editar, eliminar, filtrar)
 * @param {Array} tasques 
 */
export function renderTauler(tasques) {
    // Buidar columnes
    Object.values(COLUMNES).forEach((id) => {
        const columna = document.getElementById(id)
        if (columna) columna.innerHTML = ""
    })

    // Pintar cada tasca a la seva columna
    tasques.forEach((tasca) => {
        const columnaId = COLUMNES[tasca.estat]
        const columna = document.getElementById(columnaId)

        if (!columna) return

        const targeta = crearTargeta(tasca)
        columna.appendChild(tasques)
    })

    actualitzarComptadors(tasques)
}

/**
 * Crea i retorna l'element HTML de la targeta amb una tasca.
 * 
 * @param {Object} tasca - Objecte tasca
 * @returns {HTMLElement} - Targeta
 */
export function crearTargeta(tasca) {
    const { classe, etiqueta } = PRIORITAT_ESTILS[tasca.prioritat] ?? PRIORITAT_ESTILS.baixa

    const article = document.createElement("article")
    article.className = "targeta"
    article.dataset.id = tasca.id

    // Drag & Drop
    article.draggable = true

    // Contingut HTML
    article.innerHTML = `
        <div class="targeta-cap">
        <span class="prioritat-badge ${classe}">${etiqueta}</span>
        <div class="targeta-accions">
            <button class="btn-editar" title="Editar" aria-label="Editar tasca">✏️</button>
            <button class="btn-eliminar" title="Eliminar" aria-label="Eliminar tasca">🗑️</button>
        </div>
        </div>

        <h3 class="targeta-titol">${escapeHtml(tasca.titol)}</h3>

        ${tasca.descripcio
        ? `<p class="targeta-descripcio">${escapeHtml(tasca.descripcio)}</p>`
        : ""}

        ${tasca.dataVenciment
        ? `<p class="targeta-data">📅 ${formatarData(tasca.dataVenciment)}</p>`
        : ""}

        <div class="targeta-peu">
        <select class="selector-estat" aria-label="Canviar estat">
            <option value="perFer" ${tasca.estat === "perFer" ? "selected" : ""}>Per fer</option>
            <option value="enCurs" ${tasca.estat === "enCurs" ? "selected" : ""}>En curs</option>
            <option value="fet" ${tasca.estat === "fet" ? "selected" : ""}>Fet</option>
        </select>
        </div>
    `

    // Botons
    article.querySelector(".btn-editar").addEventListener("click", () => onEditar(tasca.id))
    article.querySelector(".btn-eliminar").addEventListener("click", () => {
        if (confirm(`Eliminar la tasca "${tasca.titol}?`)) onEliminar(tasca.id)
    })
    article.querySelector(".selector-estat").addEventListener("change", (e) => {
        onCanviarEstat(tasca.id, e.target.value)
    })

    return article
}

/**
 * Ompl el formulari amb les dades d'una tasca existent (mode edició).
 * Si no existeix, el formulari queda buit (mode creació).
 * 
 * @param {Object|null} tasca - Tasca a editar o null si és una nova tasca 
 */
export function preomplirFormulari(tasca = null) {
    document.getElementById("camp-id").value = tasca?.id ?? ""
    document.getElementById("camp-titol").value = tasca?.titol ?? ""
    document.getElementById("camp-descripcio").value = tasca?.descripcio ?? ""
    document.getElementById("camp-prioritat").value = tasca?.prioritat ?? "baixa"
    document.getElementById("camp-data").value = tasca?.dataVenciment ?? ""
    document.getElementById("camp-estat").value = tasca?.estat ?? "perFer"

    const titolForm = document.getElementById("form-titol")
    const btnSubmit = document.getElementById("btn-submit")

    if (tasca) {
        titolForm.textContent = "Editar tasca"
        btnSubmit.textContent = "Guardar canvis"
    } else {
        titolForm.textContent = "Nova tasca"
        btnSubmit.textContent = "Afegir tasca"
    }

    mostrarFormulari()
}

export function mostrarFormulari() {
    document.getElementById("formulari-panel").classList.remove("formulari-ocult")
}

export function ocultarFormulari() {
    document.getElementById("formulari-panel").classList.add("formulari-ocult")
}

/**
 * Actualitza els comptadors d'estadístiques
 * 
 * @param {Array} tasques 
 */
export function actualitzarEstadistiques(tasques) {
    const total = tasques.length
    const perFer = tasques.filter((t) => t.estat === "perFer").length
    const enCurs = tasques.filter((t) => t.estat === "enCurs").length
    const fet = tasques.filter((t) => t.estat === "fet").length
    const percentatge = total > 0 ? Math.round((fet / total) * 100) : 0

    // Header
    document.getElementById("stat-total").textContent  = total;
    document.getElementById("stat-perfer").textContent = perFer;
    document.getElementById("stat-encurs").textContent = enCurs;
    document.getElementById("stat-fet").textContent    = fet;

    // Panell estadístiques
    document.getElementById("est-total").textContent   = total;
    document.getElementById("est-perfer").textContent  = perFer;
    document.getElementById("est-encurs").textContent  = enCurs;
    document.getElementById("est-fet").textContent     = fet;
    document.getElementById("est-pct").textContent     = `${percentatge}%`;

    // Barra de progrés
    document.getElementById("barra-progres").style.width = `${percentatge}%`;
}

/**
 * Actualitza el n. de tasques de cada columna
 * @param {Array} tasques 
 */
function actualitzarComptadors(tasques) {
    document.getElementById("comp-perfer").textContent = 
        tasques.filter((t) => t.estat === "perFer").length
    document.getElementById("comp-encurs").textContent =
        tasques.filter((t) => t.estat === "enCurs").length;
    document.getElementById("comp-fet").textContent =
        tasques.filter((t) => t.estat === "fet").length;
}

/**
 * Escapa caràcters HTML per evitar XSS
 * 
 * @param {string} text 
 * @returns {string}
 */
function escapeHtml(text) {
    const div = document.createElement("div")
    div.appendChild(document.createTextNode(text))
    return div.innerHTML
}

function formatarData(data) {
    if (!data) return ""

    const [any, mes, dia] = data.split("-")
    return `${dia}/${mes}/${any}`
}