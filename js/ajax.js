'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorBlock = errorTemplate.cloneNode(true);
  var errorStatusBlock = errorBlock.querySelector('.error__message');
  var errorBlockCloser = errorBlock.querySelector('.error__button');
  var url = '';
  var successHandler = null;
  var method = 'GET';
  var xhr = new XMLHttpRequest();

  var ajaxHandler = function () {
    xhr.open(method, url);
    xhr.send();
  };

  var errorHandler = function (status, errorCallback) {
    errorStatusBlock.innerHTML = status;
    errorBlock.classList.remove('hidden');
  };

  xhr.responseType = 'json';
  xhr.timeout = 10000; // 10s

  errorBlockCloser.addEventListener('click', function () {
    errorBlock.classList.add('hidden');
    ajaxHandler();
  });

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      successHandler(xhr.response);
    } else {
      errorHandler('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  });

  xhr.addEventListener('error', function () {
    errorHandler('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  errorBlock.classList.add('hidden');
  document.body.appendChild(errorBlock);

  window.ajax = function (foreignUrl, foreignSuccessHandler, foreignMethod) {
    url = foreignUrl;
    successHandler = foreignSuccessHandler;
    if (foreignMethod) {
      method = foreignMethod;
    }
    ajaxHandler();
  };
})();
