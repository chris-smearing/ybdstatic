jQuery(document).ready(function($) {
	
  $("button#btu-calculator").on("click", function() {
 		
    var roomsize = $("#roomsize").val();
    var shade = $("select#shade").val();
    var sunny = $("select#sunny").val();
    var people = $("#people").val(); 
    var kitchen = $("select#kitchen").val();
 	var btu = 0;
 	var btupic = "";
 	var btulink = "https://www.amazon.com/Room-Air-Conditioners-Fans-Heaters/b/ref=dp_bc_3?ie=UTF8&node=3737671&tag=ybdigsqz-20";
    if (roomsize < 150) {
    	btu = 5000;
    	} else if (roomsize < 250) {
    	btu = 6000;
    	} else if (roomsize < 300) {
    	btu = 7000;
    	} else if (roomsize < 350) {
    	btu = 8000;
    	} else if (roomsize < 400) {
    	btu = 9000;
    	} else if (roomsize < 450) {
    	btu = 10000;
    	} else if (roomsize < 550) {
    	btu = 12000;
    	} else if (roomsize < 700) {
    	btu = 14000;
    	} else if (roomsize < 1000) {
    	btu = 18000;
    	} else if (roomsize < 1200) {
    	btu = 21000;
    	} else if (roomsize < 1400) {
    	btu = 23000;
    	} else if (roomsize < 1500) {
    	btu = 24000;
    	} else if (roomsize < 2000) {
    	btu = 30000;
    	} else if (roomsize < 2500) {
    	btu = 34000;
     	} else {
    	btu = 34000;
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
    	if (btu < 10000) {
    		btupic = "small";
    	} else if (btu == 10000) { 
    		btupic = btu;
    		btulink = "https://www.amazon.com/Honeywell-MN10CESWW-Portable-Conditioner-Control/dp/B00B2BTAV6/?tag=ybdigsqz-20";
    	} else if (btu > 10000 && btu < 13000) { 
    		btupic = 12000;
    		btulink = "https://www.amazon.com/gp/product/B0115XWCHO/?tag=ybdigsqz-20";
    	} else if (btu > 12000 && btu < 15000) { 
    		btupic = 14000;
    		btulink = "https://www.amazon.com/Whynter-Portable-Conditioner-Heater-ARC-14SH/dp/B002W87P9C/?tag=ybdigsqz-20";
    	} else if (btu > 14000) { 
    		btupic = "large";
    	} else { 
    		btupic = btu;
    	}
    	var acpic = ".ac" + btupic;

	$(".quizresults").removeClass("hide-results");   	   		
  	$(".quizresults").find("span.bturesults").text(btu);
	$(".quizresults").find(".showac").addClass("acpic").removeClass("showac");
	$(".quizresults").find(acpic).removeClass("acpic").addClass("showac");
	$(".quizresults").find("a.aclink").attr("href",btulink);

  });
  
});

  	function SelectAll(id) {
    	document.getElementById(id).focus();
    	document.getElementById(id).select();
	}