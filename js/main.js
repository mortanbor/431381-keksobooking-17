'use strict';

// статичные исходные данные
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var NUMBERS_OF_PINS = 8;
var HEIGHT_MAP_START = 130;
var HEIGHT_MAP_FINISH = 630;
var WIDTH_PIN = 40;
var HEIGHT_PIN = 44;
var widthMap = map.offsetWidth;

// у блока .map убираю класс .map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// формируем шаблон для копирования
// первая строка - это то, куда будем копировать
// вторая строка - откуда берём шаблон для копирования
var similarListElement = document.querySelector('.map__pins');
var similarTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

// получаем случайный номер элемента. Элемент массива или данные - вставляем аргументом в функции
var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random()) * (max - min);
};

// получаем непосредственно значение элемента массива по случайно полученному индексу
var getRandomElement = function (elements) {
  return  elements[getRandomInteger(0, elements.length)];
};

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
        x: getRandomInteger(0, WIDTH_MAP),
        y: getRandomInteger(HEIGHT_MAP_START, HEIGHT_MAP_FINISH)
      }
    });
   return pins;
 };

// создание DOM-элемента, заполнение его данными из массива getPinsDescription
 var renderPin = function (pin) {
   var pinElement = similarTemplateElement.cloneNode(true); // находим шаблон для копирования и копируем его полностью
   var imgPin = pinElement.querySelector('.img');
   var buttonPin = pinElement.querySelector('.map__pin');

   imgPin.imgPin.src = pin.author.avatar;
   imgPin.imgPin.alt = pin.offer.type;
   buttonPin.buttonPin.style = pin.location.x;
   buttonPin.buttonPin.style = pin.location.y;
 };

 // отрисовка сгенерированных DOM-элементов в блок .map__pins с использованим DocumentFragment
 var collectFragment = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  similarListElement.appendChild(fragment);
};

collectFragment(getPinsDescription());