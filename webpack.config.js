const currentTask = process.env.npm_lifecycle_event
const path = require("path")
const fse = require("fs-extra")
const HtmlWebpackPlugin = require("html-webpack-plugin")

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy styles", function () {
      fse.copySync("./app/styles/custom.css", "./dist/custom.css")
    })
  }
}

const cssRule = {
  test: /\.css$/i,
  use: ["css-loader"]
}

config = {
  entry: "./app/Main.jsx",
  module: {
    rules: [
      cssRule,
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
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "app/index-template.html"
    })
  ]
}

if (currentTask === "dev") {
  config.mode = "development"

  config.output = {
    publicPath: "/",
    path: path.resolve(__dirname, "app"),
    filename: "bundle.js",
    assetModuleFilename: "logos/[name][ext]"
  }

  cssRule.use.unshift("style-loader")

  config.devServer = {
    port: 3000,
    static: {
      directory: path.join(__dirname, "app")
    },
    hot: true,
    liveReload: false,
    historyApiFallback: true
  }
}

if (currentTask === "build") {
  config.mode = "production"

  config.output = {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    assetModuleFilename: "logos/[name][ext]",
    clean: true
  }

  config.plugins.push(new RunAfterCompile())
}

module.exports = config
