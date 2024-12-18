var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry file - starting point for the app
  entry: "./src",

  // where to dump the output of a production build
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.[contenthash].js",
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
        test: /\.(gif|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.(jpe?g|png)$/i,
        loader: "responsive-loader",
        options: {
          sizes: [300, 600, 1200, 2000],
          quality: 40,
          //   placeholder: true,
          //          placeholderSize: 100,
          //          disable: true,
          adapter: require("responsive-loader/sharp")
        }
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
  resolve: {
    alias: {
      react: "preact-compat",
      "react-dom": "preact-compat",
      // Not necessary unless you consume a module using `createClass`
      "create-react-class": "preact-compat/lib/create-react-class",
      // Not necessary unless you consume a module requiring `react-dom-factories`
      "react-dom-factories": "preact-compat/lib/react-dom-factories"
    }
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
