jQuery(document).ready(function($) {

  $("button#btu-calculator").on("click", function() {

    var roomsize = $("#roomsize").val();
    var shade = $("input[name=shade]:checked").val();
    var sunny = $("input[name=sunny]:checked").val();
    var people = $("#people").val();
    var kitchen = $("input[name=kitchen]:checked").val();
    var preference = $("input[name=preference]:checked").val();
    var btu = 0;
    var btupic = "";
    var btulink = "";

    if ( roomsize >= 100 && roomsize <= 150 ) {
      btu = 5000;
    }
    else if ( roomsize > 150 && roomsize <= 250 ) {
      btu = 6000;
    }
    else if ( roomsize > 250 && roomsize <= 400 ) {
      btu = 8000;
    }
    else if ( roomsize > 400 && roomsize <= 450 ) {
      btu = 10000;
    }
    else if ( roomsize > 450 && roomsize <= 550 ) {
      btu = 12000;
    }
    else if ( roomsize > 550 && roomsize <= 700 ) {
      btu = 15000;
    }
    else if ( roomsize > 700 && roomsize <= 1000 ) {
      btu = 18000;
    }
    else if ( roomsize > 1000 && roomsize <= 1200 ) {
      btu = 22000;
    }

    if (shade === "yes"){
      btu = btu * .9;
    }
    if (sunny === "yes"){
      btu = btu * 1.1;
    }
    if (people > 2){
      people = (people - 2) * 600;
      btu = btu + people;
    }
    if (kitchen === "yes"){
      btu = btu + 4000;
    }

    btu = Math.round(btu/1000)*1000;

    if ( preference == "value" ) {
      if ( btu <= 5000 ) {
        btupic = "frigidaire5000";
        btulink = "https://www.amazon.com/dp/B07BN3XCDV/?tag=ybdwacq-20";
      }
      else if ( btu > 5000 && btu <= 6000 ) {
        btupic = "frigidaire6000";
        btulink = "https://www.amazon.com/dp/B076QJDKC7/?tag=ybdwacq-20";
      }
      else if ( btu > 6000 && btu <= 8000 ) {
        btupic = "frigidaire8000";
        btulink = "https://www.amazon.com/dp/B07BN38X4D/?tag=ybdwacq-20";
      }
      else if ( btu > 8000 && btu <= 10000 ) {
        btupic = "frigidaire10000";
        btulink = "https://www.amazon.com/dp/B07BN3MB6Z/?tag=ybdwacq-20";
      }
      else if ( btu > 10000 && btu <= 12000 ) {
        btupic = "frigidaire12000";
        btulink = "https://www.amazon.com/dp/B07BN3MFRH/?tag=ybdwacq-20";
      }
      else if ( btu > 12000 && btu <= 15000 ) {
        btupic = "frigidaire15000";
        btulink = "https://www.amazon.com/dp/B07C8XGT2R/?tag=ybdwacq-20";
      }
      else if ( btu > 15000) {
        btupic = "frigidaire22000";
        btulink = "https://www.amazon.com/dp/B07C8XX5HW/?tag=ybdwacq-20";
      }
    }
    else {
      if ( btu <= 5200 ) {
        btupic = "friedrich5000";
        btulink = "https://www.amazon.com/dp/B00SMMZHRE/?tag=ybdwacq-20";
      }
      else if ( btu > 5200 && btu <= 6000 ) {
        btupic = "friedrich5000plus";
        btulink = "https://www.amazon.com/dp/B00GM3259S/?tag=ybdwacq-20";
      }
      else if ( btu > 6000 && btu <= 8000 ) {
        btupic = "friedrich5000plusalt";
        btulink = "https://www.amazon.com/dp/B00GM328Z4/?tag=ybdwacq-20";
      }
      else if ( btu > 8000 && btu <= 10000 ) {
        btupic = "friedrich5000plus";
        btulink = "https://www.amazon.com/dp/B00GM32D7M/?tag=ybdwacq-20";
      }
      else if ( btu > 10000 && btu <= 12000 ) {
        btupic = "friedrich5000plusalt";
        btulink = "https://www.amazon.com/dp/B00GM32GYC/?tag=ybdwacq-20";
      }
      else if ( btu > 12000 && btu <= 15500 ) {
        btupic = "friedrich5000plus";
        btulink = "https://www.amazon.com/dp/B00GM32L1U/?tag=ybdwacq-20";
      }
      else if ( btu > 15500) {
        btupic = "friedrich5000plusalt";
        btulink = "https://www.amazon.com/dp/B00GM32NU4/?tag=ybdwacq-20";
      }
    }

    var acpic = ".ac" + btupic;
    console.log(acpic);

    $(".quizresults").removeClass("hide-results");
    $(".quizresults").find("span.bturesults").text(btu);
    $(".quizresults").find(".showac").addClass("acpic").removeClass("showac");
    $(".quizresults").find(acpic).removeClass("acpic").addClass("showac");
    $(".quizresults").find("a.aclink").attr("href",btulink);

  });

// init range slider for roomsize input
$('input[name="roomsize"]').rangeslider({
    polyfill: false,
    onInit: function() {
      $("#output").text(this.value);
    },
    onSlide: function(position, value) {
      $("#output").text(value);
    },
    onSlideEnd: function(position, value) {}
});
});

function SelectAll(id) {
  document.getElementById(id).focus();
  document.getElementById(id).select();
}
