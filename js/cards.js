'use strict';

(function () {
  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');

  var popupAvatar = cardTemplateElement.querySelector('.popup__avatar');
  var popupTitle = cardTemplateElement.querySelector('.popup__title');
  var popupTextAddress = cardTemplateElement.querySelector('.popup__text--address');
  var popupTextPrice = cardTemplateElement.querySelector('.popup__text--price');
  var popupType = cardTemplateElement.querySelector('.popup__type');

  var renderCard = function (data) {
    var offer = data.offer;
    popupAvatar.src = data.author.avatar;
    popupTitle.innerText = offer.title;
    popupTextAddress.innerText = offer.address;
    popupTextPrice.innerText = offer.price + window.data.CURRENCY_PER_NIGHT;
    popupType.innerText = offer.type;


  };

  window.map.filtersContainer.insertAdjacentElement('beforebegin', cardTemplateElement);

  window.cards = {
    renderCard: renderCard
  };
})();

// В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalo, Дом для house, Дворец для palace.
