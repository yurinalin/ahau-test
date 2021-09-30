export function processInput(fileContent) {
    if (!fileContent) return;

    const textLines = fileContent.split('\n');
    console.log(textLines);

    // FIXME: Deal with this global variable
    let canvasDrawing = [];

    for (const line of textLines) {
        let commandArray = line.trim().split(' ');
        switch (commandArray[0]) {
            case DRAW_COMMANDS.CANVAS:
                const canvas = { width: Number.parseInt(commandArray[1]), height: Number.parseInt(commandArray[2]) }
                console.log(canvas);
                canvasDrawing = drawCanvas_T(canvas);
                break;
            case DRAW_COMMANDS.LINE:
                const line = { point1: { x: Number.parseInt(commandArray[1]), y: Number.parseInt(commandArray[2]) }, point2: { x: Number.parseInt(commandArray[3]), y: Number.parseInt(commandArray[4]) } }
                console.log(line);
                canvasDrawing = drawLine_T(line, canvasDrawing);
                break;
            case DRAW_COMMANDS.RECTANGLE:
                const rect = { point1: { x: Number.parseInt(commandArray[1]), y: Number.parseInt(commandArray[2]) }, point2: { x: Number.parseInt(commandArray[3]), y: Number.parseInt(commandArray[4]) } }
                console.log(rect);
                canvasDrawing = drawRectangle_T(rect, canvasDrawing);
                break;
            case DRAW_COMMANDS.BUCKET_FILL:
                const fill = { x: Number.parseInt(commandArray[1]), y: Number.parseInt(commandArray[2]), color: commandArray[3] }
                console.log(fill);
                canvasDrawing = fillArea_T([{ x: fill.x, y: fill.y }], fill.color?.charAt(0), canvasDrawing);
                break;
            default:
                break;
        }
    }

    console.log(canvasDrawing);
    return canvasDrawing;
}

const DRAW_COMMANDS = {
    CANVAS: 'C',
    LINE: 'L',
    RECTANGLE: 'R',
    BUCKET_FILL: 'B'
}

const DRAWING_CHARACTERS = {
    FLOOR_CEILING: '-',
    WALL: '|',
    LINE: 'X',
    EMPTY: ' '
}

function drawCanvas_T(dimensions = { width: 0, height: 0 }) {
    let drawing = [];
    const width = Math.abs(dimensions.width), height = Math.abs(dimensions.height);
    // Zero width or heigth 
    if (!(width && height)) return drawing;

    for (let j = 0; j < height + 2; j++) {
        drawing[j] = "";
        for (let i = 0; i < width + 2; i++) {
            // Creates floor and ceiling
            if (j === 0 || j === height + 1) { drawing[j] += DRAWING_CHARACTERS.FLOOR_CEILING; }
            // Creates walls
            else if (i === 0 || i === width + 1) { drawing[j] += DRAWING_CHARACTERS.WALL; }
            // Creates insides
            else { drawing[j] += DRAWING_CHARACTERS.EMPTY; }
        }
    }

    return drawing;
}

function drawLine_T(line = { point1: { x: 0, y: 0 }, point2: { x: 0, y: 0 } }, canvas = []) {
    // Not checking if numbers are smaller than 0 or if point1 is bigger than point2 (could be added in the future)
    if (!(line.point1.x && line.point1.y) || !(line.point2.x && line.point2.y) || ((line.point1.x !== line.point2.x) && (line.point1.y !== line.point2.y)) || !canvas.length) return canvas;

    let newDrawing = canvas;

    for (let j = line.point1.y; j <= line.point2.y; j++) {
        for (let i = line.point1.x; i <= line.point2.x; i++) {
            newDrawing[j] = replaceAt(newDrawing[j], i, DRAWING_CHARACTERS.LINE);
        }
    }

    return newDrawing;
}

function drawRectangle_T(rect = { point1: { x: 0, y: 0 }, point2: { x: 0, y: 0 } }, canvas = []) {
    // Not checking if numbers are smaller than 0 or if point1 is bigger than point2 (could be added in the future)
    if (!(rect.point1.x && rect.point1.y) || !(rect.point2.x && rect.point2.y) || (rect.point1.x === rect.point2.x) || (rect.point1.y === rect.point2.y) || !canvas.length) return canvas;

    let newDrawing = canvas;

    for (let j = rect.point1.y; j <= rect.point2.y; j++) {
        for (let i = rect.point1.x; i <= rect.point2.x; i++) {
            if (j === rect.point1.y || j === rect.point2.y || i === rect.point1.x || i === rect.point2.x) { newDrawing[j] = replaceAt(newDrawing[j], i, DRAWING_CHARACTERS.LINE); }
        }
    }

    return newDrawing;
}

function fillArea_T(pointsToPaint = [{ x: 0, y: 0 }], color = 'c', canvas = []) {
    const currentPoint = pointsToPaint[0];
    // Removes currentPoint from the list that will be passed on
    const newPointsToPaint = pointsToPaint.slice(1);

    // No points to paint, point out-of-bounds, invalid color or canvas empty
    if (!color || !(currentPoint?.x && currentPoint?.y) || !canvas.length || canvas[currentPoint.y].charAt(currentPoint.x) !== DRAWING_CHARACTERS.EMPTY) return canvas;

    let newDrawing = canvas;
    newDrawing[currentPoint.y] = replaceAt(newDrawing[currentPoint.y], currentPoint.x, color);

    for (let j = currentPoint.y - 1; j <= currentPoint.y + 1; j++) {
        for (let i = currentPoint.x - 1; i <= currentPoint.x + 1; i++) {
            if ((j !== currentPoint.y) && (i !== currentPoint.x)) {
                continue;
            }
            else if (newDrawing[j].charAt(i) === DRAWING_CHARACTERS.EMPTY) {
                if (!newPointsToPaint.some(el => el.x === i && el.y === j)) { newPointsToPaint.push({ x: i, y: j }); }
            }
        }
    }

    return fillArea_T(newPointsToPaint, color, newDrawing);
}

function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}