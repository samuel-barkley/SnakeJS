"use strict";
import * as d from "./drawLib.js";
import * as s from "./static.js";
let canvas;
let ctx;

window.onload = init;
function init()
{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    window.requestAnimationFrame(gameLoop);
    d.drawGrid(ctx);
}

function gameLoop()
{
    update();
    draw();
    //window.requestAnimationFrame(gameLoop)
}

function update()
{

}

function draw()
{
    //d.drawGrid(ctx);
}



