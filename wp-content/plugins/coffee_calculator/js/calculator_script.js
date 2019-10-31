jQuery(document).ready(function($) {
    const COFFEE_CUP = 6;
    const OZ_CUP = 177;
    const FL_OZ = 29.5;
    $("#cups-coffee, #coffee-strength").on('change', function() {
        var cups = $("#cups-coffee").val();
        var strength = $("#coffee-strength").val();
        var c_wei = ((COFFEE_CUP * cups * FL_OZ) / strength).toFixed(1);
        $("#c-weight-result").text(c_wei + " g.");

        var c_vol = (Math.round((c_wei/5)*2)/2).toFixed(1); 

        $("#c-volume-result").text(c_vol + " tbsp."); 
        
        var w_wei = ((cups * OZ_CUP) + (c_wei/2)).toFixed(1); 
        $("#w-weight-result").text(w_wei + " g."); 

        var w_vol = (w_wei / FL_OZ).toFixed(1); 
        $("#w-volume-result").text(w_vol + " oz."); 
    });

    $(".embedholder a").on("click", function(t) {
        var o = $(this);
        return o.parent().find(".embedcode").toggle(),
        o.blur(),
        t.stopPropagation(),
        !1
    });
    var f = {};
    $(".embedholder textarea").on("mouseup mousedown click focus", function() {
        var t = $(this);
        t.select(),
        t.mouseup(function() {
            return t.unbind("mouseup"),
            !1
        })
    }).on("mouseleave", function() {
        var t = $(this)
          , o = t.closest(".embedholder").attr("id");
        f[o] = window.setTimeout(function() {
            $("#" + o + " .embedcode").hide()
        }, 1500)
    }).on("mouseenter", function() {
        var t = e(this)
          , o = t.closest(".embedholder").attr("id");
        o in f && window.clearTimeout(f[o])
    }).on("click", function($) {
        return $.stopPropagation(),
        !1
    });
    $(".embedholder").on("click", function(e) {
        e.stopPropagation();
    });
    $(window).click(function() {
        $(".embedholder .embedcode").hide();
    });
});