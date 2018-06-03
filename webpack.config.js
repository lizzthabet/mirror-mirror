const webpack = require('webpack')

module.exports = {
	entry: './browser/app.js',
	mode: 'development',
	output: {
		path: `${__dirname}/public`,
		filename: 'bundle.js'
	},
	devtool: 'source-maps',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['react', 'env', 'stage-2']
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
}