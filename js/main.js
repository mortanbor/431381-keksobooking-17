'use strict';

// статичные исходные данные
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var NUMBERS_OF_PINS = 8;
var WIDTH_MAP = map.offsetWidth;
var HEIGHT_MAP_START = 130;
var HEIGHT_MAP_FINISH = 630;
var WIDTH_PIN = 40;
var HEIGHT_PIN = 44;

// у блока .map убираю класс .map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// формируем шаблон для копирования
// первая строка - это то, куда будем копировать
// вторая строка - откуда берём шаблон для копирования
var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// получаем случайный номер элемента. Элемент массива или данные - вставляем аргументом в функции
var getRandomIndex = function (min, max) {
  var rand;
  return rand = Math.floor((min + Math.random()) * (max - min) * arr.length);
};

// получаем непосредственно значение элемента массива по случайно полученному индексу
var getRandomElement = function (arr) {
  return arr[getRandomIndex(0, arr.length)];
};

// формируем массив из  восьми JS объектов
var getPinsDescription = function () {
  var pins = [];

  for (var i = 0; i < NUMBERS_OF_PINS; i++) {
    pins.push({
      author: {
        avatar: 'img/avatars/user' + i + '.png',
      },
      offer: {
        type: getRandomElement(TYPES)
      },
      location: {
        x: getRandomIndex(0, WIDTH_MAP),
        y: getRandomIndex(HEIGHT_MAP_START, HEIGHT_MAP_FINISH)
      }
    });
   return pins;
 };

// создание DOM-элемента, заполнение его данными из массива getPinsDescription
 var renderPin = function (pin) {
   var PinElement = similarPinTemplate.cloneNode(true); // находим шаблон для копирования и копируем его полностью
   var imgPin = document.querySelector('.img');
   var buttonPin = document.querySelector('.map__pin');

   PinElement.imgPin.src = pin.author.avatar;
   PinElement.imgPin.alt = pin.alt;
   PinElement.buttonPin.style = pin.location.x - (WIDTH_PIN / 2);
   PinElement.buttonPin.style = pin.location.y - (HEIGHT_PIN / 2);
 };

 // отрисовка сгенерированных DOM-элементов в блок .map__pins с использованим DocumentFragment
 var collectFragment = function (NUMBERS_OF_PINS) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  similarListElement.appendChild(fragment);
};

collectFragment (getPinsDescription());
