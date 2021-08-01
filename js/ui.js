import {Drawing, Color, Colors} from './canvas-lib.js';
window.Color = Color;

const canvas = document.getElementById('canvas');

window.drawing = new Drawing();
drawing.setContext(canvas.getContext('2d'));

window.drawPicture = function () {
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
	workspace.toolbox_.flyout_.autoClose = false;

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
