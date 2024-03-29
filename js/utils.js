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

  var findTypeById = function (id) {
    return window.data.TYPES.find(function (item) {
      return item.id === id;
    });
  };

  // заменяет в строке вхождение вида {{something}} на
  // элемент массива data. Число элемнтов должно быть равно
  // числу элементов вхождений в строку
  var templateRender = function (str, data) {
    var i = -1;
    return str.replace(/{{.*?}}/g, function (match) {
      i++;
      return data[i] || match;
    });
  };

  window.utils = {
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    setElementsDisabled: setElementsDisabled,
    removeElementsDisabled: removeElementsDisabled,
    findTypeById: findTypeById,
    templateRender: templateRender,
    setSynchronizeValue: setSynchronizeValue
  };
})();
