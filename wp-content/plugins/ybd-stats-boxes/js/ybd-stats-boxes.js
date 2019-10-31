jQuery(document).ready(function ($) {

	$('.dw .dw-panel .expand-btn').on('click', function (e) {

		// if a panel is already expanded, close it first
		closeExpandedPanel($);

		var this_box = $(this).closest('.dw-panel');
		var next_box = this_box.next('.dw-panel');
		var prev_box = this_box.prev('.dw-panel');

		// how many panels
		var panels = $('.dw-panel').length;

		// which index is this panel?
		var index = this_box.index() + 1;

		if (this_box.hasClass('expanded')) {
			this_box.removeClass('expanded');
			this_box.outerHeight('auto');

			if (index == panels || index == panels / 2) {
				if (prev_box.hasClass('hide')) {
					prev_box.removeClass('hide');
				}
			} else {
				if (next_box.hasClass('hide')) {
					next_box.removeClass('hide');
				}
			}
		} else {

			var this_pos = this_box.position();
			var this_height = this_box.outerHeight();
			var this_text = this_box.data('content');

			if (next_box.length > 0) {
				var next_height = next_box.outerHeight();
				var next_pos = next_box.position();
			}

			if (prev_box.length > 0) {
				var prev_height = prev_box.outerHeight();
				var prev_pos = prev_box.position();
			}

			// if the box is at the end of the column, expand up
			if (index == panels || index == panels / 2) {
				var total_height = this_height + prev_height + 35;
				this_box.outerHeight(total_height);
				this_box.children('.dw-panel__content').outerHeight(total_height);
				prev_box.addClass('hide');
			} else {
				// expand down
				var total_height = this_height + next_height + 35;
				this_box.outerHeight(total_height);
				this_box.children('.dw-panel__content').outerHeight(total_height);
				next_box.addClass('hide');
			}

			this_box.addClass('expanded');
		}
	});

	function closeExpandedPanel($) {
		if ($('.dw-panel.expanded').length) {
			var this_box = $('.dw-panel.expanded');
			var next_box = this_box.next('.dw-panel');
			var prev_box = this_box.prev('.dw-panel');

			// how many panels
			var panels = $('.dw-panel').length;

			// which index is this panel?
			var index = this_box.index() + 1;

			this_box.removeClass('expanded');
			this_box.outerHeight('auto');
			this_box.children('.dw-panel__content').outerHeight('auto');

			if (index == panels || index == panels / 2) {
				if (prev_box.hasClass('hide')) {
					prev_box.removeClass('hide');
				}
			} else {
				if (next_box.hasClass('hide')) {
					next_box.removeClass('hide');
				}
			}
		}
	}

	$('.dw-panel .icon-close').on('click', function (e) {
		closeExpandedPanel($);
    });
    
    $('.ecard-row').each( function() {
        var $this = $(this);
        var ecards = $this.find('.ecard');

        if ( ecards.length == 3 ) {
            $(ecards[0]).addClass('hvr-sweep-to-right');
            // $(ecards[0]).find('.top-bar').addClass('hvr-sweep-to-right');
            $(ecards[1]).addClass('hvr-shutter-out-horizontal');
            // $(ecards[1]).find('.top-bar').addClass('hvr-sweep-to-right');
            $(ecards[2]).addClass('hvr-sweep-to-left');
            // $(ecards[2]).find('.top-bar').addClass('hvr-sweep-to-right');
        }
        if ( ecards.length == 2 ) {
            $(ecards[0]).addClass('hvr-sweep-to-right half-width');
            // $(ecards[0]).find('.top-bar').addClass('hvr-sweep-to-right');
            $(ecards[1]).addClass('hvr-sweep-to-left half-width');
            // $(ecards[1]).find('.top-bar').addClass('hvr-sweep-to-right');
        }
    })

	$('.ecard-row .ecard .expand-btn').on('click', function (e) {
		if ($(this).hasClass('expanded')) {
			$(this).removeClass('expanded');
			$(this).closest('.ecard').removeClass('expanded');
			$(this).closest('.ecard-row').removeClass('child-expanded');
		} else {
			$(this).addClass('expanded');
			$(this).closest('.ecard').addClass('expanded');
			$(this).closest('.ecard-row').addClass('child-expanded');
		}
	});

	$('.icon-twitter').click(function (e) {
		var card = $(this).closest('.dw-panel, .ecard');
		var text = $(card).data('content') + ' via @yourbestdigs ' + document.URL;
		var href = `https://twitter.com/intent/tweet?text=${encodeURI(text)}`;
		window.open(href, 'Twitter', 'height=285,width=350,resizable=1');
	});

	$('.icon-copy').click(function (e) {
		var card = $(this).closest('.dw-panel, .ecard');
		var text = $(card).data('content') + ' via ' + document.URL;
		var copied = copyToClipboard(text);
		$(card).find('.copied').fadeTo(200, 1, function () {
			$(this).fadeTo(500, 0);
		})
	});

	function sizeGridItems() {
		if ($(window).width() < 768) {
			return;
        }
        $('.ecard-row').each( function() {
            var $this = $(this);
            var elementHeights = $this.find('.content').map(function () {
                var $that = $(this);
                var height = 0;
                var children = $that.children();
                for (var i = 0; i < children.length; i++) {
                    height += $(children[i]).outerHeight();
                }
                return height;
            }).get();

            var maxHeight = Math.max.apply(null, elementHeights);
            // set ecards to height of tallest content
            $this.find('.content-ctr').height(maxHeight);
        });
	}

	$(window).resize(function () {
		sizeGridItems();
	});

	sizeGridItems();
});



// cross browser clipboard copying //
function copyToClipboard(string) {
	var textarea;
	var result;

	try {
		textarea = document.createElement('textarea');
		textarea.setAttribute('readonly', true);
		textarea.setAttribute('contenteditable', true);
		textarea.style.position = 'fixed'; // prevent scroll from jumping to the bottom when focus is set.
		textarea.style.opacity = 0;
		textarea.value = string;

		document.body.appendChild(textarea);
		textarea.style.top = 0;


		textarea.focus();
		textarea.select();

		var range = document.createRange();
		range.selectNodeContents(textarea);

		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);

		textarea.setSelectionRange(0, textarea.value.length);
		result = document.execCommand('copy');
	} catch (err) {
		console.error(err);
		result = null;
	} finally {
		document.body.removeChild(textarea);
	}

	// manual copy fallback using prompt
	if (!result) {
		var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
		var copyHotkey = isMac ? '⌘C' : 'CTRL+C';
		result = prompt(`Press ${copyHotkey}`, string);
		if (!result) {
			return false;
		}
	}
	return true;
}
