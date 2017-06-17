const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const staticFilesPattern = /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/;
const staticLoader = {
  file: {
    test: staticFilesPattern,
    loader: 'file-loader?name=assets/[name].[hash].[ext]'
  },
  test: {
    test: staticFilesPattern,
    loader: 'null-loader'
  }
};
const config = env => ({
  entry: {
    'index': './src/index.ts',
    'vendor': './src/vendor.ts',
    'polyfills': './src/polyfills.ts'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract([
          'css-loader',
          'sass-loader'
        ])
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  plugins: [
    new Webpack.optimize.CommonsChunkPlugin({name: ['app', 'vendor', 'polyfills']}),
    new ExtractTextPlugin('[name].[hash].css'),
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new Webpack.ContextReplacementPlugin(
      /angular[\\\/]core[\\\/]@angular/,
      path.join(__dirname, 'src')
    ),
    new Webpack.DefinePlugin({env: JSON.stringify(env)})
  ],
  resolve: {
    extensions: ['.js', '.ts']
  }
});

module.exports = (env = {}) => {

  switch (env.mode) {

    case 'prod':
      return merge(config(env), {
        module: {loaders: [staticLoader.file]},
        plugins: [
          new Webpack.NoErrorsPlugin(),
          new Webpack.optimize.DedupePlugin(),
          new Webpack.optimize.UglifyJsPlugin({mangle: {keep_fnames: true}})
        ]
      });

    case 'test':
      return merge(config(env), {
        module: {loaders: [staticLoader.test]}
      });

    default:
      return merge(config(env), {
        devtool: 'source-map',
        devServer: {
          contentBase: './',
          hot: true,
          stats: {
            children: false,
            chunks: false
          }
        },
        entry: {hot: 'webpack-dev-server/client?http://localhost:8080/'},
        module: {loaders: [staticLoader.file]},
        plugins: [new Webpack.HotModuleReplacementPlugin()]
      });

  }

};
