module.exports = {
	plugins: [
		require('rucksack-css')({
			preset: 'default'
		}),
		require('autoprefixer')({
			browsers: 'last 2 versions'
		}),
		require('cssnano')({
			preset: 'default'
		})
	]
}
