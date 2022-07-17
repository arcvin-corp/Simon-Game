let buttons = [
    $("#green"),
    $("#red"),
    $("#yellow"),
    $("#blue"),
]

let gameInProgress = false;

$(document).on("keypress", function(){

    if (gameInProgress) {
        console.log("Game is in Progress.");
    } else {
        startGame();
    }

});


function startGame() {

    gameInProgress = true;

    let pattern = [3, 0, 1, 2];
    let patternPressed = "";
    let patternPlayed = "";
    let gameLevels = 4;
    let levelNumber = 1;
    let patternIndex = 0;
    let clickCount = 0;

    // Change the level heading text
    $("#level-title").text("Level "+ levelNumber);

    // Pick the first button element from the pattern and play the sound.
    let buttonObject = buttons[pattern[patternIndex]];
    pressAndPlay(buttonObject, "play");

    // Add to pattern played
    patternPlayed += buttonObject[0].id;

    $(".btn").on("click", function(event){

        // Press and play the clicked button
        let buttonObject = $("#" + event.target.id);
        pressAndPlay(buttonObject, "press");

        // Add to pattern pressed
        patternPressed += event.target.id;

        // Increase the click count
        clickCount++;
        console.log(clickCount);

        // Check if the required click count for the game level has reached
        if (clickCount === levelNumber) {

            if (patternPressed === patternPlayed) {

                console.log("Go to next level");
                // Increase the level
                levelNumber++;
                patternIndex++;

                if (patternIndex === gameLevels) {
                    $("#level-title").text("You WON!!!");
                } else {

                    // Iterate through the pattern
                    let buttonObject = buttons[pattern[patternIndex]];

                    // Add to pattern played
                    patternPlayed += buttonObject[0].id;

                    // Reset the variables for next level
                    patternPressed = "";
                    clickCount = 0;

                    setTimeout(function() {
                        // Change the level heading text
                        $("#level-title").text("Level "+ levelNumber);
                        // Play the button sound
                        pressAndPlay(buttonObject, "play");
                    }, 1000);

                }

            } else {
                gameOver(buttonObject);
                gameInProgress = false;
            }

        } else if (clickCount > levelNumber) {
            gameOver(buttonObject);
            gameInProgress = false;
        } else {
            console.log("Waiting for required clicks.");
        }

    })
}


function gameOver(buttonObject) {
    // Play button sound with press animation
    pressAndPlay(buttonObject, "press");

    // Play game-over sound
    let gameOverAudio = new Audio("sounds/wrong.mp3");
    gameOverAudio.play();

    // Change heading text
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Apply red background class to body
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
}


function pressAndPlay(buttonObject, action) {
    let buttonColor = buttonObject[0].id;
    let audio = new Audio("sounds/" + buttonColor + ".mp3");
    audio.play();

    if (action === "play") {
        buttonObject.animate({opacity: 0}, 200, function(){
            buttonObject.animate({opacity: 1}, 100);
        })
    } else if (action === "press") {
        buttonObject.addClass("pressed");
        setTimeout(function(){
            buttonObject.removeClass("pressed");
        }, 50);
    }
}