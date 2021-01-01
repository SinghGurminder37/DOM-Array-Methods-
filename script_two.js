const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRichestUser();

// ################################################################################


// Fetch Random User and Add Money
async function getRichestUser() {
    const res = await fetch('https://forbes400.herokuapp.com/api/forbes400?limit=5');
    const data = await res.json();
    console.log(data);
    const user = data;
    
        user.forEach(item => {
            const newUser = {
                name: `${item.personName}`,
                money: `${item.estWorthPrev}`
            }
            addData(newUser);
        });
    updateDOM();
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
        element.innerHTML = `<strong>${item.name}</strong>${(item.money)}`;
        main.appendChild(element);
        
    });   
    
}

// ################################################################################
// Event Listeners
addUserBtn.addEventListener('click', getRichestUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showOnlyMillionaires);
calculateWealthBtn.addEventListener('click', calculateEntireWealth);