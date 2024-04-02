var execBtn     = document.getElementById("execute");
var outputElm   = document.getElementById('output');
var errorElm    = document.getElementById('error');
var commandsElm = document.getElementById('commands');
var dbFileElm   = document.getElementById('dbfile');
var savedbElm   = document.getElementById('savedb');

// Загрузить через worker библиотеку worker.sql-asm.js
var worker = new Worker("worker.sql-asm.js");
worker.onerror = error;

// Открыть базу
worker.postMessage({ action: 'open' });

// Печать вывода
function print(text) {
	outputElm.innerHTML = text.replace(/\n/g, '<br>');
}

function error(e) {
	console.log(e);
	errorElm.style.height = '2em';
	errorElm.textContent = e.message;
}

function noerror() {
	errorElm.style.height = '0';
}

// Выполнить команды SQL Lite
function execute(commands) {
	tic();
	worker.onmessage = function (event) {
		var results = event.data.results;
		toc("Executing SQL");
		if (!results) {
			error({message: event.data.error});
			return;
		}

		tic();
		outputElm.innerHTML = "";
		for (var i = 0; i < results.length; i++) {
			outputElm.appendChild(tableCreate(results[i].columns, results[i].values));
		}
		toc("Displaying results");
	}
	worker.postMessage({ action: 'exec', sql: commands });
	outputElm.textContent = "Fetching results...";
}

// Создать HTML таблицу
var tableCreate = function () {
	function valconcat(vals, tagName) {
		if (vals.length === 0) return '';
		var open = '<' + tagName + '>', close = '</' + tagName + '>';
		return open + vals.join(close + open) + close;
	}
	return function (columns, values) {
		var tbl = document.createElement('table');
		var html = '<thead>' + valconcat(columns, 'th') + '</thead>';
		var rows = values.map(function (v) { return valconcat(v, 'td'); });
		html += '<tbody>' + valconcat(rows, 'tr') + '</tbody>';
		tbl.innerHTML = html;
		return tbl;
	}
}();

// Обработчик нажатия на кнопку Выполнить
function execEditorContents() {
	noerror()
  execute(commandsElm.value + ';');  
}

execBtn.addEventListener("click", execEditorContents, true);

// Функционал для замена производительности.
var tictime;

if (!window.performance || !performance.now) { window.performance = { now: Date.now } }

function tic() { tictime = performance.now() }

function toc(msg) {
	var dt = performance.now() - tictime;
	console.log((msg || 'toc') + ": " + dt + "ms");
}

// Загрузить базу данных из файла
dbFileElm.onchange = function () {
	var f = dbFileElm.files[0];
	var r = new FileReader();
	r.onload = function () {
		worker.onmessage = function () {
			toc("Loading database from file");
      commandsElm.value = "SELECT name,hired_on FROM employees ORDER BY hired_on;";
			execEditorContents();
		};
		tic();
		try {
			worker.postMessage({ action: 'open', buffer: r.result }, [r.result]);
		}
		catch (exception) {
			worker.postMessage({ action: 'open', buffer: r.result });
		}
	}
	r.readAsArrayBuffer(f);
}

// Сохранить базу из памяти в файл
function savedb() {
	worker.onmessage = function (event) {
		toc("Exporting the database");
		var arraybuff = event.data.buffer;
		var blob = new Blob([arraybuff]);
		var a = document.createElement("a");
		document.body.appendChild(a);
		a.href = window.URL.createObjectURL(blob);
		a.download = "sql.db";
		a.onclick = function () {
			setTimeout(function () {
				window.URL.revokeObjectURL(a.href);
			}, 1500);
		};
		a.click();
	};
	tic();
	worker.postMessage({ action: 'export' });
}
savedbElm.addEventListener("click", savedb, true);
