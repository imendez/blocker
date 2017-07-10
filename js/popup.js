(function () {
    chrome.storage.sync.get('total',  function(items) {
        if (!items || !items.total) {
            items = {
                total: 0
            };
        }
        document.getElementById('total_blocked').innerText = items.total;
    });
})();