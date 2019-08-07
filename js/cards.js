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
  var popupFeatures = cardTemplateElement.querySelector('.popup__features');
  var popupDescription = cardTemplateElement.querySelector('.popup__description');
  var popupPhotos = cardTemplateElement.querySelector('.popup__photos');
  var popupPhotoTemplate = popupPhotos.querySelector('.popup__photo').cloneNode(true);

  var renderCard = function (data) {
    var offer = data.offer;
    var arrayToCapacity = [offer.rooms, offer.guests];
    var arrayToCheck = [offer.checkin, offer.checkout];
    popupFeatures.innerHTML = '';
    popupPhotos.innerHTML = '';
    popupAvatar.src = data.author.avatar;
    popupTitle.innerText = offer.title;
    popupTextAddress.innerText = offer.address;
    popupTextPrice.innerText = offer.price + window.data.CURRENCY_PER_NIGHT;
    popupType.innerText = window.utils.findTypeById(offer.type).name;
    popupTextCapacity.innerText = window.utils.templateRender(window.data.TEMPLATE_CAPACITY, arrayToCapacity);
    popupTextTime.innerText = window.utils.templateRender(window.data.TEMPLATE_CHECK, arrayToCheck);
    offer.features.forEach(function (item) {
      var li = document.createElement('li');
      li.classList.add('popup__feature', 'popup__feature--' + item);
      popupFeatures.appendChild(li);
    });
    popupDescription.innerText = offer.description;
    offer.photos.forEach(function (item) {
      var img = popupPhotoTemplate.cloneNode(true);
      img.src = item;
      popupPhotos.appendChild(img);
    });
  };

  cardTemplateElement.classList.add('hidden');
  window.map.filtersContainer.insertAdjacentElement('beforebegin', cardTemplateElement);

  window.cards = {
    renderCard: renderCard
  };
})();
