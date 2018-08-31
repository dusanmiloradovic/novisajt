var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry file - starting point for the app
  entry: "./src",

  // where to dump the output of a production build
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/"
  },
  plugins: [new HtmlWebpackPlugin({ template: "src/template.html" })],
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        loader: "babel-loader",
        options: {
          presets: ["es2015"],
          plugins: [
            ["transform-react-jsx", { pragma: "h" }],
            ["transform-class-properties"],
            ["transform-object-rest-spread"]
          ]
        }
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.txt$/,
        use: "raw-loader"
      }
    ]
  },

  // enable Source Maps
  devtool: "source-map",

  devServer: {
    // serve up any static files from src/
    contentBase: path.join(__dirname),

    // enable gzip compression:
    compress: true,

    // enable pushState() routing, as used by preact-router et al:
    historyApiFallback: true
  }
};