// Query selectors
const budgetAlert = document.querySelector(".alert-budget");
const expenseAlert = document.querySelector(".alert-expense");

let budgetInput = document.querySelector(".budget-input");
const addBugetBtn = document.querySelector(".budget-submit");

let budgetValue = document.querySelector(".budget-value");

let balanceValue = document.querySelector(".balance-value");

let expensesValue = document.querySelector(".expenses-value");
const colorItems = document.querySelectorAll(".item-color");

let itemName = document.querySelector(".item-name");
let expenseInput = document.querySelector(".expense-input");
const addExpenseBtn = document.querySelector(".expense-submit");
const itemsList = document.querySelector(".items-list");

const expenseForm = document.querySelector(".expense-form");

//Event listeners

addBugetBtn.addEventListener("click", addBudget);
addExpenseBtn.addEventListener("click", addExpense);

// Functions

function addBudget(e) {
  e.preventDefault();

  //Check input if empty;

  if (budgetInput.value == "" || budgetInput.value < 0) {
    budgetAlert.style.display = "block";
  } else {
    // Add values to the budget and to the balance and change colors

    let val = +budgetInput.value + +budgetValue.innerText;
    budgetValue.innerText = val;
    const balance = +budgetValue.innerText - +expensesValue.innerText;
    balanceValue.innerText = balance;

    if (val > 0 && balance > 0) {
      colorItems.forEach((el) => (el.style.color = "rgb(35, 189, 81)"));
    } else {
      colorItems.forEach((el) => (el.style.color = "rgb(216, 16, 16)"));
    }
    budgetInput.value = "";
  }
}

function addExpense(e) {
  e.preventDefault();

  // check if input is empty or negative

  if (
    itemName.value == "" ||
    expenseInput.value == "" ||
    expenseInput.value < 0
  ) {
    expenseAlert.style.display = "block";
  } else {
    // create div and add class
    let div = document.createElement("div");
    div.classList.add("item-container");

    // create li  add class and append to div
    const li = document.createElement("li");
    li.innerText = `${itemName.value} ${expenseInput.value}$`;
    li.classList.add("item");
    div.appendChild(li);

    // create edit btn and add class

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.classList.add("edit");
    div.appendChild(editBtn);

    // create delete btn and add class

    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    delBtn.classList.add("delete");
    div.appendChild(delBtn);

    // apend to the list

    itemsList.appendChild(div);

    // add the value to expenses;

    let expVal = +expensesValue.innerText + +expenseInput.value;
    expensesValue.innerText = expVal;
    let balance = +budgetValue.innerText - expVal;
    balanceValue.innerText = balance;
    itemName.value = "";
    expenseInput.value = "";

    // edit btn

    editBtn.addEventListener(
      "click",
      (e) => {
        e.preventDefault();

        // get text and value from li and add it back to the input
        const num = li.innerText.match(/\d{1,}/)[0];
        const text = li.innerText.match(/\D{1,}\b/)[0];
        console.log(text);
        itemName.value = text;
        expenseInput.value = num;
        itemName.value = text;

        // remove add btn and create another btn

        addExpenseBtn.style.display = "none";
        const doneBtn = document.createElement("button");
        doneBtn.classList.add("done-btn");
        doneBtn.innerText = "Done";
        doneBtn.style.display = "inline-block";
        expenseForm.appendChild(doneBtn);

        /*modify the values from expenses and balance
             remove add button and add the expense button back */

        doneBtn.addEventListener("click", (e) => {
          e.preventDefault();

          // update the expenses and balance, and put back the button

          expVal = +expensesValue.innerText - num + +expenseInput.value;
          expensesValue.innerText = expVal;
          balance = +budgetValue.innerText - expVal;
          balanceValue.innerText = balance;
          li.innerText = `${itemName.value} ${expenseInput.value} $`;

          itemName.value = "";
          expenseInput.value = "";
          doneBtn.remove();
          addExpenseBtn.style.display = "inline-block";
        });
      },
      {
        once: true,
      }
    );

    delBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const num = li.innerText.match(/\d{1,}/)[0];
      expensesValue.innerText -= +num;
      balance = +budgetValue.innerText - +expensesValue.innerText;
      balanceValue.innerText = balance;
      div.remove();
    });
  }
}
