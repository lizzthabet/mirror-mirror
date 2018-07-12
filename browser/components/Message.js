import React from 'react'

// Ideas: Don't get any closer, Where are you?, Did you leave?, You're too close to me, I want to see you

const Message = function(props) {
	return (
		<section className='message'>
			<h1 className='message__heading' data-visibility={ props.faceMessage }>Where are you?</h1>
			<h1 className='message__heading' data-visibility={ props.mouthMessage }>Open wide</h1>
			<h1 className='message__heading' data-visibility={ props.eyeMessage }>I can't see your eyes</h1>
		</section>
	)
}

export default Message
