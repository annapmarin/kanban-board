# Filtres i cerca

## Arxiu `filtres.js`
* `getTasquesFiltrades()`: rep un array de tasques i un objecte amb els filtres actius, i retorna l'array filtrat.

## Arxiu `script.js`
* Objecte `filtres` global que guarda l'estat actual
* Listeners als inputs de cerca i selects de filtre
* Cada canvi crida a `sincronitzar()` amb les tasques filtrades

## Arixiux `index.html`
Secció de filtratge amb un input per fer cerques per text i dos selectors (estat i prioritat).