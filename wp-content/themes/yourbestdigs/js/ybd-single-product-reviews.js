jQuery(document).ready(function($) {    
    // SINGLE PAGE REVIEWS -- START 
    var listWidth = $.map($( '.attribute-bar > span' ), function(val) {

        // get percentage value (completed bar / full bar * 100)
        var completeBar = parseInt($( val ).css( "width" ));
        var fullBar = parseInt($( val ).parent().css( "width" ));
        var $percVal = (completeBar / fullBar) * 100;

		// return formatted percent string
        return $percVal + "%";
	});
		
	$('.attribute-bar > span').css("");
	$('.attribute-bar > span').css("width", 0);


	//save the score we need to reach (otherwise reset when exiting viewport)
	$targetScore = $( '.rating-score > span' ).text();
	$animatedYet = false;

	$('.ratings-row').on('scrollSpy:enter', function() {
		if (! $animatedYet ) {
			//animate the score
				$( '.rating-score > span' ).each( function() {
					$this = $( this );
					$( this ).prop( 'Counter', 0 )
						.animate({
							Counter: $targetScore
						}, {
							duration: 3500,
							easing: 'swing',
							step: function() {
								$this.text( this.Counter.toFixed( 1 ));
							}
						});
					});

					$animatedYet = true;
				}

		//animate the bars
		$( '.attribute-bar > span' )
			.each( function(i) {
				$( this )
					.animate({
						'width': listWidth[i]
					}, 2500);
					
				//$(this).css({width: listWidth[i] });
			});

  });

  //enable ScrollSpy on ratings area
	if ($('.ratings-row').length) {
		$('.ratings-row').scrollSpy();
	}

  // SINGLE PAGE REVIEWS -- END
});