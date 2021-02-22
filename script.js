const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus")
const money_minus = document.getElementById("money-minus")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount");




const localStorageTranscations = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem("transactions") !== null ? localStorageTranscations : [];

// add Transaction
const addTransaction = (e) => {
    e.preventDefault();
    if (text.value.trim() === "" || amount.value.trim() === '') {
        alert("please add a text and amount")
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        }
        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
}

// generate randome ID 
const generateID = () => {
    return Math.floor(Math.random() * 1000000);
}


// Add transactions to the Dom
const addTransactionDOM = (transaction) => {
    // Get sign
    const sign = transaction.amount < 0 ? "-" : '+';
    // creat new element
    const item = document.createElement("li");

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

    list.appendChild(item);
}

// Update The Balance, income and expense
const updateValues = () => {

    // get amounts
    const amounts = transactions.map(transaction => transaction.amount);
    console.log(amounts)
    // total amouns
    const total = amounts.reduce((acc, curr) => {
        return acc + curr
    }, 0)

    // get income
    const income = amounts
        .filter(amount => amount > 0)
        .reduce((acc, curr) => {
            return acc + curr
        }, 0)

    // get expenses
    const expenses = amounts
        .filter(amount => amount < 0)
        .reduce((acc, curr) => {
            return acc + curr
        }, 0)

    // get balance
    balance.innerHTML = `$${total}`;
    money_plus.innerHTML = `$${income}`;
    money_minus.innerHTML = `$${expenses}`

    console.log(total);
}

// remove transaction by id
const removeTransaction = (id) => {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

// Update Local storage transactions 
const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

// initiaate app
const init = () => {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues()
}

init();

form.addEventListener('submit', addTransaction);
























// //Return the number of words in string
// function countString(str1) {
//     return str1.split(" ").length;
// }

// countString("Hello my name is Jordan and I am 27 years old");

// //Find the smallest number in an Array. Must use the spread operator to change parameter to array.
// function findSmallestNum(...arr) {
//     console.log(Math.min(...arr));
// }

// findSmallestNum(3, 10, 1, 15);

// // Find the Largest number in an Array
// function findLargestNum(arr) {
//     return Math.max(...arr)
// }

// //Filter Array to remove odd numbers. 
// function noOdds(arr) {
//     return arr.filter(x => x % 2 === 0);
// }

// or

// function noOdds(arr) {
//     return arr.filter(function (evens) {
//         return evens % 2 === 0;
//     })
// }