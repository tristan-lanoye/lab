const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const extractSass = new ExtractTextPlugin({
	filename: 'css/[name].[contenthash].css',
	disable: process.env.NODE_ENV === 'development'
})

module.exports = {
	entry: {
		vendor: './src/scripts/vendor.js',
		index: './src/app.js'
	},
	devtool: 'source-map',
	devServer: {
		contentBase: path.resolve(__dirname, '../docs'),
		hot: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/components/index/index.html',
			filename: 'index.html'
		}),
		new HtmlWebpackPlugin({
			template: 'src/components/chapter0/chapter0.html',
			filename: 'chapter0.html'
		}),
		new HtmlWebpackPlugin({
			template: 'src/components/chapter1/chapter1.html',
			filename: 'chapter1.html'
		}),
		new HtmlWebpackPlugin({
			template: 'src/components/chapter2/chapter2.html',
			filename: 'chapter2.html'
		}),
		new HtmlWebpackPlugin({
			template: 'src/components/chapter3/chapter3.html',
			filename: 'chapter3.html'
		}),
		new HtmlWebpackPlugin({
			template: 'src/components/chapter4/chapter4.html',
			filename: 'chapter4.html'
		}),
		new HtmlWebpackPlugin({
			template: 'src/components/chapter5/chapter5.html',
			filename: 'chapter5.html'
		}),
		extractSass,
		new CopyWebpackPlugin([{ from: path.resolve(__dirname, '../static'), to: 'static' }])
	],
	output: {
		filename: 'js/bundle.[name].[hash].js',
		path: path.resolve(__dirname, '../docs')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
                	loader: 'babel-loader',
                	options: {
                		presets: ['env'],
                		plugins: ['transform-class-properties']
                	}
            	}
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader'
					}],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'images/[name].[hash].[ext]'
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'fonts/[name].[hash].[ext]'
					}
				}
			}
		]
	}
}
