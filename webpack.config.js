const
    path = require('path'),
    packageInfo = require('./package.json'),
    webpack = require('webpack'),
    mode = process.argv[3];

let config = {

        entry: {
            'player': [
                path.resolve(__dirname, './src/player.ts')
            ],
            'cdn': [
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
                    'Website: ' + packageInfo.homepage + '\n' +
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
    config.watch = true;
}

module.exports = config;