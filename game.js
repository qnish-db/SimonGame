// var userClickedPattern = [];
// var gamePattern = [];
// var level = 0;
// var count = 0;
// var count1 = 0;
// var con = 0;
// var start = 0;
// var randomNumber = Math.floor(Math.random() * 4);
// var buttonColours = ["red", "blue", "green", "yellow"];



// $(document).one("keydown", function () {
//     nextSequence();
// });

// function started() {
//     $(document).one("keydown", function () {
//         if (start == 0) {
//             nextSequence();
//         }
//     })
// }


// $(".btn").click(function () {
//     var userChosenColour = this.id;
//     userClickedPattern.push(userChosenColour);
//     console.log(userClickedPattern);
//     playSound(userChosenColour);
//     animatePress(userChosenColour);
//     start++;
//     if (equal() && (gamePattern.length != 0)) {
//         setTimeout(function () { nextSequence() }, 1000)
//     }
//     else if (gamePattern.length == 0) {
//         var w = new Audio("sounds/wrong.mp3");
//         w.play();
//         $("body").addClass("game-over");
//         setTimeout(function () { $("body").removeClass("game-over") }, 200)
//         $("h1").text("Game Over, Press Any Key to Restart");
//         startover();
//     }

// });


// function nextSequence() {
//     level++;
//     $("h1").text("Level " + level);
//     var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
//     gamePattern.push(randomChosenColour);
//     playSound(randomChosenColour);
//     $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
//     userClickedPattern = [];
// }

// function playSound(name) {
//     var a = "sounds/" + name + ".mp3";
//     var audio = new Audio(a);
//     audio.play();
// }

// function animatePress(currentColour) {
//     $("." + currentColour).addClass("pressed");
//     setTimeout(function () { $("." + currentColour).removeClass("pressed") }, 100)
// }


// function equal() {
//     for (var i = 0; i < gamePattern.length; i++) {
//         if (gamePattern[i] != userClickedPattern[i]) {
//             count++;
//         }
//         if (gamePattern[i] != userClickedPattern[i] && gamePattern.length == userClickedPattern.length) {
//             count1++;
//         }
//     }
//     if (count1 != 0) {
//         var w = new Audio("sounds/wrong.mp3");
//         w.play();
//         $("body").addClass("game-over");
//         setTimeout(function () { $("body").removeClass("game-over") }, 200)
//         $("h1").text("Game Over, Press Any Key to Restart");
//         startover();
//         return false;
//     }
//     else if (count != 0) {
//         count = 0;
//         for (var i = 0; i < userClickedPattern.length; i++) {
//             if (gamePattern[i] != userClickedPattern[i]) {
//                 var w = new Audio("sounds/wrong.mp3");
//                 w.play();
//                 $("body").addClass("game-over");
//                 setTimeout(function () { $("body").removeClass("game-over") }, 200)
//                 $("h1").text("Game Over, Press Any Key to Restart");
//                 // count2++;
//                 startover();
//             }
//         }
//         return false;
//     } else {
//         return true;
//     }

// }

// function startover() {
//     level = 0;
//     gamePattern = [];
//     count = 0;
//     count1 = 0;
//     con++;
//     started();
// }


var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;


$(document).keypress(function () {
    if (!start) {

        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // nextSequence();
    checkAnswer(userClickedPattern.length - 1);
});


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel) {
    let match = true;

    for (let i = 0; i < userClickedPattern.length; i++) {
        if (gamePattern[i] !== userClickedPattern[i]) {
            match = false;
            break; // 
        }
    }

    if (match) {
        // console.log(userClickedPattern);
        // console.log(gamePattern);
        // console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        // console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}