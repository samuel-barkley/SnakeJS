import * as s from "./static.js";

export function drawGrid(ctx) {
    drawSquare(ctx, [0, 0]);
    for (let i = 0; i < s.gridSize[0] / 50; i++) {
        drawLine(ctx, [50 * i, 0], [50 * i, 500]);
    }
    for (let j = 0; j < s.gridSize[1] / 50; j++) {
        drawLine(ctx, [0, 50 * j], [500, 50 * j]);
    }
}

export function drawSquare(ctx, pos)
{
    ctx.fillRect(pos[0]*50, pos[1]*50, 50, 50);
}

export function drawLine(ctx, src, dest) {
    ctx.moveTo(src[0], src[1]);
    ctx.lineTo(dest[0], dest[1]);
    ctx.stroke();
}