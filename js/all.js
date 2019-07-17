$(function() {
	new ClipboardJS('.copy-button');
	$('#advanced').on('click', function() {
		if ($(this).text().includes('▸')) {
			$('.advanced').show('fast');
			$(this).text('進階配置 ▾');
		} else {
			$('.advanced').hide('fast');
			$(this).text('進階配置 ▸');
		}
	});

	$('#generate').on('click', function() {
		var code2 = '<div class="likeco-btn" data-name="';
		code2 += $('#name').val().trim() || 'noobtw7';
		code2 += '"';

		if ($('#url').val()) {
			code2 += ' data-url="' + encodeURIComponent($('#url').val().trim()) + '"';
		}

		if ($('#noPromote:checked').length === 0) {
			code2 += ' data-no-promote="no-promote"';
		}

		if ($('#allowedQueryString').val().trim() !== 'p') {
			code2 += ' data-allowed-query-string="' + encodeURI($('#allowedQueryString').val().trim()) + '"';
		}

		code2 += '></div>';

		$('#code2').text(code2);
		$('.dialog').css('display', 'flex');
	});

	$('.dialog').on('click', function(e) {
		if( e.target === $(this)[0] ) {
			$(this).css('display', 'none');
		}
	});
});

