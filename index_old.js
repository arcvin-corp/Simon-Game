function startGame() {

    let levels = 5;
    let levelCounter = 1;
    let buttons = [
        $("#green"),
        $("#red"),
        $("#yellow"),
        $("#blue")
    ]
    let pattern = [];
    let buttonPressedColor;
    let patternPlayed = "";
    let patternPressed = "";

    while (levelCounter <= levels) {
        let randomIndexGenerator = randNumGenerator(buttons.length);
        pattern.push(randomIndexGenerator);
        levelCounter++;
    }



    let buttonObject = buttons[pattern[0]];
    let buttonColor = buttonObject[0].id;

    buttonObject.animate({opacity: 0}, 100, function() {
        let audio = new Audio("sounds/" + buttonColor + ".mp3");
        audio.play();
        buttonObject.animate({opacity: 1}, 100);
    })

    patternPlayed+= buttonColor;

    $(".btn").on("click", function(event){
        buttonPressedColor = event.target.id;
        patternPressed+= buttonPressedColor;

        console.log("Pattern played is: " +  patternPlayed);
        console.log("Pattern pressed is: " + patternPressed);

        if (patternPressed !== patternPlayed) {
            console.log("Game over!!");
        } else {
            console.log("Go to next level.");
        }
    });


    function nextLevel(buttonObject, level,)


    // console.log(buttonColor);

    // for (let i = 0; i < pattern.length; i++) {
    //      $("h1").text("Level " + i+1);
    //      let buttonObject = buttons[pattern[i]];
    //      buttonObject.addClass("pressed");
    //      let buttonColor = buttonObject[0].id;
    //      let audio = new Audio("sounds/" + buttonColor + ".mp3");
    //      audio.play();
    //
    //      buttonObject.on("click", function(event) {
    //          console.log(event);
    //      });
    //
    //      setTimeout(function() {
    //          buttonObject.removeClass("pressed");
    //     },
    //     2000);
    //
    // }


    // $("h1").text("Level " + levelCounter);
    // let randButtonIndex = randNumGenerator(buttons.length);
    // buttons[randButtonIndex].addClass("pressed");
    // let buttonColor = buttons[randButtonIndex][0].id;
    // let audio = new Audio("sounds/" + buttonColor + ".mp3");
    // audio.play();
    // setTimeout(function() {
    //     buttons[randButtonIndex].removeClass("pressed");
    // },
    //     50);

}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function randNumGenerator(maxValue) {
    return Math.floor(Math.random() * maxValue);
}

// Detect any keyboard key input to start the game
// Add a key input event listener to the entire document
$(document).on("keypress", startGame);