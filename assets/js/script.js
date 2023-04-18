//getting and validating budget
document.getElementById("budget-btn").addEventListener("click", (e) => {
  e.preventDefault();
  let initialBudget = document.getElementById("budget").value;
  let regex = /^(?:[1-9]\d*|\d)$/;
  if (regex.test(initialBudget) == true) {
    document.getElementById("general-budget").innerText = "$ " + initialBudget;
    document.getElementById("budget-card").reset();
  } else {
    alert("solo puede ingresar numeros enteros positivos");
  }
});
//getting and validating expenses

let expenses = []; // array of expenses object
const expensesForm = document.getElementById("expenses-card");
document.getElementById("expenses-btn").addEventListener("click", (e) => {
  e.preventDefault();
  let expensesItem = document.getElementById("expenses-amount").value;
  let regex = /^(?:[1-9]\d*|\d)$/;
    if(document.getElementById('general-budget').innerText == "$ 0"){
        return alert('Por Favor ingrese su presupuesto primero')
    }
  if (regex.test(expensesItem) == true) {
    const expensesData = new FormData(expensesForm);
    const data = Object.fromEntries(expensesData);
    console.log(data['expenses-amount'])
    expenses.push(data);

    createRow(data['expenses-name'],data['expenses-amount']);
    

    document.getElementById("expenses-card").reset();
  } else {
    alert("solo puede ingresar numeros enteros positivos");
  }
});

// function createRows(gasto, valor){
   
let createRow = (kind, amount) =>{
    let newSection = document.createElement('section')
    newSection.setAttribute('class', 'expenses-table d-flex')
    let expensesKind = document.createElement('article')
    expensesKind.setAttribute('class', 'expenses-table-kind')
    expensesKind.textContent = kind;
    let expensesAmount = document.createElement('article')
    expensesAmount.setAttribute('class', 'expenses-table-kind')
    expensesAmount.textContent = amount;
    newSection.appendChild(expensesKind);
    newSection.appendChild(expensesAmount);
    let parent = document.getElementById('table-general');
    parent.appendChild(newSection);
}












