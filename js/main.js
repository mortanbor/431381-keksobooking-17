'use strict';

// статичные исходные данные
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TYPES_PRICES = ['10000', '1000', '5000', '0'];
var TIMEIN = ['12:00', '13:00', '14:00'];
var TIMEOUT = ['12:00', '13:00', '14:00'];
var NUMBERS_OF_PINS = 8;
var HEIGHT_MAP_START = 130;
var HEIGHT_MAP_FINISH = 630;
var WIDTH_PIN = 40;
var HEIGHT_PIN = 44;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 87;

var widthPinHalf = WIDTH_PIN / 2;
var heightPinHalf = HEIGHT_PIN / 2;

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

  for (var i = 1; i <= NUMBERS_OF_PINS; i++) {
    pins.push({
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        type: getRandomElement(TYPES)
      },
      location: {
        x: getRandomInteger(widthPinHalf, widthMap - widthPinHalf),
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
  pinElement.style.left = (pin.location.x - widthPinHalf) + 'px';
  pinElement.style.top = (pin.location.y - heightPinHalf) + 'px';

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

var mapFilters = map.querySelectorAll('.map__filter');
var mapPinMain = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var fieldAddress = adForm.querySelector('#address');

var setElementsDisabled = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', 'disabled');
  }
};

/* setDisabled(mapFeatures); */
setElementsDisabled(mapFilters);
setElementsDisabled(adForm);
/* setDisabled(addFormHeader);
setDisabled(addFormElement); */

var removeDisabled = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }
};

// получаю координаты нижнего конца метки
var getPinCoords = function (node, width, height) {
  var top = node.offsetTop;
  var left = node.offsetLeft;
  var x = Math.round(left + width / 2);
  var y = Math.round(top + height);

  return [x, y];
};

var mainPinCoords = getPinCoords(mapPinMain, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);

// добавляем значение в инпут адрес координат острого конца главной метки
// Метод join() объединяет все элементы массива в строку
fieldAddress.value = mainPinCoords.join(', ');

var clickMapPinMain = function () {
  collectFragment(getPinsDescription());
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');

  removeDisabled(mapFilters);
  removeDisabled(adForm);
  mapPinMain.removeEventListener('click', clickMapPinMain);
};

mapPinMain.addEventListener('click', clickMapPinMain);

var fieldRent = adForm.querySelector('#type');
var fieldMinPrice = adForm.querySelector('#price');
var fieldTimein = adForm.querySelector('#timein');
var fieldTimeout = adForm.querySelector('#timeout');

// находим цену соответствующего жилья
var getRentPrice = function (rent) {
  var indexOfRent = TYPES.findIndex(function (item) {
    return item === rent;
  });
  return TYPES_PRICES[indexOfRent];
};

// в поле цены записать мин.цену стартого жилья
fieldMinPrice.placeholder = getRentPrice(fieldRent.value);

// функция применения минимальной цены к полю
var changeMinPrice = function (minPrice) {
  fieldMinPrice.placeholder = minPrice;
  fieldMinPrice.min = minPrice;
};

fieldRent.addEventListener('change', function () {
  // применяем к полю  минимальной цены - мин.цену,
  // соответствую типу жилья в поле которое слушаем
  changeMinPrice(getRentPrice(fieldRent.value));
});

// находим время соответствующего выезда
var getTimeOut = function (time) {
  var indexOfTime = TIMEIN.findIndex(function (item) {
    return item === time;
  });
  return TIMEOUT[indexOfTime];
};

// функция применения время выезда к полю
var changeTimeOut = function (timeOfOut) {
  fieldTimeout.value = timeOfOut;
};

fieldTimein.addEventListener('change', function () {
  // применяем к полю время выезда время выезда,
  // кот. соответствует времени заезда
  changeTimeOut(getTimeOut(fieldTimein.value));
});
