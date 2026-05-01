# Tasca 1. Estructura base del projecte

L'estructura base proposada que s'ha creat pel projecte és la següent:

├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js    <- punt d'entrada
│   └── storage.js   <- carregar i guardar tasques
│   └── model.js     <- model de la tasca i creació d'objectes
│   └── ui.js        <- renderitzar tauler, formulari, targetes
│   └── filtres.js   <- tasques filtrades, cerca, estadístiques
│   └── dragdrop.js  <- tots els esdeveniments de drag & drop
├── img/
├── docs/
└── README.md

Després, s'anirà iterant i fent feina sobre ella segons les necessitats de mantenir un codi ordenat i net.
Finalment, s'inicialitza el projecte a Git i GitHub:

```bash
git init
git branch -M main
git add .
git commit -m "chore: estructura inicial del projecte"
```

```bash
git remote add origin https://github.com/annapmarin/kanban-board.git
git push -u origin main
```
