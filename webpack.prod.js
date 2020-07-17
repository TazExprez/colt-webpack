// This is the production webpack file.
const path = require("path");
// This gives us the content of the webpack.common.js file.
const common = require("./webpack.common");
// Here we are importing merge.
const { merge } = require("webpack-merge");
// If we go and make changes to some of the code and we build again, running npm run build, what happens is that we end up with another bundle, another main.someHashInTheMiddle.js file, in the dist folder.  And every time we build, if the code changes, we get a new .js file.  Our index.html only links to one of them each time.
// This plugin, the clean-webpack-plugin, will delete the dist directory every time we build.  And then we'll have a clean slate to add our code into, or for webpack to do it.
// We only need to use this in production.  When we are using a dev server, it does not matter because those files are in memory.  When we stop the server, they go away.  When we're in production, it's actually exporting, it's building the dist folder and making those files.
const CleanWebpackPlugin = require("clean-webpack-plugin");
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
  },
  // After importing CleanWebpackPlugin, now we are able to pass in plugins here, like we have in the webpack.common.js file.
  // So right now, every time we build, if we change our JavaScript or CSS or any of our code, we end up with a new bundle file.  And that's just going to keep going until we delete them.  But now, with CleanWebpackPlugin, every time we run npm run build, we will see that the dist is cleaned up and we only have one main.someHashInTheMiddle.js file.  So everything that was in the dist folder is deleted and rebuilt, or if it is not being used, if it was left over from the last build, it's abandoned, it's completely removed.  And again, we only need that in production.  It wouldn't hurt to add it to common, or to dev, but in dev our files are using the dev server and they are just in memory temporarily, they are not actually written down, they are not saved to the system.
  plugins: [new CleanWebpackPlugin()]
});

// So we saw two things in part 8.  We saw file-loader with html-loader to get our assets into a new directory and to have the links work correctly.  And also, we saw how to quickly add to production the CleanWebpackPlugin.
