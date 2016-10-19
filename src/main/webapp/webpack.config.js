const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV;

let config = {
	entry: {
		app: './app.js'
	},
	output: {
		path: './dist/',
		publicPath: "./dist/",
		filename: '[name].js'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
	],
	module: {
		loaders: [
				{ test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader' },
				{ test: /\.less$/, loader: 'style!css!less' },
				{ test: /.*\.(gif|png|jpe?g|svg)$/i, loader: 'url' },
				{ test: /\.(woff|woff2)$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
				{ test: /\.ttf$|\.eot$|\.svg$/, loader: 'file-loader' }
		]
	},
	resolve: {
			modulesDirectories: ['webapp', 'node_modules'],
			extensions: ['', '.js', '.jsx']
	}
}


if (NODE_ENV === 'production') {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin()
	);
}

module.exports = config;