const path = require("path");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const baseConfig = require("./webpack.base.js");

// 通用 output 配置
const outputBase = {
  clean: true,
  library: "@frank17008/react-jsmind",
  libraryExport: "default",
};

const prodConfig = {
  mode: "production",
  entry: path.join(__dirname, "../src/index.tsx"),
  output: {
    ...outputBase,
    path: path.join(__dirname, "../dist/umd/"),
    filename: "index.js",
    libraryTarget: "umd",
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /.[le|c]ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.min.css",
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
    react: "react",
    "react-dom": "ReactDOM",
  },
};

// ESM 构建配置
const esmConfig = {
  mode: "production",
  entry: path.join(__dirname, "../src/index.tsx"),
  output: {
    path: path.join(__dirname, "../dist/esm/"),
    clean: false,
    filename: "index.mjs",
    libraryTarget: "module",
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /.[le|c]ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.min.css",
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
    react: "react",
    "react-dom": "ReactDOM",
  },
};

module.exports = [merge(prodConfig, baseConfig), merge(esmConfig, baseConfig)];
