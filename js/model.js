/**
 * Crea un objecte tasca nou
 * @param {string} titol - Títol de la tasca (obligatori)
 * @param {string} descripcio - Descripció de la tasca
 * @param {string} prioritat - "baixa" | "mitjana" | "alta"
 * @param {string} dataVenciment - "YYYY-MM-DD"
 * @param {string} estat - "perFer" | "enCurs" | "fet"
 * @returns {Object} Objecte tasca
 */
export function crearTasca(
    titol,
    descripcio = "",
    prioritat = "baixa",
    dataVenciment = "",
    estat = "perFer"
) {
    return {
        id: crypto.randomUUID(),
        titol,
        descripcio,
        prioritat,
        dataVenciment,
        estat,
        dataCreacio: new Date().toISOString().split("T")[0]
    };
}