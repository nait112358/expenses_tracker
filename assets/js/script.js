let expensesAll = []; // main array of expeneses objects
let account = [0, 0]; // balance tracker ( expenses, balance)
let regex = /^(?:[1-9]\d*|\d)$/; //regex onlyIntegers
//object constructor for expenses
class expenses {
  constructor(expenseName, expense) {
    (this.expenseName = expenseName),
      (this.expense = expense),
      (this.id = random());
  }
}
//balance button
document.getElementById("budget-btn").addEventListener("click", (e) => {
  e.preventDefault();
  let initialBudget = parseInt(document.getElementById("budget").value);
  if (regex.test(initialBudget) == true) {
    document.getElementById("initial-budget").innerText = "$ " + initialBudget;
    document.getElementById("budget-card").reset();
    account[1] = initialBudget;
  } else {
    alert("solo puede ingresar numeros enteros positivos");
  }
});
//expenses button
document.getElementById("expenses-btn").addEventListener("click", (e) => {
  let expName = document.getElementById("expenses-name").value;
  let expAmo = parseInt(document.getElementById("expenses-amount").value);
  e.preventDefault();
  validation();
  if (regex.test(expAmo) == true) {
    let expOne = new expenses(expName, expAmo);
    expensesAll.push(expOne);
    createRow(expOne.expenseName, expOne.expense, expOne.id); //creating new row with gathered info
    expensesTracker(expensesAll, expAmo);
    document.getElementById("expenses-card").reset();
  } else {
    alert("solo puede ingresar numeros enteros positivos");
  }
});
//random id generator
const random = () => {
  let testId = Math.floor(Math.random() * 1000 + 1);
  if (expensesAll.find((item) => item.id == testId)) {
    return random();
  } else {
    return testId;
  }
};
//balance calculator
const expensesTracker = (arr, expAmo) => {
  let sumExpenses = arr
    .map((element) => parseInt(element.expense))
    .reduce((a, b) => a + b, 0); //sum of all gastos
  account[0] = sumExpenses;
  account[1] = account[1] - expAmo;
  document.getElementById("general-expenses").innerText = `$ ${account[0]}`;
  document.getElementById("general-budget").innerText = `$ ${account[1]}`;
  if (account[1] < 0) {
    alert("Ha excedido su Presupuesto");
  }
};
//validation
function validation() {
  if (document.getElementById("initial-budget").innerText == "$ 0") {
    throw new Error(alert("Por Favor ingrese primero su presupuesto"));
  }
  if (document.getElementById("expenses-name").value == "") {
    throw new Error(alert("Por Favor ingrese el nombre del gasto"));
  }
}
//using the bin AKA deleting row and modifying balance and button click
const binBtn = (clicked_id) => {
  let gettedID = clicked_id.match(/\d+/g);
  let idForUse = gettedID[0];
  let idForDelete = `b${idForUse}`;
  let properID = `identifier${idForUse}`;
  binTracker(idForDelete, account[1], account[0]); //updating balance and expenses
  removeObj(expensesAll, idForUse);
  document.getElementById(properID).outerHTML = "";
};
//updating balance after bin is used
function binTracker(id, initialBudget, sumExpenses) {
  let tracker1 = document.getElementById(id).innerText;
  let tracker2 = tracker1.match(/\d+/g);
  account[1] = account[1] + parseInt(tracker2[0]);
  account[0] = account[0] - parseInt(tracker2[0]);
  document.getElementById("general-expenses").innerText = `$ ${account[0]}`;
  document.getElementById("general-budget").innerText = `$ ${account[1]}`;
}
//removing object targeted in bin
const removeObj = (arr, idNumb) => {
  let index = arr.findIndex((object) => {
    return object.id == idNumb;
  });
  arr.splice(index, 1);
  return arr;
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
    </svg></i></a></article>`;
  //appending everything to the parent
  newSection.innerHTML = articles;
  let parent = document.getElementById("table-general");
  parent.appendChild(newSection);
};
