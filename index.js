"use strict";
import * as d from "./drawLib.js";
import * as s from "./static.js";
let canvas;
let ctx;
let stopped = false;

let startTime;
let timeSindsLoad = 0;
let timeSindsLastUpdate = 0;
let currentTime = 0;
let lastUpdateTime = 0;
let updateCycleThing = 0;
let frameTime = 500;
let posCandidate = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];

let apple = {
    pos: [0, 0],
    colour: "red"
};

let player = {
    pos: [3, 3],
    tail: [[2, 3], [1, 3]],
    colour: "black",
    direction: 1,
    score: 0
}

let lastPlayer = {
    pos: [player.pos[0], player.pos[1]],
    tail: [[player.tail[0][0], player.tail[0][1]], [player.tail[1][0], player.tail[1][1]]],
    colour: "black",
    direction: 1
}

// TODO: bug found to go in opposite direction (switch direction within one cycle)

window.onload = init;
function init()
{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    window.addEventListener("keydown", keyPressed, true);
    document.getElementById("stopButton").addEventListener("click", stopGame, false);
    document.getElementById("startButton").addEventListener("click", startGame, false);
}

function startGame()
{
    stopped = false;
    startTime = Date.now();
    window.requestAnimationFrame(gameLoop);
    d.drawGrid(ctx);
}

function gameLoop()
{
    update();
    draw();
    if (!stopped)
    {
        window.requestAnimationFrame(gameLoop);
    }
    else 
        console.log("stopped");
}

function update()
{
    if (updateCycleThing > frameTime)
    {
        updateCycleThing = 0;
        
        updatePlayer(player);

        // Stop game when player crosses the edge of the grid.
        if (player.pos[0]  >= s.gridCount || player.pos[0] < 0 || player.pos[1] >= s.gridCount || player.pos[1] < 0)
        {
            stopped = true;
        }

        if (apple.pos[0] == player.pos[0] && apple.pos[1] == player.pos[1])
        {
            player.score++;
            player.tail.push([lastPlayer.tail.at(-1)[0], lastPlayer.tail.at(-1)[1]]);
            apple.pos = generateAppleLocation(posCandidate);
        }
    }
    
    dealWithTime();
}

function updatePlayer(player)
{
    lastPlayer = {
        pos: [player.pos[0], player.pos[1]],
        tail: [],
        colour: "black",
        direction: 1
    }

    for (let i = 0; i < player.tail.length; i++)
    {
        lastPlayer.tail[i] = [player.tail[i][0], player.tail[i][1]]
    }

    // Update tail location
    for (let i = 0; i < player.tail.length; i++)
    {
        if (i == 0)
        {
            player.tail[0] = [lastPlayer.pos[0], lastPlayer.pos[1]];
        }
        else 
        {
            player.tail[i] = lastPlayer.tail[i-1];
        }
    }

    // Update head location
    switch (player.direction)
    {
        case 0:
            //console.log(player.pos);
            player.pos[1] = lastPlayer.pos[1] - 1
            break;
        case 1:
            player.pos[0] = lastPlayer.pos[0] + 1
            break;
        case 2:
            player.pos[1] = lastPlayer.pos[1] + 1
            break;
        case 3:
            player.pos[0] = lastPlayer.pos[0] - 1
            break;
    }

    checkHeadCollisions();
}

function draw()
{
    d.blank(ctx);
    d.drawGrid(ctx);
    drawApple();
    drawSnake(player);
}

function drawApple()
{
    d.drawSquare(ctx, apple.pos, apple.colour);
}

function drawSnake(player)
{
    drawHead(player);
    drawTail(player);
}

function drawHead(player)
{
    d.drawSquare(ctx, player.pos);
}

function drawTail(player)
{
    player.tail.forEach(tailPos => {
        d.drawSquare(ctx, tailPos, "grey")
    });
}

function generateAppleLocation(posCandidate)
{
    posCandidate = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
    if (player.pos[0] == posCandidate[0] && player.pos[1] == posCandidate[1])
    {
        console.log("new apple pos matches player pos, recalc pos.");
        generateAppleLocation(posCandidate);
    }

    for (let i = 0; i < player.tail.length; i++)
    {
        
        if (posCandidate[0] == player.tail[i][0] && posCandidate[1] == player.tail[i][1])
        {
            console.log("made it");
            generateAppleLocation(posCandidate);
        }
    }

    console.log(posCandidate);
    return posCandidate;
}

function checkHeadCollisions()
{
    for (let i = 0; i < player.tail.length; i++)
    {
        if (player.tail[i][0] == player.pos[0] && player.tail[i][1] == player.pos[1])
        {
            stopped = true;
        }
    }
}

function dealWithTime()
{
    lastUpdateTime = currentTime;
    currentTime = Date.now();
    timeSindsLastUpdate = currentTime - lastUpdateTime;
    timeSindsLoad += timeSindsLastUpdate;
    updateCycleThing += timeSindsLastUpdate;
}

function keyPressed(e)
{
    switch(e.keyCode)
    {
        case 38:
            // Up
            if (player.direction != 2)
                player.direction = 0;
            break;
        case 39:
            // Right
            if (player.direction != 3)
                player.direction = 1;
            break;
        case 40:
            // Down
            if (player.direction != 0)
                player.direction = 2;
            break;
        case 37:
            // Left
            if (player.direction != 1)
                player.direction = 3
            break;
        case 27:
            // stop gameLoop if escape is pressed.
            stopGame();
            break;
    }
}

function stopGame()
{
    stopped = true;
}
