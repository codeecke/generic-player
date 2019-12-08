const
    path = require('path'),
    packageInfo = require('./package.json'),
    webpack = require('webpack'),
    mode = process.argv[3],
    CopyPlugin = require('copy-webpack-plugin');

let config = {

        entry: {
            'player': [
                // 'intersection-observer',
                path.resolve(__dirname, './src/player.ts')
            ],
            'cdn': [
                'intersection-observer',
                path.resolve(__dirname, './src/cdn.ts')
            ]
        },

        mode: 'production',

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },

        performance: {hints: false},

        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },

        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 8080
        },

        plugins: [
            new webpack.BannerPlugin({
                banner: packageInfo.name + ' v' + packageInfo.version + ' - ' + packageInfo.license + ' license\n' +
                    'Websize: ' + packageInfo.homepage + '\n' +
                    'Repository: ' + packageInfo.repository.url + '\n' +
                    'Copyright ' + (new Date()).getFullYear() + ' by ' + packageInfo.author + '\n' +
                    'all rights reserved.',
            }),
            new webpack.DefinePlugin({
                __VERSION__: JSON.stringify(packageInfo.version)
            })
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