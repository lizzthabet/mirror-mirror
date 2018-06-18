const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, '../public'))) // serve public files

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use((error, req, res, next) => {
	console.error(error)
	console.error(error.stack)
	res.status(error.status || 500).send(error.message || 'Internal server error.')
})

module.exports = app
