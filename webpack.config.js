const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        'index': path.resolve(__dirname, 'src', 'index.ts')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                loader: 'babel-loader'
            }
        ]
    }
};