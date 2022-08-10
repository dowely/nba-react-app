const path = require("path")

module.exports = {
  mode: "development",
  entry: "./app/Main.jsx",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "app"),
    filename: "bundle.js",
    assetModuleFilename: "[name][ext]"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react", "@babel/env"]
        }
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/i,
        type: "asset/resource"
      }
    ]
  },
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "app")
    },
    hot: true,
    liveReload: false,
    historyApiFallback: { index: "index.html" }
  }
}
