// Mapa de columnes
const COLUMNES = {
    perFer: "columna-perfer",
    enCurs: "columna-encurs",
    fet: "columna-fet"
}

// Mapa de prioritats
const PRIORITAT_ESTILS = {
    alta: { classeColor: "bg-red-900 text-red-300", etiqueta: "Alta" },
    mitjana: { classeColor: "bg-amber-900 text-amber-300", etiqueta: "Mitjana" },
    baixa: { classeColor: "bg-green-900 text-green-300", etiqueta: "Baixa" },
}

// Callbacks
let onEditar = () => { }
let onEliminar = () => { }
let onCanviarEstat = () => { }

/**
 * Assigna els callbacks de les accions de les targetes.
 * Es crida una vegada des de script.js a l'init.
 *
 * @param {Object} callbacks - { onEditar, onEliminar, onCanviarEstat }
 */
export function assignarCallbacks(callbacks) {
    onEditar = callbacks.onEditar ?? onEditar
    onEliminar = callbacks.onEliminar ?? onEliminar
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
        columna.appendChild(targeta)
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
    const { classeColor, etiqueta } = PRIORITAT_ESTILS[tasca.prioritat] ?? PRIORITAT_ESTILS.baixa

    const article = document.createElement("article")
    article.className = "bg-slate-700 rounded-lg p-3 border border-slate-600 hover:border-slate-500 transition-colors cursor-grab active:cursor-grabbing"
    article.dataset.id = tasca.id

    // Drag & Drop
    article.draggable = true

    // Contingut HTML
    article.innerHTML = `
        <div class="flex items-start justify-between gap-2 mb-2">
            <span class="text-xs font-medium px-2 py-0.5 rounded-full ${classeColor}">${etiqueta}</span>
            <div class="flex gap-1 shrink-0">
                <button class="btn-editar text-xs text-slate-400 hover:text-indigo-400 transition-colors px-1.5 py-0.5 rounded hover:bg-slate-700 cursor-pointer" title="Editar" aria-label="Editar tasca">Editar</button>
                <button class="btn-eliminar text-xs text-slate-400 hover:text-red-400 transition-colors px-1.5 py-0.5 rounded hover:bg-slate-700 cursor-pointer" title="Eliminar" aria-label="Eliminar tasca">Eliminar</button>
            </div>
        </div>

        <h3 class="text-sm font-semibold text-slate-100 mb-1 leading-snug">${escapeHtml(tasca.titol)}</h3>

        ${tasca.descripcio
            ? `<p class="text-xs text-slate-400 mb-2 leading-relaxed">${escapeHtml(tasca.descripcio)}</p>`
            : ""}

        ${tasca.dataVenciment
            ? `<p class="text-xs text-slate-500 mt-2">${formatarData(tasca.dataVenciment)}</p>`
            : ""}

        <input type="hidden" class="selector-estat" value="${tasca.estat}" />
    `

    // Botons
    article.querySelector(".btn-editar").addEventListener("click", () => onEditar(tasca.id))
    article.querySelector(".btn-eliminar").addEventListener("click", () => {
        if (confirm(`Eliminar la tasca "${tasca.titol}?`)) onEliminar(tasca.id)
    })

    // Listeners
    article.addEventListener("dragstart", (e) => {
        e.dataTransfer.effectAllowed = "move"
        e.dataTransfer.setData("text/plain", tasca.id)
        setTimeout(() => article.classList.add("dragging"), 0)
    })

    article.addEventListener("dragend", () => {
        article.classList.remove("dragging")
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

    document.getElementById("stat-total").textContent = total
    document.getElementById("stat-perfer").textContent = perFer
    document.getElementById("stat-encurs").textContent = enCurs
    document.getElementById("stat-fet").textContent = fet
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