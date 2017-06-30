var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

$('body').focus();

var background = 'white';
var state = 'pause';
var gap = 1;
var total = {
    w: 298,
    h: 298
}
var h = 10, w = 10;
var direction = 'right';
var score = 0;

var snake = {
    color: 'pink',
    speed: 200,
    body: [{
        x: 1,
        y: 1,
    }]
}
snake.body.push({
    x: snake.body[0].x - w - gap,
    y: snake.body[0].y
})
snake.body.push({
    x: snake.body[1].x - w - gap,
    y: snake.body[1].y
})

var food = {
    x: 0,
    y: 0,
    color: 'green',
    past: []
}

function incrementScore(){
    score += 10;
    $('#score').text(score);
    if(score % 50 == 0) {
        snake.speed -= 25
    }
}

function drawFood() {
    food.x = getRandomCoord();
    food.y = getRandomCoord();
    var snake_map = []
    for (var i = 0; i < snake.body.length; i++) {
        snake_map.push('' + snake.body[i].x + snake.body[i].y)
    }
    var overlap = snake_map.filter(function (o) {
        return o.indexOf('' + food.x + food.y) != -1;
    })
    if (overlap.length) {
        drawFood();
    } else {
        ctx.fillStyle = food.color;
        ctx.fillRect(food.x, food.y, w, h);
        food.past.push('' + food.x + food.y);
    }
}
// console.log(snake.body);

function getRandomCoord() {
    var coord = (Math.floor(Math.random() * (27 - 0))) * 11;
    return coord + 1
}

function drawSnake() {
    for (var i = 0; i < snake.body.length; i++) {
        ctx.fillStyle = snake.color;
        ctx.fillRect(snake.body[i].x, snake.body[i].y, w, h);
    }
    if (state == 'play')
        setTimeout(moveSnake, snake.speed);
}

function moveSnake() {
    /// based on direction change x or y
    var newx, newy;
    switch (direction) {
        case 'right': newx = snake.body[0].x + w + gap;
            if (newx > total.w - w) {
                newx = 1;
            };
            break;
        case 'down': newy = snake.body[0].y + h + gap;
            if (newy > total.h - h) {
                newy = 1;
            };
            break;
        case 'left': newx = snake.body[0].x - w - gap;
            if (newx < 0) {
                newx = total.w - gap - w;
            };
            break;
        case 'up': newy = snake.body[0].y - h - gap;
            if (newy < 0) {
                newy = total.h - gap - h
            }
    }
    snake.body.unshift({
        x: newx ? newx : snake.body[0].x,
        y: newy ? newy : snake.body[0].y
    })
    // console.log(food.x, food.y);
    if (snake.body[0].x == food.x && snake.body[0].y == food.y) {
        incrementScore();
        drawFood();
    }else{
        var tail = snake.body.pop();
        ctx.fillStyle = background;
        ctx.fillRect(tail.x, tail.y, w, h);
    }
    drawSnake();
}

function changeDirection(toDirection) {

    switch (toDirection) {
        case 'right':
            if (direction != 'left')
                direction = toDirection;
            break;
        case 'down':
            if (direction != 'up')
                direction = toDirection;
            break;
        case 'left':
            if (direction != 'right')
                direction = toDirection;
            break;
        case 'up':
            if (direction != 'down')
                direction = toDirection;
            break;
        default:
            break;
    }
    if (state != 'play') {
        state = 'play';
        moveSnake();
    }

}

function pauseGame() {
    state = 'pause';
    $('#playpause').text('Play');
}

function playGame() {
    state = 'play';
    $('#playpause').text('Pause');
    moveSnake();
}

drawSnake();
drawFood();

$('#playpause').click(function () {
    if (state == 'play') {
        pauseGame();
    }
    else {
        playGame();
    }
})

$('body').bind('keydown', function (event) {
    //console.log(event.keyCode);
    switch (event.keyCode) {
        //....your actions for the keys .....
        case 37: changeDirection('left');
            break;
        case 38: changeDirection('up');
            break;
        case 39: changeDirection('right');
            break;
        case 40: changeDirection('down');
            break;
        case 32:
            // space
            if (state == 'play') {
                pauseGame();
            }
            else {
                playGame();
            }
            break;
        default: break;
    }
});

$('body').bind('keydown', function (event) {
    event.preventDefault();
});

function changeSpeed(val) {
    // console.log(val);
    snake.speed = val;
}

// $('#speedControl').on('oninput', changeSpeed)