# Tableau de bord – Santé mentale (Devoir 5)

Bienvenue sur mon projet de **tableau de bord interactif**, portant sur l’évolution des troubles de santé mentale au Canada entre **2000 et 2025**.  
Ce projet a été réalisé dans le cadre du **cours SEG3525 – Conception et analyse des interfaces usagers**, à l’Université d’Ottawa.  
Il met en application les principes d’**accessibilité**, de **visualisation des données** et de **design centré sur l’utilisateur (CCU)**.


## 📊 Objectif

Le tableau de bord permet de visualiser :
- L’évolution temporelle des taux de prévalence de différents troubles psychologiques selon le **groupe d’âge**
- Une **comparaison par sexe** des troubles pour une année donnée

Il inclut des **filtres dynamiques** pour ajuster la vue selon l’année, le trouble, le sexe et la région.  
L’interface est **partiellement bilingue (FR/EN)** et responsive.


## 🛠️ Technologies utilisées

- **React** – Interface en composants
- **JavaScript** – Logique de filtrage et état
- **Recharts** – Librairie de graphiques (line + bar charts)
- **HTML/CSS** – Mise en page et style personnalisé
- **Git & GitHub Pages** – Hébergement statique


## 🔧 Structure du projet

```
tableau-sante-mentale/
├── public/
│   ├── bar_chart_sante_mentale.json      # Données du bar chart
│   ├── favicon.ico                       # Icône du site
│   ├── index.html                        # Fichier HTML principal
│   ├── logo192.png                       # Icône mobile (PWA)
│   ├── logo512.png                       # Icône haute résolution
│   ├── manifest.json                     # Métadonnées PWA
│   ├── robots.txt                        # Directive SEO
│   └── sante_mentale_2000_2025.json      # Données du line chart
│
├── src/
│   ├── App.js                            # Composant principal React
│   ├── App.css                           # Styles du tableau de bord
│   ├── generateBarChartData.js           # Script de génération JSON (optionnel)
│   ├── generateData.js                   # Script de transformation de données (optionnel)
│   ├── index.html                        # (peut être ignoré dans React, probablement erreur)
│   └── index.js                          # Point d’entrée React
│
├── .gitignore                            # Fichiers/dossiers à ignorer par Git
├── package.json                          # Dépendances et scripts du projet
├── package-lock.json                     # Verrouillage des versions (npm)
└── README.md                             # Documentation du projet

```


> [Lien vers le site final hébergé](https://sjsalma.github.io/tableau-de-bord/)

## 🌍 Fonctionnalités

- 🌐 **Bilingue** (Français / Anglais)
- 🧠 Filtres dynamiques : trouble, année, sexe, région
- 📈 Deux graphiques : `LineChart` (évolution par âge) et `BarChart` (comparaison par sexe)
- 📱 Responsive design
- 🎨 Interface claire, accessible, et visuellement équilibrée (3C : Contexte, Contraste, Clutter-free)


## 📬 Pour me contacter

* 📧 [sjsalma05@gmail.com](mailto:sjsalma05@gmail.com)
* 💼 [LinkedIn – Salma Sajid](https://www.linkedin.com/in/salma-sajid/)
