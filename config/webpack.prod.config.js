const path = require('path')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const baseConfig = require('./webpack.base.js')

const prodConfig = {
  mode: 'production',
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: 'index.js',
    clean: true,
    // library: {
    //   name: "@frank17008/react-jsmind"
    //   type: 'umd',
    // },
    library: '@frank17008/react-jsmind',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /.[le|c]ss$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }, { loader: 'less-loader' }],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.min.css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
  externals: {
    react: 'react',
    'react-dom': 'ReactDOM',
  },
}
module.exports = merge(prodConfig, baseConfig)