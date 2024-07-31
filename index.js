const formRoller = document.querySelector(".form-roller");
const result = document.querySelector(".result");
const icons =  document.querySelector(".icons");
const willpowerReRoll = document.querySelector(".btn-WPRR");

let black = [];
let red = [];
let successes = 0;
let crits = 0;
let rerollable = 0;

function vampireDice() {
    return Math.floor(Math.random() * 10) + 1;
}

function clearArrays(hunger, pool) {
    for (let index = 0; index < hunger; index++) {
        red[index] = 0;
    }
    for (let index = 0; index < pool; index++) {
        black[index] = 0;
    }
}

function clearResults() {
    successes = 0;
    crits = 0;
    rerollable = 0;
    result.innerHTML = "<p>Successes: " + successes + "</p>";
    icons.innerHTML = " ";
}

function fillRed(hunger) {
    for (let index = 0; index < hunger; index++) {
        red[index] = vampireDice();
    }
}

function fillBlack(pool) {
    for (let index = 0; index < pool; index++) {
        black[index] = vampireDice();
    }
}

function sortBoth() {
    red.sort(function(a, b){return b - a});
    black.sort(function(a, b){return b - a});
}

function countSuccesses() {
    for (let index = 0; index < red.length; index++) {
        if (red[index] >= 6) {
            successes = successes + 1;
        }
        if (red[index] == 10) {
            crits = crits + 1;
        }
    }
    for (let index = 0; index < black.length; index++) {
        if (black[index] >= 6) {
            successes = successes + 1;
        }
        if (black[index] == 10) {
            crits = crits + 1;
        }
    }
    while (crits >= 2) {
        successes = successes + 2;
        crits = crits - 2;
    }
}

function printResults() {
    result.innerHTML = "<p>Successes: " + successes + "</p>";
    icons.innerHTML = "";
    for (let index = 0; index < red.length; index++) {
        switch (red[index]) {
            case 10:
                icons.innerHTML = icons.innerHTML + '<img src="/assets/red-crit.png">';
                break;
            case 9:
            case 8:
            case 7:
            case 6:
                icons.innerHTML = icons.innerHTML + '<img src="/assets/red-success.png">';
                break;
            case 5:
            case 4:
            case 3:
            case 2:
                icons.innerHTML = icons.innerHTML + '<img src="/assets/red-fail.png">';
                break;
            case 1:
                icons.innerHTML = icons.innerHTML + '<img src="/assets/bestial-fail.png">';
                break;
        }
    }
    icons.innerHTML = icons.innerHTML + '<div style="width: 100px;"></div>';
    for (let index = 0; index < black.length; index++) {
        switch (black[index]) {
            case 10:
                icons.innerHTML = icons.innerHTML + '<img src="/assets/normal-crit.png">';
                break;
            case 9:
            case 8:
            case 7:
            case 6:
                icons.innerHTML = icons.innerHTML + '<img src="/assets/normal-success.png">';
                break;
            case 5:
            case 4:
            case 3:
            case 2:
            case 1:
                icons.innerHTML = icons.innerHTML + '<img src="/assets/normal-fail.png">';
                break;
        }
    }
}

formRoller.addEventListener("submit", (event) => {
    event.preventDefault();

    const hunger = formRoller.querySelector("#hunger").value;
    const pool = formRoller.querySelector("#pool").value - hunger;    

    clearArrays(hunger, pool);
    clearResults();
    fillRed(hunger);
    fillBlack(pool);
    sortBoth();
    clearResults();
    countSuccesses();
    printResults();
    rerollable = 3;
});

willpowerReRoll.addEventListener("click", () => {
    for (let index = 0; index < black.length; index++) {
        if (black[index] <= 5 && rerollable > 0) {
            black[index] = vampireDice();
            rerollable--;
        }
    }
    sortBoth();
    clearResults();
    countSuccesses();
    printResults();
});