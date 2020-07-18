// This file contains the stuff that we have in common between the dev and prod modes.
// If we want dev and prod to include the same functionality from common, then we have to use a package called webpack-merge.
// webpack-merge allows us to very easily merge webpack config files together.
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// This is what we are exporting from webpack.common.js.
// module.exports = {
// In this webpack.common.js file, we will remove the mode.
// mode: "development",
// entry: "./src/index.js",
// We remove the output because we don't want it in the dev version, but in the production version we do.  It's easier in the dev version to not deal with the hashing, to just deal with main.js.  It's not a big deal, but at least we can see that it's working.
//   output: {
//     filename: "main.[contentHash].js",
//     path: path.resolve(__dirname, "dist")
//   },
// plugins: [
//   new HtmlWebpackPlugin({
//     template: "./src/template.html"
//   })
// ],
// module: {
//   rules: [
//     {
// We can keep the scss loading, but eventually we will be minifying our sass and our css in production, but not in dev, and this will leave the webpack.common.js common file.  For now it can stay here.
//   test: /\.scss$/,
//   use: ["style-loader", "css-loader", "sass-loader"]
// },
// Here we are adding another rule where the test will be for .html at the end of a filename.
// Then we are going to use html-loader.  You don't really have to configure very much.  This is fine on its own.
// What is happening is that we are using the template.html, it is being required, basically.  webpack is going to encounter this and because we have this new loader, html-loader, which is basically saying "If it ends in .html, let me take charge of it, use html-loader."  That is going to come across <img src="./assets/webpack.svg" />, that source, in the template.html file.  It is going to require that image in JavaScript.  Then webpack is going to freak out because it doesn't know what to do.  We are now requiring any images in our template.  They are being required into JavaScript, but now webpack doesn't know how to handle them.  This is where file-loader comes in.  This will help us load those svg, png, and jpeg files.
// {
//   test: /\.html$/,
//   use: ["html-loader"]
// },
// This is the rule for testing for svg, png, jpg, and gif images.  This test is a little bit different from the others because it tests for files that end in either .svg, .png, .jpg, or .gif, and it will match one of these.  The regular expressions above only test for one file extension.  This one will have several options.
// {
//   test: /\.(svg|png|jpg|gif)$/,
// Instead of using use and then a file loader, we will be using a different syntax in here.  Here use is an object and we tell it the name of the loader, file-loader.  And then we pass in some options.  The reason we are doing these options is because we can specify things, like the name of each file.  We can specify whatever the filename is, the extension.  But we will also add in the hash, just to show that we can do that.  It's not [contentHash], like it is in production, but simply just [hash].  Maybe [contentHash] and [hash] will both work, but [hash] is what Colt has seen in the webpack docs.  Next we will give it an output path, outputPath, and this is where our assets will go.  Colt will use the imgs folder, just to show that you can do something different.
// When we run this, webpack is going to encounter this image because the html-loader encounters it inside of our template.html file because we used a source.  It imports it and this loader, file-loader, is triggered by the regex right above that matches the .svg image.  It copies it over in a new folder called imgs, inside of our dist folder.  The name of the image is going to be webpack.someHashInTheMiddle.svg.  When this runs, if everything went well, the index.html file inside of the dist folder is going to have a .svg image with the source set to the .svg image that was copied by file-loader to the dist folder.  The image is no longer set to what is was before, which was <img src="./assets/webpack.svg" />, in the template.html file.  It is now dynamically linking to the correct image.
// If we added another image into the assets folder, .svg, .png., .jpg, or .gif, and then we used it in the template.html file, it would be required.  Then it would be loaded, it would be copied over with a new name.  There are other things we can do as well, such as, setting a compression on our images, but Colt will keep it simple.
//         use: {
//           loader: "file-loader",
//           options: {
//             name: "[name].[hash].[ext]",
//             outputPath: "imgs"
//           }
//         }
//       }
//     ]
//   }
// };

// Now we will focus on getting webpack to spit out mulitple bundles.  Instead of just one with everything, we might want to separate out our own app code from our vendor code.  So let's say we're using Bootstrap JavaScript and maybe jQuery and some other library that we need.  These are not going to change very much, or ever, in our application, but our main code will.
// We can have two different bundles and one of them will be vendor.someHashInTheMiddle.js.  It will stay the same, almost all the time, unless we update that code, or we upgrade what version of Bootstrap JavaScript we're using, or something like that.  And then we can have our main.js changes more frequently.

// Here we are using what was left of the module.exports above, but cleaned up a bit.
module.exports = {
  // Now we are going to change the entry from a string to an object.  Each property is going to be the name portion of a file, like main.  main will be based off of ./src/index.js and vendor will be based off of ./src/vendor.js.  Now webpack is going to work its magic on both of these entry points, ./src/index.js and ./src/vendor.js.  It will take the first one and call it main, and the second one and call it vendor.
  // Now we are going to have two script tags at the end of our index.html in the dist folder.  They were added down there by webpack, automatically.
  // If you want to have multiple files or multiple bundles, all you have to do is add a separate entry point.
  // Now we will go and add some Bootstrap JavaScript in so that we can see the utility of this.
  // entry: "./src/index.js",
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs"
          }
        }
      }
    ]
  }
};
