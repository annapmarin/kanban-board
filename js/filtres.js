
/**
 * Filtra l'array de tasques segons els filtres actius.
 * 
 * @param {Array} tasques - Array de tasques
 * @param {Object} filtres - { estat, prioritat, cerca }
 */
export function getTasquesFiltrades(tasques, filtres) {
    const { estat, prioritat, cerca } = filtres

    return tasques.filter((tasca) => {

        // Filtre per estat
        if (estat && tasca.estat !== estat) return false

        // Filtre per prioritat
        if (prioritat && tasca.prioritat !== prioritat) return false

        // Filtre per text
        if (cerca) {
            const textCerca = cerca.toLowerCase()
            const alTitol = tasca.titol.toLowerCase().includes(textCerca)
            const aLaDescripcio = tasca.descripcio?.toLowerCase().includes(textCerca) ?? false
            if (!alTitol && !aLaDescripcio) return false
        }

        return true
    })
}