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
                            outputPath: 'css/',
                            publicPath: '/css/'
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
            scss: path.resolve(__dirname, 'src/scss'),
            players: path.resolve(__dirname, 'src/players')
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