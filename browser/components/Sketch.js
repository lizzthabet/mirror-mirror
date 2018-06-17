import React, { Component } from 'react'
import p5 from 'p5'

// created based on https://discuss.reactjs.org/t/using-react-with-p5-js/5565, p5-react-wrapper, and https://github.com/slin12/react-p5-wrapper/blob/master/src/P5Wrapper.js

export default class Sketch extends Component {
	constructor(props){
		super(props)
		this.sketch = React.createRef()
	}
	// expects to receive a sketch as props
	componentDidMount() {
		this.canvas = new p5(this.props.sketch, this.sketch.current)
		if (this.canvas.reactToProps) this.canvas.reactToProps(this.props)
	}
	shouldComponentUpdate(nextProps) {
		// if there's a reactToProps function, invoke it. This will cause the variables to update in the canvas
		if (this.canvas.reactToProps) this.canvas.reactToProps(nextProps)

		// placeholder test for when data gets old
		let diff = new Date() - this.props.timeX
		if (diff > 5000) console.log(diff.toString(), true)
		// logic will look something like...
		// if the difference between now and faceTime > 5000, then invoke `this.props.displayMessage()` with the correct type and false
		// ELSE if the difference is less than or equal to 5000, then invoke this.props.displayMessage with the correct type and true

		// if there is a new sketch function, remove the current sketch and create a new one
		// these lines don't affect basic responsive functionality of my setup
		if (this.props.sketch !== nextProps.sketch) {
			this.sketch.removeChild(this.sketch.childNodes[0])
			this.canvas = new p5(nextProps.sketch, this.sketch)
		}
		return false
	}
	componentWillUnmount() {
		this.canvas.remove()
	}
	render() {
		return <section className={ this.props.className } ref={ this.sketch } />
	}
}

// FAILED INTERVAL CODE -- IGNORE ME
// let faceInterval
// if (this.props.faceX === nextProps.faceX) {
// 	faceInterval = setInterval(() => {
// 		console.log('WHERE IS YOUR FACE??? new')
// 	}, 5000)
// }
//
// if (this.props.faceX !== nextProps.faceX) clearInterval(faceInterval)
