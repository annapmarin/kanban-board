# Kanban board amb drag & drop

Aplicació web de gestió de tasques tipus Kanban, desenvolupada com a pràctica de l'assignatura de Desplegament d'Aplicacions Web. Permet organitzar les tasques en columnes d'estat, cercar-les, filtrar-les i veure estadístiques en temps real. Totes les dades es guarden al navegador, sense necessitat de tenir un servidor.

## Requeriments
* **Gestió de tasques (CRUD)**
  * Crear una tasca amb títol, descripció, prioritat i data límit.
  * Editar una tasca existent.
  * Eliminar una tasca.
* **Tauler Kanban**
  * Tres columnes d'estat: "Per fer", "En curs" i "Fet".
  * Canvi d'estat mínim via botó o selector.
  * Canvi d'estat via drag & drop.
* **Filtres i cerca**
  * Filtre per estat.
  * Filtre per prioritat.
  * Cerca de text al títol i a la descripció.
* **Estadístiques**
  * Total de tasques
  * Nombre de tasques per estat
  * Percentatge de tasques completades
* **Persistència**
  * Les dades es guarden a `localStorage` amb clau (`tasquesKanban`).
  * En recarregar la pàgina, les tasques es restauren tal com estaven.

## Eines
* **Maquetació**: HTML5
* **Estils**: Tailwind via CDN
* **Lògica**: JavaScript vanilla
* **Persistència**: Web API `localStorage`
* **Drag & Drop**: HTML Drag and Drop API (nativa del navegador)
* **Desplegament**: GitHub Pages
* **Control de versions**: Git + GitHub

## Model de dades
Cada tasca és un objecte de JavaScript amb aquesta estructura:
```js
{
    id: "uuid-generat", // identificador únic
    titol: "Nom de la tasca", // obligatori
    descripcio: "...", // opcional
    prioritat: "baixa", // "baixa" | "mitjana" | "alta"
    dataVenciment: "2026-06-01", // format YYYY-MM-DD
    estat: "perFer", // "perFer" | "enCurs" | "fet"
    dataCreacio: "2026-04-01" // format YY-MM-DD
}
```

## Documentació consultada
* HTML Drag and Drop API: [MDN - HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
* Kanban amb D&D: [MDN - Kanban board with drag and drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Kanban_board)
* localStorage: [MDN - Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
* Tailwind CSS: [tailwindcss.com/docs](https://tailwindcss.com/docs)