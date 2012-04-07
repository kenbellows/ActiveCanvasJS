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
                        
                        // Extend the slider if user drags past the max or min value
                        // ISSUE 1:
                        //      When slider extends, handle and slider move much faster than user's mouse.
                        //      If a check is put in to test whether handle has gotten away from mouse, 
                        //      handle gets stuck after a very limited extension.
                        log("val: " + val.toString() + ", maxval: " + maxval.toString());
                        log("ev.pageX: " + ev.pageX.toString() + ", slideX: " + slideX.toString());
                        if (val >= maxval-15) {
                            $(this).slider("option", "value", val-10); 
                            $('.ui-slider-handle', $(this)).css('left', (Math.floor((val-minval-10)/(maxval-minval))-2).toString() + "px");
                        }
                        if (val >= maxval-30 && slideX <= ev.pageX) {
                            var newwidth = (parseInt($(this).css("width")) + 4).toString() + "px";
                            $(this).css("width", newwidth)
                                   .slider("option", "max",   maxval+2)
                                   .slider("option", "value", val-10);
                        }
                        else if (val <= minval+5) {
                            var newwidth = (parseInt($(this).css("width")) + 1).toString() + "px",
                                newleft  = (parseInt($(this).css("left" )) - 5).toString() + "px";
                            if (newleft>0) {
                                $(this).css("width", newwidth)
                                       .css("left" , newleft )
                                       .slider("option", "max", minval-10);
                            }
                        }
                    });
            }
        }
        else {
            var pos = getInputSelection(this);
            $("#word").html(pos["start"].toString() + "," + pos["end"].toString());
        }
    });
});
