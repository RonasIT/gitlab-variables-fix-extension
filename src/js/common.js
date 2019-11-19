(function() {
  'use strict';

  chrome.runtime
    .sendMessage({
      method: 'getSettings'
    }, function (response) {
      handlePageStyles(response.data);
    });

  function handlePageStyles(settings) {
    // Styling the 'Type' and 'Environment' headers
    if (settings.isRemoveType) {
      document.querySelector('.ci-variable-list > .ci-variable-row > div > div:first-child').remove();
    } else {
      document.querySelector('.ci-variable-list > .ci-variable-row > div > div:first-child').classList.replace('section-15', 'section-5');
    }

    if (settings.isRemoveScope) {
      document.querySelector('.ci-variable-list > .ci-variable-row > div > div:last-child').remove();
    } else {
      document.querySelector('.ci-variable-list > .ci-variable-row > div > div:last-child').classList.replace('section-15', 'section-5');
    }

    // Styling the 'Type' and 'Environment' fields
    if (settings.isRemoveType) {
      document.querySelectorAll('.js-ci-variable-input-variable-type').forEach(e => e.parentNode.removeChild(e));
    } else {
      document.querySelectorAll('.js-ci-variable-input-variable-type').forEach(e => e.classList.replace('section-15', 'section-5'));
    }

    if (settings.isRemoveScope) {
      document.querySelectorAll('.js-variable-environment-dropdown-wrapper').forEach(e => e.parentNode.removeChild(e));
    } else {
      document.querySelectorAll('.js-variable-environment-dropdown-wrapper').forEach(e => e.classList.add('table-section', 'section-5'));
    }

    // Remove the 'Protected' and 'Masked' text from each row
    document.querySelectorAll('.ci-variable-protected-item > div').forEach(e => e.parentNode.removeChild(e));
    document.querySelectorAll('.ci-variable-masked-item > div').forEach(e => e.parentNode.removeChild(e));

    // Reduce the toggle button fields, now that they don't have text
    document.querySelectorAll('.section-20').forEach(e => e.classList.replace('section-20', 'section-10'));

    // Expand the sizes of the fields we care about
    document.querySelectorAll('.section-15').forEach(e => e.classList.replace('section-15', 'section-40'));

    chrome.runtime
      .sendMessage({
        method: 'setBadge',
        text: '\u2713',
        color: '#42f575'
      });
  }
})();
