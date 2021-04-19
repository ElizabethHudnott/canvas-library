'use strict';

function hsla(hue, saturation, lightness, alpha) {
	const s = saturation * 100;
	const l = lightness * 100;
	return `hsla(${hue}, ${s}%, ${l}%, ${alpha})`;
}
