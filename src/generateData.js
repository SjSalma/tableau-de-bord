const fs = require("fs")

const annees = Array.from({ length: 26 }, (_, i) => 2000 + i)
const troubles = ["Dépression", "Anxiété", "Bipolarité", "Stress post-traumatique"]
const groupesAge = ["15-24", "25-44", "45-64", "65+"]
const sexes = ["Homme", "Femme"]
const regions = [
  "Île-de-France",
  "Auvergne-Rhône-Alpes",
  "Nouvelle-Aquitaine",
  "Occitanie",
  "Hauts-de-France",
]

const data = []

annees.forEach((annee) => {
  troubles.forEach((trouble) => {
    groupesAge.forEach((groupe_age) => {
      sexes.forEach((sexe) => {
        regions.forEach((region) => {
          let baseTaux = {
            "Dépression": 8,
            "Anxiété": 12,
            "Bipolarité": 2.5,
            "Stress post-traumatique": 4,
          }[trouble]

          const ageMultiplier = groupe_age === "15-24" ? 1.3 :
                                groupe_age === "25-44" ? 1.2 :
                                groupe_age === "45-64" ? 1.0 : 0.8

          const sexeMultiplier = sexe === "Femme" ? 1.4 : 1.0
          const covidMultiplier = (annee >= 2020 && annee <= 2023) ? 1.5 : 1.0
          const tendanceMultiplier = 1 + (annee - 2000) * 0.01
          const regionMultiplier = Math.random() * 0.3 + 0.85

          let taux = baseTaux * ageMultiplier * sexeMultiplier * covidMultiplier * tendanceMultiplier * regionMultiplier
          taux += (Math.random() - 0.5) * 2
          taux = Math.max(0.5, Math.min(25, Math.round(taux * 10) / 10))

          data.push({
            annee,
            trouble,
            groupe_age,
            sexe,
            region,
            taux_prevalence: taux,
          })
        })
      })
    })
  })
})

fs.writeFileSync("sante_mentale_2000_2025.json", JSON.stringify(data, null, 2), "utf-8")
console.log("✅ Fichier généré : sante_mentale_2000_2025.json")
