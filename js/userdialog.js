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
    window.setup.userDialog.style.top = '80px';
    window.setup.userDialog.style.left = '470px';
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

  //  Объявляем переменные константы
  var dialogHandle = window.setup.userDialog.querySelector('.setup-user-pic');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // Начальные координаты
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Функция расчета координат при передвижениее окна
    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      // Смещение
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      // новые начальные координаты
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setup.userDialog.style.top = (window.setup.userDialog.offsetTop - shift.y) + 'px';
      window.setup.userDialog.style.left = (window.setup.userDialog.offsetLeft - shift.x) + 'px';
    }

    // При опускании кнопки мыши удаляем обработчики нажатия и перемещения мыши
    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    // Навешиваем обработчики событий
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  // Обработчик на элементе от куда перемещается элементе
  // Если уже IMG, то
  shopElement.addEventListener('dragstart', function (evt) {
    var target = evt.target;
    if (target.tagName === 'IMG') {
      draggedItem = target;
      evt.dataTransfer.setData('text/plain', target.alt);
    }
    artifactsElement.style.outline = '2px dashed red';
  });

  var artifactsElement = document.querySelector('.setup-artifacts');

  artifactsElement.addEventListener('dragover', function (evt) {
    artifactsElement.style.outline = '';
    evt.preventDefault();
    return false;
  });

  // Обработчик на элементе куда перемещается элементе
  // Если еще не содержит этот элемент, то клонируем
  artifactsElement.addEventListener('drop', function (evt) {
    var target = evt.target;
    if (target.alt !== 'Star') {
      target.appendChild(draggedItem.cloneNode(true));
    }
    artifactsElement.style.outline = '';
    target.style.backgroundColor = '';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    var target = evt.target;
    target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    var target = evt.target;
    target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
