const desInput = document.querySelector("#desInput")
const amountInput = document.querySelector("#amountInput")
const addExpenseBtn = document.querySelector("#addExpenseBtn")
const totalExpense = document.querySelector("#totalExpense")
const expenseList = document.querySelector("#expenseList")

const expenses = []

function renderList(list) {
  expenseList.innerHTML = ""
  list.forEach(function (lis) {
    const li = document.createElement("li")
    li.textContent = list
    expenseList.appendChild(li)
  })
}

addExpenseBtn.addEventListener("click", function () {
  const amountInputs = amountInput.value.trim()
  const descriptionInput = desInput.value.trim()
  const totalExpenses = totalExpense.value.trim()
  if (amountInputs === "" || descriptionInput === "") {
    alert("Please enter both description and amount.")
  } else {
    const expense = {
      description: descriptionInput,
      amount: parseFloat(amountInputs),
    }
    expenses.push(expense)
    renderList(expenses)
    desInput.value = ""
    amountInput.value = ""
  }
})
