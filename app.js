// Haetaan kaikki tarvittavat DOM-elementit
const desInput = document.querySelector("#desInput") // selitteen input
const amountInput = document.querySelector("#amountInput") // summan input
const addExpenseBtn = document.querySelector("#addExpenseBtn") // "Add Expense" -nappi
const totalExpense = document.querySelector("#totalExpense") // kohta jossa näytetään yhteissumma
const expenseList = document.querySelector("#expenseList") // <ul> kuluille

// Uudet elementit: haku ja filtterinapit
const searchInput = document.querySelector("#searchInput") // hakukenttä
const showAllExpensesBtn = document.querySelector("#showAllExpenses") // "Show All"
const showOver50Btn = document.querySelector("#showOver50") // "Over 50 €"

// Tänne talletetaan kaikki kulut
const expenses = []

// localStorage-avain (nimi voitaisiin keksiä vapaasti)
const STORAGE_KEY = "ExpensesTrage"

// Tallentaa nykyisen expenses-taulukon localStorageen
function tosave() {
  // JSON.stringify muuttaa taulukon tekstiksi, jonka localStorage ymmärtää
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
}

// Lataa mahdolliset tallennetut kulut localStoragesta
function loadExpenses() {
  const saved = localStorage.getItem(STORAGE_KEY) // haetaan tallennettu data (tai null)
  if (saved) {
    const parsed = JSON.parse(saved) // muutetaan JSON-string takaisin taulukoksi
    expenses.length = 0 // tyhjennetään nykyinen taulukko
    expenses.push(...parsed) // kopioidaan tallennetut kulut taulukkoon
  }
}

// Piirtää annetun listan ruudulle ja laskee yhteen summan
function renderList(list) {
  expenseList.innerHTML = "" // tyhjennetään vanha lista
  let total = 0 // tähän kerätään yhteenlaskettu summa

  list.forEach(function (expense) {
    // Luodaan <li> yhdelle kululle
    const li = document.createElement("li")
    li.textContent = `${expense.description} - ${expense.amount} €`

    // Poista-nappi tälle riville
    const deletBtn = document.createElement("button")
    deletBtn.textContent = "Delete"

    // Klikatessa poistetaan tämä kulu
    deletBtn.addEventListener("click", function () {
      // Etsitään tämän kulun indeksi alkuperäisestä expenses-taulukosta
      const idx = expenses.indexOf(expense)
      if (idx !== -1) {
        expenses.splice(idx, 1) // poistetaan 1 alkio kohdasta idx
        tosave() // tallennetaan päivitetty lista localStorageen
        renderList(expenses) // piirretään koko lista uudestaan
      }
    })

    // Lisätään nappi <li>-elementtiin
    li.appendChild(deletBtn)
    // Ja lopuksi li lisätään ul-listaan
    expenseList.appendChild(li)

    // Lisätään tämän kulun amount kokonaissummaan
    total += expense.amount
  })

  // Päivitetään tekstinä kokonaiskulut
  totalExpense.textContent = `yhteensä: ${total} €`
}

// Uuden kulun lisäys napin painalluksesta
addExpenseBtn.addEventListener("click", function () {
  console.log("Lisätään kulu")
  // Luetaan ja siivotaan input-arvot
  const descriptionInput = desInput.value.trim()
  const amountStr = amountInput.value.trim()
  const amount = Number(amountStr) // muunnetaan string numeroksi

  // Jos kuvaus tyhjä TAI summa tyhjä TAI ei kelvollinen numero → ei lisätä
  if (!descriptionInput || !amountStr || Number.isNaN(amount)) {
    return
  }

  // Lisätään uusi kulu taulukkoon
  expenses.push({
    description: descriptionInput,
    amount: amount,
  })

  // Tallennetaan ja päivitetään näkymä
  tosave()
  renderList(expenses)

  // Tyhjennetään inputit seuraavaa syöttöä varten
  desInput.value = ""
  amountInput.value = ""
})

// Filtterinappi: näytä kaikki kulut
showAllExpensesBtn.addEventListener("click", function () {
  // Näytetään koko expenses-taulukko sellaisenaan
  renderList(expenses)
})

// Filtterinappi: näytä vain kulut, joiden amount > 50
showOver50Btn.addEventListener("click", function () {
  // Luodaan uusi lista, jossa vain "isot" kulut
  const filtered = expenses.filter(function (expense) {
    return expense.amount > 50
  })

  // Piirretään vain nämä
  renderList(filtered)
})

// Haku selitteen perusteella
searchInput.addEventListener("input", function () {
  // Otetaan hakuteksti, pienet kirjaimet, ylimääräiset välilyönnit pois
  const query = searchInput.value.trim().toLowerCase()

  // Jos hakukenttä tyhjä → näytetään kaikki
  if (!query) {
    renderList(expenses)
    return
  }

  // Muuten suodatetaan expenses: description sisältää hakusanan
  const filtered = expenses.filter(function (expense) {
    return expense.description.toLowerCase().includes(query)
  })

  // Piirretään suodatettu lista
  renderList(filtered)
})

// Kun sivu avataan: lataa mahdolliset tallennetut kulut ja piirrä lista
loadExpenses()
renderList(expenses)
