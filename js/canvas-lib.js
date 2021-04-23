export class Drawing {
	constructor(canvas) {
		this.scaleX = 1;
		this.scaleY = 1;
		this.nudged = false;
		this.context = undefined;
	}

	erase() {
		this.scaleX = 1;
		this.scaleY = 1;
		this.nudged = false;
		const context = this.context;
		const canvas = context.canvas;
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	setContext(context) {
		this.context = context;
	}

	nudge(needsNudge) {
		needsNudge = needsNudge && this.context.lineWidth % 2 === 1;
		if (needsNudge) {
			if (!this.nudged) {
				this.context.translate(0.5, 0.5);
				this.nudged = true;
			}
		} else {
			if (this.nudged) {
				this.context.translate(-0.5, -0.5);
				this.nudged = false;
			}
		}
	}

	scaleRectangle(x, y, width, height) {
		const scaleX = this.scaleX;
		const scaleY = this.scaleY;
		const scaledX = x * scaleX
		const roundedX = Math.round(scaledX);
		const roundedWidth = Math.round(width * scaleX + roundedX - scaledX);
		const scaledY = y * scaleY;
		const roundedY = Math.round(scaledY);
		const roundedHeight = Math.round(height * scaleY + roundedY - scaledY);
		return [roundedX, roundedY, roundedWidth, roundedHeight];
	}

	closePath() {
		this.context.closePath();
	}

	fill() {
		this.context.fill();
	}

	lineTo(x, y) {
		this.context.lineTo(Math.round(x * this.scaleX), Math.round(y * this.scaleY));
	}

	moveAbsolute(x, y, scaleX = 1, scaleY = scaleX) {
		this.scaleX = scaleX;
		this.scaleY = scaleY;
		this.nudged = false;
		this.context.setTransform(1, 0, 0, 1, Math.round(x), Math.round(y));
	}

	moveRelative(deltaX, deltaY) {
		const context = this.context;
		context.translate(Math.round(deltaX * this.scaleX), Math.round(deltaY * this.scaleY));
	}

	newShape(x, y, willStroke = false) {
		const context = this.context;
		this.nudge(willStroke);
		context.beginPath();
		context.moveTo(Math.round(x * this.scaleX), Math.round(y * this.scaleY));
	}

	clearRect(x, y, width, height) {
		this.nudge(false);
		this.context.clearRect(...this.scaleRectangle(x, y, width, height));
	}

	fillRect(x, y, width, height) {
		this.nudge(false);
		this.context.fillRect(...this.scaleRectangle(x, y, width, height));
	}

	strokeRect(x, y, width, height) {
		this.nudge(true);
		this.context.strokeRect(...this.scaleRectangle(x, y, width, height));
	}

	rotate(deltaRotation) {
		this.context.rotate(deltaRotation * 2 * Math.PI);
	}

	scale(scaleXMultiple, scaleYMultiple = scaleXMultiple) {
		this.scaleX *= scaleXMultiple;
		this.scaleY *= scaleYMultiple;
	}

	setFill(style) {
		this.context.fillStyle = style.toValue();
	}

	setStroke(style) {
		this.context.strokeStyle = style.toValue();
	}

	stroke() {
		this.context.stroke();
	}

	subshape(x, y) {
		this.context.moveTo(Math.round(x * this.scaleX), Math.round(y * this.scaleY));
	}

}

export class Color {
	constructor(hue, saturation = 1, lightness = 0.5, opacity = 1) {
		this.hue = hue;
		this.saturation = saturation;
		this.lightness = lightness;
		this.opacity = opacity;
		this.str = undefined;
	}

	clone() {
		return new Color(this.hue, this.saturation, this.lightness, this.opacity);
	}

	setHue(amount) {
		this.hue = amount;
		this.str = undefined;
	}

	setSaturation(amount) {
		this.saturation = amount;
		this.str = undefined;
	}

	setLightness(amount) {
		this.lightness = amount;
		this.str = undefined;
	}

	setOpacity(amount) {
		this.opacity = amount;
		this.str = undefined;
	}

	toValue() {
		if (this.str === undefined) {
			this.str = hsla(hue, saturation, lightness, opacity);
		}
		return this.str;
	}

}

export const Colors = {
	RED: new Color(0),
	ORANGE: new Color(30),
	AMBER: new Color(45),
	YELLOW: new Color(60),
	LIME: new Color(75),
	LAWN: new Color(120),
	CYAN: new Color(180),
	AZURE: new Color(210),
	BLUE: new Color(240),
	VIOLET: new Color(270),
	MAGENTA: new Color(300),
	CRIMSON: new Color(348, 0.83, 0.47),

	MAROON: new Color(0, 1, 0.25),			// Darkened RED
	BROWN: new Color(30, 1, 0.25),			// Darkened ORANGE
	OLIVE: new Color(60, 1, 0.25),			// Darkened YELLOW
	GREEN: new Color(120, 1, 0.25),			// Darkened LAWN
	TEAL: new Color(180, 1, 0.25),			// Darkened CYAN
	NAVY: new Color(240, 1, 0.25),			// Darkened BLUE
	INDIGO: new Color(270, 1, 0.25),		// Darkened VIOLET
	PURPLE: new Color(300, 1, 0.25),		// Darkened MAGENTA

	CORN: new Color(54, 0.95, 0.68),
	MINT: new Color(120, 1, 0.8),
	BABY_BLUE: new Color(199, 0.77, 0.74),
	PINK: new Color(330, 1, 0.8),

	BLACK: new Color(0, 0, 0),
	GRAY: new Color(0, 0, 0.63),
	WHITE: new Color(0, 0, 1),
};
