/**
 * This is for development only
 */
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const env = process.env.NODE_ENV || 'development'
const isDevelopment = (env === 'development')

let config
if (isDevelopment) {
  require('dotenv').config({silent: true})
  config = require('./webpack.config')
} else {
  throw new Exception(`
This is intended for running development environment. Not supported for ${env} environment!
Please check again your 'NODE_ENV' config
  `)
}

const port = process.env.MOKA_PORT

const listenHost = 'localhost'

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: false,
  historyApiFallback: true,
  quiet: false,
  public: listenHost,
  disableHostCheck: true
}).listen(port, listenHost, function (error, result) {
  if (error) {
    console.error(error)
  }

  console.log(`Listening at ${listenHost}:${port}!`)
})
