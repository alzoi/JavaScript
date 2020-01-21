const fs = require('fs');
const util = require('util');

function read_cb() {
// Читаем список файлов текущей директории (вариант с использованием колбэков).

  console.log('1) Находим файлы в папке.');
  fs.readdir(__dirname, (err, files)=>{
    console.log('1) Done!');
    if(err) throw err;
    
    console.log('2) Читаем содержимое файлов.');
    // Идём по списку файлов.
    files.forEach((file) => {
      fs.readFile(file, 'utf-8', (err, fileData)=>{
        if(!err) {
          console.log(file + ' ====================================================');
          console.log(fileData);
        } else {
          console.log('Ошибка чтения файла: ' + err.code);
        }
      });
    });
  });
}

async function read_prom() {
// Асинхронная функция.

  // Функции fs.readdir() и fs.readFile(), использующие колбэки, заворачиваем в обёртку, которая позволит использовать промисы.
  const readdirAsync  = util.promisify(fs.readdir);
  const readFileAsync = util.promisify(fs.readFile);
    
  console.log('1) Находим файлы в папке.');
  // Ждём завершения работы асинхронного чтения файлов текущей директории.
  let files = await readdirAsync(__dirname).catch(err => {});
  console.log('1) Done!');

  console.log('2) Читаем содержимое файлов.');
  for (const file of files) {
    // try {
    //   const dataFile = await readFileAsync(file, 'utf8');
    // } catch (e) {
    // }

    const dataFile = await readFileAsync(file, 'utf8').catch(err => console.log('Ошибка чтения файла: ' + err.code) );
    console.log(file + ' ====================================================');
    console.log(dataFile);  
  }
  console.log('2) Done!');

}

read_cb();
//read_prom();
