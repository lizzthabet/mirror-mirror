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

		let now = new Date()
		if (now - this.props.faceTime > 5000) this.props.displayMessage('face', true)
		else this.props.displayMessage('face', false)
		if (now - this.props.mouthTime > 8000) this.props.displayMessage('mouth', true)
		else this.props.displayMessage('mouth', false)
		if (now - this.props.eyeTime > 2000) this.props.displayMessage('eye', true)
		else this.props.displayMessage('eye', false)

		// if there is a new sketch function, remove the current sketch and create a new one
		// these lines don't affect basic responsive functionality of my setup
		if (this.props.sketch !== nextProps.sketch) {
			this.sketch.removeChild(this.sketch.childNodes[0])
			this.canvas = new p5(nextProps.sketch, this.sketch)
			return true
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
