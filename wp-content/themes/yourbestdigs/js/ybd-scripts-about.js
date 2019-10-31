// ABOUT: get the video to open on click
const videoPopup = document.querySelector('.video-popup');
const featuredVid = document.querySelector('.about-video-desktop');
const closeVid = document.querySelector('.close');
const cards = document.querySelectorAll('.team-card');


function displayVideo(e) {
    e.preventDefault();
    videoPopup.classList.add('show');
    /* pause video if image was clicked and it was playing */
    window._wq = window._wq || [];
    _wq.push({ id: "iframeWistiaVid", onReady: function(wvideo) {
      wvideo.play();
    }});

}

function closeVideo(e) {
  e.preventDefault();
  window._wq = window._wq || [];
  _wq.push({ id: "iframeWistiaVid", onReady: function(wvideo) {
    wvideo.pause();
  }});  
  videoPopup.classList.remove('show');
}

function flipCard(e) {
  //e.preventDefault();

  const activeCards =  document.querySelectorAll('.active-card');

  let currentCard = false;

  //is the clicked card already active?
  if ( e.target.classList.contains('active-card') ) {
    currentCard = true;
  }

  //if there are active cards, flip these back by removing the active-card class
  if (activeCards) {
    for (var i = 0; i < activeCards.length; i++) {
      activeCards[i].classList.remove('active-card');
      document.activeElement.blur();
    }      
  }

  //if the active card was clicked, we want to flip it back, so we're not adding the class back
  //otherwise, flip the clicked card!
  if (!currentCard) {
    e.target.classList.add('active-card');
  }
}

// add click event listener
if(videoPopup && featuredVid) {
  featuredVid.addEventListener('click', displayVideo);
  closeVid.addEventListener('click', closeVideo);
}

// add click event listener
if(cards) {
  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', flipCard);
  }  
}

jQuery(document).ready(function($) {
    //about page carousel #1
    $('.carousel-products').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      fade: true,
      arrows: false,
      pauseOnFocus: false,
      pauseOnHover: false,      
      asNavFor: '.carousel-images'      
    });

    //about page carousel #2
    $('.carousel-images').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      asNavFor: '.carousel-products'       
    }); 


  });