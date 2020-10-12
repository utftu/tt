const path = require('path')
const webpack = require('webpack')
const ChmodWebpackPlugin = require('chmod-webpack-plugin')

module.exports = {
  entry: {
    cli:  './src/cli.mjs',
    index: './src/index.mjs'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'commonjs2',
    filename: '[name].js'
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0,
      minChunks: 2
    }
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: "#!/usr/bin/env node",
      raw: true,
      test: /cli\.js$/
    }),
    new ChmodWebpackPlugin({
      path: "build/cli.js",
      mode: 755,
    })
  ],
  target: 'node'
};
