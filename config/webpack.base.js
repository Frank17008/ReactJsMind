module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '...'],
  },
  module: {
    rules: [
      {
        test: /(\.js(x?))|(\.ts(x?))$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
}
