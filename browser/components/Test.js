import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Sketch from './Sketch'
import { seed as seedCube } from './seedCube'
import { seed as seedGradient } from './seedGradient'
const tracking = window.tracking // tracking is placed on the window object

const Test = class Test extends Component {
	constructor(props) {
		super(props)
		this.state = {
			xCoord: 0
		}
		this.canvas = React.createRef()
		this.displayRectangle = this.displayRectangle.bind(this)
		this.stopTracking = this.stopTracking.bind(this)
		this.resumeTracking = this.resumeTracking.bind(this)
	}
	componentDidMount(){
		const [ faceTracker, faceTask ] = this.initializeTracker('face')
		this.addEventListener(faceTracker, this.displayRectangle, '#a64ceb', 'face')
		this.faceTask = faceTask

		const [ eyeTracker, eyeTask ] = this.initializeTracker('eye')
		this.addEventListener(eyeTracker, this.displayRectangle, '#4682B4', 'eye')
		this.eyeTask = eyeTask

		const [ mouthTracker, mouthTask ] = this.initializeTracker('mouth')
		this.addEventListener(mouthTracker, this.displayRectangle, '#eeee0a', 'mouth')
		this.mouthTask = mouthTask
	}
	initializeTracker(type){
		// creating a tracker
		const tracker = new tracking.ObjectTracker(type)
		// set the tracker's settings
		this.setTrackerSettings(tracker, type)
		// link video with the tracker, this trackerTask can be stopped or run again
		const trackerTask = tracking.track('#video', tracker, { camera: true })
		// returns the new tracker
		return [ tracker, trackerTask ]
	}
	setTrackerSettings(tracker, type){
		if (type === 'face') tracker.setInitialScale(4)
		else tracker.setInitialScale(2)
		tracker.setStepSize(3)
		tracker.setEdgesDensity(0.1)
	}
	// this function expects to receive a tracker and an action
	addEventListener(tracker, action, ...options){
		// the action will be invoked with any options passed into it when the `track` event is emitted
		tracker.on('track', event => action(event, ...options))
	}
	displayRectangle(event, color = '#a64ceb', type){
		const self = this
		// const context = self.canvas.current.getContext('2d')
		// context.clearRect(0, 0, canvas.width, canvas.height) // clears the rectangle each time
		event.data.forEach((rect) => {
			// context.strokeStyle = color
			// context.strokeRect(rect.x, rect.y, rect.width, rect.height)
			console.log(rect.x, rect.y, rect.width, rect.height, type)
			if (type === 'face') self.setState({ xCoord: rect.x })
		})
	}
	stopTracking(){
		this.faceTask.stop()
		this.mouthTask.stop()
		this.eyeTask.stop()
	}
	resumeTracking(){
		this.faceTask.run()
		this.mouthTask.run()
		this.eyeTask.run()
	}
	render() {
		return (
			<section>
				{/*Break video into separate component that changes this app's state*/}
				<video id='video' ref={ this.video } preload='true' autoPlay loop muted className='video-cam' />
				<Sketch sketch={ seedCube } rotation={ this.state.xCoord } className='canvas' />
				{/*Add parameters to props*/}
				{/*<canvas ref={ this.canvas } width='420' height='340' />*/}
				<h1>face x coordinate: { this.state.xCoord }</h1>
				<button type='button' onClick={ this.stopTracking }>freeze frame</button>
				<button type='button' onClick={ this.resumeTracking }>resume</button>
				{/*<Sketch sketch={ seedGradient } className='canvas__stacked' />*/}
			</section>
		)
	}
}

export default Test
