let balance = 200;
let loan = 0;
let boughtComputerSinceLastLoan = true;
let selectedLaptopPrice = 0;

function onGetLoanButtonClicked() {
    if (boughtComputerSinceLastLoan === false) {
        alert("Noe gikk feil")
        return;
    }

    let amountString = prompt ("How much do you want to loan?", 0);
    let amount = parseInt(amountString);
    if (amount > balance * 2) {
        console.log("Loan can not exceed twice your balance amount");
        alert("Loan can not exceed twice your balance amount")
    } else {
        document.getElementById("hidden").classList.remove("hidden");
        balance += amount;
        loan += amount;
        boughtComputerSinceLastLoan = false;
        document.getElementById("balance").innerText = balance + " kr ";
        document.getElementById("loan").innerText = loan + " kr ";
    }
}

let pay = 0;

function onWorkButtonClicked() {
    pay += 100;
    document.getElementById("pay").innerText = pay + " kr ";    
}

const laptopsElement = document.getElementById("laptops");
let laptops = [];
let currentLaptop = 0;

function onBankButtonClicked() {
    if (loan > 0) {
        let tenPercent = 0.1 * pay;
        balance += pay - tenPercent;
        loan -= tenPercent;
    } else {
        balance += pay;
    }
    pay = 0;
    document.getElementById("pay").innerText = pay + " kr ";
    document.getElementById("balance").innerText = balance + " kr ";
    document.getElementById("loan").innerText = loan + " kr ";
}

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToMenu(laptops));

const addLaptopsToMenu = (laptops) => {
    laptops.forEach(x => addLaptopToMenu(x));
}

const addLaptopToMenu = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);
}

function changeLaptop(){
    const specContainer = document.getElementById("laptop-specs");
    const selectDropdown = document.getElementById("laptops");
    const selectValue = selectDropdown.options[selectDropdown.selectedIndex].value;
    const laptopSpecs = laptops[selectValue - 1].specs;
    specContainer.innerHTML = "";
    laptopSpecs.forEach(x => addSpecs(x, specContainer));
    const laptopImageContainer = document.getElementById("laptop-image");
    laptopImageContainer.innerHTML = "";
    const laptopImage = document.createElement("img");
    laptopImage.src = "https://noroff-komputer-store-api.herokuapp.com/" + laptops[selectValue - 1].image;
    laptopImageContainer.appendChild(laptopImage);
    const laptopTitle = document.getElementById("laptop-title");
    laptopTitle.innerHTML = laptops[selectValue - 1].title;
    const laptopDescription = document.getElementById("laptop-description");
    laptopDescription.innerHTML = laptops[selectValue - 1].description;
    const laptopPrice = document.getElementById("laptop-price");
    laptopPrice.innerHTML = laptops[selectValue -1].price + " kr ";
    selectedLaptopPrice = laptops[selectValue -1].price;
}

const addSpecs = (spec, specContainer) => {
    const specElement = document.createElement("p");
    specElement.innerHTML = spec;
    specContainer.appendChild(specElement);
}

function onBuyNowButtonClicked() { 
    if (balance >= selectedLaptopPrice) {
        balance -= selectedLaptopPrice
        document.getElementById("balance").innerText = balance + " kr ";
    } else alert("Insufficient funds")
};