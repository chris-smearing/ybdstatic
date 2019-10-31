document.addEventListener("DOMContentLoaded", function(event) {

    // All animations will take exactly 300ms
    var scroll = new SmoothScroll('a[href*="#"]', {
      speed: 300,
      speedAsDuration: true
    });
  
    //get the Table of Content and add it to the sidebar
      var sourceDiv = document.getElementsByClassName('site-content')[0].getElementsByClassName("toc")[0];
      var targetDiv = document.getElementsByClassName('sidebar-wrap')[0];
    
      if (sourceDiv && targetDiv) {
        sourceDiv.setAttribute("id", "toc");
        var newDiv = sourceDiv.cloneNode(true);
        targetDiv.appendChild(newDiv);

        // add a class to remove a little bit of the quicklinks left line
        if ( jQuery('.sidebar-wrap ul li:last-child').height() > 40 ) {
            jQuery('.sidebar-wrap .toc').addClass('reduced-more');
        } else if ( jQuery('.sidebar-wrap ul li:last-child').height() > 20 ) {
            jQuery('.sidebar-wrap .toc').addClass('reduced');
        }
        
      } else if (targetDiv) {
        //if no TOC in main post body, hide the sidebar
        targetDiv.classList.add("hidden");
      }
  
  
      const myToc = document.querySelectorAll('#toc');
    
      if(myToc.length > 0) {
        observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (document.body.scrollTop > (document.getElementById("toc").scrollTop + document.getElementById("toc").offsetHeight) || document.documentElement.scrollTop > (document.getElementById("toc").scrollTop + document.getElementById("toc").offsetHeight) ) {
              document.getElementById("backToTop").style.opacity = "0.4";
              document.getElementById("backToTopMobile").style.opacity = "0.4";
            } else {
              document.getElementById("backToTop").style.opacity = "0";
              document.getElementById("backToTopMobile").style.opacity = "0";
            }
            if (entry.intersectionRatio > 0) {
              document.getElementById("backToTop").style.opacity = "0.4";
              document.getElementById("backToTopMobile").style.opacity = "0.4";
            }
          });
        });
        
        myToc.forEach(image => {
          observer.observe(image);
        })
      }
});  
    
    const myImgs = document.querySelectorAll('.sidebar-wrap');
    
    if(myImgs.length > 0) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            myImgs[0].style.opacity = "1";
          }
        });
      });
      
      myImgs.forEach(image => {
        observer.observe(image);
      })
    }
  
  
    
    const myH2s = document.querySelectorAll('h2[id], img[id]');
  
    if(myH2s.length > 0) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            const h2id = entry.target.attributes.id.nodeValue;
  
            //remove active toc element
            let els = document.querySelectorAll(".toc a.active");
            for (var i = 0; i < els.length; ++i) {
              els[i].classList.remove('active');
            }
  
            //add active toc element
            els = document.querySelectorAll(".toc a[href='#"+h2id+"']");
  
            if (els[1]) {
              els[1].classList.add("active");
            }
  
          }
        });
      });
      
      myH2s.forEach(image => {
        observer.observe(image);
      })
  }
     
  /* setup smooth scroll on click 
  ** table of content links
  */ 
  
  
  // click event handler for Table of Content links
  function clickHandler(e) {
    if (e.target.matches('.toc > li > a:first-of-type')) {
      e.preventDefault();
      let targetH2 = e.target.getAttribute("href");

      if ( jQuery(targetH2).hasClass('collapse') ) {
          if ( ! jQuery(targetH2).hasClass('open') ) {
            jQuery(targetH2).toggleClass('open');
            jQuery(targetH2).next('section').toggleClass('open');
          }
      }

      targetH2 = targetH2.substr(1);      
    }
  }
  
  // get the sidebar wrap 
  const sidebar = document.querySelector('.sidebar-wrap');
const mobileToc = document.querySelector('.main-article-wrap .toc');
// add a single listener on list item
if(myImgs.length > 0) {
    if ( sidebar ) {
        sidebar.addEventListener('click', clickHandler);
    }
    if ( mobileToc ) {
        mobileToc.addEventListener('click', clickHandler);
    }
}

jQuery(document).ready(function($) {

    if ( ! $('body').hasClass('post-template-single-spr') ) {

        $('.top-choices .cta-card img').on( 'lazyloaded', function() {
            var card_height = $('.top-choices.slick-initialized').outerHeight();
            $('.top-choices .cta-card').outerHeight(card_height);
        });

        var numSlide = $('.top-choices .top-pick').length;
        var showDots = true;
        var showDotsDesktop = false;

        if (numSlide > 3 ) {
            showDotsDesktop = true;
        } else if ( numSlide <= 2 ) {
            showDots = false;
        }

        $('.top-choices').slick({
            lazyLoad: 'ondemand',
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            mobileFirst: false,
            centerMode: true,
            centerPadding: '0',
            edgeFriction: 0,
            speed: 70,
            responsive: [{
                    breakpoint: 4096,
                    settings: {
                        prevArrow: "<div class='prev-arrow-ybd'>Previous</div>",
                        nextArrow: "<div class='next-arrow-ybd'>Next</div>",
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        dots: showDotsDesktop,
                        arrows: true,
                        centerMode: false
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        centerMode: false,
                        dots: showDots,
                        centerPadding: '30px',
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        centerMode: false,
                        centerPadding: '30px',
                    }
                },
                {
                    breakpoint: 350,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        centerMode: false,
                        centerPadding: '0',
                    }
                }

                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }

      $(".fs-mobile-trigger, .fs-mobile-trigger + .menu-slide").click(function(e) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          $('.fs-mobile-trigger').toggleClass('open');
          $('.mobile-search-trigger').removeClass('open');
  
          // slide down mobile menu
          // $('.mobile-nav-container').stop(true, true).slideToggle(200);
          // end slide down mobile menu
  
          // transition from right mobile menu 
          $('.mobile-nav-container').toggleClass('open');
          $('.mobile-search-container').removeClass('open');        
        });
  
        $(".mobile-search-trigger").click(function(e) {
          e.preventDefault();
          $('.fs-mobile-trigger').removeClass('open');
          $('.mobile-search-trigger').toggleClass('open');
  
          // slide down mobile menu
          // $('.mobile-nav-container').stop(true, true).slideToggle(200);
          // end slide down mobile menu
  
          // transition from right mobile menu 
          $('.mobile-search-container').toggleClass('open');        
          $('.mobile-nav-container').removeClass('open'); 
          $('.mobile-search-container.open').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function() {
            $('#mobile-search-nav .searchform .s').focus();
          });
        });
  
  
      $("#mobile-nav > li")
        .find('.sub-menu')
        .parent()
        .children('a')
        .after('<span class="menu-slide"></span>');
  
      $("#mobile-nav > li .menu-slide")
        .on('click', function(e) {
          $(this).toggleClass('open');
          e.preventDefault();
          e.stopPropagation();
  
          $(this)
            .siblings('.sub-menu')
            .stop(true, true)
            .slideToggle(200);
        });
  
      // set height of mobile nav if the number of items do not fill the vertical space
      $('.mobile-nav').height( function() {
          var nav_height = $(this).height();
          var masthead_height = $('#masthead').outerHeight(true);
          var window_height = $(window).height();

          if ( window_height - (nav_height + masthead_height) > 0 ) {
              return window_height - masthead_height;
          }
      });

      $('.mobile-nav').css( 'top', function() {
        return $('#masthead').outerHeight(true);
      });
  
      $('body').click(function(e) {
        if ($(e.target).attr('class') !== 'head-cat-dropdown') {
          $('.jq-dropdown-menu').removeClass("open");
        }
      });
  
      // 
      $('.menu-item-has-children .nav-link[href="#"]').on( 'click', function traverseSubmenu(e) {
          e.stopPropagation();
          e.stopImmediatePropagation();

          // turn off the display of the main nav
          $(this).parents('ul.mobile-nav').toggle();
  
          // for the category item that was just clicked,
          // clone it and put it at the top level of the navigation container to take
          // advantage of default styles.
          // Then set up the click handler with this same routine as found in this thread:
          // https://stackoverflow.com/questions/1368813/jquery-recursive-function
          $(this).next('.submenu')
              .clone()
              .appendTo('.mobile-nav-container')
              .removeClass('submenu')
              .addClass('mobile-nav')
              .on( 'click', '.menu-item-has-children .nav-link[href="#"]', traverseSubmenu );
  
            $('.mobile-nav').css( 'top', function() {
                return $('#masthead').outerHeight(true);
            });
                    
          // Add a chevron indicator to the menu to traverse back up the tree and set up a click
          // handler to remove the current submenu and unhide the parent menu.
          $('<li class="menu-item chevron-back"><a class="nav-link-noafter" href="#">Back</a></li>').prependTo('ul.mobile-nav').on( 'click', function(e) {
              e.stopPropagation();
              e.stopImmediatePropagation();

              // show the parent menu
              $(this).parent('ul').prev('ul').toggle();
  
              // remove one chevron since we add extras via the recursion
              $(this).parent('ul').prev('ul').find('.menu-item.chevron-back').first().remove();
  
              // determine if we need to remove the current menu
              $menu_depth = $(this).parent('ul.mobile-nav');
              if ( $menu_depth.hasClass('depth-0') || $menu_depth.hasClass('depth-1') ) {
                  $menu_depth.remove();
  
                  // if we are back at the main menu, remove all chevrons
                  if ( $menu_depth.hasClass('depth-0') ) {
                      $('ul.mobile-nav li.menu-item.chevron-back').remove();
                  }
              }
  
          });
    
          $('.mobile-nav').height( function() {
            var nav_height = $(this).height();
            var masthead_height = $('#masthead').outerHeight(true);
            var window_height = $(window).height();
  
            if ( nav_height < (window_height - masthead_height) ) {
                return window_height - masthead_height;
            } else {
                return 'auto';
            }
        });

    });
  
    // add 2 column class to relevant menu items
    menu_with_submenu = $('.main-navigation .menu-item-has-children .depth-0, #site-navigation .menu-item-has-children .depth-0');
    if ( menu_with_submenu.length ) {
        menu_with_submenu.each( function() {
            num_submenus = $(this).find('.depth-1');
            if ( num_submenus.length ) {
                $(this).addClass('two-column-submenu');
                column_menu = $(this).find("a.nav-link[href |= '#']").addClass('submenu-title').removeClass('nav-link');
                $('.two-column-submenu').find('.subcategory-label').parent().addClass('subcategory');
            }
        });
    }
    $('ul.category-top-nav > li').on('mouseenter', positionSubmenu );

    $('.main-article-wrap .toc li a').each( function() {
        var that = $(this);
        var nextBr = that.next('br');

        // if there's already a break, abort
        if ( nextBr.length > 0 ) {
            return;
        }

        // if no break, and the next element is an a, then insert a break
        var next_a = that.next('a')
        if ( next_a.length > 0 ) {
            that.after('<br>');
        }
    });

    // add a class to remove a little bit of the TOC left line
    addReducedClass($);
    resizeTablepress($);
    resizeCategoryGrid($);

    $(window).on( 'resize', function() {
        addReducedClass($);
        resizeTablepress($);
        resizeRelatedImages($);
        resizeCategoryGrid($, true);
    });

    $('.single .homepage-list .article-image img').on('lazyloaded', function(e) {
        var img_height = $(this).height();

        if ( img_height != 0 ) {
            $(this).parents('.article-image').css('height', img_height);
        }
    });

    //Affiliate links no follow
    var affiliates = [
        'amazon.com',
        'apple.com',
        'aspcapetinsurance.com',
        'bedbathandbeyond.com',
        'bestbuy.com',
        'bluedriver.com',
        'dyson.com',
        'figopetinsurance.com',
        'firstalert.com',
        'healthypawspetinsurance.com',
        'homedepot.com',
        'hydroflask.com',
        'innova.com',
        'le-coucou.com',
        'liftmaster.com',
        'mavea.com',
        'nest.com',
        'obdeleven.com',
        'obdsoftware.net',
        'panasonic.jp',
        'pelican.com',
        'petinsurance.com',
        'petsbest.com',
        'philips.com',
        'play.google.com',
        'pntrs.com',
        'scantool.net',
        'siemens.com',
        'smileydaisy.com',
        'spyderco.com',
        'stihlusa.com',
        'target.com',
        'tempurpedic.com',
        'trupanion.com',
        'vitamix.com',
        'walmart.com',
        'pets-best-pet-insurance.evyy.net',
        'trupanion.sjv.io'
    ];
    var links = $('a')
        .filter('[href^="http"], [href^="//"]')
        .not('[href*="' + window.location.host + '"]');

    for (i = 0; i < links.length; ++i) {
        if (affiliates.includes(links[i].hostname.replace('www.', ''))) {
            links[i].setAttribute('rel', 'nofollow');
        }
    }

    $('.tablepress td').each( function() {
        var regex = /☆/g;
        var contents = $(this).text();

        if ( regex.test(contents) ) {
            var count = (contents.match(regex) || []).length;
            var stars = '★'.repeat(count);
        
            $(this).text(stars);
            $(this).css('color', '#ff6b3a');
            // $(this).css('font-weight', 'bold');
            $(this).css('font-size', '20px');
        }

        regex = /(\$$|\${2,})/;
        if ( regex.test(contents) ) {
            $(this).css('color', '#ff6b3a');
            // $(this).css('font-size', '16px');
        }
    });

    $('.tablepress td.column-1').each( function() {
        var regex = /(.*) - (.*)/;
        var links = /href/i;
        var contents = $(this).html();
        var colspan = /colspan/i;
        
        // if the contents include a link, skip it
        if ( ! links.test(contents) && regex.test(contents) ) {
            var new_contents = contents.replace(regex, '<strong>$1</strong><br>$2');

            $(this).html(new_contents);
        }
        if ( $(this).attr('colspan') ) {
            $(this).css('text-align', 'left');
        }
    });

    $('#mobile-aff-disclosure-headline').on( 'click', function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();

        if ( $('.mobile-aff-disclosure-popup').hasClass('flex') ) {
            $(this).removeClass('open');
            $('.mobile-aff-disclosure-popup').removeClass('flex');
        } else {
            $('.mobile-aff-disclosure-popup').addClass('flex');
            $(this).addClass('open');
        }
    });
    
    $('body').on( 'click', function(e) {

        if ( $('.mobile-nav-container.open').length > 0 ) {
            $('.mobile-nav-container').toggleClass('open');
            $('.fs-mobile-trigger').toggleClass('open');
        }
        if ( $('.mobile-aff-disclosure-popup').length > 0 ) {
            if ( $('.mobile-aff-disclosure-popup').hasClass('flex') ) {
                $('#mobile-aff-disclosure-headline').removeClass('open');
                $('.mobile-aff-disclosure-popup').removeClass('flex');
            }
        }
    });

    // listicle template item image
    $('img.effect-ming').each( function( index, el ) {
        var nw = $(el).attr('width');

        if ( nw < 1200 ) {
            $(el).parents('.fig-wrapper').addClass('scale-down')
        }
    });

    // read more beyond 3 paragraphs
    $('.para-hidden-control').on( 'click', function() {
        if ( $(this).hasClass('open') ) {
            $(this).removeClass('open');
            $(this).siblings('.para-hidden').removeClass('open');

            $(this).html('<p class="para-hidden-control">Read more&hellip;</p>');
        } else {
            $(this).siblings('.para-hidden').addClass('open');
            $(this).addClass('open');
            $(this).html('<p class="para-hidden-control">Read less&hellip;</p>');
        }
    });

    $('.item-number-title-wrapper').on('click', function() {
        if ( $(this).hasClass('open') ) {
            $(this).removeClass('open');
            $(this).next('.collapsed').removeClass('open');
        } else {
            $(this).addClass('open');
            $(this).next('.collapsed').addClass('open');
        }
    });

    // count all the H2s in the main body of the document
    var num_h2 = $('.main-article-wrap, .listicle-article-wrap').find('h2').length;

    // add proper classes to h2s
    $('.main-article-wrap, .listicle-article-wrap').find('h2').each( function( index ) {
        // if the author has not added the collapse class, then add it, but also make it
        // open by default
        if ( ! $(this).hasClass('collapse') ) {
            $(this).addClass('collapse open');
        }
    });

    // wrap sections following h2s
    $('.main-article-wrap, .listicle-article-wrap').find('h2.collapse').each( function( index ) {
        var open = '';

        // if an h2 is supposed to be open by default, use this variable to add it in the next step
        if ( $(this).hasClass('open') ) {
            open = 'open';
        }

        if ( index == num_h2-1 ) {
            // in review posts (not listicles), the ending delimiter is share this review
            if ( $(this).parents('main').hasClass('main-article-wrap') ) {
                $(this).nextUntil('.share-this-review').wrapAll('<section class="collapsed collapsed-' + index + ' ' + open + '" />');
            } else {
                $(this).nextUntil('article.list-item').wrapAll('<section class="collapsed collapsed-' + index + ' ' + open + '" />');
            }
        } else {
            $(this).nextUntil('h2').wrapAll('<section class="collapsed collapsed-' + index + ' ' + open + '" />');   
        }

        var imgs = $(this).nextUntil('h2').find('img');

        if ( open !== 'open' ) {
        //     
        //     if ( $(imgs).hasClass('lazyload') ) {
        //         $(imgs).removeClass('lazyload');
        //         $(imgs).addClass('ybdlazy');
        //     }
        } else {
            $(imgs).addClass('ybdlazy');
        }

        $(this).on( 'click', function() {
            // if we are about to open, switch the data-src to src so the browser will load it
            if ( ! $(this).hasClass('open') ) {
                $(this).next('section.collapsed').find('img').each( function() {
                    var dataSrc = $(this).attr('data-src');
                    $(this).attr('src', dataSrc);
                });
            }

            $(this).toggleClass('open');
            $(this).next('section.collapsed').toggleClass('open');
        })
    });

    $('.main-article-wrap, .listicle-article-wrap').find('h2.collapse').each( function( index ) {
        var regex = /(^.*:)(.*$)/i;
        var title = $(this).html();

        title = title.replace(regex, '$1 <span class="h2-regular">$2</span>');

        $(this).html(title);
    });      
});

document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.ybdlazy"));
  
    if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            delete lazyImage.dataset.src;
            delete lazyImage.dataset.srcset;
            lazyImage.classList.replace("ybdlazy", "lazyloaded");
            // lazyImage.classList.add("lazyloaded");
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });
  
      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // Possibly fall back to a more compatible method here
    }
  });
  
document.addEventListener("DOMContentLoaded", function() {
    var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));
  
    if ("IntersectionObserver" in window) {
      var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(video) {
          if (video.isIntersecting) {
            for (var source in video.target.children) {
              var videoSource = video.target.children[source];
              if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                videoSource.src = videoSource.dataset.src;
              }
            }
  
            video.target.load();
            video.target.classList.remove("lazy");
            lazyVideoObserver.unobserve(video.target);
          }
        });
      });
  
      lazyVideos.forEach(function(lazyVideo) {
        lazyVideoObserver.observe(lazyVideo);
      });
    }
  });

jQuery(window).load(function () {
    $ = jQuery;

    // if there is a slider, count slides. 
    // If less than 5 slides, hide controls.
    if ($(".master-slider").length) {

        var slides = $(".ms-thumb-frame").length;
        if (slides < 5) {
            $(".ms-thumblist-fwd").hide();
            $(".ms-thumblist-bwd").hide();
        }

    }
    
    // Add a wrapper class to any tablepress tables that don't have it
    $('table.tablepress').each( function() {
        if ( $(this).parent('.dataTables_wrapper').length == 0 ) {
            $(this).wrap("<div class='dataTables_wrapper'></div>");
            if ( $(this).width() > $(this).parent().width() ) {
                $(this).css('overflow-x', 'scroll');
            }
        }
    });

    resizeTablepress($);

});

function addReducedClass($) {
    if ( $('.main-article-wrap .toc').length > 0 ) {
        if ( $('.main-article-wrap .toc li:last-child').height() > 30 ) {
            $('.main-article-wrap .toc').addClass('reduced');
        }
    }

    if ( $('.sidebar-wrap ul').length > 0 ) {
        // add a class to remove a little bit of the quicklinks left line
        if ( $('.sidebar-wrap ul li:last-child').height() > 40 ) {
            $('.sidebar-wrap .toc').addClass('reduced-more');
        } else if ( $('.sidebar-wrap ul li:last-child').height() > 20 ) {
            $('.sidebar-wrap .toc').addClass('reduced');
        }
    }
    
}

function positionSubmenu(event) {
    var submenu = event.currentTarget.querySelector('ul.submenu');

    if ( submenu !== null ) {
        let compStyles = getComputedStyle(submenu);
        let right = compStyles.getPropertyValue('right');
    
        if ( right !== '-10px' ) {
            var myOffset = submenu.getBoundingClientRect();
            var windowWidth = window.innerWidth;
            var overflow = myOffset.right > windowWidth;
    
            if ( overflow ) {
                submenu.style.left = 'unset';
                submenu.style.right = '-10px';
            }
        }    
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction(e) {
    document.getElementById("backToTop").blur();
}

function topMobileFunction(e) {
    document.getElementById("backToTopMobile").blur();
}

function resizeTablepress($) {
    $('.dataTables_wrapper').each( function( index ) {
        var tp = $(this).children('table');
        if ( tp.length > 0 ) {
            if ( tp.width() > $(this).width() ) {
                $(this).css('overflow-x', 'scroll');
            } else {
                $(this).css('overflow-x', 'unset');
            }
        }
    });
}

function setRelatedPostsHeight($) {
    var related_images = $('.single .homepage-list .article-image img');
    var new_height = $(related_images).css('height');
    $('.single .homepage-list .article-image').css('height', new_height);
}

function resizeRelatedImages($) {
    $('.single .homepage-list .article-image img').each( function(e) {
        var img_height = $(this).height();

        if ( img_height != 0 ) {
            $(this).parents('.article-image').css('height', img_height);
        }
    });   
}

function resizeCategoryGrid($, resize=false) {
    // fix page title heights so grid lines up appropriately
    if ( $('body.archive.category').length > 0 ) {

        var archive_loop = $('ul.archive-loop li');
        var num_items_per_row = 1;
        var fb = $(archive_loop).css('flex-basis');
        if ( fb  === '33%' ) {
            num_items_per_row = 3;
        } else if ( fb === '50%' ) {
            num_items_per_row = 2;
        }
        
        var i = 0,
            j = 0;

        var loop_limit = $(archive_loop).length;
        var num_rows = Math.ceil( loop_limit / num_items_per_row );

        if ( resize ) {
            // reset all heights
            $(archive_loop).find('.category-article-wrap').css('min-height', '');
        }

        for ( i=0; i<num_rows; i++ ) {
            var max_title_height = 0;
            var max_subtitle_height = 0;

            // get values for title and product name
            for ( j=0; j<num_items_per_row; j++ ) {
                var title_height = $(archive_loop[i*num_items_per_row+j]).find('.category-article-wrap').outerHeight();

                if ( title_height > max_title_height ) {
                    max_title_height = title_height;
                }
            }

            // start over to apply new values if necessary
            for ( j=0; j<num_items_per_row; j++ ) {
                $(archive_loop[i*num_items_per_row+j]).find('.category-article-wrap').css('min-height', max_title_height);
            }
        }
    }
}