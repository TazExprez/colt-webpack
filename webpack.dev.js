// This is the development webpack file.
const path = require("path");
// This gives us the content of the webpack.common.js file.
const common = require("./webpack.common");
// Here we are importing merge.
const { merge } = require("webpack-merge");
// This allows us to use HtmlWebpackPlugin in webpack.dev.js.
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
// module.exports = merge(common, {
//   mode: "development",
//   output: {
//     filename: "main.js",
//     path: path.resolve(__dirname, "dist")
//   }
// });

// We're going to set up a webpack dev server, so that when we are in developer mode we don't have to keep on building running npm start every time we want to see a change that we did.

// Here we are using what was left of the module.exports above, but cleaned up a bit.
// module.exports = merge(common, {
//   mode: "development",
//   output: {
// We changed this around so that every .js file that gets run in dev mode is not called main.  This will handle both main and vendor in the [name] section.
// filename: "main.js",
//     filename: "[name].bundle.js",
//     path: path.resolve(__dirname, "dist")
//   }
// });

// Here we are using what was left of the module.exports above, but cleaned up a bit.
module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  // We moved this from webpack.common.js to this file because we don't want the HTML file, index.html, to be minified in development.
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html"
    })
  ],
  // We had to move this here, from webpack.common.js, because we want to use this in development, but not in production.  We don't want separate CSS files in development, but we do in production.
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
});

// When we run in dev mode, nothing is minified and there is no separate CSS file.  The HTML still has the comments.  The CSS is inside of the main.bundle.js file and is injected into the index.html file.  The reason we do this is because it takes a while to build the CSS file, or files, and in development, we don't want to wait.

// At the end of the day, all we're doing is taking a bunch of files, in our case an svg file, an HTML file, JavaScript files, SCSS, and we combine them in some ways, not all into one file. But we combine JavaScript into different files.  All of our different .js files, five, plus the Bootstrap JavaScript, plus jQuery, plus Popper.js.  And we spit them out into bundles that are minified and have hashes in their names that pertain to the content inside of them.  So those hashes will only change if the content changes, which will help with caching and preventing caching when we don't want it.  Then we have our CSS being pulled out in production.  We have our index.html being built for us with all of the links included dynamically so that we don't have to write any of the script tags, this is all done for us.
//And then we set things up in development mode to be a little simpler.  We have our dev server that is going to update and rebuild any time we change something, serving it on localhost.  We aren't minifying.  We aren't using the content hashes.  Our CSS is not being extracted.  Our HTML is not being minified.  But we are still joining together all of these differnt files and making sure everything works for us.
