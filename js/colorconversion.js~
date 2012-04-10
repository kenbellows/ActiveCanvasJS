function getObjectByID(id) {
  // Cross-browser function to return the object with the specific id
  if (document.all) { // IE
    return document.all[id];
  } else { // Mozilla and others
    return document.getElementById(id);
  }
}

function HSVobject (hue, saturation, value) {
	// Object definition.
	this.h = hue; this.s = saturation; this.v = value;
	this.validate = function () {
		if (this.h <= 0) {this.h = 0;}
		if (this.s <= 0) {this.s = 0;}
		if (this.v <= 0) {this.v = 0;}
		if (this.h > 360) {this.h = 360;}
		if (this.s > 100) {this.s = 100;}
		if (this.v > 100) {this.v = 100;}
	};
}

function RGBobject (red, green, blue) {
	// Object definition.
	this.r = red; this.g = green; this.b = blue;
	this.validate = function () {
		if (this.r <= 0) {this.r = 0;}
		if (this.g <= 0) {this.g = 0;}
		if (this.b <= 0) {this.b = 0;}
		if (this.r > 255) {this.r = 255;}
		if (this.g > 255) {this.g = 255;}
		if (this.b > 255) {this.b = 255;}
	};
}

function hexify(number) {
	var digits = '0123456789ABCDEF';
	var lsd = number % 16;
	var msd = (number - lsd) / 16;
	var hexified = digits.charAt(msd) + digits.charAt(lsd);
	return hexified;
}

function decimalize(hexNumber) {
	var digits = '0123456789ABCDEF';
	return ((digits.indexOf(hexNumber.charAt(0).toUpperCase()) * 16) + digits.indexOf(hexNumber.charAt(1).toUpperCase()));
}

function hex2RGB (colorString) {
	RGB = new RGBobject(0,0,0);
	RGB.r = decimalize(colorString.substring(1,3));
	RGB.g = decimalize(colorString.substring(3,5));
	RGB.b = decimalize(colorString.substring(5,7));
	return RGB;
}

function RGB2hex (RGB) {
	return "#" + hexify(RGB.r) + hexify(RGB.g) + hexify(RGB.b);
}

function rgbChange () {
	var RGB = new RGBobject(getObjectByID("rChannel").value, getObjectByID("gChannel").value, getObjectByID("bChannel").value);
	var HSV = new HSVobject(getObjectByID("hChannel").value, getObjectByID("sChannel").value, getObjectByID("vChannel").value);
	RGB.validate();
	RGB2HSV (RGB, HSV);
	getObjectByID("hexColor").value = RGB2hex(RGB);
	updateSwatch();
	getObjectByID("rChannel").value = Math.round(RGB.r);
	getObjectByID("gChannel").value = Math.round(RGB.g);
	getObjectByID("bChannel").value = Math.round(RGB.b);
	getObjectByID("hChannel").value = Math.round(HSV.h);
	getObjectByID("sChannel").value = Math.round(HSV.s);
	getObjectByID("vChannel").value = Math.round(HSV.v);
}

function hsvChange () {
	var RGB = new RGBobject(getObjectByID("rChannel").value, getObjectByID("gChannel").value, getObjectByID("bChannel").value);
	var HSV = new HSVobject(getObjectByID("hChannel").value, getObjectByID("sChannel").value, getObjectByID("vChannel").value);
	HSV.validate();
	HSV2RGB (HSV, RGB);
	getObjectByID("hexColor").value = RGB2hex(RGB);
	updateSwatch();
	getObjectByID("rChannel").value = Math.round(RGB.r);
	getObjectByID("gChannel").value = Math.round(RGB.g);
	getObjectByID("bChannel").value = Math.round(RGB.b);
	getObjectByID("hChannel").value = Math.round(HSV.h);
	getObjectByID("sChannel").value = Math.round(HSV.s);
	getObjectByID("vChannel").value = Math.round(HSV.v);
}

function hexChange () {
	var colorString = getObjectByID("hexColor").value;
	var RGB = new RGBobject(0,0,0);
	var HSV = new HSVobject(0,0,0);
	hex2RGB(colorString, RGB);
	RGB2HSV (RGB, HSV);
	getObjectByID("rChannel").value = Math.round(RGB.r);
	getObjectByID("gChannel").value = Math.round(RGB.g);
	getObjectByID("bChannel").value = Math.round(RGB.b);
	getObjectByID("hChannel").value = Math.round(HSV.h);
	getObjectByID("sChannel").value = Math.round(HSV.s);
	getObjectByID("vChannel").value = Math.round(HSV.v);
}

function updateSwatch () {
	getObjectByID("swatch").style.backgroundColor = getObjectByID("hexColor").value;
}

function RGB2HSV (RGB) {
	HSV = new HSVobject(0,0,0);
	r = RGB.r / 255; g = RGB.g / 255; b = RGB.b / 255; // Scale to unity.

	var minVal = Math.min(r, g, b);
	var maxVal = Math.max(r, g, b);
	var delta = maxVal - minVal;

	HSV.v = maxVal;

	if (delta == 0) {
		HSV.h = 0;
		HSV.s = 0;
	} else {
		HSV.s = delta / maxVal;
		var del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
		var del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
		var del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;

		if (r == maxVal) {HSV.h = del_B - del_G;}
		else if (g == maxVal) {HSV.h = (1 / 3) + del_R - del_B;}
		else if (b == maxVal) {HSV.h = (2 / 3) + del_G - del_R;}
		
		if (HSV.h < 0) {HSV.h += 1;}
		if (HSV.h > 1) {HSV.h -= 1;}
	}
	HSV.h *= 360;
	HSV.s *= 100;
	HSV.v *= 100;
	
	return HSV;
}

function HSV2RGB (HSV) {
	RGB = new RGBobject(0,0,0);
	var h = HSV.h / 360; var s = HSV.s / 100; var v = HSV.v / 100;
	if (s == 0) {
		RGB.r = v * 255;
		RGB.g = v * 255;
		RGB.b = v * 255;
	} else {
		var_h = h * 6;
		var_i = Math.floor(var_h);
		var_1 = v * (1 - s);
		var_2 = v * (1 - s * (var_h - var_i));
		var_3 = v * (1 - s * (1 - (var_h - var_i)));
		
		if (var_i == 0) {var_r = v; var_g = var_3; var_b = var_1}
		else if (var_i == 1) {var_r = var_2; var_g = v; var_b = var_1}
		else if (var_i == 2) {var_r = var_1; var_g = v; var_b = var_3}
		else if (var_i == 3) {var_r = var_1; var_g = var_2; var_b = v}
		else if (var_i == 4) {var_r = var_3; var_g = var_1; var_b = v}
		else {var_r = v; var_g = var_1; var_b = var_2};
		
		RGB.r = var_r * 255;
		RGB.g = var_g * 255;
		RGB.b = var_b * 255;
	}
	
	return RGB;
}
