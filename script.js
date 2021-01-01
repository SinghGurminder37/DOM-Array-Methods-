const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// ################################################################################

// Fetch Random User and Add Money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    console.log(data);
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000) 
    }

    addData(newUser);
}

// To Double Money By Map()
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });
    updateDOM();
}

// To sort the richest by sort()
function sortByRichest(){
    data.sort((a, b) => {
        return b.money - a.money;
    });
    updateDOM();
}

// To filter only millionaires with filter()
function showOnlyMillionaires() {
    data = data.filter(item => {
        return item.money > 1000000;
    });
    updateDOM();
}

// To calculate the entire wealth of persons with reduce()
function calculateEntireWealth() {
    const totalWealth = data.reduce((acc, num) => (acc + num.money), 0
    );
    console.log(totalWealth);
    const wealthElement = document.createElement('div');
        wealthElement.classList.add('total');
        wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(totalWealth)}</strong></h3>`;
    main.appendChild(wealthElement);


}
// Add new Object to data Array
function addData(obj) {
    data.push(obj);

    updateDOM();
}
function updateDOM(providedData = data) {
    // Clear Main Function
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
    // ForEach loop through Data Array
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
        main.appendChild(element);
    });    
}

// Format number as money
function formatMoney(amount) {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');    
}

// ################################################################################
// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showOnlyMillionaires);
calculateWealthBtn.addEventListener('click', calculateEntireWealth);