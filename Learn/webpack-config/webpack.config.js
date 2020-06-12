let path = require('path');

module.exports = {
    context: path.resolve("js"),
    entry: ["./app.js", "./utils.js"],
    mode: "development",
    output: {
        path: path.resolve("dist/js"),
        publicPath: "/public/assets/js/",
        filename: "./bundle.js"
    },
    devServer: {
        contentBase: "public"
    },
    module: {
        rules: [
            {
                test: /\.es6$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.js', 'es6']
    }
};