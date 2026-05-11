import { crearTasca } from "./model.js";
import { carregarTasques, guardarTasques } from "./storage.js";

let tasques = []

const TASQUES_PROVA = [
    crearTasca("Crear estructura HTML", "Esquelet semàntic del projecte", "alta", "2026-05-20", "fet"),
    crearTasca("Implementar localStorage", "Model de dades i persistència", "alta", "2026-05-25", "enCurs"),
    crearTasca("Afegir drag & drop", "Arrossegar targetes entre columnes", "mitjana", "2026-06-01", "perFer"),
]

function init() {
    tasques = carregarTasques()

    if (tasques.length === 0) {
        tasques = TASQUES_PROVA
        guardarTasques(tasques)
    }

    console.log("✅ App iniciada. Tasques carregades:", tasques);
}

document.addEventListener("DOMContentLoaded", init)