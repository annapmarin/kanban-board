let idTarget = null

let onDropCallback = () => { }

export function assignarOnDrop(callback) {
    onDropCallback = callback
}

/**
 *  Afegeix listeners de drag & drop a totes les columnes.
 *  Se crida després de renderitzar el tauler.
 */
export function iniciarDragDrop() {
    const columnes = document.querySelectorAll(".columna-drop")
    columnes.forEach((columna) => {
        if (columna.dataset.dropInit === "true") return
        columna.dataset.dropInit = "true"

        columna.addEventListener("dragover", onDragOver)
        columna.addEventListener("dragleave", onDragLeave)
        columna.addEventListener("drop", onDrop)
    })
}

/**
 * Afegeix els listeners de drag a una targeta concreta.
 * Es crida des de ui.js -> crearTargeta()
 * @param {HTMLElement} element 
 * @param {string} id 
 */
export function iniciarDragTargeta(element, id) {
    element.addEventListener("dragstart", (e) => onDragStart(e, id))
    element.addEventListener("dragend", onDragEnd)
}

/**
 *  S'executa quan comença a arrossegar una targeta.
 *  Guarda l'ID de la tasca al DataTransfer per recuperar-lo al drop.
 */
function onDragStart(e, id) {
    idTarget = id
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", id)

    setTimeout(() => {
        e.target.classList.add("dragging")
    }, 0)
}

/**
 *  S'executa quan s'acaba de fer drag.
 *  Elimina la classe visual de la targeta.
 */
function onDragEnd(e) {
    e.target.classList.remove("dragging")
    idTarget = null

    document.querySelectorAll(".columna-drop").forEach((col) => {
        col.classList.remove("drag-over")
    })
}

// Handlers de les columnes

/**
 *  S'executa mentres una targeta passa per damunt d'una columna.
 *  Evita el drop amb preventDefault()
 */
function onDragOver(e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    e.currentTarget.classList.add("drag-over")
}

/**
 *  S'executa quan la targeta surt de la zona d'una columna
 *  sense fer drop. Neteja l'efecte visual.
 */
function onDragLeave(e) {
    // Comprovam que realment sortim de la columna i no
    // d'un element fill
    if (!e.currentTarget.contains(e.relatedTarget)) {
        e.currentTarget.classList.remove("drag-over")
    }
}

/**
 *  S'executa quan la targeta es deixa a una nova columna.
 *  Recupera l'ID i crida el callback amb el nou estat.
 */
function onDrop(e) {
    e.preventDefault()
    e.currentTarget.classList.remove("drag-over")

    const id = e.dataTransfer.getData("text/plain")
    const nouEstat = e.currentTarget.dataset.estat

    if (id && nouEstat) {
        onDropCallback(id, nouEstat)
    }
}