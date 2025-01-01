const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let inGame = false;
let level = 0;

$("body").on("keypress", function() {
    if (!inGame) {
        inGame = true;
        nextSequence();
    }
})


$(".btn").on("click", function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1); // change to level after
}); 

async function nextSequence() {
    userClickedPattern = [];
    level++;

    $("h1").text("Level " + level);
    
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    for (let i = 0; i < gamePattern.length; i++) {
        $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    }

    else {
        console.log("wrong");

        let audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    inGame = false;
}

function playSound(name) {
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}