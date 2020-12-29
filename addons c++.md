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
    for(i=0; i<1000000000; i++){
      x += y;
    }
    
    auto total = Number::New(isolate, x);
    //Local<Number> total = Number::New(isolate, x);
    args.GetReturnValue().Set(total);
  }

  void Initialize(Local<Object> exports) {
    NODE_SET_METHOD(exports, "hello", Method);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize);

}
```
## Сборка C++addons модулей
```
node-gyp configure
node-gyp build
```
