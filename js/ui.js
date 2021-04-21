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

	workspace = Blockly.inject(document.getElementById('blockly-div'), {
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
