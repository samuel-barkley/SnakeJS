import * as s from "./static.js";

export function drawGrid(ctx) {
    for (let i = 0; i < s.gridSize[0] / 50; i++) {
        drawLine(ctx, [50 * i, 0], [50 * i, 500]);
        if (s.gridCount < i + 1)
            console.log("Something went wrong, gridSize doesn't match with gridCount.");
    }
    for (let j = 0; j < s.gridSize[1] / 50; j++) {
        drawLine(ctx, [0, 50 * j], [500, 50 * j]);
        if (s.gridCount < j + 1)
            console.log("Something went wrong, gridSize doesn't match with gridCount.");
    }
}

export function drawSquare(ctx, pos, colour = "black")
{
    if (colour == "black")
    {
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.fillRect(pos[0]*50, pos[1]*50, 50, 50);
    }
    else if (colour == "red")
    {
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.fillRect(pos[0]*50, pos[1]*50, 50, 50);
    }
    else if (colour == "grey")
    {
        ctx.strokeStyle = "grey";
        ctx.fillStyle = "grey";
        ctx.fillRect(pos[0]*50, pos[1]*50, 50, 50);
    }

    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
}

export function drawLine(ctx, src, dest) {
    ctx.moveTo(src[0], src[1]);
    ctx.lineTo(dest[0], dest[1]);
    ctx.stroke();
}

export function blank(ctx)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}