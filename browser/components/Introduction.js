import React, { Component } from 'react'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#mirror');

export default class Introduction extends Component {
	constructor(){
		super()
		this.state = {
			showModal: true
		}
		this.handleCloseModal = this.handleCloseModal.bind(this)
	}

	handleCloseModal() {
		this.setState({ showModal: false });
	}

	render() {
		return (
			<ReactModal isOpen={ this.state.showModal } contentLabel='Introduction to Mirror-Mirror' onRequestClose={this.handleCloseModal} overlayClassName='modal' className='modal__content'>
				<h1 className='modal__heading'>Mirror, mirror on my screen <br /> Tell me, show me, how I seem</h1>
				<p className='modal__text'><i>Mirror, mirror</i> is a playful, interactive interface that changes depending on how you look at it. It's a tiny experiment in the performance of looking at an interface looking back at you. Twist your head, close your eyes, smile wide, look closer. Get started by allowing <i>Mirror, mirror</i> to access your webcam.</p>
				<p className='modal__text'>View the codebase on <a href='https://github.com/lizzthabet/mirror-mirror'>GitHub</a>.</p>
				<button type='button' onClick={ this.handleCloseModal }>Close</button>
			</ReactModal>
		)
	}
}
