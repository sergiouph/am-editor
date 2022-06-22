const rimraf = require( 'rimraf');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sass = require('sass');
const crypto = require('crypto');

module.exports = (env) => {
  print('Deleting output...\n')
  rimraf.sync('docs')
  fs.mkdirSync('docs')

  print('Compiling SASS...\n')
  const result = sass.compile("styles/index.scss");
  const cssHash = crypto.createHash('md5').update(result.css).digest('hex');
  const styleFile = 'styles.' + cssHash + '.css'

  fs.writeFileSync('./docs/' + styleFile, result.css, { encoding: 'utf-8' });

  print('Compiling with webpack...\n')
  return {
    mode: env.mode || 'development',
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: 'bundle.[contenthash].js',
    },
    resolve: {
      modules: ['node_modules', 'src'],
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
        },
        {
          test: /\.(txt|html)/,
          type: 'asset/source',
        }
      ],
    },
    devServer: {
      static: './docs',
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body',
        templateContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Automata Editor</title>
          <link rel="stylesheet" href="${styleFile}">
        </head>
        <body></body>
        </html>
        `,
      }),
    ],
  };
};

function print(message) {
  process.stdout.write(message)
}
