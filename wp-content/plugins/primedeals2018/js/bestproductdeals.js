jQuery(document).ready(function ($){
    // init isotope
    var $container = $('#isotope').imagesLoaded(function () {
        // remove margins to make room for isotope gutters
        $('#isotope .box').css('margin-right', 0);
        
        $container.isotope({
            itemSelector: '.box',
            layoutMode: 'fitRows',
            fitRows: {
                gutter: 20
            }, 
            sort: 'random'
        });
    });

    var filters = {};
    
    $('#clearall').click(function () {
        $('input.label__checkbox').prop('checked', false);
        $('input.label__checkbox').removeClass('active checked');
        $priceslider.val(200).change();
        $discountslider.val(0).change();
        filters = {};
        
        updatePriceHandle($pricehandle[0], 200);
        updateDiscountHandle($discounthandle[0], 0);
        updateFilters();
    });
    
    var styleFilter = '';
    var priceFilter = [];
    var discountFilter = [];

    // handle checkbox events
    $('.filter-container-large input.label__checkbox').on('change', function() {
        var filterValue = $(this).attr('data-filter');
        var currentFilter = [];
        if (filters['style']) {
            currentFilter = filters['style'].split(', ');
        }
        var filterLength = currentFilter.length;
        currentFilter = $.grep(currentFilter, function(value) {
          return value != filterValue;
        });

        if (currentFilter.length === filterLength) {
            currentFilter.push(filterValue);
        }

        if (currentFilter === []) {
            filters['style'] = null;
        } else {
            $(this).toggleClass('active checked');
            filters['style'] = currentFilter.join(', ');
        }
        updateFilters();
    });
    // price slider
    var $priceslider = $('input[name="pricefilter"]');
    var $pricehandle;
    
    var filterFns = {
        filterPrice: function() {
            var currentMax = $('input[name="pricefilter"]').val();
            var number = $(this).find('.price').text();
            return parseInt( number) <= currentMax;
        },
        filterDiscount: function() {
            var currentMin = $('input[name="discountfilter"]').val();
            var number = $(this).find('.discount').text();
            return parseInt( number ) >= currentMin;
        }
    };

    // init rangeslider
    $priceslider
        .rangeslider({
            polyfill: false,
            onInit: function () {
                $pricehandle = $('.rangeslider__handle', this.$range);
                $pricehandle[0].innerHTML = '<span></span>';
            }
        })
        .on('input', function () {
            updatePriceHandle($pricehandle[0], this.value);
            if (this.value != 200) {
                filters['price'] = 'filterPrice';
            } else {
                filters['price'] = null;
            }
            updateFilters();
        });

    function updatePriceHandle(el, val) {
        var kval = val;
        var span = $(el).children('span')[0];
        
        if (kval === 0 || kval === 200) {
            $(span).text(''); // don't display slider handle text for 0 or 200+ vals
        } else {
            $(span).text('$' + kval);
        }
    }

    var $discountslider = $('input[name="discountfilter"]');
    var $discounthandle;

    // init rangeslider
    $discountslider
        .rangeslider({
            polyfill: false,
            onInit: function () {
                $discounthandle = $('.rangeslider__handle', this.$range);
                $discounthandle[0].innerHTML = '<span></span>';
            }
        })
        .on('input', function () {
            updateDiscountHandle($discounthandle[0], this.value);
            if (this.value == 0) {
                filters['discount'] = null;
            } else {
                filters['discount'] = 'filterDiscount';
            }
            
            updateFilters();
        });

    function updateDiscountHandle(el, val) {
        var kval = val;
        var span = $(el).children('span')[0];
        
        if (kval === 0 || kval === 100) {
            $(span).text(''); // don't display slider handle text for 0 or 100 vals
        } else {
            $(span).text(kval + '%');
        }
    }

    function updateFilters() {

        $container.isotope({
            filter: function() {

                var isMatched = true;
                var $this = $(this);

                for ( var prop in filters ) {
                  var filter = filters[ prop ];
                  // use function if it matches
                  filter = filterFns[ filter ] || filter;
                  // test each filter
                  if ( filter ) {
                    isMatched = isMatched && $(this).is( filter );
                  }
                  // break if not matched
                  if ( !isMatched ) {
                    break;
                  }
                }
                return isMatched;
             }
        });
    }

});