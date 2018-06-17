/* eslint max-params: 0, id-length: 0 */

import { translateProportions, findNewCenter, findNewEdge, findNewColor } from './trackerTransforms'

export const seed = sketch => {
	const Y_AXIS = 1
	const X_AXIS = 2

	// declare colors and sizes
	let white, blue, peach, green, orange, purple, mutating

	// these values will never change for each gradient that's generated, but they need to be defined after the sketch is setup
	let sketchHeight, sketchTop, sketchLeft

	// define default variables for anything that will change based on props
	let middleNewCenter, middleEdge1, middleEdge2, middleWidth
	let leftWidth, rightWidth, rightEdge

	// create the canvas
	sketch.setup = () => {
		sketch.createCanvas(window.innerWidth, window.innerHeight, sketch.WEBGL)

		// colors defined
		white = sketch.color(150, 10)
		blue = sketch.color(28, 139, 216, 200)
		peach = sketch.color(232, 141, 144, 190)
		green = sketch.color(92, 165, 101, 200)
		orange = sketch.color(209, 178, 144, 200)
		purple = sketch.color(170, 144, 209, 150)

		// positions that won't change
		sketchHeight = sketch.height
		sketchTop = (-sketch.height * 0.5)
		sketchLeft = (-sketch.width * 0.5)

		// defaults for load
		middleEdge1 = 401
		middleEdge2 = 401
		middleWidth = sketch.width / 3
		middleNewCenter = 0
		rightEdge = (sketch.width / 2) / 3
		rightWidth = sketch.width / 3
		leftWidth = sketch.width * 2 / 3
		mutating = peach
	}

	sketch.reactToProps = props => {
		// reassign the variables defined in the upper scope based on props
		if (props.face) {
			let [ x, y, width, height ] = props.face
			let newDimensions = findNewCenter(x, sketch.height)
			middleNewCenter = newDimensions[0]
			middleEdge1 = newDimensions[1]
			middleEdge2 = newDimensions[2]
			middleWidth = translateProportions(width, height, sketch.width)
		}

		if (props.eye) {
			let [ x, y, width, height ] = props.eye
			let newEdgeWidths = findNewEdge(x, width, sketch.width)
			rightEdge = newEdgeWidths[0]
			rightWidth = newEdgeWidths[2]

			// BUG: this point messes with the center gradient
			// leftWidth = newEdgeWidths[1]
		}

		if (props.mouth){
			let [ x, y, width, height ] = props.mouth
			mutating = sketch.color(...findNewColor(x, y, width, height))
		}
	}

	// draw your sketch
	sketch.draw = () => {

		// right
		sketch.setGradient(
			rightEdge, // x position changes with props
			sketchTop, // does not change
			rightWidth, // width will change with props
			sketchHeight, // does not change
			green,
			purple,
			X_AXIS
		)

		// left
		sketch.setGradient(
			sketchLeft, // does not change
			sketchTop, // does not change
			leftWidth, // width will change with props
			sketchHeight, // does not change
			mutating,
			green,
			X_AXIS
		)

		// middle top
		sketch.setGradient(
			0 - middleWidth / 2, // share the same x position
			sketchTop, // does not change
			middleWidth, // share the same width
			middleEdge1, // edge1
			white,
			blue,
			Y_AXIS
		)

		// middle bottom
		sketch.setGradient(
			0 - middleWidth / 2, // share the same x position
			middleNewCenter, // newCenter
			middleWidth, // share the same width
			middleEdge2, // edge2
			blue,
			white,
			Y_AXIS
		)
	}

	sketch.setGradient = (x, y, w, h, c1, c2, axis) => {
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
