var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

$('#controls-overlay').focus();

var background = 'white';
var state = 'play';
var gap = 1;
var total = {
    w: 298,
    h: 298
}
var h = 10, w = 10;
var speed = 50;
var direction = 'right';
var snake = {
    color: 'green',
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

// console.log(snake.body);

function drawSnake() {
    for (var i = 0; i < snake.body.length; i++) {
        ctx.fillStyle = snake.color;
        ctx.fillRect(snake.body[i].x, snake.body[i].y, w, h);
    }
    if (state == 'play')
        setTimeout(moveSnake, speed);
}

function moveSnake() {

    var tail = snake.body.pop();
    ctx.fillStyle = background;
    ctx.fillRect(tail.x, tail.y, w, h);

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

$('#rotate-clock-wise').click(function () {
    changeDirection()
})

$('#playpause').click(function () {
    if (state == 'play') {
        pauseGame();
    }
    else {
        playGame();
    }
})

$('#controls-overlay').bind('keydown', function (event) {
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
        default: break;
    }
});

