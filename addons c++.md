# C++ addons
Разработка модулей расширения (аддонов addons) Node.js на языке C++.  
https://nodejs.org/api/addons.html  
https://js-node.ru/site/article?id=12  


# Установка необходимых инструментов
```
nmp init -y
npm i -g node-gyp
npm install -g --production windows-build-tools
```
## Файл ./binding.gyp
```
{
  "targets": [
    {
      "target_name": "hello",
      "sources": ["hello.cc"]
    }
  ]
}
```
## Файл hello.cc
```cpp
// hello.cc

#include <node.h>

// Пространство имён модуля hello.
namespace hello {

  // Используемые классы из пространства имён v8.
  using v8::FunctionCallbackInfo;
  using v8::Isolate;
  using v8::Local;
  using v8::Object;
  using v8::String;
  using v8::Value;
  using v8::Number;

  void Method(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    // args.GetReturnValue().Set(String::NewFromUtf8(isolate, "world").ToLocalChecked());
    
    // Бизнес логика метода расширения.
    int i;
    double x = 100.32462344, y = 200.33345344;
    for(i=0; i < 2'000'000'000; ++i){
      x += y;
    }
    
    auto total = Number::New(isolate, x);
    //Local<Number> total = Number::New(isolate, x);
    args.GetReturnValue().Set(total);
  }
  // Определяем функцию инициализации экспортируем метод-addon наружу под именем calc.
  void Initialize(Local<Object> exports) {
    NODE_SET_METHOD(exports, "calc", Method);
  }
  NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

}
```

## Файл index.js
```js
// Подключаем модуль расширения hello.
const hello = require('./build/Release/hello.node');

function calc_js() {
  let i, x = 100.32462344, y = 200.33345344;
  for(i=0; i < 2_000_000_000; i++){
    x += y;
  }
  const total = x;
  return total;
}

// Скорость работы кода C++.
let e = 0;
console.time('c++');
e = hello.calc()
console.log('total = ' + e);
console.timeEnd('c++');

console.log('');

// Скорость работы кода JavaScript.
console.time('js');
e = calc_js();
console.log('total = ' + e);
console.timeEnd('js');
```

## Сборка C++addons модулей
```
node-gyp configure
node-gyp -m build
```
Расположение заголовочных файлов
```
C:\Users\<UserName>\AppData\Local\node-gyp\Cache\<NodeVersion>\include\node
```
Данная папка создаётся в момент конфигурации сборки node-gyp configure.

## Запуск кода
```
node index.js
```

## Вывод
```
total = 400666902243.5126
c++: 2889.189ms

total = 400666902243.5126
js: 5736.523ms
```
