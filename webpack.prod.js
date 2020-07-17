// This is the production webpack file.
const path = require("path");
// This gives us the content of the webpack.common.js file.
const common = require("./webpack.common");
// Here we are importing merge.
const { merge } = require("webpack-merge");
// We don't need this plugin here because we are not using it, we are using it in the common file.
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
// In production we want mode to be production.
//   mode: "production",
// We can get rid of the entry point because we can keep this in the common webpack.config.js file which we have now renamed to webpack.common.js.  These names are up to us.  We are going to pass them in when we actually run webpack from the package.json script.
// entry: "./src/index.js",
//   output: {
//     // In production we use a content hash.
//     filename: "main.[contentHash].js",
//     path: path.resolve(__dirname, "dist")
//   }
// We can get rid of the plugins for now from the dev and prod versions, but we can keep them in the webpack.common.js common file.
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./src/template.html"
//     })
//   ],
// In production, just like in dev mode, we can get rid of the rest of this.
//   module: {
//     rules: [
//       {
//         test: /\.scss/,
//         use: ["style-loader", "css-loader", "sass-loader"]
//       }
//     ]
//   }
// };

// Here we are using what was left of the module.exports above, but cleaned up a bit.
// All we're doing is changing mode and the output, dev vs production.
module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "main.[contentHash].js",
    path: path.resolve(__dirname, "dist")
  }
});
