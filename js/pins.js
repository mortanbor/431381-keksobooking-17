'use strict';

(function () {
  var widthPinHalf = window.data.PIN_WIDTH / 2;
  var heightPinHalf = window.data.PIN_HEIGHT / 2;

  // формируем шаблон для копирования
  // первая строка - это то, куда будем копировать
  // вторая строка - откуда берём шаблон для копирования
  var pinsContainer = window.map.node.querySelector('.map__pins');
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

  // создание DOM-элемента, заполнение его данными из массива объявлений
  var renderPin = function (pin) {
    var pinElement = pinTemplateElement.cloneNode(true); // находим шаблон для копирования и копируем его полностью
    var imgPin = pinElement.querySelector('img');

    imgPin.src = pin.author.avatar;
    imgPin.alt = pin.offer.type;
    pinElement.style.left = (pin.location.x - widthPinHalf) + 'px';
    pinElement.style.top = (pin.location.y - heightPinHalf) + 'px';

    return pinElement;
  };

  // отрисовка сгенерированных DOM-элементов в блок .map__pins с использованим DocumentFragment
  var collectFragment = function (pins) {
    similarListElement.innerHTML = '';
    var fragment = document.createDocumentFragment();
    var limit = Math.min(pins.length, window.data.NUMBERS_OF_PINS);
    for (var i = 0; i < limit; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var similarListElement = document.createElement('div');

  similarListElement.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('map__pin')) {

    }
  });

  pinsContainer.appendChild(similarListElement);

  window.utils.setElementsDisabled(window.map.filtersNodes);

  window.pins = {
    data: [], // объявляем массив данных, куда записывать данные с сервера
    collectFragment: function (pins) {
      collectFragment(pins);
    }
  };
})();
