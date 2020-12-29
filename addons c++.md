# Установка необходимых инструментов
```
nmp init
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
    
    int i;
    double x = 100.32462344, y = 200.33345344;
    for(i=0; i < 2'000'000'000; ++i){
      x += y;
    }
    
    auto total = Number::New(isolate, x);
    //Local<Number> total = Number::New(isolate, x);
    args.GetReturnValue().Set(total);
  }
  // Экспортируем метод наружу под именем calc.
  void Initialize(Local<Object> exports) {
    NODE_SET_METHOD(exports, "calc", Method);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize);

}
```

## Файл index.js
```js
// Подключаем модуль hello.
const hello = require('./build/Release/hello.node');

function calc_js() {
  let i, x = 100.32462344, y = 200.33345344;
  for(i=0; i < 2_000_000_000; ++i){
    x += y;
  }
  const total = x;
  return total;
}

console.time('c++');
hello.calc();
console.timeEnd('c++');

console.time('js');
calc_js();
console.timeEnd('js');
```

## Сборка C++addons модулей
```
node-gyp configure
node-gyp build
```
## Запуск кода
```
node index.js
```
