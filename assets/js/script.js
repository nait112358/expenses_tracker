let initialBudget = 0;
let sumExpenses = 0;
let expenses = [];
//getting and validating budget
document.getElementById("budget-btn").addEventListener("click", (e) => {
  e.preventDefault();
  initialBudget = parseInt(document.getElementById("budget").value);
  let regex = /^(?:[1-9]\d*|\d)$/;
  if (regex.test(initialBudget) == true) {
    document.getElementById("initial-budget").innerText = "$ " + initialBudget;
    document.getElementById("budget-card").reset();
    return initialBudget;
  } else {
    alert("solo puede ingresar numeros enteros positivos");
  }
});

//getting and validating expenses
const expensesForm = document.getElementById("expenses-card");
document.getElementById("expenses-btn").addEventListener("click", (e) => {
  e.preventDefault();
  let expensesItem = document.getElementById("expenses-amount").value;
  let regex = /^(?:[1-9]\d*|\d)$/;
  if (document.getElementById("initial-budget").innerText == "$ 0") {
    return alert("Por Favor ingrese primero su presupuesto");
  }
  if (regex.test(expensesItem) == true) {
    //if input ok get info from form
    const expensesData = new FormData(expensesForm);
    const data = Object.fromEntries(expensesData);
    random(data); //giving an id to every object
    expenses.push(data); //pushing object to main array
    createRow(data["expenses-name"], data["expenses-amount"], data.id); //creating new row with gathered info
    document.getElementById("expenses-card").reset();
    expensesTracker(expenses);
    balanceTracker(initialBudget, sumExpenses);
  } else {
    alert("solo puede ingresar numeros enteros positivos");
  }
});

//using the bin


//expenses tracker and writer to general
let expensesTracker = (arr) => {
  sumExpenses = arr
    .map((element) => parseInt(element["expenses-amount"]))
    .reduce((a, b) => a + b, 0);
  document.getElementById("general-expenses").innerText = `$ ${sumExpenses}`;
  return sumExpenses;
};

// updating balance
let balanceTracker = (initialBudget, sumExpenses) => {
  let balance = initialBudget - sumExpenses;
  initialBudget = balance;
  document.getElementById("general-budget").innerText = `$ ${initialBudget}`;
  return initialBudget;
};

//create random ID for my objects without repeating itself
let random = (object) => {
  let iD = Math.floor(Math.random() * 100 + 1);
  if (expenses.length == 0) {
    object.id = iD;
    return object;
  } else if (expenses.find((item) => item.id !== iD)) {
    object.id = iD;
    return object;
  } else if (expenses.find((item) => item.id === iD)) {
    random(object);
  }
};

// function createRows
let createRow = (kind, amount, id) => {
  let newSection = document.createElement("section");
  newSection.setAttribute("class", "expenses-table d-flex");
  newSection.setAttribute("id", `identifier${id}`);
  //creating articles
  let articles = `<article class="expenses-table-kind">${kind}</article>
    <article class="expenses-table-expenses">$ ${amount}</article>
    <article class="expenses-table-bin"><a href="#" class="text-decoration-none">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" id="bin${id}" class="bi bi-trash-fill" viewBox="0 0 16 16">
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
    </svg></a></article>`;
  //appending everything to the parent
  newSection.innerHTML = articles;
  let parent = document.getElementById("table-general");
  parent.appendChild(newSection);
};
