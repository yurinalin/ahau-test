export function processInput(fileContent) {
    if (!fileContent) return;

    const textLines = fileContent.split('\n');
    console.log(textLines);

    for (const line of textLines) {
        let commandArray = line.trim().split(' ');
        switch (commandArray[0]) {
            case DRAW_COMMANDS.CANVAS:
                const canvas = { width: Number.parseInt(commandArray[1]), height: Number.parseInt(commandArray[2]) }
                console.log(canvas);
                console.log(`Draw canvas {w: ${canvas.width}, h: ${canvas.height}}`);
                break;
            case DRAW_COMMANDS.LINE:
                const line = { x: Number.parseInt(commandArray[1]), y: Number.parseInt(commandArray[2]) }
                console.log(line);
                console.log(`Draw line {x: ${line.x}, y: ${line.y}}`);
                break;
            case DRAW_COMMANDS.RECTANGLE:
                const rect = { x1: Number.parseInt(commandArray[1]), y1: Number.parseInt(commandArray[2]), x2: Number.parseInt(commandArray[3]), y2: Number.parseInt(commandArray[4]) }
                console.log(rect);
                console.log(`Draw rectangle [{x: ${rect.x1}, y: ${rect.y1}}, {x: ${rect.x2}, y: ${rect.y2}}]`);
                break;
            case DRAW_COMMANDS.BUCKET_FILL:
                const fill = { x: Number.parseInt(commandArray[1]), y: Number.parseInt(commandArray[2]), color: commandArray[3] }
                console.log(fill);
                console.log(`Fill with color ${fill.color} on {x: ${fill.x}, y: ${fill.y}}`);
                break;
            default:
                break;
        }
    }
}

const DRAW_COMMANDS = {
    CANVAS: 'C',
    LINE: 'L',
    RECTANGLE: 'R',
    BUCKET_FILL: 'B'
}