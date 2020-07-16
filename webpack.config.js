// Here we are importing a path module from Node.js.  We don't have to install it because it comes with Node.js.
const path = require("path");
module.exports = {
  // Here we are setting webpack for development mode because it comes in production mode by default.  This mode will tell it to stop minifying.
  mode: "development",
  // This is not really necessary, but if you want to look at the code in main.js, there will not be a lot of weird eval() stuff in it.  This allows us to understand what this file is actually doing.
  //   devtool: "none",
  entry: "./src/index.js",
  output: {
    // Here you will create a file called main.js inside a directory called dist.
    filename: "main.js",
    // This path.resolve will resolve an absolute path to the dist directory.  Basically it will load dist into the current directory of the user.  Everyone has a different setup, so this way you don't get extra directories created in your machine.
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        // Any time you come across a CSS file, use css-loader.
        // /\.css$/ is a regular expression, regex, that looks for any file ending in .css.  The \ is used to escape the ., so that it can be used.  The $ looks for something that ends in .css.
        test: /\.css$/,
        // css-loader takes your CSS and it turns it into JavaScript.  Then style-loader will take that JavaScript, which is actually CSS, and inject it into the DOM.
        // The tricky part here is that there is an order to this array.  You have to use the loaders in the correct order.  You have to translate the CSS to JavaScript before you can inject.  They are loaded in reverse, the order goes from right to left, so css-loader is on the right and style-loader is on the left.
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
