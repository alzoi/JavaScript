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
      "target_name": "calculate",
      "sources": ["main.c"]
    }
  ]
}
```
