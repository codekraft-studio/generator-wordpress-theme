const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    "js/main": [
      "./src/assets/src/js/user/index.js",
      "./src/assets/src/scss/main.scss",
      "./src/assets/src/scss/editor.scss"
    ],
    "js/admin": [
      "./src/assets/src/js/admin/index.js",
      "./src/assets/src/scss/admin.scss"
    ]
  },
  output: {
    path: path.resolve(__dirname, "src/assets/dist")
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@wordpress/default'
          ]
        }
      }
    }, {
      test: /\.s?[ac]ss$/,
      use: [{
          loader: 'file-loader',
          options: {
            name: 'css/[name].css',
          }
        },
        "extract-loader",
        "css-loader",
        "postcss-loader",
        "sass-loader"
      ]
    }]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  }
}
