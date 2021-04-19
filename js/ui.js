import {Drawing, Color, Colors} from '/js/canvas-lib.js';

const canvas = document.getElementById('canvas');

const drawing = new Drawing();
drawing.setContext(canvas.getContext('2d'));


function square(color) {
	drawing.newShape(0, 0);
	drawing.lineTo(1, 0);
	drawing.lineTo(1, 1);
	drawing.lineTo(0, 1);
	drawing.closePath();
	drawing.fill(color);
}

function drawPicture() {
	drawing.moveAbsolute(100, 100, 100);
	const color = new Color(0);
	square(color);

	drawing.moveRelative(1.1, 0.25, 0);
	drawing.setScale(50);
	const color2 = color.hueShift(30);
	square(color2);
}

function resizeCanvas() {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight - 6;
	drawPicture();
}

$('#drawing-tab').on('shown.bs.tab', resizeCanvas);

function resize() {
	// Compute the absolute coordinates and dimensions of blocklyArea.
	let element = blocklyArea;
	let x = 0;
	let y = 0;
	do {
		x += element.offsetLeft;
		y += element.offsetTop;
		element = element.offsetParent;
	} while (element);
	// Position blocklyDiv over blocklyArea.
	blocklyDiv.style.left = x + 'px';
	blocklyDiv.style.top = y + 'px';
	blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
	blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
	if (workspace) {
		Blockly.svgResize(workspace);
	}
	resizeCanvas();
}

window.addEventListener('resize', resize);

const blocklyArea = document.getElementById('blockly-area');
const blocklyDiv = document.getElementById('blockly-div');
let workspace;

fetch('blocks.json')
.then(async function (response) {
	if (!response.ok) {
		throw new Error(`HTTP ${response.status} - ${response.statusText}`);
	}
	const json = await response.json();
	Blockly.defineBlocksWithJsonArray(json);

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
});
