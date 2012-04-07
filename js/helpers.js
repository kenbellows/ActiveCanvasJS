// Log to the console
function log(str){console.log(str);}

// Evaluate the value of an input element
function evalScript(selector) {eval($(selector).val());}

  
// Source: http://stackoverflow.com/questions/263743/how-to-get-cursor-position-in-textarea
function getCursor(el) { 
  if (el.selectionStart) { 
    return el.selectionStart; 
  } else if (document.selection) { 
    el.focus(); 

    var r = document.selection.createRange(); 
    if (r == null) { 
      return 0; 
    } 

    var re = el.createTextRange(), 
        rc = re.duplicate(); 
    re.moveToBookmark(r.getBookmark()); 
    rc.setEndPoint('EndToStart', re); 

    return rc.text.length; 
  }  
  return 0; 
}

function splitNum(word){
    var i=0;
    while (isNaN(word[i]) && i<word.length) i++;
    if (i==word.length) return "NaN";
    var num = parseInt(word.substring(i));
    var numloc = word.indexOf(num);
    return [ 
             word.substring(0,numloc),
             num,
             word.substring(numloc+num.toString().length, word.length)
           ];
}

function notDelim(char) {
    return (char != ' '  && 
            char != '\t' && 
            char != '\n' &&
            char != ';'  &&
            char != ':'  &&
            char != '"'  &&
            char != ':'  &&
            char != '\0');
}

function getWordFromPos(string, pos) {
    if (string.length == 0) return "";
    else if (string.length == 1) return string[0];
    var begin = pos, end = pos;
    if (string[pos] == ' ') {
        if (pos > 0) begin--;
        else end++;
    }
    while ( end < string.length && notDelim(string[end]))
        end++;
    
    while ( begin >= 0 && notDelim(string[begin]))
        begin--;
    
    return string.substring(begin + 1, end);
}


/* function getInputSelection(el)
 * 
 * Source: http://stackoverflow.com/questions/3053542/how-to-get-the-start-and-end-points-of-selection-in-text-area/3053640#3053640
 *
 */
function getInputSelection(el) {
    var start = 0, end = 0, normalizedValue, range,
        textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();

        if (range && range.parentElement() == el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");

            // Create a working TextRange that lives only in the input
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());

            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = el.createTextRange();
            endRange.collapse(false);

            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }

    return {
        start: start,
        end: end
    };
}


