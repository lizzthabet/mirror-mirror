import React, { Component } from 'react'
import ReactDOM from 'react-dom'
const tracking = window.tracking // tracking is placed on the window object

const Test = class Test extends Component {
	constructor(props) {
		super(props)
		this.state = {
			xCoord: 0
		}
		this.displayRectangle = this.displayRectangle.bind(this)
	}
	componentDidMount(){
		const video = document.getElementById('video')
		const canvas = document.getElementById('canvas')
		const context = canvas.getContext('2d')

		const faceTracker = this.initializeTracker('face')
		this.addEventListener(faceTracker, this.displayRectangle, canvas, context, '#a64ceb', 'face')

		const eyeTracker = this.initializeTracker('eye')
		this.addEventListener(eyeTracker, this.displayRectangle, canvas, context, '#4682B4', 'eye')

		const mouthTracker = this.initializeTracker('mouth')
		this.addEventListener(mouthTracker, this.displayRectangle, canvas, context, '#eeee0a', 'mouth')
	}
	initializeTracker(type){
		// creating a tracker
		const tracker = new tracking.ObjectTracker(type)
		// set the tracker's settings
		this.setTrackerSettings(tracker)
		// link video with the tracker
		tracking.track('#video', tracker, { camera: true })
		// returns the new tracker
		return tracker
	}
	// look at the docs to see what these actually do...
	setTrackerSettings(tracker){
		tracker.setInitialScale(4)
		tracker.setStepSize(2)
		tracker.setEdgesDensity(0.1)
	}
	// this function expects to receive a tracker and an action
	addEventListener(tracker, action, ...options){
		// the action will be invoked with any options passed into it when the `track` event is emitted
		tracker.on('track', event => action(event, ...options))
	}
	displayRectangle(event, canvas, context, color = '#a64ceb', type){
		const self = this
		// context.clearRect(0, 0, canvas.width, canvas.height) // clears the rectangle each time
		event.data.forEach((rect) => {
			context.strokeStyle = color
			context.strokeRect(rect.x, rect.y, rect.width, rect.height)
			console.log(rect.x, rect.y, rect.width, rect.height, type)
			if (type === 'face') self.setState({ xCoord: rect.x })
		})
	}
	render() {
		return (
			<section>
				<video id='video' width='420' height='340' preload='true' autoPlay loop muted />
				<canvas id='canvas' width='420' height='340'></canvas>
				<h1>face x coordinate: {this.state.xCoord}</h1>
			</section>
		)
	}
}

export default Test
