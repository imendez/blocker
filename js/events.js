(function () {

    var blocked_urls = [];
    var total = 0;

    chrome.storage.sync.get(['blocked_urls', 'total'], function (items) {
        blocked_urls = items.blocked_urls || [];
        total = items.total || 0;
        chrome.browserAction.setBadgeText({text: total.toString()});
    });

    chrome.storage.onChanged.addListener(function(changes) {

        if (changes.blocked_urls) {
            blocked_urls = changes.blocked_urls.newValue;
        }

        if (changes.total) {
            total = changes.total.newValue;
            chrome.browserAction.setBadgeText({text: total.toString()});
        }

    });


    chrome.webRequest.onBeforeRequest.addListener(function (details) {
            var shouldBlock = !!blocked_urls.find(function (url) {
                var patt = new RegExp(url, "i");
                return patt.test(details.url);
            });

            if (shouldBlock) {
                total = ++total;
                chrome.storage.sync.set({
                    total: total
                });
            }

            return {
                cancel: shouldBlock
            };
        },
        {urls: ["<all_urls>"]},
        ["blocking"]);
})();