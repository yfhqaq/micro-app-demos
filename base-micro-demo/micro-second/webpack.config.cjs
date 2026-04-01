const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');

const DEV_PORT = 9102;
const DEV_PUBLIC_PATH = `http://localhost:${DEV_PORT}/`;
const PROD_PUBLIC_PATH =
  process.env.SPA_MICRO_SECOND_PUBLIC_PATH || '/subapps/spaMicroSecond/';

/** @param {import('webpack-cli').ConfigOptions} _env @param {{ mode?: string }} argv */
module.exports = (_env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    context: __dirname,
    entry: {
      main: ['./src/public-path.ts', './src/index.tsx'],
    },
    mode: argv.mode || 'development',
    devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? '[name].[contenthash:8].js' : '[name].js',
      chunkFilename: isProd ? '[id].[contenthash:8].js' : '[id].js',
      publicPath: isProd ? PROD_PUBLIC_PATH : DEV_PUBLIC_PATH,
      clean: true,
      library: {
        name: pkg.name,
        type: 'umd',
      },
      chunkLoadingGlobal: `webpackJsonp_${pkg.name.replace(/[^a-zA-Z0-9_]/g, '_')}`,
      globalObject: 'window',
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: { transpileOnly: true },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        inject: 'body',
        scriptLoading: 'blocking',
      }),
    ],

    devServer: {
      host: 'localhost',
      port: DEV_PORT,
      hot: false,
      liveReload: false,
      historyApiFallback: { index: '/index.html' },
      headers: { 'Access-Control-Allow-Origin': '*' },
      static: path.resolve(__dirname, 'public'),
    },

    optimization: {
      runtimeChunk: false,
      splitChunks: false,
    },

    experiments: { outputModule: false },
  };
};
