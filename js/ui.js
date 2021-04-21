import {Drawing, Color, Colors} from '/js/canvas-lib.js';
window.Color = Color;

const canvas = document.getElementById('canvas');

window.drawing = new Drawing();
drawing.setContext(canvas.getContext('2d'));

function square(color) {
	drawing.newShape(0, 0);
	drawing.lineTo(1, 0);
	drawing.lineTo(1, 1);
	drawing.lineTo(0, 1);
	drawing.closePath();
	drawing.fill(color);
}

window.drawPicture = function () {
	drawing.moveAbsolute(100, 100, 100);
	const color = new Color(0);
	square(color);

	drawing.moveRelative(1.1, 0.25, 0);
	drawing.setScale(50);
	const color2 = color.hueShift(30);
	square(color2);
}

let workspace;

function resize() {
	if (workspace) {
		Blockly.svgResize(workspace);
	}
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	drawPicture();
}

window.addEventListener('resize', resize);

Split({
	columnGutters: [{
		track: 1,
		element: document.getElementById('gutter'),
	}],
	onDrag: resize
});

fetch('blocks.json')
.then(async function (response) {
	if (!response.ok) {
		throw new Error(`HTTP ${response.status} - ${response.statusText}`);
	}
	const json = await response.json();
	Blockly.defineBlocksWithJsonArray(json);
	const blocklyDiv = document.getElementById('blockly-div');

	workspace = Blockly.inject(blocklyDiv, {
		move: {
			wheel: true,
		},
		oneBasedIndex: false,
		renderer: 'zelos',
		toolbox: document.getElementById('toolbox'),
		zoom: {
			controls: true,
			startScale: 0.9,
		}
	});

	resize();

	const toolbox = blocklyDiv.querySelector('.blocklyToolboxContents');
	const runButton = document.createElement('BUTTON');
	runButton.type = 'button';
	runButton.innerHTML = 'Run';
	runButton.addEventListener('click', function (event) {
		const code = Blockly.JavaScript.workspaceToCode(workspace);
		window.drawPicture = Function('"use strict";drawing.erase();' + code);
		drawPicture();
	});
	toolbox.appendChild(runButton);
});
