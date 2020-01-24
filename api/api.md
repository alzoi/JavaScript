```
npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin clean-webpack-plugin nodemon
npm i express
```
# webpack.config.js
```js
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'public'),
  },
  // Настройка порта для dev-server.
  devServer: {
    port: 3000,
    proxy: {
      '/': 'http://localhost:5000'
    }    
  },
  plugins: [
    new HTMLPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
}
```
