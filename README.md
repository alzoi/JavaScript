# JavaScript

https://developer.mozilla.org/ru/docs/Learn/JavaScript
[Современный учебник JavaScript](https://learn.javascript.ru/)  
[Под капотом JavaScript'а в браузере](https://www.youtube.com/watch?v=H0TyegLaLgs)  
[Насколько важен порядок свойств в объектах JavaScript?](https://habr.com/ru/post/486162/)  
[Как работает JavaScript](https://habr.com/ru/company/ruvds/blog/482472/)
https://just.billywhizz.io/blog/on-javascript-performance-01/  
[just-js очень маленькая среда выполнения javascript v8 только для Linux](https://github.com/just-js/just)  
[Знай свой JIT: ближе к машине](https://habr.com/ru/company/oleg-bunin/blog/417459/)

# WebAssembly (Wasm)
https://emscripten.org/  
[Загрузка Wasm в JavaScript](https://metanit.com/cpp/webassembly/1.3.php)  
https://developer.mozilla.org/ru/docs/WebAssembly/C_to_Wasm  

Пример получения JavaScript кода из исходника C в формате asm.js который работает в большинствек браузеров, работает медленее wasm
```
emcc my_add.c -O2 -profiling -s ONLY_MY_CODE=1 -g2 --separate-asm -o abc.js
или
emcc my_add.c -O2 -profiling -s ONLY_MY_CODE=1 WASM=0 -g2 -o abc.js
```
Компиляция в быстрый код wasm, для подключения библиотеки необхидимо решить ошибку браузера CORS
```
emcc hello.c -O2 -s WASM=1 -s ONLY_MY_CODE=1 -s EXPORTED_FUNCTIONS="['_add']" -o hello.js
```

# Модули
https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Modules  
https://github.com/mdn/js-examples/blob/main/module-examples/classes/main.js  
https://wp-kama.ru/note/js-moduli-v-brauzere  
В консоли браузера для импортирования объектов из JavaScript модуля необходимо вызвать команду
```
import('./src/module1.js').then(module => console.log(module));
```
# Создание html элементов
https://www.youtube.com/watch?v=tlcEXDGo0oY  
https://www.youtube.com/watch?v=2I7uX8m0Ta0  
https://www.youtube.com/watch?v=BL3L_ON9gt8  
https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements

# TypeScript
https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers  
https://habr.com/ru/post/648805/  

# ASP.NET Core (web приложения на c#)
[Учебник. Создание веб-API с помощью ASP.NET Core](https://docs.microsoft.com/ru-ru/aspnet/core/tutorials/first-web-api?view=aspnetcore-3.0&tabs=visual-studio)  
[Микрослужбы .NET: Архитектура контейнерных приложений .NET](https://docs.microsoft.com/ru-ru/dotnet/architecture/microservices/)  


# HTTP benchmarking
[wrk](https://github.com/wg/wrk)  


# Java web servers
[Spark](http://sparkjava.com/)  
[Jetty](https://www.eclipse.org/jetty/)  

# Редакторы  
[WebStorm](https://www.jetbrains.com/webstorm/)  
[Visual Studio Code](https://code.visualstudio.com/)


# UI5
https://nickcode.ru/sapui5/urok-1-sapui5-pervaya-programma-hello-world.html  

# Циклы
http://jsraccoon.ru/fn-array-methods  
https://learn.javascript.ru/array-iteration

# Асинхронность в JavaScript
https://flaviocopes.com/javascript-async-await-array-map/  
https://www.sitepoint.com/delay-sleep-pause-wait/

# App Ideas
https://github.com/app-ideas/app-ideas

# Графика
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D  

# Ошибка CORS
Запустить браузер с опцией  
"chrome.exe" --disable-web-security --user-data-dir="[some directory here]"
