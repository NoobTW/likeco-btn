(function () {
	var str = '<iframe id="likeco-btn" frameborder="0" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" scrolling="no" src="https://button.like.co/in/embed/THE_AUTHOR/button?referrer=THE_URL" style="height: 212px; width: 100%;"></iframe>';
	var promoteLink = '<a style="color:#ccc;font-size:.8rem" href="https://noobtw.github.io/likeco-btn">likeco-btn：在任何頁面插入讚賞按鈕</a>'

	var name = 'NoobTW7';
	var URL = [location.protocol, '//', location.host, location.pathname].join('');
	var allowedQueryString = ['p'];

	var DOM = document.querySelector('.likeco-btn');

	if (DOM) {
		if (DOM.dataset.name) {
			name = DOM.dataset.name;
		}
		if (DOM.dataset.url) {
			URL = DOM.dataset.url;
		}
		if (DOM.dataset.allowedQueryString) {
			allowedQueryString = DOM.dataset.allowedQueryString.split(',').map(function(x) { return x.trim() }).filter(function(x) { return x });
			console.log(allowedQueryString);
		}

		var queryString = {};
		var query = window.location.search.substring(1);
		var vars = query.split('&');
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			if (typeof queryString[pair[0]] === 'undefined') {
				queryString[pair[0]] = pair[1];
			} else if (typeof queryString[pair[0]] === 'string') {
				var arr = [queryString[pair[0]], pair[1]];
				queryString[pair[0]] = arr;
			} else {
				queryString[pair[0]].push(pair[1]);
			}
		}

		Array.from(allowedQueryString).forEach(function(qs) {
			if (queryString[qs] && queryString[qs].length) {
				if (!URL.includes('?')) {
					URL = URL + '?' + qs + '=' + queryString[qs];
				} else {
					URL = URL + '&' + qs + '=' + queryString[qs];
				}
			}
		});

		str = str.replace(/THE_AUTHOR/g, name.toLowerCase());
		str = str.replace(/THE_URL/g, encodeURIComponent(URL));

		if (DOM.dataset && DOM.dataset.noPromote === 'no-promote') {
			DOM.outerHTML = str;
		} else {
			DOM.outerHTML = str + promoteLink;
		}

		var LIKES = document.querySelectorAll('.likeco-btn-likes');
		var LIKERS = document.querySelectorAll('.likeco-btn-likers');

		if (LIKES.length) {
			Array.from(LIKES).forEach(function(LIKE) {
				var likeName = LIKE.dataset.name || name;
				var likeURL = LIKE.dataset.url || URL;

				var req = new XMLHttpRequest();
				req.addEventListener('load', function() {
					var res = JSON.parse(this.responseText);
					LIKE.style.display = 'inline';
					LIKE.innerText = res.total;
				});
				req.open('GET', 'https://like.co/api/like/likebutton/' + likeName.toLowerCase() + '/total?referrer=' + encodeURIComponent(likeURL));
				req.send();
			});
		}
		if (LIKERS.length) {
			Array.from(LIKERS).forEach(function(LIKER) {
				var likerName = LIKER.dataset.name || name;
				var likerURL = LIKER.dataset.url || URL;

				var req = new XMLHttpRequest();
				req.addEventListener('load', function() {
					var res = JSON.parse(this.responseText);
					LIKER.style.display = 'inline';
					LIKER.innerText = res.totalLiker;
				});
				req.open('GET', 'https://like.co/api/like/likebutton/' + likerName.toLowerCase() + '/total?referrer=' + encodeURIComponent(likerURL));
				req.send();
			});
		}
	}
})();
