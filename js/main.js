'use strict';

// статичные исходные данные
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TYPES_PRICES = ['10000', '1000', '5000', '0'];
var NUMBERS_OF_PINS = 8;
var MIN_MAP_Y = 130;
var MAX_MAP_Y = 630;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 44;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var ROOMS_TO_GUESTS = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0]
};

var map = document.querySelector('.map');
var widthMap = map.offsetWidth;

var widthPinHalf = PIN_WIDTH / 2;
var heightPinHalf = PIN_HEIGHT / 2;
var minMainPinY = MIN_MAP_Y - MAIN_PIN_HEIGHT;
var maxMainPinY = MAX_MAP_Y - MAIN_PIN_HEIGHT;
var offsetMainPinHalf = MAIN_PIN_WIDTH / -2;
var minMainPinX = offsetMainPinHalf;
var maxMainPinX = widthMap + offsetMainPinHalf;


// активирована ли карта
var isActive = false;

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
        y: getRandomInteger(MIN_MAP_Y, MAX_MAP_Y)
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

var setPinCoordsToAddress = function () {
  var mainPinCoords = getPinCoords(mapPinMain, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);

  // добавляем значение в инпут адрес координат острого конца главной метки
  // Метод join() объединяет все элементы массива в строку
  fieldAddress.value = mainPinCoords.join(', ');
};

// запись в поле адреса первичных координат метки
setPinCoordsToAddress();

// активируем карту
var activateMap = function () {
  collectFragment(getPinsDescription());
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');

  removeDisabled(mapFilters);
  removeDisabled(adForm);

  isActive = true;
};

var mapPinMainHandler = function (evt) {
  evt.preventDefault();
  var pin = evt.currentTarget;

  var startCoords = {
    x: evt.clientX, // координата текущего курсора на котором работает тек.событие
    y: evt.clientY
  };

  var moveHandler = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var pinTop = pin.offsetTop - shift.y;
    var pinLeft = pin.offsetLeft - shift.x;
    var minTop = Math.max(minMainPinY, pinTop);
    var minLeft = Math.max(minMainPinX, pinLeft);

    pin.style.top = Math.min(minTop, maxMainPinY) + 'px';
    pin.style.left = Math.min(minLeft, maxMainPinX) + 'px';
  };

  var upHandler = function (upEvt) {
    upEvt.preventDefault();
    if (!isActive) {
      activateMap();
    }
    setPinCoordsToAddress();
    document.removeEventListener('mousemove', moveHandler);
    document.removeEventListener('mouseup', upHandler);
  };

  document.addEventListener('mousemove', moveHandler);
  document.addEventListener('mouseup', upHandler);
};

mapPinMain.addEventListener('mousedown', mapPinMainHandler);

var fieldRent = adForm.querySelector('#type');
var fieldMinPrice = adForm.querySelector('#price');
var fieldTimein = adForm.querySelector('#timein');
var fieldTimeout = adForm.querySelector('#timeout');
var fieldRoomNumber = adForm.querySelector('#room_number');
var fieldCapacity = adForm.querySelector('#capacity');

// синхронизируем время заезда с выездом
var setSynchronizeValue = function (donor, acceptor) {
  donor.addEventListener('change', function () {
    acceptor.value = donor.value;
  });
};

setSynchronizeValue(fieldTimein, fieldTimeout);
setSynchronizeValue(fieldTimeout, fieldTimein);

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

// var ROOMS_TO_GUESTS = {
//   '1': [1],
//   '2': [1, 2],
//   '3': [1, 2, 3],
//   '100': [0]
// };
// var fieldRoomNumber = adForm.querySelector('#room_number');
// var fieldCapacity = adForm.querySelector('#capacity');
var rooms = Object.keys(ROOMS_TO_GUESTS);
var capacityOptions = fieldCapacity.querySelectorAll('option');

var roomsChangeHandler = function () {
  var currentValue = fieldRoomNumber.value;
  var currentRooms = ROOMS_TO_GUESTS[rooms.find(function (item) {
    return item === currentValue;
  })];
  for (var i = 0; i < capacityOptions.length; i++) {
    var currentCapacity = capacityOptions[i];
    if (currentRooms.indexOf(+currentCapacity.value) > -1) {
      currentCapacity.removeAttribute('disabled');
    } else {
      currentCapacity.setAttribute('disabled', 'disabled');
    }
  }
};

fieldRoomNumber.addEventListener('change', roomsChangeHandler);
roomsChangeHandler();

// (function () {
//
// })();
