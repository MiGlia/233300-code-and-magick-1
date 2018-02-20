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
  // Функция находит для нахождения случайный элемент в массиве
  function getRandomValueFromArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function compareRandom(a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return Math.random() - 0.5;
  }

  window.util = {
    getRandomValue: getRandomValue,
    getMaxElementFromArr: getMaxElementFromArr,
    getSortArr: getSortArr,
    getRandomValueFromArr: getRandomValueFromArr,
    compareRandom: compareRandom
  };
})();
