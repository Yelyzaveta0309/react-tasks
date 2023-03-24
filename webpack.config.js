const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
        filename: '[name].bundle.[chunkhash].js',
        path: path.resolve(__dirname, './build'),
    },
    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts'],
        alias: {
          components: path.resolve(__dirname, 'src/components/'),
          src: path.resolve(__dirname, 'src'),
        },
      },
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [{
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.s?css$/i,
                exclude: /\.module\.s?css$/i,
                use: ['style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            mode: 'icss',
                            localIdentName: '[name]___[hash:base64:5]',
                        },
                    },
                },
                 'sass-loader'],
            },
            {
                test: /\.module\.s?css$/,
                use: ['style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            mode: 'local',
                            localIdentName: '[name]___[hash:base64:5]',
                        },
                    },
                }, 
                'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
                use: [
                    {
                        loader: 'file-loader',
                    }
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ]
}