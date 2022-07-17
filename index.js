let buttons = [
    $("#green"),
    $("#red"),
    $("#yellow"),
    $("#blue"),
]

let pattern = [3, 0, 1, 2];
let patternPressed = "";
let patternPlayed = "";
let levelCounter = 1;
let levelNumber = 1;
let patternIndex = 0;
let clickCount = 0;

$(document).on("keypress", function(){
    // Change the level heading text
    $("#level-title").text("Level "+ levelNumber);

    // Pick the first button element from the pattern and play the sound.
    let buttonObject = buttons[pattern[patternIndex]];
    pressAndPlay(buttonObject, "play");

    // Add to pattern played
    patternPlayed += buttonObject[0].id;

    $(".btn").on("click", function(event){

        // Add to pattern pressed
        patternPressed += event.target.id;

        // Increase the click count
        clickCount++;

        // Check if the required click count for the game level has reached

        if (patternPressed === patternPlayed) {
            console.log("Go to next level")
            // Increase the level
            levelNumber++;
            patternIndex++;

            // Change the level heading text
            $("#level-title").text("Level "+ levelNumber);

            // Iterate through the pattern
            let buttonObject = buttons[pattern[patternIndex]];

            // Play the button sound
            pressAndPlay(buttonObject, "play");

            // Add to pattern played
            patternPlayed += buttonObject[0].id;

            // Add to pattern pressed
            patternPressed += event.target.id;

        } else {
            console.log("Game over")
        }

    })
});


$(".btn").on("click", function(event) {
    patternClicked += event.target.id;
    clickCount++;
    if (clickCount === 3) {
        console.log("Clicked 3 times!!!")
    } else {
        console.log("Waiting for the number of clicks")
    }
})



// $(".btn").on("click", function(event){
//
//     patternPressed += event.target.id;
//
//     if (patternPressed !== patternPlayed) {
//         console.log("Game over");
//         let targetID = event.target.id;
//         let buttonObject = $("#" + targetID);
//         gameOver(buttonObject);
//
//     } else {
//
//         patternPlayed = "";
//         patternPressed = "";
//         let levelNumber = 1;
//         let patternIndex = 0;
//
//         // Change the level heading text
//         $("#level-title").text("Level "+ levelNumber);
//
//         // Iterate through the pattern
//         let buttonObject = buttons[pattern[patternIndex]];
//
//         // Play the button sound
//         pressAndPlay(buttonObject, "play");
//
//         // Add to pattern played
//         patternPlayed += buttonObject[0].id;
//
//         // Add to pattern pressed
//         patternPressed += patternPressed;
//
//         $(".btn").on("click", function(event){
//             if (patternPressed === patternPlayed) {
//             console.log("Go to next level")
//             } else {
//                 console.log("Game over")
//             }
//
//         })

        // if (patternPressed === patternPlayed) {
        //     console.log("Go to next level")
        // } else {
        //     console.log("Game over")
        // }


        // for (let patternIndex = 0; patternIndex < pattern.length; patternIndex++) {
        //
        //     let levelNumber = patternIndex + 1;
        //
        //     // Change the level heading text
        //     $("#level-title").text("Level "+ levelNumber);
        //
        //
        //     // Iterate through the pattern
        //     let buttonObject = buttons[pattern[patternIndex]];
        //     // Play the button sound
        //     pressAndPlay(buttonObject, "play");
        //     // Add to pattern played
        //     patternPlayed += buttonObject[0].id;
        //     // Add to pattern pressed
        //     patternPressed += patternPressed;
        //
        // }

//     }
//
// })


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