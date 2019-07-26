'use strict';

(function () {
  // получаем случайный номер элемента. Элемент массива или данные - вставляем аргументом в функции
  var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
  };

  // получаем непосредственно значение элемента массива по случайно полученному индексу
  var getRandomElement = function (elements) {
    return elements[getRandomInteger(0, elements.length)];
  };

  var setElementsDisabled = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  };

  var removeElementsDisabled = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  var setSynchronizeValue = function (donor, acceptor) {
    donor.addEventListener('change', function () {
      acceptor.value = donor.value;
    });
  };

  window.utils = {
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    setElementsDisabled: setElementsDisabled,
    removeElementsDisabled: removeElementsDisabled,
    setSynchronizeValue: setSynchronizeValue
  };
})();
