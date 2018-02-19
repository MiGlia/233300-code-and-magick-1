'use strict';
(function () {
  var URL = 'https://js.dump.academy/code-and-magick';


  // function load(onLoad, onError) {
  //
  // }

  function setup(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000; // 10s

  xhr.addEventListenrt('load', function () {

      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
         onError(xhr.response);
      }
}

    xhr.open('GET', URL);
    xhr.send();

  }

})();
