let playing = true;
let gaming = true;
let score = 0;
let movementSpeed = 0.25;

const computer = document.getElementById("computer");
const scoreDiv = document.getElementById("score_div")

function wait(ms) {
    return new Promise(r => setTimeout(r, ms))
}

document.addEventListener("keypress", function(event) {
    const keyName = event.key;
    if (keyName == " ") {
        if (playing) {
            gaming = !gaming;
            computer.src = gaming ? "images/computer_minecraft.png" : "images/computer_school.png";
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

const students = []

function summonStudent() {
    const person = document.createElement("img")
    person.src = "images/student.png"
    person.classList.add("student");
    document.body.appendChild(person);

    const startsLeft = Math.random() < 0.5;
    const currentX = startsLeft ? -2.5 : 100;
    const randomSide = `calc(${currentX+"%"} - 20px)`;
    person.style.left = randomSide;
    students.push({p: person, isPositive: startsLeft, x: currentX});
}

function movePeople() {
    for (let i = 0; i < students.length; i++) {
        const person = students[i];
        const x = person.x + movementSpeed * (person.isPositive ? 1 : -1);
        person.x = x;
        person.p.style.left = `calc(${x+"%"} - 20px)`;
        if (x >= 40 && x <= 60) {
            score += gaming ? 0.025 : 0;
            scoreDiv.textContent = "Aura: " + score.toFixed(1);
        }
    }
}

async function handlePeople() {
    summonStudent()
    summonStudent()
    summonStudent()
    summonStudent()
    while (true) {
        await wait(50)
        if (playing) {
            movePeople()
        }
    }
}

handleScore();
handlePeople();
