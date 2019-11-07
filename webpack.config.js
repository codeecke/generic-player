const
    path = require('path'),
    packageInfo = require('./package.json'),
    webpack = require('webpack'),
    mode = process.argv[3],
    CopyPlugin = require('copy-webpack-plugin');

let config = {

        entry: {
            'player': path.resolve(__dirname, './src/player.ts')
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

        plugins: [
            new webpack.BannerPlugin({
                banner: packageInfo.name + ' v' + packageInfo.version + ' - ' + packageInfo.license + ' license\n' +
                    'Repository: ' + packageInfo.repository.url + '\n' +
                    'Copyright ' + (new Date()).getFullYear() + ' by ' + packageInfo.author + '\n' +
                    'all rights reserved.',
            }),
            new CopyPlugin([
                {
                    from: path.resolve(__dirname, './src/scss'),
                    to: path.resolve(__dirname, './dist/scss')
                }
            ])
        ],

        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath:
                "/",
            filename:
                '[name].js'
        }
    }
;

if (mode === 'development') {
    config.devtool = 'source-map';
}

module.exports = config;