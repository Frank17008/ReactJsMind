const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const demoConfig = {
  mode: 'production',
  entry: path.join(__dirname, '../examples/index.tsx'),
  output: {
    path: path.join(__dirname, '../dist-demo'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
}

module.exports = merge(demoConfig, baseConfig)
