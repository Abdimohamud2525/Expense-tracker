const desInput = document.querySelector("#desInput");
const amountInput = document.querySelector("#amountInput");
const addExpenseBtn = document.querySelector("#addExpenseBtn");
const totalExpense = document.querySelector("#totalExpense");
const expenseList = document.querySelector("#expenseList");

const expenses = [];

function renderList(list) {
  expenseList.innerHTML = "";
  let total = 0;

  list.forEach(function (expense) {
    const li = document.createElement("li");
    li.textContent = `${expense.description} - ${expense.amount} €`;
    expenseList.appendChild(li);
    total += expense.amount;
  });

  totalExpense.textContent = `yhteensä: ${total} €`;
}

addExpenseBtn.addEventListener("click", function () {
  const descriptionInput = desInput.value.trim();
  const amountStr = amountInput.value.trim();
  const amount = Number(amountStr);

  if (!descriptionInput || !amountStr || Number.isNaN(amount)) {
    return;
  }

  expenses.push({
    description: descriptionInput,
    amount: amount,
  });

  renderList(expenses);

  desInput.value = "";
  amountInput.value = "";
});
