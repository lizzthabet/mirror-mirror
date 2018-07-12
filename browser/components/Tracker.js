import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Sketch from './Sketch'
import { seed as seedGradient } from './seedGradient'
import Message from './Message'
const tracking = window.tracking // tracking is placed on the window object

const Tracker = class Tracker extends Component {
	constructor(props) {
		super(props)
		this.state = {
			face: 0,
			faceTime: new Date(),
			faceMessage: false,
			eye: 0,
			eyeTime: new Date(),
			eyeMessage: false,
			mouth: 0,
			mouthTime: new Date(),
			mouthMessage: false
		}
		this.canvas = React.createRef()
		this.setDataToState = this.setDataToState.bind(this)
		this.displayMessage = this.displayMessage.bind(this)
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
		if (type === 'face') tracker.setInitialScale(6)
		else tracker.setInitialScale(2)
		tracker.setStepSize(1.7)
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
			if (type === 'face') self.setState({ face: data, faceTime: new Date() })
			else if (type === 'eye') self.setState({ eye: data, eyeTime: new Date() })
			else if (type === 'mouth') self.setState({ mouth: data, mouthTime: new Date() })
		})
	}
	// a message is toggled on/off when a tracker doesn't log data for a period of time
	// the time calculation is done in the Sketch component and passed up to this component
	displayMessage(type, display){
		let message = `${type}Message`
		if (type === 'face' && this.state[message] !== display) return this.setState({ faceMessage: display })
		else if (type === 'mouth' && this.state[message] !== display) return this.setState({ mouthMessage: display })
		else if (type === 'eye' && this.state[message] !== display) return this.setState({ eyeMessage: display })
	}

	render() {
		return (
			<section>
				<video id='video' ref={ this.video } preload='true' autoPlay loop muted className='video-cam' />

				<Sketch
					sketch={ seedGradient }
					face={ this.state.face }
					faceTime={ this.state.faceTime }
					mouth={ this.state.mouth }
					mouthTime={ this.state.mouthTime }
					eye={ this.state.eye }
					eyeTime={ this.state.eyeTime }
					displayMessage={ this.displayMessage }
					className='canvas' />

				<Message faceMessage={ this.state.faceMessage } mouthMessage={ this.state.mouthMessage } eyeMessage={ this.state.eyeMessage } />
			</section>
		)
	}
}

export default Tracker
