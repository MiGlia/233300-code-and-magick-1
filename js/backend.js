'use strict';
(function () {
  var URL = 'https://js.dump.academy/code-and-magick';
  var serverTime = 10000;
  var statusOk = 200;

  //  Функция для обработки ошибочных ситуаций.
  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusOk) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = serverTime; // 10s

    return xhr;
  };

  // Функция для загрузки данных с сервера
  function load(onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', URL + '/data');
    xhr.send();
  }

  // Функция для отправки данных на сервера
  function save(data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  }

  // Функция для показа элемента с текстом ошибки
  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 5px auto; text-align: center; background-color: red; border: 2px solid black';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.backend = {
    load: load,
    save: save,
    errorHandler: errorHandler
  };
})();
