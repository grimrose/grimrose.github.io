module.exports = {
    context: __dirname + "/src",
    entry: [
        "./index.ts",
        "./index.html"
    ],
    output: {
        path: "dist",
        filename: "bundle.js"
    },
    devtool: 'inline-source-map',
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        modulesDirectories: ['node_modules', 'src']
    },
    module: {
        preLoaders: [
            // {
            //     test: /\.ts$/,
            //     loader: "tslint-loader"
            // }
        ],
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                test: /\.tsx?$/, loader: "ts-loader"
            },
            {
                test: /\.css$/,
                loader: 'style!css?sourceMap'
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.html$/,
                loader: "file?name=[path][name].[ext]"
            }
        ]
    },
    devServer: {
        contentBase: 'dist',
        hot: true,
        port: 3000,
        stats: {colors: true}
    }
};
