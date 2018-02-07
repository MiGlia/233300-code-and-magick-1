'use strict';
(function () {
  //  Объявляем переменные константы
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var setup = document.querySelector('.setup-open');
  var setupClose = window.setup.userDialog.querySelector('.setup-close');
  var inputSetupUserName = window.setup.userDialog.querySelector('.setup-user-name');

  // Функция для валидации поля вввода имент персонажа
  function invalidInputSetup() {
    if (inputSetupUserName.validity.tooShort) {
      inputSetupUserName.setCustomValidity('Имя волшебника должно состоять как минимум из 2-х символов');
    } else if (inputSetupUserName.validity.tooLong) {
      inputSetupUserName.setCustomValidity('Имя волшебника не должно превышать  25-ти символов');
    } else if (inputSetupUserName.validity.valueMissing) {
      inputSetupUserName.setCustomValidity('Обязательное поле');
    } else {
      inputSetupUserName.setCustomValidity('');
    }
  }

  // Функция для открытия попапа
  // Удаляем класс hidden и добавляем обработчик событий который закрывает попап по нажатию на Esc
  function popupOpen() {
    window.setup.userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  }

  // Функция для закрытия попапа
  // Добавляем класс hidden и удаляем обработчик событий который закрывает попап по нажатию на Esc
  function popupClose() {
    window.setup.userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }

  // Функция для закрытия попапа с клавиши Esc
  // Если элемент на котором будет нажата клавиша Esc будет INPUT, то отменяем закрытие попапа
  // иначе закрываем попап
  function onPopupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (evt.target.tagName === 'INPUT') {
        evt.preventDefault();
      } else {
        popupClose();
      }
    }
  }

  // Функция для открытия попапа с клавиши Enter
  function onPopupEnterPress(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      popupOpen();
    }
  }

  // Навешиваем обработчики событий
  setup.addEventListener('click', popupOpen);
  setup.addEventListener('keydown', onPopupEnterPress);
  setupClose.addEventListener('keydown', popupClose);
  setupClose.addEventListener('click', popupClose);
  inputSetupUserName.addEventListener('invalid', invalidInputSetup);

  // Объявляем переменные - которыке отвечают за цвета плащей, глаз и файрболла магов
  var wizardCoatColor = window.setup.userDialog.querySelector('.setup-wizard .wizard-coat');
  var wizardEyesColor = window.setup.userDialog.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireballColor = window.setup.userDialog.querySelector('.setup-fireball-wrap');

  // Функция для случайного изменения цыета
  function changeColor(elemOfColorChange, arr) {
    elemOfColorChange.style.fill = window.util.getRandomValueFromArr(arr);
  }

  // Функция для случайного изменения цыета файрболла
  function changeFireballColor(elemOfColorChange, arr) {
    elemOfColorChange.style.background = window.util.getRandomValueFromArr(arr);
  }

  // Навешиваем обработчики событий
  wizardCoatColor.addEventListener('click', function () {
    changeColor(wizardCoatColor, window.setup.WIZARD_COAT_COLORS);
  });

  wizardEyesColor.addEventListener('click', function () {
    changeColor(wizardEyesColor, window.setup.WIZARD_EYES_COLORS);
  });

  wizardFireballColor.addEventListener('click', function () {
    changeFireballColor(wizardFireballColor, window.setup.WIZARD_FIREBALL_COLORS);
  });
})();
