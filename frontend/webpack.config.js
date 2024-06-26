/* eslint-disable @typescript-eslint/no-var-requires */
/* global module, __dirname, process, require */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");
const devServerPorts = require("./devServerPorts.json");
const CopyPlugin = require("copy-webpack-plugin");

const isMainApp = () => {
  return process.env.npm_package_name === "main-app";
};

module.exports = {
  entry: "./src/index.tsx",
  devtool: "source-map",
  performance: {
    hints: false,
  },
  output: {
    path: path.resolve(__dirname, "dist", process.env.npm_package_name),
    filename: `${process.env.npm_package_name}.js`,
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]_[hash:base64:5]",
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    isMainApp() &&
      new CopyPlugin({
        patterns: [
          {
            from: "*",
            to: "",
            context: "public",
            globOptions: {
              ignore: ["**/*.html"],
            },
          },
        ],
      }),
    new Dotenv({
      path: "../../.env",
    }),
  ],
  devServer: {
    hot: true,
    port: devServerPorts[process.env.npm_package_name],
    historyApiFallback: true,
    client: {
      overlay: {
        errors: false,
        warnings: false,
        runtimeErrors: true,
      },
    },
  },
};
