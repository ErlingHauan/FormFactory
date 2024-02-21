/* eslint-disable @typescript-eslint/no-var-requires */
/* global module, __dirname, process, require */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const devServerPorts = require("./devServerPorts.json");
const CopyPlugin = require("copy-webpack-plugin");

const isMainApp = () => {
  return process.env.npm_package_name === "main-app";
}

module.exports = {
  entry: "./src/index.tsx",
  devtool: "source-map",
  performance: {
    hints: false
  },
  output: {
    path: path.resolve(__dirname, "dist", process.env.npm_package_name),
    filename: `${process.env.npm_package_name}.js`
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    isMainApp() && new CopyPlugin({
      patterns: [
        {
          from: "*",
          to: "",
          context: "public",
          globOptions: {
            ignore: ["**/*.html"]
          }
        }
      ]
    })
  ],
  devServer: {
    hot: true,
    port: devServerPorts[process.env.npm_package_name],
    historyApiFallback: true,
    client:
      {
        overlay: {
          errors: false,
          warnings: false,
          runtimeErrors: true
        }
      }
  }
};
