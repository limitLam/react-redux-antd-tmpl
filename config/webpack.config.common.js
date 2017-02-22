const {
  resolve,
  join
} = require('path');

// 目录
const ROOT_PATH = resolve(__dirname, '..'); // 项目根目录
const SRC_PATH = join(ROOT_PATH, 'src'); // 源码目录

module.exports = {

  context: resolve(__dirname, '../src'),

  output: {
    // options related how webpack emits results

    path: resolve(__dirname, '../dist'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: '[name]_[hash].js', // string
    // the filename template for entry chunks

    publicPath: '/', // string
    // the url to the output directory resolved relative to the HTML page

    // library: 'MyLibrary', // string,
    // // the name of the exported library

    // libraryTarget: 'umd', // enum
    // // the type of the exported library

    /* Advanced output configuration (click to show) */
  },

  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          "plugins": [
            [
              "react-css-modules", {
                "context": resolve(__dirname, '../src'),
                "filetypes": {
                  ".less": "postcss-less",
                },
                "generateScopedName": "[path]___[name]__[local]___[hash:base64:5]",
                // "filetypes": {
                // ".less": "less",
                // }
              },
            ],
            // Use modularized antd
            // import js and css modularly (less source files)
            ["import", {
              "libraryName": "antd",
              "style": true
            }],
          ]
        },
      }, ],
      exclude: /node_modules/
    }, {
      // test: /\.less$/,
      test: /\.(css|less)$/,
      use: [
        'style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
          }
        },
        'postcss-loader',
        'less-loader',
      ],
      include: [
        // resolve(__dirname, '../node_modules/antd'),
        /node_modules\/.*antd\/.*/,
        /node_modules\\.*antd\\.*/,
      ],
    }, {
      // test: /\.less$/,
      test: /\.(css|less)$/,
      use: [
        'style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
          },
        },
        'postcss-loader',
        'less-loader',
      ],
      include: [
        resolve(__dirname, '../src'),
        // resolve(__dirname, '../node_modules/antd'),
      ],
    }, ],
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: [
      'node_modules',
      // path.resolve(__dirname, 'app')
    ],
    // directories where to look for modules

    extensions: ['.js', '.jsx'],
    // extensions that are used

    alias: {
      // 自定义路径别名，大写用于区别NPM模块
      ASSETS: join(SRC_PATH, 'assets'),
      UTILS: join(SRC_PATH, 'utils'),
      PAGES: join(SRC_PATH, 'pages'),
      COM: join(SRC_PATH, 'components')
    }
  },

};