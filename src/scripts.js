/**
 * Processes the input file and generate a canvas snapshot for each command.
 * @param {string} fileContent String content of input file
 * @returns Array of canvas snapshots
 */
export function processInput(fileContent) {
    if (!fileContent) return;

    const textLines = fileContent.split('\n');
    // console.log(textLines);
    // This array will keep snapshots of all changes occurring to the canvas
    let drawings = [];

    textLines.forEach((line, index) => {
        let commandParameters = line.trim().split(' ');
        switch (commandParameters[0]) {
            case DRAW_COMMANDS.CANVAS:
                const canvas = { width: Number.parseInt(commandParameters[1]), height: Number.parseInt(commandParameters[2]) }
                // console.log(canvas);
                drawings.push(drawCanvas_T(canvas));
                break;
            case DRAW_COMMANDS.LINE:
                const line = { point1: { x: Number.parseInt(commandParameters[1]), y: Number.parseInt(commandParameters[2]) }, point2: { x: Number.parseInt(commandParameters[3]), y: Number.parseInt(commandParameters[4]) } }
                // console.log(line);
                // Destructuring used to pass the previous canvas array by value, not reference (to prevent overwriting snapshots)
                drawings.push(drawLine_T(line, [...drawings[index - 1]]));
                break;
            case DRAW_COMMANDS.RECTANGLE:
                const rect = { point1: { x: Number.parseInt(commandParameters[1]), y: Number.parseInt(commandParameters[2]) }, point2: { x: Number.parseInt(commandParameters[3]), y: Number.parseInt(commandParameters[4]) } }
                // console.log(rect);
                drawings.push(drawRectangle_T(rect, [...drawings[index - 1]]));
                break;
            case DRAW_COMMANDS.BUCKET_FILL:
                const fill = { x: Number.parseInt(commandParameters[1]), y: Number.parseInt(commandParameters[2]), color: commandParameters[3] }
                // console.log(fill);
                drawings.push(fillArea_T([{ x: fill.x, y: fill.y }], fill.color?.charAt(0), [...drawings[index - 1]]));
                break;
            default:
                break;
        }
    });

    // console.log(drawings);
    return drawings;
}

/**
 * Possible input command characters.
 */
const DRAW_COMMANDS = {
    CANVAS: 'C',
    LINE: 'L',
    RECTANGLE: 'R',
    BUCKET_FILL: 'B'
}

/**
 * Characters to be drawn on text output.
 */
const DRAWING_CHARACTERS = {
    FLOOR_CEILING: '-',
    WALL: '|',
    LINE: 'X',
    EMPTY: ' '
}

/**
 * Draws (textually) a canvas of given dimensions.
 * @param {object} dimensions Object with width and height chosen for the canvas
 * @returns An array of strings representing the canvas
 */
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

/**
 * Draws (textually) a line from point1 to point2 in the given canvas.
 * @param {object} line Object containg the start and end points for the line
 * @param {array} canvas Drawing canvas
 * @returns New drawing canvas with the line drawn
 */
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

/**
 * Draws (textually) a rectangle with point1 and point2 as opposite vertices in the given canvas.
 * @param {object} rect Object cointaining the top-left and the bottom-right corners of the rectangle to be drawn
 * @param {array} canvas Drawing canvas
 * @returns New drawing canvas with rectangle drawn
 */
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

/**
 * Fills (textually) a given "empty" area around the chosen point in the given canvas.
 * This function is recursive, so non-conforming canvases may cause unexpected behaviors such as exceptions.
 * @param {array} pointsToPaint Array of points that must paint themselves
 * @param {string} color Single character representing the fill color
 * @param {array} canvas Drawing canvas
 * @returns New drawing canvas with fill color added
 */
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

/**
 * Replaces the character at index with replacement.
 * @param {string} str Any string
 * @param {number} index Index of character to be replaced
 * @param {string} replacement Character replacement
 * @returns New string with the characters replaced
 */
function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}