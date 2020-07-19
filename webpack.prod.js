// This is the production webpack file.
const path = require("path");
// This gives us the content of the webpack.common.js file.
const common = require("./webpack.common");
// Here we are importing merge.
const { merge } = require("webpack-merge");
// If we go and make changes to some of the code and we build again, running npm run build, what happens is that we end up with another bundle, another main.someHashInTheMiddle.js file, in the dist folder.  And every time we build, if the code changes, we get a new .js file.  Our index.html only links to one of them each time.
// This plugin, the CleanWebpackPlugin, will delete the dist directory every time we build.  And then we'll have a clean slate to add our code into, or for webpack to do it.
// We only need to use this in production.  When we are using a dev server, it does not matter because those files are in memory.  When we stop the server, they go away.  When we're in production, it's actually exporting, it's building the dist folder and making those files.
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// Here we are importing (ES6), or requiring(CommonJS), the mini-css-extract-plugin module in order to create a separate CSS file for production.  By doing this, now we can use it inside of our plugins.
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// We are importing this in order to minimize our CSS.  Mine is already minified, but Colt's is not.  webpack now minifies production code by default.  I am just doing this to learn more.
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// Now we are going to use the plugin that had originally been used, before OptimizeCssAssetsPlugin overwrote it.  We don't have to install it, but we do have to require it.  Colt did not install this himself and it's already inside of node_modules.
const TerserPlugin = require("terser-webpack-plugin");
// This allows us to use HtmlWebpackPlugin in webpack.prod.js.
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
// module.exports = merge(common, {
//   mode: "production",
//   output: {
//     filename: "main.[contentHash].js",
//     path: path.resolve(__dirname, "dist")
//   },
// After importing CleanWebpackPlugin, now we are able to pass in plugins here, like we have in the webpack.common.js file.
// So right now, every time we build, if we change our JavaScript or CSS or any of our code, we end up with a new bundle file.  And that's just going to keep going until we delete them.  But now, with CleanWebpackPlugin, every time we run npm run build, we will see that the dist is cleaned up and we only have one main.someHashInTheMiddle.js file.  So everything that was in the dist folder is deleted and rebuilt, or if it is not being used, if it was left over from the last build, it's abandoned, it's completely removed.  And again, we only need that in production.  It wouldn't hurt to add it to common, or to dev, but in dev our files are using the dev server and they are just in memory temporarily, they are not actually written down, they are not saved to the system.
//   plugins: [new CleanWebpackPlugin()]
// });

// So we saw two things in part 8.  We saw file-loader with html-loader to get our assets into a new directory and to have the links work correctly.  And also, we saw how to quickly add to production the CleanWebpackPlugin.

// Here we are using what was left of the module.exports above, but cleaned up a bit.
// module.exports = merge(common, {
//   mode: "production",
//   output: {
// We changed this around so that every .js file that gets produced in production is not called main.  This will handle both main and vendor in the [name] section.
// filename: "main.[contentHash].js",
//     filename: "[name].[contentHash].bundle.js",
//     path: path.resolve(__dirname, "dist")
//   },
//   plugins: [new CleanWebpackPlugin()]
// });

// The main reason we want our CSS to be in a separate file, instead of being in the main.someHashInTheMiddle.js file is for better performance.  If you reload the page, you may notice a brief flash on the left side of the browser window, with unstyled content.  This happens because it takes some time before the JavaScript injects the CSS into the DOM as a style tag.  In production it is better to have a separate CSS file rather than waiting for JavaScript to inject the CSS styles.  What is happening is that when the page loads, there is no CSS at all.  The HTML loads and then the two scripts at the bottom are finally run.  One of these contains the CSS and it finally injects it into the DOM.  This actually happens very quickly, but everything else is loading first.  Since there is no stylesheet in the head element of the HTML, there is no stylesheet that will style everything first and there is a flash of unstyled content.  In production, especially, we want to avoid this because it is just not a good experience for users.  We want our CSS to be up in the head of the HTML and style everything, first, and then our JavaScript can load.  It might take a couple of milliseconds, sometimes longer, and we won't have to wait to get our styles.
// The reason we are not going to create a separate CSS file in development mode is because it takes time to create CSS files.  It's much faster when you're just developing with the dev server.  You don't want to wait each time that you save something, or you change your code.  You don't want to for it to recompile and rebundle and create new CSS files, so we are just going to do it in production.  One way to create the separate CSS file is by using mini-css-extract-plugin.

// Here we are using what was left of the module.exports above, but cleaned up a bit.
module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  // To use OptimizeCssAssetsPlugin, we don't just use it as a plugin on its own, we have to use a new property called optimization.  Within optimization, we specify a property called minimizer.
  // When we run npm run build, with the minimizer with just the OptimizerCssAssetsPlugin, the CSS will be minified, but the JavaScript files will no longer be minified.  This happens because when you set the mode to production, the optimization has the minimizer set to use a JavaScript minifying plugin, by default.  But then we are overwriting this when we just have minimizer: [new OptimizationCssAssetsPlugin()].  It basically ignores what was there before, which was minifying the JavaScript.  It is ignoring the Terser.js plugin, that we're going to reintroduce in a moment.  We have to manually add it back in.  It was there, but by adding the OptimizeCssAssetsPlugin, it overrides what was there originally, inside of minimizer.
  // Btw, the index.html is still minified in my project, but I don't know about Colt's project.
  // After passing in OptimizerCssAssetsPlugin to the minimizer array, we pass in  TerserPlugin.  Terser is the default JavaScript minimizer in webpack.  It was being used before, but we overwrote it and ignore it, but we're adding it back in.  Colt thinks that webpack used to use uglifier by default, instead of terser, but he believes that they do pretty much the same thing, they minify your JavaScript.  After minifying the JavaScript files, their sizes are much smaller.
  // Colt's index.html is not minified, while mine is.
  // Now we are going to minify the index.html file.  We don't have to install any additional plugins because we're already using the HtmlWebpackPlugin in webpack.common.js.  We can pass in other options, besides template.
  optimization: {
    // This is an array with multiple minimizers because sometimes we're minimizing JavaScript, CSS, and HTML, like in our case.
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      // This was moved here from webpack.common.js because we only want to minify the HTML in production, not in development.
      new HtmlWebpackPlugin({
        template: "./src/template.html",
        // We are now passing in minify in order to minify the index.html file that eventually gets created.  Inside of minify, we can use things like, removeComments, and set that to true or false.  Colt found this inside the documentation for the HtmlWebpackPlugin.  Colt decided to use the removeAttributeQuotes, collapseWhitespace, and removeComments minify options and he set them all to true.  The attribute quotes were removed.  The whitespace was removed.  The comments were removed.
        // When you check the Elements tab in the Chrome Inspector, you can still see everything fine.  We are only minifying the files so that they take as little space as possible, we are not corrupting them.
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  // Here we are now passing in the MiniCssExtractPlugin, too.  If we want we can specify a couple of options, like filename.  We'll set up filename with with same pattern that we have been following, so it'll be filename: "[name].[contentHash].css".
  // Using MiniCssExtractPlugin is the first step, but it actually insn't enough.  The next thing we need to do is make sure that we are using the MiniCssExtractPlugin, instead of the style-loader that we are using in the webpack.common.js file in the rules array.  At this moment, we are using the style-loader all the time, every time we load .scss or .css.  First sass-loader runs and converts .scss to .css, then css-loader runs and turns the .css into JavaScript, then style-loader runs and injects the JavaScript strings of .css into the DOM via style tags.  We don't want the style-loader to run in production.  We want to use the MiniCssExtractPlugin, instead, and grab those lines of .css and put it in a new file.
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    new CleanWebpackPlugin()
  ],
  // We have to do this, instead of what was originally in webpack.common.js, in order to generate separate CSS.
  // Instead of having style-loader for the third and final step, we will use MiniCssExtractPlugin.loader.  MiniCssExtractPlugin comes with a loader that we can use as part of the plugin.  Instead of injecting CSS into the DOM, this particular loader will move, or extract, CSS into files.
  // Now the index.html in the dist folder will include a link tag to the created CSS file in the head section.  So we are no longer waiting for the page to load, for the JavaScript to load, to then inject the CSS styles into the head.  It's all happening in the beginning.  It's compiled this way from the get go.  So the plugin is extracting all of our code into one CSS file.  You can configure it to do it in multiple files, but for now, one is fine.  This file contains all of our CSS, including the Bootstrap CSS, and we override the Bootstrap CSS using SASS.  If we had other styles as well, they would be in this created CSS file, assuming we were writing them in the main.scss file.
  // Now when we refresh the page, on the production build, we don't get that flash of unstyled content, anymore.  Our link tag is included in the correct spot, up in the head section.  We used the content hash again, to help with content caching, to prevent caching when we don't want it to happen.  When we change the file, the hash will change.
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 3. Extract CSS into files.  It should create new files for us, including the CSS that was loaded by css-loader and was originally converted from SASS to CSS by sass-loader.
          "css-loader", // 2. Turns CSS into CommonJS
          "sass-loader" // 1. Turns SASS into CSS.
        ]
      }
    ]
  }
});

// Now we are going to minify the CSS.  Mine is actually already minified, but Colt's is not minified.  webpack now minifies production code by default.
// There is a plugin to help us minify the CSS, optimize-css-assets-webpack-plugin.
// We are only going to minimize our CSS in production, we don't need to do that in development.  It's a lot easier if we only do it in production.  It takes time to debug something is CSS if it's super minimized.  It's not a huge issue and you can do it in development if you want, but Colt will not.
