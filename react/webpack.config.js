const path = require("path");
// const OfflinePlugin = require('offline-plugin')
const MetaSPAPlugin = require("@metaspa/meta-spa-webpack-plugin");

const timeStamp = new Date().getTime();

module.exports = {
    entry: {
        bundle: "./Root.tsx",
    },
    output: {
        filename: `[name].js`,
        path: path.resolve(__dirname, "dist/public"),
        publicPath: "/public/",
    },
    mode: "development",
    context: path.resolve(__dirname, "src"),
    watch: false,
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: [path.resolve(__dirname, "node_modules")],
                enforce: "pre",
                use: ["babel-loader", "ts-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|gif|ico)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: `[name].[ext]`,
                            publicPath: "/",
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: [".ts", ".tsx", ".js"],
    },
    devServer: {
        host: "0.0.0.0",
        port: 3100,
        contentBase: path.resolve(__dirname, "dist/public"),
        publicPath: "/public",
        headers: {
            "Service-Worker-Allowed": "/",
        },
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/$/,
                    to: "/index.html",
                },
                {
                    from: /./,
                    to: "/index.html",
                },
            ],
        },
        inline: true,
        watchOptions: {
            watch: true,
        },
        disableHostCheck: true,
        compress: true,
    },
    plugins: [
        new MetaSPAPlugin({
            namespace: "TestReact",
            provide: [
                {
                    module: "react",
                    symbol: "React",
                },
            ],
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 300,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: "~",
            name: true,
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    test: path.resolve(__dirname, "node_modules"),
                    name: "vendor",
                    enforce: true,
                },
            },
        },
    },
};
