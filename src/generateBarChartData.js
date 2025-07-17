const fs = require("fs")
const path = require("path")

const data = require("../public/sante_mentale_2000_2025.json")

const troubles = ["Dépression", "Anxiété", "Bipolarité", "Stress post-traumatique"]

// ✅ Liste restreinte de régions
const regions = [
  "Île-de-France",
  "Auvergne-Rhône-Alpes",
  "Nouvelle-Aquitaine",
  "Occitanie",
  "Hauts-de-France",
]

const allYears = [...new Set(data.map((d) => d.annee))].sort()

const yearData = {}

allYears.forEach((year) => {
  const yearEntries = []

  regions.forEach((region) => {
    troubles.forEach((trouble) => {
      const filtered = data.filter(
        (d) => d.annee === year && d.trouble === trouble && d.region === region
      )

      const hommeData = filtered.filter((d) => d.sexe === "Homme")
      const femmeData = filtered.filter((d) => d.sexe === "Femme")

      if (hommeData.length === 0 && femmeData.length === 0) return

      yearEntries.push({
        trouble,
        region,
        Homme:
          hommeData.length > 0
            ? +(hommeData.reduce((sum, d) => sum + d.taux_prevalence, 0) / hommeData.length).toFixed(1)
            : 0,
        Femme:
          femmeData.length > 0
            ? +(femmeData.reduce((sum, d) => sum + d.taux_prevalence, 0) / femmeData.length).toFixed(1)
            : 0,
      })
    })
  })

  yearData[year] = yearEntries
})

fs.writeFileSync(
  path.join(__dirname, "../public/bar_chart_sante_mentale.json"),
  JSON.stringify(yearData, null, 2),
  "utf-8"
)

console.log("✅ Données régionales exportées avec succès.")
