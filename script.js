const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');

const data = []
getRandomUser()
getRandomUser()
getRandomUser()
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/')
    const data = await res.json();
    const user = data.results[0]
 
    const newUser = {
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random() * 1000000)
    }

    console.log(newUser)

    addData(newUser)
}


// Add new obj to data arr

function addData(obj) {
    data.push(obj)

    updateDOM();
}


// Update DOM

function updateDOM(providedData = data){
main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'


providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong>$${(item.money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
    main.appendChild(element)
})
}


// add user btn

addUserBtn.addEventListener('click' , () => {
    getRandomUser();
})


// get double money func 

function getDoubleMoney(providedData = data) {
    const dbMoney = providedData.map(function(item) {
        return {
            ...item,
            money: item.money * 2
        };
     
    });

    updateData(dbMoney);
}

// update data
function updateData(newData) {
    data.length = 0; 

    newData.forEach(item => {
        data.push(item);
    });

    updateDOM();
}


// add event listener db money

doubleBtn.addEventListener('click' , () => {
    getDoubleMoney();
})

// add listener to only millioners 

showMillionairesBtn.addEventListener('click' , () => {
    onlyMillioners()

})


// only millioners 

function onlyMillioners(providedData = data){
    const justMillioners = providedData.filter(
        item => item.money > 1000000);

      updateDOM(justMillioners)
       
    }

// sort event listener

sortBtn.addEventListener('click', () => {
    sortData();
})

// compare data for sort

function sortData() {
    const sortedData = data.sort((a, b) => b.money - a.money);
    updateDOM(sortedData);
}

// calculate wealth event listener

calculateBtn.addEventListener('click', () => {
    calculateWealth();
  });

  function calculateWealth() {
    const totalWealth = data.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.money;
    }, 0);


    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth : <strong>${(totalWealth).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</strong></h3>`
    main.appendChild(wealthElement)
  
  
  }