document.addEventListener('DOMContentLoaded', function() {
  var scopeCheck = document.getElementById('scope');
  var typeCheck = document.getElementById('type');

  setSavedValues();

  scopeCheck.addEventListener('change', function(e) {
    updateValue();
  }, true);

  typeCheck.addEventListener('change', function(e) {
    updateValue();
  }, true);

  function setSavedValues() {
    chrome.runtime
      .sendMessage({
        method: 'getSettings'
      }, function (response) {
        scopeCheck.checked = (response.data.isRemoveScope === 1);
        typeCheck.checked = (response.data.isRemoveType === 1);
      });
  }

  function updateValue() {
    chrome.runtime.sendMessage({
      method: 'setSettings',
      value: {
        isRemoveScope: scopeCheck.checked ? 1 : 0,
        isRemoveType: typeCheck.checked ? 1: 0
      }
    }, function () {
      chrome.runtime
        .sendMessage({
          method: 'setBadge',
          text:  '\u21BB',
          color: '#ffd400'
        }, function () {
          document.getElementById('notification').style.visibility = 'visible';
        });
    });
  }
});