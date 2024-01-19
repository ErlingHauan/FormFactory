const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const devServerPorts = require("./devServerPorts.json");

module.exports = {
  entry: "./index.tsx",
  devtool: "source-map",
  performance: {
    hints: false,
  },
  output: {
    path: path.resolve(__dirname, "dist", process.env.npm_package_name),
    filename: `${process.env.npm_package_name}.js`,
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
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  devServer: {
    hot: true,
    port: devServerPorts[process.env.npm_package_name],
    client: {
      overlay: {
        errors: false,
        warnings: false,
        runtimeErrors: true,
      },
    },
  },
};
