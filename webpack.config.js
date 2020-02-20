const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js", // Entry File
    output: {
        path: path.resolve(__dirname, "build"), //Output Directory
        filename: "index.js", //Output file
    },
    mode: "development",
    target: "node",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },

    node: {
      fs: 'empty'
    }
}  