import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Sketch from './Sketch'
import { seed as seedCube } from './seedCube'
import { seed as seedGradient } from './seedGradient'
import Message from './Message'
const tracking = window.tracking // tracking is placed on the window object

const Test = class Test extends Component {
	constructor(props) {
		super(props)
		this.state = {
			xCoord: 0,
			timeXCoord: new Date(),
			face: 0,
			faceTime: new Date(),
			faceMessage: false,
			eye: 0,
			eyeTime: new Date(),
			eyeMessage: true,
			mouth: 0,
			mouthTime: new Date(),
			mouthMessage: true
		}
		this.canvas = React.createRef()
		this.setDataToState = this.setDataToState.bind(this)
		this.displayMessage = this.displayMessage.bind(this)
		this.stopTracking = this.stopTracking.bind(this)
		this.resumeTracking = this.resumeTracking.bind(this)
	}
	componentDidMount(){
		const [ faceTracker, faceTask ] = this.initializeTracker('face')
		this.addEventListener(faceTracker, this.setDataToState, 'face')
		this.faceTask = faceTask

		const [ eyeTracker, eyeTask ] = this.initializeTracker('eye')
		this.addEventListener(eyeTracker, this.setDataToState, 'eye')
		this.eyeTask = eyeTask

		const [ mouthTracker, mouthTask ] = this.initializeTracker('mouth')
		this.addEventListener(mouthTracker, this.setDataToState, 'mouth')
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
		// the action will be invoked with any options
		// passed into it when the `track` event is emitted
		tracker.on('track', event => action(event, ...options))
	}
	setDataToState(event, type){
		const self = this

		event.data.forEach((rect) => {
			let data = [ rect.x, rect.y, rect.width, rect.height ]
			console.log(data, type)
			if (type === 'face') self.setState({ face: data, faceTime: new Date() })
			else if (type === 'eye') self.setState({ eye: data, eyeTime: new Date() })
			else if (type === 'mouth') self.setState({ mouth: data, mouthTime: new Date() })

			// old test
			if (type === 'face') self.setState({ xCoord: rect.x, timeXCoord: new Date() })
		})
	}
	// a message is toggled on/off when a tracker doesn't log data for a period of time
	// the time calculation is done the Sketch component and passed up to this component
	displayMessage(type, display){
		let message = `${type}Message`
		if (type === 'face' && this.state[message] !== display) return this.setState({ faceMessage: display })
		else if (type === 'mouth' && this.state[message] !== display) return this.setState({ mouthMessage: display })
		else if (type === 'eye' && this.state[message] !== display) return this.setState({ eyeMessage: display })
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
				<video id='video' ref={ this.video } preload='true' autoPlay loop muted className='video-cam' />
				<Sketch sketch={ seedGradient } faceX={ this.state.xCoord } timeX={ this.state.timeXCoord } displayMessage={ this.displayMessage } className='canvas' />
				<h1>face x coordinate: { this.state.face }, { this.state.faceMessage.toString() }</h1>
				<button type='button' onClick={ this.stopTracking }>freeze frame</button>
				<button type='button' onClick={ this.resumeTracking }>resume</button>
				<button type='button' onClick={ () => this.displayMessage('face', true) }>display face message</button>
				<Message faceMessage={ this.state.faceMessage } mouthMessage={ this.state.mouthMessage } eyeMessage={ this.state.eyeMessage } />
			</section>
		)
	}
}

export default Test
