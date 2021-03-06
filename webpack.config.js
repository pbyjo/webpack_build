const path = require('path'); //path ya viene disponible en node
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* const CopyWebpackPlugin = require('copy-webpack-plugin'); */
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const Dotenv = require('dotenv-webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname, 'dist'), //directorio donde se guarda el proyecto

        /* filename : 'bundle.js', */
        filename : '[name].[contenthash].js',
    },
    resolve: {
        extensions : ['.js', '.jsx'],
        alias : {
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },

    module : { 
        rules : [
            {
                test : /\.m?js$/,
                exclude : /node_modules/,
                use : {
                    loader: 'babel-loader'
                }
            },
            {
                test : /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
            },
            /* {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"]
            } */
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext][query]'
                }
            },
            {
                test : /\.(woff|woff2)$/,
                use : {
                    loader: 'url-loader',
                    options : {
                        limit: 10000,
                        mimetype: 'application/font-woff',

                        /* name: "[name].[ext]", */
                        name: "[name].[contenthash].[ext]",

                        outputPath: './assets/fonts/',
                        publicPath: '../assets/fonts/',
                        /* ../ doble punto porque cambio el origen de las fonts */
                        esModule : false,
                    }
                }
            }
        ]
    },

    plugins : [
        new HtmlWebpackPlugin({
            inject : true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename : 'assets/[name].[contenthash].css'
        }),
        /* new CopyWebpackPlugin({
            patterns : [
                {
                    from: path.resolve(__dirname, 'src', 'assets/images'),
                    to: 'assets/images'
                }
            ]
        }) */
        new Dotenv(),
        new CleanWebpackPlugin(),
    ],
    optimization : {
        minimize : true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
}

