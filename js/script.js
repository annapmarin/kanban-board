import { crearTasca } from "./model.js";
import { carregarTasques, guardarTasques } from "./storage.js";
import { assignarCallbacks, renderTauler, preomplirFormulari, ocultarFormulari, actualitzarEstadistiques } from "./ui.js";
import { assignarOnDrop, iniciarDragDrop } from "./dragdrop.js";

let tasques = []

// CRUD
function afegirTasca(dades) {
    const nova = crearTasca(
        dades.titol,
        dades.descripcio,
        dades.prioritat,
        dades.dataVenciment,
        dades.estat
    )
    tasques.push(nova)
    sincronitzar()
}

function editarTasca(id, dades) {
    tasques = tasques.map((tasca) =>
        tasca.id === id ? { ...tasca, ...dades } : tasca
    )
    sincronitzar()
}

function eliminarTasca(id) {
    tasques = tasques.filter((tasca) => tasca.id !== id)
    sincronitzar()
}

function canviarEstat(id, nouEstat) {
    tasques = tasques.map((tasca) =>
        tasca.id === id ? { ...tasca, estat: nouEstat } : tasca
    )
    sincronitzar()
}

// Sincronització
function sincronitzar() {
    guardarTasques(tasques)
    renderTauler(tasques)
    iniciarDragDrop()
    actualitzarEstadistiques(tasques)
}

// Formulari
function gestionarSubmit(e) {
    e.preventDefault()

    const titol = document.getElementById("camp-titol").value.trim()

    if (!titol) {
        document.getElementById("error-titol").classList.remove("hidden")
        document.getElementById("camp-titol").focus()
        return
    }

    document.getElementById("error-titol").classList.add("hidden")

    const dades = {
        titol,
        descripcio: document.getElementById("camp-descripcio").value.trim(),
        prioritat: document.getElementById("camp-prioritat").value,
        dataVenciment: document.getElementById("camp-data").value,
        estat: document.getElementById("camp-estat").value,
    }

    const id = document.getElementById("camp-id").value

    if (id) {
        editarTasca(id, dades)
    } else {
        afegirTasca(dades)
    }

    ocultarFormulari()
}

// Listeners
function assignarListeners() {
    document.getElementById("btn-nova-tasca").addEventListener("click", () => {
        preomplirFormulari(null)
    })

    document.getElementById("btn-tancar-form").addEventListener("click", ocultarFormulari)
    document.getElementById("btn-cancelar").addEventListener("click", ocultarFormulari)
    document.getElementById("formulari-tasca").addEventListener("submit", gestionarSubmit)
}

// Init
function init() {
    assignarCallbacks({
        onEditar: (id) => preomplirFormulari(tasques.find((t) => t.id === id)),
        onEliminar: (id) => eliminarTasca(id),
        onCanviarEstat: (id, nouEstat) => canviarEstat(id, nouEstat),
    })

    assignarOnDrop((id, nouEstat) => canviarEstat(id, nouEstat))
    assignarListeners()

    tasques = carregarTasques()

    sincronitzar()
}

document.addEventListener("DOMContentLoaded", init)