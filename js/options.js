(function () {

    var blocked_urls = [];

    chrome.storage.sync.get('blocked_urls',  function(items) {
        if (!items || !items.blocked_urls) {
            return;
        }
        blocked_urls = items.blocked_urls;
        displayUrls();
    });


    document.getElementById('add_url').addEventListener('submit', function(e) {
        var url = document.getElementById('url');
        blocked_urls.push(url.value);

        chrome.storage.sync.set({
            blocked_urls: blocked_urls
        });

        displayUrls();
        e.preventDefault();
    });

    function displayUrls() {
        if (!blocked_urls.length) {
            return;
        }

        var ul = document.createElement("ul");
        var blocked_list =  document.getElementById('blocked_list');
        blocked_list.innerHTML = '';

        for (var i = 0; i < blocked_urls.length; i++) {
            var url = blocked_urls[i];
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(url));
            ul.appendChild(li);
        }
        blocked_list.appendChild(ul);
    }
})();