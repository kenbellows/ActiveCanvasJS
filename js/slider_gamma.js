function makeSlideBar(bar_selector, slider_selector) {
    var sliderbar_wdith = 500,
        sliderbar = $(bar_selector),
        slider = $(slider_selector);
    function right(jqElement) { return jqElement.position().left + jqElement.width(); }
    function left (jqElement) { return jqElement.position().left; }
    slider.draggable({
        axis: "x",  
        drag: function(e) {
            var delta = 5;
            //console.log(e);
            if (right(slider) > right(sliderbar)) { // If the slider is pulled past the right edge of the sliderbar:
                sliderbar.width(  // Extend the right edge of the slider bar to the right edge of the slider by adjusting the width.
                    right(slider) - left(sliderbar)
                );
            }
            else if (left(slider) < left(sliderbar)) {
                sliderbar.width(
                    sliderbar.width() + 
                    left(sliderbar) - left(slider)
                );
                sliderbar.offset({
                    left: slider.offset().left,
                    top : sliderbar.offset().top,
                });
                //console.log("\nsliderbar.offset: ", sliderbar.offset(), "\nslider.offset: ", slider.offset());
            }
        }
    });
    slider.changing_number = {}; // This is a placeholder for the number value object to be changed. 
                                 // Eventually it will be the jquery obj of a set of a span surrounding the number to be changed.
}