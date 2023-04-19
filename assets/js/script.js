let expenses = []; //array of object with input data expenses
let account = [0, 0, 0]; // initial, expenses, total
//getting and validating budget
document.getElementById("budget-btn").addEventListener("click", (e) => {
  e.preventDefault();
  let initialBudget = parseInt(document.getElementById("budget").value);
  let regex = /^(?:[1-9]\d*|\d)$/;
  if (regex.test(initialBudget) == true) {
    document.getElementById("initial-budget").innerText = "$ " + initialBudget;
    document.getElementById("budget-card").reset();
    account[0] = initialBudget;
    account[2] = initialBudget;
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
  if (document.getElementById("expenses-name").value == "") {
    return alert("Por Favor ingrese el nombre del gasto");
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
    balanceTracker(account[1]);
  } else {
    alert("solo puede ingresar numeros enteros positivos");
  }
});
//expenses tracker and writer to general
const expensesTracker = (arr) => {
  let sumExpenses = arr
    .map((element) => parseInt(element["expenses-amount"]))
    .reduce((a, b) => a + b, 0);
  document.getElementById("general-expenses").innerText = `$ ${sumExpenses}`;
  account[1] = sumExpenses;
};

// updating balance after expense its passed
const balanceTracker = (expenses) => {
  let total = account[0] - expenses;
  account[2] = total;
  document.getElementById("general-budget").innerText = `$ ${account[2]}`;
  if(account[2]< 0){
    alert("Ha excedido su Presupuesto")
  }
};

//create random ID for my objects without repeating itself
const random = (object) => {
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
const createRow = (kind, amount, id) => {
  let newSection = document.createElement("section");
  newSection.setAttribute("class", "expenses-table d-flex");
  newSection.setAttribute("id", `identifier${id}`);
  //creating articles + bin icon
  let articles = `<article class="expenses-table-kind">${kind}</article>
    <article class="expenses-table-expenses" id="b${id}">$ ${amount}</article>
    <article class="expenses-table-bin pt-2"><a href="#" class="text-decoration-none" id="a${id}" onCLick="binBtn(this.id);">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" id="bin${id}" class="bi bi-trash-fill" viewBox="0 0 16 16">
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
    </svg></a></article>`;
  //appending everything to the parent
  newSection.innerHTML = articles;
  let parent = document.getElementById("table-general");
  parent.appendChild(newSection);
};

//using the bin AKA deleting row and modifying balance and button click
const binBtn = (clicked_id) => {
  let gettedID = clicked_id.match(/\d+/g);
  let idForUse = gettedID[0];
  let idForDelete = `b${idForUse}`;
  let properID = `identifier${idForUse}`;
  binTracker(idForDelete, account[2], account[1]); //updating balance and expenses
  removeObj(expenses, idForUse);
  document.getElementById(properID).outerHTML = "";
};
//updating balance after bin is used
function binTracker(id, initialBudget, sumExpenses) {
  let tracker1 = document.getElementById(id).innerText;
  let tracker2 = tracker1.match(/\d+/g);
  account[2] = account[2] + parseInt(tracker2[0]);
  account[1] = account[1] - parseInt(tracker2[0]);
  document.getElementById("general-expenses").innerText = `$ ${account[1]}`;
  document.getElementById("general-budget").innerText = `$ ${account[2]}`;
}

//removing object targeted in bin
const removeObj = (arr, idNumb) => {
  let index = arr.findIndex((object) => {
    return object.id == idNumb;
  });
  arr.splice(index, 1);
  return arr;
};
