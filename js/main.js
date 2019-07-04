'use strict';

// статичные исходные данные
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var NUMBERS_OF_PINS = 8;
var HEIGHT_MAP_START = 130;
var HEIGHT_MAP_FINISH = 630;
var WIDTH_PIN = 40;
var HEIGHT_PIN = 44;

// у блока .map убираю класс .map--faded
var map = document.querySelector('.map');

// формируем шаблон для копирования
// первая строка - это то, куда будем копировать
// вторая строка - откуда берём шаблон для копирования
var similarListElement = document.querySelector('.map__pins');
var similarTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

// получаем случайный номер элемента. Элемент массива или данные - вставляем аргументом в функции
var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

// получаем непосредственно значение элемента массива по случайно полученному индексу
var getRandomElement = function (elements) {
  return elements[getRandomInteger(0, elements.length)];
};

var widthMap = map.offsetWidth;

// формируем массив из  восьми JS объектов
var getPinsDescription = function () {
  var pins = [];

  for (var i = 0; i < NUMBERS_OF_PINS; i++) {
    pins.push({
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        type: getRandomElement(TYPES)
      },
      location: {
        x: getRandomInteger(0, widthMap),
        y: getRandomInteger(HEIGHT_MAP_START, HEIGHT_MAP_FINISH)
      }
    });
  }
  return pins;
};

// создание DOM-элемента, заполнение его данными из массива getPinsDescription
var renderPin = function (pin) {
  var pinElement = similarTemplateElement.cloneNode(true); // находим шаблон для копирования и копируем его полностью
  var imgPin = pinElement.querySelector('img');

  imgPin.src = pin.author.avatar;
  imgPin.alt = pin.offer.type;
  pinElement.style.left = (pin.location.x - (WIDTH_PIN / 2)) + 'px';
  pinElement.style.top = (pin.location.y - (HEIGHT_PIN / 2)) + 'px';

  return pinElement;
};

// отрисовка сгенерированных DOM-элементов в блок .map__pins с использованим DocumentFragment
var collectFragment = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  similarListElement.appendChild(fragment);
};

// map.classList.remove('map--faded');

var mapFeatures = document.querySelectorAll('.map__features');
var mapFilters = document.querySelectorAll('.map__filter');
var addFormHeader = document.querySelectorAll('.ad-form-header');
var addFormElement = document.querySelectorAll('.ad-form__element');

var setDisabled = function (elements) {
  var disabledElements;
  for (var i = 0; i < elements.length; i++) {
    disabledElements = elements[i].setAttribute('disabled', 'disabled');
  }
};

setDisabled(mapFeatures);
setDisabled(mapFilters);
setDisabled(addFormHeader);
setDisabled(addFormElement);

var mapPinMain = document.querySelector('.map__pin--main');

mapPinMain.addEventListener('click', function () {
  collectFragment(getPinsDescription());
});

/* Задействование элемента путём снятия атрибута "disabled"
document.getElementById('buttonRemove').removeAttribute("disabled"); */
