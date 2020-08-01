
var userClickedPattern=[]; //saves the clicked sequence from the user
var gamePattern=[];// save the pattern to be clicked

var started = false;//used for statt the game
var level = 0;// keep track of the level

var buttonColours = ["green", "red", "yellow", "blue"];//array used for the diffrent colors

//generates the next sequence
function nextSequence(){
  //generates a random number from 0 to 3 so we can add
  //a color corresponding to the color from the array
  var randomNumber= Math.floor(Math.random()*4);
  //when the function is call, the level is increased.
  level++;
  //clear the sequence array from the user.
  userClickedPattern = [];
  //change the title to the current level
  $(".title").text("Level " + level);
  //gets the color from the array
  var randomChosenColour = buttonColours[randomNumber];
  //add the new color to the game sequence.
  gamePattern.push(randomChosenColour);
  //flasing effect to button(color selected)
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //play sound corresponding to the button
  playSound(randomChosenColour);
}

//play sound function
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

//animation for the button selected
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 200);
}

//check the sequence from the game against the user to check if it is correct
function checkAnswer(currentLevel){
  console.log("game: ");
  console.log(gamePattern);
  console.log("user: ");
  console.log(userClickedPattern);

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $(".title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});


$(document).keydown(function(event){
  if(!started){
    started = true;
    $(".title").text("Level "+level);
    nextSequence();
  }
});
