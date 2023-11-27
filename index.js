var buttonColours = ['red','blue','green','yellow'];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function newSequence() {
    level++;

    $('#level-title').text('Level '+level)

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern)

    $('#'+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);    
    playSound(randomChosenColour);
}

$('.btn').on('click', function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress($(this));
    var lastIndex = userClickedPattern.length-1
    if(checkAnswer(lastIndex)){
        if(userClickedPattern.length == level){
            setTimeout(function(){
                newSequence()
            },1000)
            userClickedPattern = [];
        }
    }
    else{
        var audio = new Audio('sounds/wrong.mp3')
        audio.play()
        $('body').addClass('game-over')
        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200)
        $('#level-title').text('Game Over, Press Any Key to Restart')
        startOver()
    }
})

function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour){
    currentColour.addClass('pressed')
    setTimeout(function(){
        currentColour.removeClass('pressed')
    }, 100)
}

$(document).on('keypress', function(e) {
    if(e.key == 'a' || e.key == 'A'){
        if(!started){
            $('#level-title').text('Level '+level)
            newSequence();
            started = true;
        }
    }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("success")
        return true;
    }
    else{
        console.log("wrong")
        return false;
    }
}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
}
// $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
