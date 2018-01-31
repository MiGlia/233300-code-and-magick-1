'use strict';
(function () {
  // Объявляем переменные
  // Создаем массивы с данными Имен, Фамилий, Цвета плащей, цвета глаз
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var wizardCount = 4;
  var userDialog = document.querySelector('.setup');

  // пустой массив для будущих волшебников)))
  var wizards = [];

  //  Функция для создания полного имени персонажа
  function getFullName(nameArr, surNameArr) {
    return window.util.getRandomValueFromArr(nameArr) + ' ' + window.util.getRandomValueFromArr(surNameArr);
  }

  // Функция для создания массива с объектами описывющими волшебников (Имя, цвет плаща, цвет глаз)
  function createWizardArr(count, arr) {
    for (var i = 0; i < count; i++) {
      arr.push(
          {name: getFullName(WIZARD_NAMES, WIZARD_SURNAMES),
            coatColor: window.util.getRandomValueFromArr(WIZARD_COAT_COLORS),
            eyesColor: window.util.getRandomValueFromArr(WIZARD_EYES_COLORS)}
      );
    }
  }
  createWizardArr(wizardCount, wizards);

  // Делаем видимым диалоговое окно и окно с похожими персонажами
  userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  // нахрдим элемент в который будем всавлять похожих магов и шаблон
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  // Фрагмент для группировки
  var fragment = document.createDocumentFragment();

  // Функция для клонирования шаблона и заполнения его новыми данными
  function renderWizard(arr) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = arr.name;
    wizardElement.querySelector('.wizard-coat').style.fill = arr.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = arr.eyesColor;
    return wizardElement;
  }

  // Функция для добавления заполненного шаблона во фргмент и отрисоки его на странице
  function drawWizards(arr) {
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderWizard(arr[i]));
      similarListElement.appendChild(fragment);
    }
  }
  drawWizards(wizards);
})();
