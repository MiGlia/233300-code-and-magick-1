'use strict';
(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var userDialog = document.querySelector('.setup');

  function getFullName() {
    return window.util.getRandomValueFromArr(WIZARD_NAMES) + ' ' + window.util.getRandomValueFromArr(WIZARD_SURNAMES);
  }

  var wizards = [];
  function createWazardArr(count, arr) {
    for (var i = 0; i < count; i++) {
      arr.push(
          {name: getFullName(),
            coatColor: window.util.getRandomValueFromArr(WIZARD_COATCOLORS),
            eyesColor: window.util.getRandomValueFromArr(WIZARD_EYESCOLORS)}
      );
    }
  }
  createWazardArr(4, wizards);

  userDialog.classList.remove('hidden');

  var setupSimularBlock = document.querySelector('.setup-similar').classList.remove('hidden');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  function renderWizard(arr) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = arr.name;
    wizardElement.querySelector('.wizard-coat').style.fill = arr.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = arr.eyesColor;
    return wizardElement;
  }

  var fragment = document.createDocumentFragment();

  function drawWizards(arr) {
    // for (var i = 0; i < arr.length; i++) {
    //   fragment.appendChild(renderWizard(arr[i]));
    //   similarListElement.appendChild(fragment);
    // }

    arr.forEach(function (item, i) {
      fragment.appendChild(renderWizard(arr[i]));
      similarListElement.appendChild(fragment);
    }
    );
  }
  drawWizards(wizards);

})();
