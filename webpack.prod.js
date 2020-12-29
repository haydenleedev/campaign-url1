const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const BUILD_DIR = path.join(__dirname, "dist");
const APP_DIR = path.join(__dirname, "src/client");
const VENDOR_LIBS = ["react", "react-dom", "react-router-dom"];

module.exports = {
  externals: {
    jquery: "jQuery",
  },
  entry: {
    // main: APP_DIR + "/index.js",
    //  url: APP_DIR + "/index-url.js",
    url2: APP_DIR + "/index-url2.js",
    url3: APP_DIR + "/index-url3.js",
    vendor: VENDOR_LIBS,
  },
  mode: "production",
  output: {
    path: BUILD_DIR,
    filename: "[name]/_assets/js/[name].bundle.[chunkhash].js",
    libraryTarget: "var",
    library: "Client", // All of our javascipt code is accessible through this Client library.
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader?url=false",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|pdf)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin({})],
  },
  plugins: [
    /*
    new HtmlWebPackPlugin({
      template: "./src/client/index.html",
      filename: "./index.html",
      chunks: ["main"],
    }),
    */

    /*
    new HtmlWebPackPlugin({
      template: "./src/client/url.html",
      filename: "./url.html",
      chunks: ["url"],
    }),
    */

    new HtmlWebPackPlugin({
      template: "./src/client/url2.html",
      filename: "./url2/index.html",
      chunks: ["url2"],
    }),

    new HtmlWebPackPlugin({
      template: "./src/client/url3.html",
      filename: "./url3/index.html",
      chunks: ["url3"],
    }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "[name]/_assets/css/ujet_[name]_bundle.css",
      //chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    /*
    new CopyPlugin({
      patterns: [{ from: "src/client/_assets/images", to: "_assets/images" }],
      options: {
        concurrency: 100,
      },
    }),
*/
  ],
};
