const formRoller = document.querySelector(".form-roller");
const result = document.querySelector(".result");
const icons =  document.querySelector(".icons");
const willpowerReRoll = document.querySelector(".btn-WPRR");

formRoller.addEventListener("submit", (event) => {
    event.preventDefault();

    const hunger = formRoller.querySelector("#hunger").value;
    const pool = formRoller.querySelector("#pool").value - hunger;

    let black = [pool];
    let red = [hunger];
    let successes = 0;
    let crits = 0;

    for (let index = 0; index < hunger; index++) {
        red[index] = Math.floor(Math.random() * 10) + 1;
    }
    for (let index = 0; index < pool; index++) {
        black[index] = Math.floor(Math.random() * 10) + 1;
    }

    red.sort(function(a, b){return b - a});
    black.sort(function(a, b){return b - a});

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
    let canReroll = 0;
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
                if (canReroll < 3) {
                    canReroll += 1;
                    icons.innerHTML = icons.innerHTML + '<img class="rerollable" src="/assets/normal-fail.png">';
                } else {
                    icons.innerHTML = icons.innerHTML + '<img src="/assets/normal-fail.png">';
                }
                break;
        }
    }

    willpowerReRoll.addEventListener("click", () => {
        if (canReroll > 0) {
            let rerollable = document.querySelector(".rerollable");
            let reroll = Math.floor(Math.random() * 10) + 1;
            switch (reroll) {
                case 10:
                    rerollable.src="/assets/normal-crit.png";
                    successes = successes + 1;
                    crits = crits + 1;
                    if (crits >= 2) {
                        successes = successes + 2;
                        crits = crits - 2;
                    }
                    result.innerHTML = "<p>Successes: " + successes + "</p>";
                    break;
                case 9:
                case 8:
                case 7:
                case 6:
                    rerollable.src="/assets/normal-success.png";
                    successes = successes + 1;
                    result.innerHTML = "<p>Successes: " + successes + "</p>";
                    break;
            }
            rerollable.classList.remove("rerollable");
        }
        canReroll -= 1;
    });
});