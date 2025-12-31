// Haetaan tarvittavat elementit DOMista
const desInput = document.querySelector("#desInput");
const amountInput = document.querySelector("#amountInput");
const addExpenseBtn = document.querySelector("#addExpenseBtn");
const totalExpense = document.querySelector("#totalExpense");
const expenseList = document.querySelector("#expenseList");

// Kaikki kulut talletetaan tähän taulukkoon
const expenses = [];

// localStoragen avain tälle applikaatiolle
const storage_keys = "ExpensesTrage";

// Tallentaa nykyisen expenses-taulukon localStorageen
function tosave() {
  localStorage.setItem(storage_keys, JSON.stringify(expenses));
}

// Lataa mahdolliset tallennetut kulut localStoragesta
function loadExpenses() {
  const saved = localStorage.getItem(storage_keys);
  if (saved) {
    const parsed = JSON.parse(saved); // muutetaan string takaisin taulukoksi
    expenses.length = 0; // tyhjennetään nykyinen taulukko
    expenses.push(...parsed); // kopioidaan tallennetut kulut takaisin
  }
}

// Piirtää annetun listan ruudulle ja laskee yhteen summan
function renderList(list) {
  expenseList.innerHTML = ""; // tyhjennetään vanha lista
  let total = 0;

  list.forEach(function (expense, index) {
    const li = document.createElement("li");
    li.textContent = `${expense.description} - ${expense.amount} €`;

    // Poista-nappi yhdelle kululle
    const deletBtn = document.createElement("button");
    deletBtn.textContent = "Delet";

    deletBtn.addEventListener("click", function () {
      // Poistetaan oikea rivi expenses-taulukosta
      expenses.splice(index, 1);
      // Tallennetaan päivitetty lista
      tosave();
      // Piirretään lista uudestaan
      renderList(expenses);
    });

    li.appendChild(deletBtn);
    expenseList.appendChild(li);

    // Lisätään tämän kulun summa kokonaissummaan
    total += expense.amount;
  });

  // Päivitetään tekstinä kokonaiskulut
  totalExpense.textContent = `yhteensä: ${total} €`;
}

// Uuden kulun lisäys napin painalluksesta
addExpenseBtn.addEventListener("click", function () {
  const descriptionInput = desInput.value.trim();
  const amountStr = amountInput.value.trim();
  const amount = Number(amountStr);

  // Jos kuvaus tyhjä TAI summa tyhjä TAI ei kelvollinen numero → ei tehdä mitään
  if (!descriptionInput || !amountStr || Number.isNaN(amount)) {
    return;
  }

  // Lisätään uusi kulu taulukkoon
  expenses.push({
    description: descriptionInput,
    amount: amount,
  });

  // Tallennetaan ja päivitetään näkymä
  tosave();
  renderList(expenses);

  // Tyhjennetään inputit
  desInput.value = "";
  amountInput.value = "";
});

// Kun sivu avataan: lataa mahdolliset tallennetut kulut ja piirrä lista
loadExpenses();
renderList(expenses);
