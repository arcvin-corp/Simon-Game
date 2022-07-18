// Number of buttons in the game
const numberOfButtons = 4;

// Number of levels in the game
const gameLevels = 6;

// Variable to check if the game is in progress (to prevent game restart when in progress)
let gameInProgress = false;

// Variable for keeping track of the current game level
let currentGameLevel = 1;

// Variable keeping track of pattern played by the program
let patternPlayedByComputer = "";

// Variable for keeping track of pattern played by the player
let patternPlayedByPlayer = "";

// Variable for keeping track of click counts needed for each game level
let clickCount = 0;

// Pattern array
let pattern = [];

// Pattern starting index
let pIndex = 0;

// Initialize button objects
let buttons = [
    $("#green"),
    $("#red"),
    $("#yellow"),
    $("#blue"),
]


// Main program entry point
$(function () {

    // Main program entry point. Detects any keypress event on the entire document or body
    $(document).on("keypress", function() {
        if (gameInProgress) {
            console.log("Game is in progress!")
        } else {
            resetGame();
            console.log("Game has started.")
            startGame();
        }
    })

});


/**
 * Function to start the game
 */
const startGame = () => {

    // Set the variable to true to prevent game reset when it is in progress.
    gameInProgress = true;

    // Generate a new pattern for the game
    pattern = patternGenerator();

    // Select the first element from buttons object and play the sound
    // Play button sound without press animation.
    let buttonObject = buttons[pattern[pIndex]];
    let buttonObjectId = buttonObject.attr("id");
    setTimeout(function() {
        // Change the level heading text
        $("#level-title").text("Level "+ currentGameLevel);
        playSound(buttonObject, buttonObjectId);
    }, 500);

    // Add to patternPlayedByComputer string variable.
    patternPlayedByComputer += buttonObjectId;

    // Wait for and detect a button click from the player
    $(".btn").off("click").on("click", function(event){

        // Play button sound with a press animation.
        let buttonObject = $(event.target);
        let buttonObjectId = buttonObject.attr("id");
        playSound(buttonObject, buttonObjectId, true);

        // Add to patternPlayedByPlayer string variable.
        patternPlayedByPlayer += buttonObjectId;

        // Increment the click count
        clickCount++;

        // Check if the required click count has been reached
        // Click count is equal to the currentGameLevel count
        if (clickCount === currentGameLevel) {

            // Check if pattern played by the computer and user is the same
            if (patternPlayedByPlayer === patternPlayedByComputer) {

                // Increment currentGameLevel counter
                currentGameLevel++;

                // Increment the index of pattern array
                pIndex++;

                // Check if the pIndex value has reached the length of pattern array
                // If it has reached, then all the levels are completed and the play has won
                if (pIndex === gameLevels) {

                    // All levels done, game won
                    showGameResult(buttonObject, true);
                    resetGame();
                } else {

                    // Iterate through the pattern
                    let buttonObject = buttons[pattern[pIndex]];
                    let buttonObjectId = buttonObject.attr("id");

                    // Add to patternPlayedByComputer string variable.
                    patternPlayedByComputer += buttonObjectId;

                    // Reset the variable for next level
                    patternPlayedByPlayer = "";
                    clickCount = 0;

                    // Play button sound without press animation amd change level heading text
                    setTimeout(function() {
                        // Change the level heading text
                        $("#level-title").text("Level "+ currentGameLevel);
                        playSound(buttonObject, buttonObjectId);
                    }, 1000);


                }

            } else {
                // Game lost
                showGameResult(buttonObject, false);
                resetGame();
            }

        } else if (clickCount > currentGameLevel) {
            // More buttons clicked than required
            showGameResult(buttonObject, false);
            resetGame();
        } else {
            // Wait for the required number of clicks to be done by the player
            console.log("Waiting for required number of clicks: " + clickCount + "/" + currentGameLevel);
        }

    });

}


/**
 * Function to generate an array (game pattern) with random integers
 */
const patternGenerator = () => {
    let pattern = [];
    for (let i = 0; i < gameLevels; i++) {
        let randomNumber = Math.floor(Math.random() * numberOfButtons);
        pattern.push(randomNumber)
    }
    return pattern;
}


/**
 * Function to play the select button sound
 * @param {Object} buttonObject                 jQuery button object
 * @param {String} buttonObjectId               CSS ID of the button object
 * @param {(boolean|string)=} pressAnimation    Show press animation when set to true
 */
const playSound = (buttonObject, buttonObjectId, pressAnimation= false) => {
    let filePath = "sounds/" + buttonObjectId + ".mp3";
    let button = new Audio(filePath);

    if (pressAnimation) {
        buttonObject.addClass("pressed");
        setTimeout(function(){
            button.play();
            buttonObject.removeClass("pressed");
        }, 100);
    } else {
        buttonObject.animate({opacity: 0}, 100, function() {
            button.play();
            buttonObject.animate({opacity: 1}, 300)
        })
    }
}


/**
 * Function to show game over animation
 * @param {Object} buttonObject         jQuery button object
 * @param {(boolean|string)=} result    Set to true when the game is won
 */
const showGameResult = (buttonObject, result) => {

    // Remove the click event listener
    $(".btn").off("click");

    let resultText = result ? "You WON the game!!! Press any key to restart" : "Game Over, Press Any Key to Restart";
    let fileName = result ? "sounds/right.mp3" : "sounds/wrong.mp3";
    let cssClass = result ? "game-won" : "game-over";
    let resultAudio = new Audio(fileName);
    resultAudio.play();

    // Change title and play appropriate sound
    $("#level-title").text(resultText);
    $("body").addClass(cssClass);
    setTimeout(function() {
        $("body").removeClass(cssClass);
    }, 2000);
}


/**
 * Function to reset the game and set all variables to their initial values.
 * Use when restarting the game, game-over and game-won conditions
 */
const resetGame = () => {
    console.log("Game has been reset.")

    gameInProgress = false;
    currentGameLevel = 1;
    patternPlayedByComputer = "";
    patternPlayedByPlayer = "";
    clickCount = 0;
    pattern = [];
    pIndex = 0;
}

