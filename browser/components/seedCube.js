export const seed = (sketch) => {
	// define default variables for anything that will change based on props
	let rotation = 0

	// create the canvas
	sketch.setup = () => sketch.createCanvas(window.innerWidth, window.innerHeight, sketch.WEBGL)

	sketch.reactToProps = (props) => {
		// reassign the variables defined in the upper scope based on props
		if (props.rotation) {
			rotation = (props.rotation * Math.PI) / 180
		}
	}

	// draw your sketch
	sketch.draw = function() {
		sketch.background(100)
		sketch.noStroke()
		sketch.push()
		sketch.rotateY(rotation)
		sketch.box(100)
		sketch.pop()
	}
}
