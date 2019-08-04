'use strict';

(function () {
  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');

  var popupAvatar = cardTemplateElement.querySelector('.popup__avatar');
  var popupTitle = cardTemplateElement.querySelector('.popup__title');
  var popupTextAddress = cardTemplateElement.querySelector('.popup__text--address');
  var popupTextPrice = cardTemplateElement.querySelector('.popup__text--price');
  var popupType = cardTemplateElement.querySelector('.popup__type');
  var popupTextCapacity = cardTemplateElement.querySelector('.popup__text--capacity');
  var popupTextTime = cardTemplateElement.querySelector('.popup__text--time');

  var renderCard = function (data) {
    var offer = data.offer;
    var arrayToCapacity = [offer.rooms, offer.guests];
    var arrayToCheck = [offer.checkin, offer.checkout];
    popupAvatar.src = data.author.avatar;
    popupTitle.innerText = offer.title;
    popupTextAddress.innerText = offer.address;
    popupTextPrice.innerText = offer.price + window.data.CURRENCY_PER_NIGHT;
    popupType.innerText = window.utils.findTypeById(offer.type).name;
    popupTextCapacity.innerText = window.utils.templateRender(window.data.TEMPLATE_CAPACITY, arrayToCapacity);
    popupTextTime.innerText = window.utils.templateRender(window.data.TEMPLATE_CHECK, arrayToCheck);
  };

  window.map.filtersContainer.insertAdjacentElement('beforebegin', cardTemplateElement);

  window.cards = {
    renderCard: renderCard
  };
})();

// В список .popup__features выведите все доступные удобства в объявлении.
// В блок .popup__description выведите описание объекта недвижимости offer.description.
// В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
// Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
