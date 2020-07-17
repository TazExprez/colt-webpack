// This is the development webpack file.
const path = require("path");
// This gives us the content of the webpack.common.js file.
const common = require("./webpack.common");
// Here we are importing merge.
const { merge } = require("webpack-merge");
// We don't need this plugin here because we are not using it, we are using it in the common file.
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   mode: "development",
// We can get rid of entry in the dev version.
// entry: "./src/index.js",
//   output: {
// filename: "main.[contentHash].js",
// We don't want to deal with the hast in the dev version.
//     filename: "main.js",
//     path: path.resolve(__dirname, "dist")
//   }
// We can get rid of the plugins for now from the dev and prod versions, but we can keep them in the webpack.common.js common file.
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./src/template.html"
//     })
//   ],
// We can also get rid of the rest of this in dev mode.
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
// Here we are setting module.exports to be a function call of merge.  We are passing in common and an object with the contents of what was left of the module.exports object above.
// What this is saying is merge whatever is in common, which is whatever is in the webpack.common.js module.exports object, with what we have in the object passed into the merge function.
module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
});

// We're going to set up a webpack dev server, so that when we are in developer mode we don't have to keep on building running npm start every time we want to see a change that we did.
