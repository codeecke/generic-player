const path = require('path');


const mode = process.argv[3];
let config = {

    entry: {
        'player' : path.resolve(__dirname, './src/player.ts'),
        'autoload' : path.resolve(__dirname, './src/autoload.ts')
    },

    mode: 'production',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                            outputPath: 'assets/css/',
                            publicPath: '/assets/css/',
                            postTransformPublicPath: (path) => {
                                return `document.write('<link rel="stylesheet" type="text/css" href=${path} />');`;
                            }
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },

    performance: {hints: false},

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            Assets: path.resolve(__dirname, 'assets'),
            Base: path.resolve(__dirname, 'src/Base'),
            Components: path.resolve(__dirname, 'src/Components')
        }
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
        filename: '[name].js'
    }
};

if (mode === 'development') {
    config.devtool = 'source-map';
}

module.exports = config;