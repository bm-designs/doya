const path = require("path");
const webpack = require('webpack');

module.exports = {
    target: 'node',
    entry: [path.resolve(__dirname, "src", "js", "app.js"),
            path.resolve(__dirname,"src", "js", "components", "layout.js"),
            path.resolve(__dirname,"src", "js", "components", "index.js"),
            path.resolve(__dirname,"src", "js", "components", "sqpay.js"),
            ],
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
        publicPath: "/public"
    }, 
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          { 
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
       ]
        },
            {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
            }
        ]
    },
    mode: "development",
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: "./public",
        hot: true,
        historyApiFallback: true
    }
};