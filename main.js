let playing = false;
let gaming = true;
let died = false;
let score = 0;
let movementSpeed = 0.25;

const computer = document.getElementById("computer");
const scoreDiv = document.getElementById("score_div");
const playButton = document.getElementById("play_div");

function wait(ms) {
    return new Promise(r => setTimeout(r, ms))
}

playButton.addEventListener("click", function(event) {
    playing = true;
    playButton.remove();
})

document.addEventListener("keypress", function(event) {
    const keyName = event.key;
    if (keyName == " ") {
        if (playing) {
            gaming = !gaming;
            computer.src = gaming ? "images/computer_minecraft.png" : "images/computer_school.png";
        }
    }
    if (keyName == "p" || keyName == "P") {
        if (!died) {
            playing = !playing;
        }
    }
})

async function handleScore() {
    while (true) {
        await wait(1000)
        if (playing) {
            score += gaming ? 1 : -0.5;
            scoreDiv.textContent = "Aura: " + score.toFixed(1);
        }
    }
}

const allPeople = []

function summonCharacter(isStudent) {
    const person = document.createElement("img")
    if (isStudent) {
        person.src = "images/student.png"
        person.classList.add("student");
    } else {
        person.src = "images/teacher.png"
        person.classList.add("teacher");
    }
    document.body.appendChild(person);
    const startsLeft = Math.random() < 0.5;
    const currentX = startsLeft ? -2.5 : 100;
    const randomSide = `calc(${currentX+"%"} - 20px)`;
    person.style.left = randomSide;
    allPeople.push({p: person, isPositive: startsLeft, x: currentX, isStudent: isStudent});
}

function movePeople() {
    const deadPeople = [];
    for (let i = 0; i < allPeople.length; i++) {
        const person = allPeople[i];
        const x = person.x + movementSpeed * (person.isPositive ? 1 : -1);
        person.x = x;
        person.p.style.left = `calc(${x+"%"} - 20px)`;
        if (x >= 45 && x <= 55) {
            if (person.isStudent) {
                score += gaming ? 0.025 : 0;
                scoreDiv.textContent = "Aura: " + score.toFixed(1);
            } else {
                if (gaming) {
                    died = true;
                    playing = false;
                    alert(`You Died! Score: ${score.toFixed(1)}`);
                    window.location.reload();
                }
            }
        }
        if (x <= -10 || x >= 100.5) {
            deadPeople.push(i);
        }
    }
    for (let i = 0; i < deadPeople.length; i++) {
        const deadI = deadPeople[i];
        allPeople[deadI].p.remove();
        allPeople.splice(deadI, 1);
    }
}

async function handlePeople() {
    while (true) {
        await wait(50)
        if (playing) {
            movePeople()
            const r = Math.random();
            if (r < 0.0125) {
                summonCharacter(r < 0.005 ? false : true);
            }
        }
    }
}

handleScore();
handlePeople();
