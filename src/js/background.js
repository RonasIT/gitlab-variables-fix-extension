chrome.runtime.onMessage
  .addListener(function(request, sender, sendResponse) {
    if (request.method == 'setSettings') {
      localStorage['settings'] = JSON.stringify(request.value);

      sendResponse({ status: true });
    } else if (request.method == 'getSettings') {
      var value = localStorage['settings'];

      if (value !== undefined) {
        sendResponse({ data: JSON.parse(value) });
      } else {
        sendResponse({ data: { isRemoveScope: 0, isRemoveType: 0 } });
      }
    } else if (request.method == 'setBadge') {
      chrome.browserAction.setBadgeText({ text: request.text });
      chrome.browserAction.setBadgeBackgroundColor({ color: request.color });

      sendResponse({ status: true});
    } else {
      sendResponse({ status: false });
    }
  });