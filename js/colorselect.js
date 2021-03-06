$(document).ready(function() {
    var slide, picker, slideIndicator, pickerIndicator,
	c, i, len, divs = document.getElementsByTagName('*'),
	current_target;

    for (i = 0, len = divs.length; i < len; i++) {
	switch (divs[i].className) {
	    case 'slide': slide = divs[i]; break;
	    case 'picker': picker = divs[i]; break;
	    case 'slide-indicator': slideIndicator = divs[i]; break;
	    case 'picker-indicator': pickerIndicator = divs[i]; break;
	}
    }
    //log("slide: "); log(slide); log("picker: "); log(picker);
    c = ColorPicker(slide, picker);

    c.callback = function(hex, hsv, rgb, mousePicker, mouseSlide) {
	ColorPicker.positionIndicators(
	    slideIndicator, pickerIndicator,
	    mouseSlide, mousePicker
	);
	current_target.css("background-color", hex);
	//document.body.style.backgroundColor = hex;
    };

    $("#cp-wrapper").hide();
    $(".colortrigger").click(function(event) {
	$("#cp-wrapper").css("left",event.pageX)
			.css("top" ,event.pageY);
	current_target = $(this);
	$("#cp-wrapper").show();
    });
    $("#background").click(function(){$("#cp-wrapper").hide();});
});