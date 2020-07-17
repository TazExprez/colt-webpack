// We are not using this file anymore and are using the webpack.common.js file, instead.
// Here we are importing a path module from Node.js.  We don't have to install it because it comes with Node.js.
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  // Here we are setting webpack for development mode because it comes in production mode by default.  This mode will tell it to stop minifying.
  mode: "development",
  // This is not really necessary, but if you want to look at the code in main.js, there will not be a lot of weird eval() stuff in it.  This allows us to understand what this file is actually doing.
  //   devtool: "none",
  entry: "./src/index.js",
  output: {
    // Here you will create a file called main.js inside a directory called dist.
    // filename: "main.js",
    // This is an example of a content hash.  The abc that was inserted here, originally, would actually be generated depending on the content of main.js.  It would be a different value for different content.  If the content did not change, the hash would remain the same.  We do this in order to perform cache busting.  Pages get cached in browsers and the browsers will display what they have in the cache when you go to a site, thinking that the content has not changed.  When we use a content hash, since the name will be different, the browser will think that the content is different and display that, instead of whatever is in the cache.
    // We get the content hash by running main.js through a special hashing function.  A very famous one is MD5.  If you change just a single character in main.js, you will get a completely different hash.  Every time we change the code, the filename changes.  When we don't change the code, the filename stays the same.  We're cache busting every time we change the code because a new filename is generated.
    // You will normally want to do your content hash in the "main.[contentHash].js" format, with the content hash in brackets, surrounded by dots.  You can also do "vendor.[contentHash].js".  You don't want to do "[contentHash].js".  GitHub does the content hash with a dash, github-contentHash.css and frameworks-contentHash.css.
    // When you build this, a content hash will be created from the content in the main.js file, but before the new file with the content hash name is created.  Colt thinks MD5 is the algorithm used for this.  The brackets will not be included in the name, only the dots will be included.
    // Later on we will have vendor.js which will contain libraries, things that won't change much, so the browser can cache them.  Our application code might change more often, so then we get a new file name each time, which then, when it's requested by the browser, it won't be cached.  A cached version won't be used because it's a new file name that the browser has not seen before.
    filename: "main.[contentHash].js",
    // This path.resolve will resolve an absolute path to the dist directory.  Basically it will load dist into the current directory of the user.  Everyone has a different setup, so this way you don't get extra directories created in your machine.
    path: path.resolve(__dirname, "dist")
  },
  // plugins is an array that contains as many plugins as we want.
  // We're making a new instance of HtmlWebpackPlugin in the plugins array.
  plugins: [
    new HtmlWebpackPlugin({
      // Here is where we tell the HtmlWebpackPlugin to use the template that we created.  We just pass in an object with the template file location.
      // webpack is going to use this source, template.html.  It's going to take that code and put it into a new file, which it's calling index.html, by default.  And it's going to make sure to include our script tag at the bottom, using the correct filename, depending on which bundle we just built.
      template: "./src/template.html"
    })
  ],
  module: {
    rules: [
      {
        // Any time you come across a CSS file, use css-loader.
        // /\.css$/ is a regular expression, regex, that looks for any file ending in .css.  The \ is used to escape the ., so that it can be searched for by the regex.  The $ looks for something that ends in .css.
        // test: /\.css$/,
        // css-loader takes your CSS and it turns it into JavaScript.  Then style-loader will take that JavaScript, which is actually CSS, and inject it into the DOM.
        // The tricky part here is that there is an order to this array.  You have to use the loaders in the correct order.  You have to translate the CSS to JavaScript before you can inject.  They are loaded in reverse, the order goes from right to left, so css-loader is on the right and style-loader is on the left.
        // use: ["style-loader", "css-loader"]
        // Here you are testing for sass files.
        test: /\.scss/,
        // There is an addional step when dealing with sass.  You must first convert the sass into css and then proceed with the two steps required for css.
        use: [
          "style-loader", // Step 3: Inject styles into DOM.
          "css-loader", // Step 2: Turns css into commonjs.  It converts the CSS into JavaScript.
          "sass-loader" // Step 1: Turns sass into css.
        ]
      }
    ]
  }
};
