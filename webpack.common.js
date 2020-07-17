// This file contains the stuff that we have in common between the dev and prod modes.
// If we want dev and prod to include the same functionality from common, then we have to use a package called webpack-merge.
// webpack-merge allows us to very easily merge webpack config files together.
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// This is what we are exporting from webpack.common.js.
module.exports = {
  // In this webpack.common.js file, we will remove the mode.
  // mode: "development",
  entry: "./src/index.js",
  // We remove the output because we don't want it in the dev version, but in the production version we do.  It's easier in the dev version to not deal with the hashing, to just deal with main.js.  It's not a big deal, but at least we can see that it's working.
  //   output: {
  //     filename: "main.[contentHash].js",
  //     path: path.resolve(__dirname, "dist")
  //   },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html"
    })
  ],
  module: {
    rules: [
      {
        // We can keep the scss loading, but eventually we will be minifying our sass and our css in production, but not in dev, and this will leave the webpack.common.js common file.  For now it can stay here.
        test: /\.scss/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};
