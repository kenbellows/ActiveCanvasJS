$(document).ready(function() {
    $("#slider").slider()
                .hide();

    // Equivalent of  $("#slider").blur(function(){$(this).hide();});
    var slider_show = false;
    $(document).bind("click", function(event){
        if (slider_show && event.target.id != $("#slider").attr("id")) {
        $("#slider").hide()
                    .unbind("slide");
        slider_show = false;
        }
        else if ($("#slider").css("visibility") == "visible") slider_show = true;
        return false;
    });



    // Main slider function
    $('#script').click(function(event) {
        var _this = $(this);
        if (event.ctrlKey) {
            var pos   = getInputSelection(this)["start"],
                word  = getWordFromPos(_this.val(), pos),
                value = splitNum(word);
            
            if (_this.val().length != 0) { while (pos >= 0 && notDelim(_this.val()[pos-1])) pos--; }
            $("#word").html((value == "NaN" ? word : value[1]));
        
            if (value != "NaN") {
                var newpos = pos + value[0].length,
                    numlen = value[1].toString().length;
                $("#slider")
                    // Position slider above number
                    .css("top",   (event.pageY-40 ).toString() + "px")
                    .css("left",  (event.pageX-210).toString() + "px")
                    .css("width", "400px")
                    // Set slider values to reflect the number
                    .slider("option", {
                        "min"   :  value[1] - 100,
                        "max"   :  value[1] + 100,
                        "value" :  value[1]
                    })
                    // Show the slider
                    .show()
                    // Define what happens when the slider slides
                    .bind("slide", function(ev, ui) {
                        // Modify the number in place and update the length of the number
                        var val = ui.value,
                            currval = _this.val().split(""),
                            maxval = $(this).slider("option", "max"),
                            minval = $(this).slider("option", "min"),
                            slideX = (parseInt($("#slider").css("width"))/(maxval-minval)) * (val-minval) + parseInt($("#slider").css("left"));
                        $("#word").html(val);
                        currval.splice(newpos, numlen, val);
                        _this.val(currval.join(""));
                        numlen = val.toString().length;
                    });
            }
        }
        else {
            var pos = getInputSelection(this);
            $("#word").html(pos["start"].toString() + "," + pos["end"].toString());
        }
    });
});
