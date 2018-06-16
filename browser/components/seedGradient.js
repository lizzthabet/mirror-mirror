/* eslint max-params: 0, id-length: 0 */

export const seed = sketch => {
	const Y_AXIS = 1
	const X_AXIS = 2

	// declare colors and sizes
	let white, blue, peach, green, orange, purple
	// these values will never change for each gradient that's generated, but they need to be defined after the sketch is setup
	let gradientH, gradientY

	// define default variables for anything that will change based on props

	// create the canvas
	sketch.setup = () => {
		sketch.createCanvas(window.innerWidth, window.innerHeight, sketch.WEBGL)
		sketch.noLoop()

		// colors defined
		white = sketch.color(255, 50)
		blue = sketch.color(28, 139, 216, 200)
		peach = sketch.color(232, 141, 144, 190)
		green = sketch.color(92, 165, 101, 200)
		orange = sketch.color(209, 178, 144, 200)
		purple = sketch.color(170, 144, 209, 150)

		// height and y position defined
		gradientH = sketch.height
		gradientY = (-sketch.height * 0.5)
	}

	sketch.reactToProps = props => {
		// reassign the variables defined in the upper scope based on props
	}

	// draw your sketch
	sketch.draw = () => {
		// right
		sketch.setGradient(
			(sketch.width / 2) / 3, // x position
			gradientY, // never touch
			sketch.width / 3, // width
			gradientH, // never touch
			green,
			purple,
			X_AXIS
		)
		// left
		sketch.setGradient(
			(-sketch.width / 2), // x position
			gradientY, // never touch
			sketch.width / 3, // width
			gradientH, // never touch
			peach,
			orange,
			X_AXIS
		)
		// middle
		sketch.setGradient(
			(-sketch.width / 2) / 3,
			gradientY, // never touch
			sketch.width / 3,
			gradientH, // never touch
			white,
			blue,
			Y_AXIS
		)
	}

	// if you end up with separate canvases, refactor this setGradient function
	sketch.setGradient = (x, y, w, h, c1, c2, axis) => {
		sketch.noFill()

		if (axis === Y_AXIS) {
			// Top to bottom gradient
			for (let i = y; i <= y + h; i++) {
				let inter = sketch.map(i, y, y + h, 0, 1)
				let c = sketch.lerpColor(c1, c2, inter)
				sketch.stroke(c)
				sketch.line(x, i, x + w, i)
			}
		} else if (axis === X_AXIS) {
			// Left to right gradient
			for (let i = x; i <= x + w; i++) {
				let inter = sketch.map(i, x, x + w, 0, 1)
				let c = sketch.lerpColor(c1, c2, inter)
				sketch.stroke(c)
				sketch.line(i, y, i, y + h)
			}
		}
	}
}
