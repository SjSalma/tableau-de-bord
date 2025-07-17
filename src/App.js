import { useEffect, useState, useMemo } from "react"
import './App.css'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

const translations = {
  fr: {
    title: "Tableau de Bord - Santé Mentale",
    subtitle: "Évolution des troubles psychologiques (2000-2025)",
    filters: "Filtres",
    trouble: "Trouble",
    year: "Année",
    sex: "Sexe",
    region: "Région",
    ageGroup: "Groupe d'âge",
    all: "Tous",
    male: "Homme",
    female: "Femme",
    chart1Title: "Évolution de la prévalence par groupe d'âge",
    chart2Title: "Comparaison par sexe",
    prevalenceRate: "Taux de prévalence (%)",
    year_label: "Année",
    troubles: {
      Dépression: "Dépression",
      Anxiété: "Anxiété",
      Bipolarité: "Bipolarité",
      "Stress post-traumatique": "Stress post-traumatique",
    },
  },
  en: {
    title: "Mental Health Dashboard",
    subtitle: "Evolution of psychological disorders (2000-2025)",
    filters: "Filters",
    trouble: "Disorder",
    year: "Year",
    sex: "Sex",
    region: "Region",
    ageGroup: "Age Group",
    all: "All",
    male: "Male",
    female: "Female",
    chart1Title: "Prevalence evolution by age group",
    chart2Title: "Comparison by sex and region",
    prevalenceRate: "Prevalence Rate (%)",
    year_label: "Year",
    troubles: {
      Dépression: "Depression",
      Anxiété: "Anxiety",
      Bipolarité: "Bipolar Disorder",
      "Stress post-traumatique": "PTSD",
    },
  },
}

export default function App() {
  const [language, setLanguage] = useState("fr")

  // Filtres pour LineChart
  const [selectedTrouble, setSelectedTrouble] = useState("Dépression")
  const [selectedSex, setSelectedSex] = useState("all")
  const [selectedRegion1, setSelectedRegion1] = useState("all")
  const [selectedYear1, setSelectedYear1] = useState(2025)

  // Filtres pour BarChart
  const [selectedYear2, setSelectedYear2] = useState(2025)
  const [selectedRegion2, setSelectedRegion2] = useState("all")

  const [data, setData] = useState([])
  const [barChartDataByYear, setBarChartDataByYear] = useState({})

  const t = translations[language]

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/sante_mentale_2000_2025.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Erreur chargement données :", err))
  }, [])

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/bar_chart_sante_mentale.json")
      .then((res) => res.json())
      .then((json) => setBarChartDataByYear(json))
      .catch((err) => console.error("Erreur barChart données :", err))
  }, [])

  const lineChartData = useMemo(() => {
    const filtered = data.filter(
      (d) =>
        d.trouble === selectedTrouble &&
        (selectedSex === "all" || d.sexe === (selectedSex === "male" ? "Homme" : "Femme")) &&
        (selectedRegion1 === "all" || d.region === selectedRegion1)
    )

    const grouped = {}
    filtered.forEach((item) => {
      const key = item.annee
      if (!grouped[key]) grouped[key] = { annee: item.annee }

      const ageGroups = ["15-24", "25-44", "45-64", "65+"]
      ageGroups.forEach((age) => {
        const ageData = filtered.filter((d) => d.annee === item.annee && d.groupe_age === age)
        if (ageData.length > 0) {
          grouped[key][age] =
            ageData.reduce((sum, d) => sum + d.taux_prevalence, 0) / ageData.length
        }
      })
    })

    return Object.values(grouped).sort((a, b) => a.annee - b.annee)
  }, [data, selectedTrouble, selectedSex, selectedRegion1])

  const rawBarData = barChartDataByYear[selectedYear2] || []
  const barChartData = useMemo(() => {
    if (!Array.isArray(rawBarData)) return []

    if (selectedRegion2 !== "all") {
      return rawBarData.filter((d) => d.region === selectedRegion2)
    }

    // Moyenne nationale par trouble (quand "all" est sélectionné)
    const grouped = {}
    rawBarData.forEach((d) => {
      const key = d.trouble
      if (!grouped[key]) {
        grouped[key] = { trouble: d.trouble, Homme: 0, Femme: 0, count: 0 }
      }
      grouped[key].Homme += d.Homme
      grouped[key].Femme += d.Femme
      grouped[key].count += 1
    })

    return Object.values(grouped).map((entry) => ({
      trouble: entry.trouble,
      Homme: +(entry.Homme / entry.count).toFixed(1),
      Femme: +(entry.Femme / entry.count).toFixed(1),
    }))
  }, [rawBarData, selectedRegion2])

  const uniqueRegions = [...new Set(data.map((d) => d.region))].filter(Boolean)
  const years = [...new Set(data.map((d) => d.annee))].sort((a, b) => b - a)

  const colors = {
    "15-24": "#8884d8",
    "25-44": "#82ca9d",
    "45-64": "#ffc658",
    "65+": "#ff7c7c",
    Homme: "#8884d8",
    Femme: "#82ca9d",
  }

  return (
    <div className="app-container">
      <div className="header">
        <div>
          <h1>{t.title}</h1>
          <p className="subtitle">{t.subtitle}</p>
        </div>
        <button
          className="language-toggle"
          onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
        >
          {language === "fr" ? "EN" : "FR"}
        </button>
      </div>

      {/* Filtres pour LineChart */}
      <div className="filters">
        <div>
          <label>{t.trouble}</label>
          <select value={selectedTrouble} onChange={(e) => setSelectedTrouble(e.target.value)}>
            {Object.keys(t.troubles).map((key) => (
              <option key={key} value={key}>
                {t.troubles[key]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>{t.sex}</label>
          <select value={selectedSex} onChange={(e) => setSelectedSex(e.target.value)}>
            <option value="all">{t.all}</option>
            <option value="male">{t.male}</option>
            <option value="female">{t.female}</option>
          </select>
        </div>

        <div>
          <label>{t.region}</label>
          <select value={selectedRegion1} onChange={(e) => setSelectedRegion1(e.target.value)}>
            <option value="all">{t.all}</option>
            {uniqueRegions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="chart-section">
        <h3>
          {t.chart1Title} - {t.troubles[selectedTrouble]}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={lineChartData}
            margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="annee" />
            <YAxis
              label={{
                value: t.prevalenceRate,
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { textAnchor: "middle" }
              }}
            />
            <Tooltip formatter={(v) => [`${v.toFixed(1)}%`, ""]} />
            <Legend />
            <Line type="monotone" dataKey="15-24" stroke={colors["15-24"]} />
            <Line type="monotone" dataKey="25-44" stroke={colors["25-44"]} />
            <Line type="monotone" dataKey="45-64" stroke={colors["45-64"]} />
            <Line type="monotone" dataKey="65+" stroke={colors["65+"]} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Filtres pour BarChart */}
      <div className="filters">
        <div>
          <label>{t.year}</label>
          <select value={selectedYear2} onChange={(e) => setSelectedYear2(parseInt(e.target.value))}>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>{t.region}</label>
          <select value={selectedRegion2} onChange={(e) => setSelectedRegion2(e.target.value)}>
            <option value="all">{t.all}</option>
            {uniqueRegions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="chart-section">
        <h3>{t.chart2Title} ({selectedYear2})</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={barChartData}
            margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="trouble" />
            <YAxis
              label={{
                value: t.prevalenceRate,
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { textAnchor: "middle" }
              }}
            />
            <Tooltip formatter={(v) => [`${v.toFixed(1)}%`, ""]} />
            <Legend />
            <Bar dataKey="Homme" fill={colors.Homme} />
            <Bar dataKey="Femme" fill={colors.Femme} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
