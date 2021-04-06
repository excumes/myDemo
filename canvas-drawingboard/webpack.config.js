const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[id].[chunkhash:5].js",
    },
    devtool: "eval-source-map",
    devServer: {
        port: 8000,
        open: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
    ],
    module: {
        rules: [
            {test: /\.js$/, use: "babel-loader"},
            {test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"],}
        ]
    }
}