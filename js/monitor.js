// Source: https://gist.github.com/1622014
(function($) {
  return $.fn.monitor = function(fn) {
    var changed, currentVal, cycle, lastVal, timeout,
      _this = this;
    currentVal = this.val();
    lastVal = currentVal;
    timeout = null;
    changed = function() {
      return currentVal !== lastVal;
    };
    cycle = function() {
      currentVal = _this.val();
      if (changed()) fn(currentVal);
      lastVal = currentVal;
      return timeout = setTimeout(cycle, 50);
    };
    this.keyup(function() {
      clearTimeout(timeout);
      return cycle();
    });
    return cycle();
  };
})(jQuery);




$(document).ready(function(){
    $("#script").html("var cssobj = {\n\t\t'width':'300px',\n\t\t'height':'300px',\n\t\t'background-color':'#CCEEFF',\n\t};\n$('#canvasdiv').css(cssobj);");
    evalScript("#script");
    $("#script").monitor(function(){
      evalScript("#script");
    });
});

