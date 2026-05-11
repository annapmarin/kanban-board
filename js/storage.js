const CLAU = "tasquesKanban"

/**
 * Carrega les tasques guardades a localStorage.
 * 
 * @returns {Array} Array de tasques
 */
export function carregarTasques() {
    try {
        const dades = localStorage.getItem(CLAU)
        return dades ? JSON.parse(dades) : []
    } catch (error) {
        console.error("Error carregant tasques:", error)
    }
}

/**
 * Guarda l'array de tasques a localStorage.
 * 
 * @param {Array} tasques 
 */
export function guardarTasques(tasques) {
    try {
        localStorage.setItem(CLAU, JSON.stringify(tasques))
    } catch (error) {
        console.error("Error guardant les tasques:", error)
    }
}