const webpack = require("webpack");
const path = require("path");
const RunNodeWebpackPlugin = require("run-node-webpack-plugin");
const WebpackNodeExternals = require("webpack-node-externals");

const config = {
  mode: "development",
  entry: "./src/main.js",
  target: "node",
  output: { path: path.join(__dirname, "dist"), filename: "main.js" },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "@sucrase/webpack-loader",
            options: { transforms: ["jsx"] },
          },
        ],
      },
    ],
  },
  externals: [WebpackNodeExternals()],
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();', {
      raw: true,
      entryOnly: false,
    }),
    new RunNodeWebpackPlugin(),
  ],
};

module.exports = config;
