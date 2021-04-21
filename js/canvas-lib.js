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

	closePath() {
		this.context.closePath();
	}

	fill(color) {
		this.context.fillStyle = color.toValue();
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

	rotate(deltaRotation) {
		this.context.rotate(deltaRotation * 2 * Math.PI);
	}

	scale(scaleXMultiple, scaleYMultiple = scaleXMultiple) {
		this.scaleX *= scaleXMultiple;
		this.scaleY *= scaleYMultiple;
	}

	setScale(scaleX, scaleY = scaleX) {
		this.scaleX = scaleX;
		this.scaleY = scaleY;
	}

	stroke(color) {
		this.context.strokeStyle = color.toValue();
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
		this.str = hsla(hue, saturation, lightness, opacity);
	}

	hueShift(amount) {
		let hue = this.hue + amount;
		return new Color(hue, this.saturation, this.lightness, this.opacity);
	}

	toValue() {
		return this.str;
	}

}

export const Colors = {
	BLACK: new Color(0, 0, 0),
};
