import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import path, { dirname } from 'path'
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "MAS Explorer",
            template: "src/custom.html"
        }),
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ],
    devServer: {
        static: path.join(__dirname, "dist"),
        https: true,
        compress: true,
        hot: true,
        port: 3000,
    },
}
