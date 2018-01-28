'use strict';
(function () {
  // Функция для рассчета случайного значения
  function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }
  // Сортировка
  function getSortValue(a, b) {
    return a - b;
  }
  // Функция копирования и сортировки массива по возрастанию
  function getSortArr(arr) {
    return arr.slice().sort(getSortValue);
  }
  // Функция находит для нахождения максимального элемент в массиве
  function getMaxElementFromArr(arr) {
    return getSortArr(arr)[([arr.length - 1])];
  }

  window.util = {
    getRandomValue: getRandomValue,
    getMaxElementFromArr: getMaxElementFromArr,
    getSortArr: getSortArr,
  };
})();
