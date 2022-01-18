"use strict";
import * as d from "./drawLib.js";
import * as s from "./static.js";
let canvas;
let ctx;

let startTime;
let timeSindsLoad = 0;
let timeSindsLastUpdate = 0;
let currentTime = 0;
let lastUpdateTime = 0;
let updateCycleThing = 0;
let frameTime = 1000;

let lastPlayerPos = [0, 0]

let apple = {
    pos: [0, 0],
    colour: "red"
};

let player = {
    pos: [3, 3],
    tail: [[2, 3], [1, 3]],
    colour: "black",
    direction: 1
}

window.onload = init;
function init()
{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    startTime = Date.now();
    window.requestAnimationFrame(gameLoop);
    d.drawGrid(ctx);
}

function gameLoop()
{
    update();
    draw();
    window.requestAnimationFrame(gameLoop)
}

function update()
{
    if (updateCycleThing > frameTime)
    {
        updateCycleThing = 0;
        updatePlayer(player);
    }
    
    dealWithTime();
}

function updatePlayer(player)
{
    // Update tail location
    for (let i = 0; i < player.tail.length; i++)
    {
        if (i == 0)
        {
            player.tail[0] = [lastPlayerPos[0], lastPlayerPos[1]];
            console.log("first tail pos " + player.tail[0][0] + ", " + player.tail[0][1]);
        }
        else 
        {
            player.tail[i] = player.tail[i-1];
            console.log("tail pos " + i + ", pos: " + player.tail[i][0] + ", " + player.tail[i][1]);
        }
    }

    lastPlayerPos[0] = player.pos[0];
    lastPlayerPos[1] = player.pos[1];

    // Update head location
    switch (player.direction)
    {
        case 0:
            //console.log(player.pos);
            player.pos[1] = player.pos[1] - 1
            break;
        case 1:
            player.pos[0] = player.pos[0] + 1
            break;
        case 2:
            player.pos[1] = player.pos[1] + 1
            break;
        case 3:
            player.pos[0] = player.pos[0] - 1
            break;
    }

    //console.log(player.tail.length)
    for (let i = 0; i < player.tail.length; i++)
    {
        //console.log("pos " + player.pos[0] + ", " + player.pos[1] + ", tail: " + player.tail[i][0] + ", " + player.tail[i][1]);
    }
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

function generateAppleLocation()
{
    return [0, 0]
}

function dealWithTime()
{
    lastUpdateTime = currentTime;
    currentTime = Date.now();
    timeSindsLastUpdate = currentTime - lastUpdateTime;
    timeSindsLoad += timeSindsLastUpdate;
    updateCycleThing += timeSindsLastUpdate;
}
