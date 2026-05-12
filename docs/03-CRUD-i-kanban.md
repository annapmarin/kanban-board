# CRUD i Kanban

## Arxiu `ui.js`
* Callbacks: `ui.js` no sap res de `storage.js` ni de `model.js`. Quan l'usuari clica "Editar" o "Eliminar", simplement crida un callback que `script.js` assignarà
* `renderTauler()` -> Funció principal, que buida les 3 columnes i les torna a pintar de zero amb les tasques actuals
* `crearTargeta()` -> genera l'HTML d'una targeta amb tots els atributs de la tasca i botons d'editar, eliminar i selector d'estat
* `mostrarFormulari()` i `amagarFormulari()` -> per mostrar o amagar el formulari lateral
* `preomplirFormulari()` -> en editar una tasca, omple el formulari per editar-la, si és nova, apareix en blanc
* `escapeHtml()` — Funció de seguretat imprescindible. Evita que si algú escriu `<script>` s'executi al navegador (XSS).

## Arxiu `dragdrop.js`
📖 Referència: [MDN — HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

### Flux del drag & drop
[s'arrossega targeta]
↓
`dragstart`: guarda l'ID al DataTransfer
↓
`dragover`: marca la columna visualment
↓
`drop`: recupera l'ID, llegeix l'estat de la columna
↓
`onDropCallback`: script.js actualitza les dades
↓
`dragend`: reset de les classes visuals

### Funcions exportades
* `assignarOnDrop()` -> assigna la funció que s'executarà quan una targeta canviï de columna. Es crida des de `script.js` durant l'`init()`.
* `iniciarDragDrop()` -> afegeix els listeners de columna a tots els elements amb la classe `.columna-drop`. Es crida cada vegada que es renderitza el tauler.
* `iniciarDragTargeta()` -> afegeix els listeners de les targetes a un element concret. Es crida desde `ui.js` en el moment de crear cada targeta.

### Funcions privades
* `onDragStart()` -> s'executa quan es fa drag. Desa l'ID de la tasca al `DataTransfer`. Aplica la classe `.dragging` amb un `setTimeout` de 0ms per evitar el tick del navegador.
* `onDragEnd()` -> s'executa quan s'acaba el drag. Elimina la classe `.dragging`.
* `onDragOver()` -> s'executa contínuament mentre la targeta passa per damunt d'una columna. Afegeix la classe `.drag-over`.
* `onDragLeave()` -> s'executa quan la targeta surt d'una columna sense fer drop. Elimina `.drag-over` i evita un efecte visual de parpalleig que passa quan el mouse se situa per damunt de qualsevol element fill de la columna.
* `onDrop()` -> s'executa quan es fa drop. Recupera l'ID del `DataTransfer` i el nou estat de l'atribut `data-estat` de la columna.

## Arxiu `index.html`
Construcció del formulari complet: els camps, les tres columnes de Kanban i la zona dels filtres.

## Arxiu `script.js`
Modificació per afegir les funcions CRUD que connecten la UI amb el model i el storage:
* `afegirTasca(dades)`
* `editarTasca(id, dades)`
* `eliminarTasca(id)`
* `canviarEstat(id, nouEstat)`

## Arxiu `index.html`
* Bloc 1 (`<head>`): meta tags, títol, CDN de Tailwind, Google Fonts, importació dels estils i del mòdul de javascript
* Bloc 2 (`<header>`): títol, estadístiques ràpides, botó per crear una nova tasca
* Bloc 3 (`<aside>`): formulari amb els camps hidden, botons per fer submit i cancel·lar, panell d'estadístiques
* Bloc 4 (`<main>`): zona de filtres i tauler kanban
* Bloc 5 (`<footer>`): crèdits i enllaç al repositori