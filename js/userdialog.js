'use strict';
(function () {
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;


  var setup = document.querySelector('.setup-open');
  var setupClose = window.setup.userDialog.querySelector('.setup-close');
  var inputSetupUserName = window.setup.userDialog.querySelector('.setup-user-name');

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

  inputSetupUserName.addEventListener('invalid', invalidInputSetup);

  function popupOpen() {
    window.setup.userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  }

  function popupClose() {
    window.setup.userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function onPopupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (evt.target.tagName === 'INPUT') {
        evt.preventDefault();
      } else {
        popupClose();
      }
    }
  }

  function onPopupEnterPress(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      popupOpen();
    }
  }

  setup.addEventListener('click', popupOpen);
  setup.addEventListener('keydown', onPopupEnterPress);
  setupClose.addEventListener('keydown', popupClose);
  setupClose.addEventListener('click', popupClose);


  var wizardCoatColor = window.setup.userDialog.querySelector('.setup-wizard .wizard-coat');
  var wizardEyesColor = window.setup.userDialog.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireballColor = window.setup.userDialog.querySelector('.setup-fireball-wrap');


  function changeColor(elemOfColorChange, arr) {
    elemOfColorChange.style.fill = window.util.getRandomValueFromArr(arr);
  }

  function changeFireballColor(elemOfColorChange, arr) {
    elemOfColorChange.style.background = window.util.getRandomValueFromArr(arr);
  }

  wizardCoatColor.addEventListener('click', function () {
    changeColor(wizardCoatColor, window.setup.WIZARD_COAT_COLORS);
  });

  wizardEyesColor.addEventListener('click', function () {
    changeColor(wizardEyesColor, window.setup.WIZARD_EYES_COLORS);
  });

  wizardFireballColor.addEventListener('click', function () {
    changeFireballColor(wizardFireballColor, WIZARD_FIREBALL_COLORS);
  });
})();
