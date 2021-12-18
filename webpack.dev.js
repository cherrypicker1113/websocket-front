import {merge} from 'webpack-merge';
import common from './webpack.common.js';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: './dist',
    hot: true,
    compress: true,
    port: 9000,
    open: true
  },
});