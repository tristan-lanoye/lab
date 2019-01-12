// webpack.config.js
var Encore = require('@symfony/webpack-encore');

Encore
    // the project directory where all compiled assets will be stored
    .setOutputPath('public/build/')

    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')

    // will create public/build/app.js and public/build/app.css
    .addEntry('home', './src/Components/Home/index.js')
    .addEntry('login', './src/Components/Login/index.js')
    .addEntry('project', './src/Components/Project/index.js')
    .addEntry('explore', './src/Components/Explore/index.js')
    .addEntry('upload', './src/Components/Upload/index.js')
    .addEntry('profile', './src/Components/Profile/index.js')
    .addEntry('list', './src/Components/List/index.js')
    .addEntry('succeedForm', './src/Components/SucceedForm/index.js')
    .addEntry('search', './src/Components/Search/index.js')
    .addEntry('confirm', './src/Components/Confirm/index.js')
    .addEntry('donate', './src/Components/Donate/index.js')

    // allow legacy applications to use $/jQuery as a global variable
    // .autoProvidejQuery()

    .setManifestKeyPrefix('build/')

    // enable source maps during development
    .enableSourceMaps(!Encore.isProduction())

    // empty the outputPath dir before each build
    .cleanupOutputBeforeBuild()

    // show OS notifications when builds finish/fail
    .enableBuildNotifications()

    // create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning()

    // allow sass/scss files to be processed
    .enableSassLoader()
;

// if (Encore.isProduction()) {
//     Encore


//          // guarantee that the keys in manifest.json are *still*
//          // prefixed with build/
//          // (e.g. "build/dashboard.js": "https://my-cool-app.com.global.prod.fastly.net/dashboard.js")
//          Encore.setManifestKeyPrefix('build/');
// };


// export the final configuration
module.exports = Encore.getWebpackConfig();


