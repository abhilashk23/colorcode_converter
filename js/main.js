//Function to convert hex format to a rgb color
var hexf = document.getElementById("hex");
var rgbf = document.getElementById("rgb");

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function lightOrDark(color) {

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
  
      // If HEX --> store the red, green, blue values in separate variables
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
  
      r = color[1];
      g = color[2];
      b = color[3];
    } 
    else {
  
      // If RGB --> Convert it to HEX: http://gist.github.com/983661
      color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'
      )
               );
  
      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
    }
  
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
    );
  
    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {
  
      return 'light';
    } 
    else {
  
      return 'dark';
    }
  }



$('button').click(function () {

    if ($('#rth').is(':checked')) {
        var rgb = $('.rgb').val();
        document.getElementById('hex').value = rgb2hex(rgb);
        document.body.style.background = rgb2hex(rgb);


    } else if ($('#htr').is(':checked')) {
        var hex = $('.hex').val();
        var xyx = 'rgb(' + hexToRgb(hex).r + ',' + hexToRgb(hex).g + ',' + hexToRgb(hex).b + ')' ;
        rgbf.value = xyx;
        document.body.style.background = hex;
    }

    function adjustTextColor() {
  
        element = document.body;
        bgColor = window.getComputedStyle(element, null).getPropertyValue('background-color');
        brightness = lightOrDark(bgColor);
        if(brightness == 'dark') {
          document.body.style.color = "#ffffff";
          document.getElementById('hex').style.color = "#ffffff";
          document.getElementById('rgb').style.color = "#ffffff";
          document.getElementById('hex').style.borderBottomColor = "rgb(255,255,255,0.4)";
          document.getElementById('rgb').style.borderBottomColor = "rgb(255,255,255,0.4)";
          document.getElementById('copyright').style.color = "#ffffff";
        }
        else {
          document.body.style.color = "#000000";
          document.getElementById('hex').style.color = "#000000";
          document.getElementById('rgb').style.color = "#000000";
          document.getElementById('hex').style.borderBottomColor = "rgb(0,0,0,0.4)";
          document.getElementById('rgb').style.borderBottomColor = "rgb(0,0,0,0.4)";
          document.getElementById('copyright').style.color = "#000000";
        }
      }

      adjustTextColor();
});

