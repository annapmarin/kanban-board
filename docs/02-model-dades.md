# Model de dades i persistència

## Arxiu `model.js`
Defineix l'estructura d'una tasca i una funció (`generarTasca()`) que genera un objecte nou amb `crypto.randomUUID()` per generar un ID únic.

## Arxiu `storage.js`
Dues funcions:
* `carregarTasques()`: llegeix `localStorage`.
* `guardarTasques()`: guarda l'array com a JSON

## Arxiu `script.js`
És el punt d'entrada:
* Importa els mòduls
* Funció `init()` que carrega les tasques en arrencar
