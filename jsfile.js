const words = [
    "Apple", "Banana", "Orange", "Grape",
    "Kiwi", "Pineapple", "Mango", "Peach",
    "Pear", "Plum", "Cherry", "Watermelon",
    "Lemon", "Lime", "Blueberry", "Raspberry",
    "Strawberry", "Blackberry", "Cranberry",
    "Apricot", "Coconut", "Papaya", "Grapefruit",
    "Avocado", "Lychee", "Passionfruit", "Fig",
    "Tangerine", "Nectarine", "Dragonfruit"]
//setting Levels

const lvl = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
};


//catch selector
let startbutton = document.querySelector(".start");
let lvlNamespan = document.querySelector(".message .lvl");
let secondsspan = document.querySelector(".message .seconds");
let theword = document.querySelector(".the-word");
let upcomingwords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeleftspan = document.querySelector(".time span");
let scoreget = document.querySelector(".score .get");
let scoretotal = document.querySelector(".score .total");
let finishmessage = document.querySelector(".finish");
let options = document.getElementsByName('levelspeed');


//default level
window.sessionStorage.setItem("levelwant", "Easy");
let defaultsecond = lvl[window.sessionStorage.getItem("levelwant")];
lvlNamespan.innerHTML = window.sessionStorage.getItem("levelwant");
secondsspan.innerHTML = defaultsecond;
timeleftspan.innerHTML = defaultsecond;
//level setting
options.forEach(function (option) {
    option.addEventListener('change', function () {
        window.sessionStorage.setItem("levelwant", this.value);
        lvlNamespan.innerHTML = window.sessionStorage.getItem("levelwant");
        let defaultsecond = lvl[window.sessionStorage.getItem("levelwant")];
        secondsspan.innerHTML = defaultsecond;
        timeleftspan.innerHTML = defaultsecond;
    });
});


//setting lvl name second score
scoretotal.innerHTML = words.length;

//disable paste event
input.onpaste = function () {
    return false
}


//start game
startbutton.onclick = function () {
    this.style.display = "none";
    //delete the last word 
    theword.innerHTML = "";
    theword.style.display = "block";
    //remove game over word
    finishmessage.innerHTML = "";
    input.value = "";
    input.focus();
    //generate word function
    genwords();
}

function genwords() {
    //get random word from array
    let randomword = words[Math.floor(Math.random() * words.length)];
    //get word index
    let wordindex = words.indexOf(randomword);
    //remove words from array
    words.splice(wordindex, 1);
    //show the random word
    theword.innerHTML = randomword;
    //empty upcoming words
    upcomingwords.innerHTML = "";
    upcomingwords.style.display = "flex";
    //generate upcoming words
    for (let i = 0; i < words.length; i++) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(words[i]));
        upcomingwords.appendChild(div);
    }

    //call start play fun
    startplay();
}


function startplay() {
    timeleftspan.innerHTML = lvl[window.sessionStorage.getItem("levelwant")];
    let start = setInterval(() => {
        timeleftspan.innerHTML--
        if (timeleftspan.innerHTML === "0") {//stop timer
            clearInterval(start);
            //compare words
            if (theword.innerHTML.toLocaleLowerCase() === input.value.toLocaleLowerCase()) {
                //empty input field
                input.value = "";
                //increase score
                scoreget.innerHTML++;
                if (words.length > 0) {
                    //call genword function
                    genwords()
                } else {
                    let spantxt = document.createElement("span")
                    spantxt.className = "good";
                    let txt = document.createTextNode("Congratulations");
                    spantxt.appendChild(txt);
                    finishmessage.appendChild(spantxt)
                }
            }
            else {
                let spantxt = document.createElement("span")
                spantxt.className = "bad";
                let txt = document.createTextNode("Game Over");
                spantxt.appendChild(txt);
                finishmessage.appendChild(spantxt)
                upcomingwords.style.display = "none";
                theword.style.display = "none"
                startbutton.style.display = "block";
            }
        }
    }, 1000);
}