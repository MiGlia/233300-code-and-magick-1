'use strict';
(function () {
  // ctx — канвас на котором рисуется игра.
// names — массив, с именами игроков прошедших уровень. Имя самого игрока — Вы. Массив имен формируется случайным образом.
// times — массив, по длине совпадающий с массивом names. Массив содержит время прохождения уровня соответствующего игрока из массива names. Время прохождения уровня задано в миллисекундах.

  // Объявляем константы
  var CLOUD_WIDTH = 420; // px;
  var CLOUD_HEIGHT = 270; // px;
  var INITIAL_X = 120; // px;
  var INITIAL_Y = 100; // px;
  var LINEHEIGHT = 20; // px;

  // Функция для отрисовки облака
  function renderCloud(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  }

  // фунцция статистики, вызывается каждый раз когда игрок проходит уровень
  window.renderStatistics = function (ctx, names, times) {

    // Сортируем массив времен по возрастанию
    times = window.util.getSortArr(times);

    function drawTheHistogram() {

      // Оюъект со свойствами столбцов
      var hist = {
        width: 40,
        height: 150,
        indent: 50
      };
      var maxTime = window.util.getMaxElementFromArr(times);
      var step = hist.height / maxTime;

      for (var i = 0; i < times.length; i++) {

        // объявляем переменные
        var indentX = INITIAL_X + (hist.width + hist.indent) * i;
        var indentY = hist.height - step * times[i];
        var coordСolumnY = times[i] * step;
        var coordNamesTextY = INITIAL_Y + indentY + coordСolumnY + LINEHEIGHT;
        var coordTimesTextY = INITIAL_Y + indentY - LINEHEIGHT;

        // отрисовываем столбцы стстистики, счет, имена
        ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1.0)' : 'rgba(25, 61, 224,  ' + window.util.getRandomValue(0.1, 1) + ')';
        ctx.fillRect(indentX, INITIAL_Y + indentY, hist.width, coordСolumnY);
        ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
        ctx.fillText(names[i], indentX, coordNamesTextY);
        ctx.fillText(Math.floor(times[i]), indentX, coordTimesTextY);

      }
    }

    // Отрисовка облака
    renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, 100, 10, '#fff');

    // отрисовка текста на облаке
    ctx.font = '16px PT Mono';
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillText('Ура вы победили!', 120, 40);
    ctx.fillText('Список результатов:', 120, 60);

    drawTheHistogram();
  };
})();
