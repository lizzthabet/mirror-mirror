const app = require('./server')
const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`server up and running on port ${port}`)
})
