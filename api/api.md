```
npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin clean-webpack-plugin nodemon
npm i express
```

# package.json
```json
{
  "name": "14api",
  "version": "1.0.0",
  "description": "",
  "main": "./src/app.js",
  "scripts": {
    "start": "webpack-dev-server --mode development --open",
    "build": "webpack --mode production",
    "serv": "nodemon server/server.js"
  },
  "author": "Zoin <al.zoin@ya.ru>",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^3.2.0",
    "nodemon": "^2.0.2",
    "webpack": "^4.41.5",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.10.1"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}
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
# /server/server.js
```js
const express = require('express');

const app = express();

app.get('/test', (req, res) => {
  console.log('test');
  res.send('Hello test');
});

app.listen('5000', () => console.log('Start 5000'));
```

# /src/app.js
```js
const but = document.getElementById('BtnTest');

but.addEventListener('click', (event) =>{
  // Отключаем поведение по умолчанию.
  event.preventDefault();
  //console.log('test');
  getTest();
});


async function getTest() {
  const resp = await fetch('/test');
  const data = await resp.json();
  console.log(data);
}
```

# /src/index.html
```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <button id="BtnTest">Test</button>
</body>
</html>
```
