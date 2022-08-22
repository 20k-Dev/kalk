// Set focus of selected reset button

function setfocus(a) {
	document.getElementById(a).focus();
}


/* Calculateurs POWER
----------------------------------------------------------------------------------
*/

// Conversion Watts to BTU/h
function btucalc(a, b) {
	var x = document.getElementById(a).value;
	x = x*3.412141633;
	x = x.toFixed(2);
	document.getElementById(b).value = x;
}

// Conversion Amps to Watts
function wattscalc(a, b, c, d, e, f) {
	var source = document.getElementById(a).value;
	var line = document.getElementById(b).value;
	var amps = document.getElementById(c).value;
	var volts = document.getElementById(d).value;
	var pf = document.getElementById(e).value;
	var watts = amps*volts;

	if (source != "DC") {
		if (pf<0 || pf>1 || pf=="") {
			alert('Please enter power factor from 0 to 1');
			document.getElementById(e).focus();
			return;
		}
	}

	if (source == "AC1") {
		watts*=pf;
	}
	else if (source == "AC3") {
		if (line == "ltl") {
			watts*=(pf*Math.sqrt(3));
		}
		else {
			watts*=(pf*3);
		}
	}

	watts = watts.toFixed(2);
	document.getElementById(f).value = watts;
}


// Conversion Watts to Amps
function ampscalc(a, b, c, d, e, f) {
	var source = document.getElementById(a).value;
	var line = document.getElementById(b).value;
	var watts = document.getElementById(c).value;
	var volts = document.getElementById(d).value;
	var pf = document.getElementById(e).value;
	var amps = watts/volts;

	if (source != "DC") {
		if (pf<0 || pf>1 || pf=="") {
			alert('Please enter power factor from 0 to 1');
			document.getElementById(e).focus();
			return;
		}
	}

	if (source == "AC1") {
		amps/=pf;
	}
	else if (source == "AC3") {
		if (line == "ltl") {
			amps/=(pf*Math.sqrt(3));
		}
		else {
			amps/=(pf*3);
		}
	}

	amps = amps.toFixed(2);
	document.getElementById(f).value = amps;
}


// Rearrange Watts and Amps Calculators
function onSourceChange(a, b, c) {
	var source = document.getElementById(a).value;
	var line = document.getElementById(b).value;

	if (source == "DC") {
		document.getElementById(c).readOnly = true;
		document.getElementById(c).value = '';
		document.getElementById(b).style.display = 'none';
	}
	else if (source == "AC1") {
		document.getElementById(c).readOnly = false;
		document.getElementById(b).style.display = 'none';
	}
	else if (source == "AC3") {
		document.getElementById(c).readOnly = false;
		document.getElementById(b).style.display = '';

	}
}


/* Calculateurs ACCUITÉ
----------------------------------------------------------------------------------
*/

// Distance selon la résolution
function distcalc(a, b, c, d, e) {
	var accuite = document.getElementById(a).value;
	var ppi = document.getElementById(b).value;
	var units = document.getElementsByName(c);

	for (i = 0; i < units.length; i++) {
		if (units[i].checked) {
			selectedUnits = units[i].value;
		}
	}



	if (selectedUnits == "mm") {
		ppi = 1/(ppi*0.0393701)
	}

	var totalFeet = (accuite/ppi)/(Math.sin(Math.PI/180))/12

	var totalMeter = (accuite/ppi)/(Math.sin(Math.PI/180))*0.0254

	var feetFormula = Math.floor(totalFeet);
	var inchesFormula = Math.round((totalFeet - feetFormula) * 12);

	var totalFeetText = feetFormula + "'" + inchesFormula + '"';
	var totalMeterText = totalMeter.toFixed(2) + "M";

	document.getElementById(d).value = totalFeetText;
	document.getElementById(e).value = totalMeterText;
}


// Accuité selon la résolution
function accuitecalc(a, b, c, d, e, f) {
	var resolution = document.getElementById(a).value;
	var distance = document.getElementById(b).value;
	var pxUnits = document.getElementsByName(c);
	var distUnits = document.getElementsByName(d);
	var total = null;

	for (i = 0; i < pxUnits.length; i++) {
		if (pxUnits[i].checked) {
			selectedPXUnits = pxUnits[i].value;
		}
	}

	if (selectedPXUnits == "mm") {
		resolution = 1/(resolution*0.0393701)
	}

	for (j = 0; j < distUnits.length; j++) {
		if (distUnits[j].checked) {
			selectedDistUnits = distUnits[j].value;
		}
	}

	if (selectedDistUnits == "Feet") {
		total = resolution*(distance*Math.sin(Math.PI/180)*12)
		total = total.toFixed(2)
	}

	if (selectedDistUnits == "Meters") {
		total = resolution*(distance*Math.sin(Math.PI/180)*39.37007874)
		total = total.toFixed(2)
	}

	var percent = total*100/30
	var percentRound = percent.toFixed(2) + "%"

	document.getElementById(e).value = total;
	document.getElementById(f).value = percentRound;
}


// Resolution selon la distance
function resolutioncalc(a, b, c, d) {
	var accuite = document.getElementById(a).value;
	var distance = document.getElementById(b).value;
	var units = document.getElementsByName(c);
	var total = null;

	for (i = 0; i < units.length; i++) {
		if (units[i].checked) {
			selectedUnits = units[i].value;
		}
	}

	if (selectedUnits == "Feet") {
		total = accuite/(distance*Math.sin(Math.PI/180)*12)
		total = total.toFixed(2) + " PPI"
	}

	else if (selectedUnits == "Meters") {
		total = accuite/(distance*Math.sin(Math.PI/180)*39.37007874)
		total = total.toFixed(2) + " PPI"
	}

	document.getElementById(d).value = total;
}

// Comparateur résolution de TV
function tvcalc(a, b, c, d) {
	var accuite = document.getElementById(a).value;
	var diagonale = document.getElementById(b).value;
	var decimalHD = null;
	var decimalUHD = null;

	//Calcul largeur TV
	var calcLargeur = diagonale*Math.cos(29.35775354*Math.PI/180);

	//Calcul ppi HD
	var ppiHD = 1920/calcLargeur
	//Calcul distance HD Decimal
	decimalHD = ((accuite/ppiHD)/Math.sin(Math.PI/180))/12;
	//Calcul distance HD Feet & Inches
	var feetHDFormula = Math.floor(decimalHD);
	var inchesHDFormula = Math.round((decimalHD - feetHDFormula) * 12);
	var totalFeetHDText = feetHDFormula + "'" + inchesHDFormula + '"';

	//Calcul ppi UHD
	var ppiUHD = 3840/calcLargeur
	//Calcul distance UHD Decimal
	decimalUHD = ((accuite/ppiUHD)/Math.sin(Math.PI/180))/12;
	//Calcul distance UHD Feet & Inches
	var feetUHDFormula = Math.floor(decimalUHD);
	var inchesUHDFormula = Math.round((decimalUHD - feetUHDFormula) * 12);
	var totalFeetUHDText = feetUHDFormula + "'" + inchesUHDFormula + '"';

	document.getElementById(c).value = totalFeetHDText;
	document.getElementById(d).value = totalFeetUHDText;
}




/* Calculateurs VIDEO LIGHT
----------------------------------------------------------------------------------
*/

// Contrast Ratio
function contrastcalc(a, b, c, d, e, f, g, h, i, j) {
	var ratio = document.getElementById(a).value;
	var ambiant = document.getElementById(b).value;
	var illunits = document.getElementById(c).value;
	var gain = document.getElementById(d).value;
	var prjunits = document.getElementById(e).value;
	var result = document.getElementById(j).value;

	// lux to FC constant
	var luxTOfc = 0.09290304

	var projector = null;
	var projectorlux = null;
	var ansi = null;

	if (result == "ill") {

		if (illunits == "lux" && prjunits == "lux") {
			projector = (ambiant*ratio)/gain;
			document.getElementById(f).value = projector.toFixed(2);
		}
		else if (illunits == "lux" && prjunits == "fc") {
			projector = (ambiant*ratio)/gain;
			projector = projector*luxTOfc;
			document.getElementById(f).value = projector.toFixed(2);
		}
		else if (illunits == "fc" && prjunits == "lux") {
			projector = (ambiant*ratio)/gain;
			projector = projector/luxTOfc;
			document.getElementById(f).value = projector.toFixed(2);
		}
		else if (illunits == "fc" && prjunits == "fc") {
			projector = (ambiant*ratio)/gain;
			document.getElementById(f).value = projector.toFixed(2);
		}
	}

	else if (result == "ansi") {
		var width = document.getElementById(g).value;
		var height = document.getElementById(h).value;

		if (illunits == "lux") {
			projector = (ambiant*ratio)/gain;
			ansilm = (width*height)*projector;
			document.getElementById(i).value = ansilm.toFixed(2);
		}
		else if (illunits == "fc") {
			projector = (ambiant*ratio)/gain;
			projector = projector/luxTOfc;
			ansilm = (width*height)*projector;
			document.getElementById(i).value = ansilm.toFixed(2);
		}
	}
}

// Contrast ratio Result change
function contrastresult(a) {
	var result = document.getElementById(a).value;

	if (result == "ill") {
		document.getElementById('result1').style.display = '';
		document.getElementById('result2').style.display = 'none';
		document.getElementById('dims').style.display = 'none';
	}
	else if (result == "ansi") {
		document.getElementById('result1').style.display = 'none';
		document.getElementById('result2').style.display = '';
		document.getElementById('dims').style.display = '';
	}
}

// Auto complete Ratio Width & Height
function ratioLockSelect(a, b, c) {
	var ratio = document.getElementById(a).value;
	var width = document.getElementById(b).value;

	switch(ratio) {
		case "Custom":
		// Do nothing
		break;
		case "sxga":
		// 5:4
		height = width*4/5;
		break;
		case "vga":
		// 4:3
		height = width*3/4;
		break;
		case "hvga":
		// 3:2
		height = width*2/3;
		break;
		case "wuxga":
		// 16:10
		height = width*10/16;
		break;
		case "wxga":
		// 5:3
		height = width*3/5;
		break;
		case "hd":
		// 16:9
		height = width*9/16;
		break;
		case "2k":
		// 17:9
		height = width*9/17;
		break;
		case "uwhd":
		// 21:9
		height = width*9/21;
	}
	document.getElementById(c).value = height;
}

// Auto complete ratio Width & Height Text
function ratioLockCalcW(a, b, c) {
	var ratio = document.getElementById(a).value;
	var height = document.getElementById(c).value;

	switch(ratio) {
		case "Custom":
		// Do nothing
		break;
		case "sxga":
		// 5:4
		width = height*5/4;
		break;
		case "vga":
		// 4:3
		width = height*4/3;
		break;
		case "hvga":
		// 3:2
		width = height*3/2;
		break;
		case "wuxga":
		// 16:10
		width = height*16/10;
		break;
		case "wxga":
		// 5:3
		width = height*5/3;
		break;
		case "hd":
		// 16:9
		width = height*16/9;
		break;
		case "2k":
		// 17:9
		width = height*17/9;
		break;
		case "uwhd":
		// 21:9
		width = height*21/9;
	}
	document.getElementById(b).value = width;
}

// Luminance
function screennitscalc(a, b, c, d, e) {
	var lumens = document.getElementById(a).value;
	var gain = document.getElementById(b).value;
	var width = document.getElementById(c).value;
	var height = document.getElementById(d).value;

	//gain*(lumens/(Math.PI*(width*height)))

	var nits = gain*(lumens/(Math.PI*(width*height)))
	nits = nits.toFixed(2)

	document.getElementById(e).value = nits;
}

// Illuminance
function screenIllcalc(a, b, c, d, e, f) {
	var lumens = document.getElementById(a).value;
	var width = document.getElementById(b).value;
	var height = document.getElementById(c).value;
	var dimUnit = document.getElementById(d).value;
	var illUnit = document.getElementById(f).value;

	var illuminance = "";

	if (dimUnit == "feet") {
		width = width*0.0254*12;
		height = height*0.0254*12;
	}

	illuminance = lumens/(width*height);

	if (illUnit == "fc") {
		illuminance = illuminance * 0.09290304;
	}

	document.getElementById(e).value = Math.round((illuminance + Number.EPSILON) * 100) / 100;
}


/* Calculateur VIDEO TOOLBOX
----------------------------------------------------------------------------------
*/


// Timecode Calculator
// Timecode Calculator Global Variable
var tcID = 0
// Timecode Calculator Add row function
function tcAddRow() {
	tcID += 1
	newIDin = "tcIn" + tcID
	newIDout = "tcOut" + tcID
	var div1 = document.createElement('div');
	//div1.setAttribute("id", "newdiv")
	div1.setAttribute("class", "row")
	// Get template data
	div1.innerHTML = document.getElementById('newlinetpl').innerHTML;
	// append to our form, so that template data
	//become part of form
	document.getElementById('tcTable').appendChild(div1);
	document.getElementById('timecodein').name = newIDin;
	document.getElementById('timecodein').id = newIDin;
	document.getElementById('timecodeout').name = newIDout;
	document.getElementById('timecodeout').id = newIDout;
}
// Timecode Calculator Total
function tcCalc(a, b) {
	var fps = document.getElementById(a).value;
	var tcStart = document.getElementById(b).value;

	var isValidSMPTETimeCode = new RegExp(/(^(?:(?:[0-1][0-9]|[0-5][0-9]):)(?:[0-5][0-9]:){2}(?:[0-5][0-9])$)/);
	var isNonValidTimecodeFormat = new RegExp(/(^(?:(?:[0-9][0-9]):)(?:[0-9][0-9]:){2}(?:[0-9][0-9])$)/);

	if(isValidSMPTETimeCode.test(tcStart)) {
		document.getElementById(b).value = tcStart
	}
	else {
		if (isNonValidTimecodeFormat.test(tcStart)) {
			alert("Please enter valid SMPTE Timecode values")
		}
		else {
			tcStart = pad(tcStart, 8)
			tcStart = tcStart.match(new RegExp('.{1,' + 2 + '}', 'g'));
			tcStart = array_to_timecode(tcStart)
			if (isValidSMPTETimeCode.test(tcStart)) {
				document.getElementById(b).value = tcStart;
			}
			else {
				alert("Please enter valid SMPTE Timecode values")
			}		
		}
	}

	for (var i = 0; i <= tcID; i++) {
		var tcIn = document.getElementById('tcIn'+i).value;

		if(isValidSMPTETimeCode.test(tcIn)) {
			document.getElementById('tcIn'+i).value = tcIn;
			//calcul
			if (i != 0) {
				prevTimecode = document.getElementById('tcOut'+(i-1)).value;
			}
			else {
				prevTimecode = "first";
			}
			newtc = tcAdd(tcStart, tcIn, prevTimecode, fps);

			document.getElementById('tcOut'+i).value = newtc;
		}
		else {
			if (isNonValidTimecodeFormat.test(tcIn)) {
				alert("Please enter valid SMPTE Timecode values");
			}
			else {
				var tcArray = pad(tcIn, 8);
				tcArray = tcArray.match(new RegExp('.{1,' + 2 + '}', 'g'));
				tcText = array_to_timecode(tcArray);
				if (isValidSMPTETimeCode.test(tcText)) {
					document.getElementById('tcIn'+i).value = tcText;
					//calcul
					if (i != 0) {
						prevTimecode = document.getElementById('tcOut'+(i-1)).value;
					}
					else {
						prevTimecode = "first";
					}
					newtc = tcAdd(tcStart, tcText, prevTimecode, fps);

					document.getElementById('tcOut'+i).value = newtc;
				}
				else {
					alert("Please enter valid SMPTE Timecode values");
				}		
			}
		}
	}
}

// Timecode Calculator Addition
function tcAdd(tcstart, timecodein, previousTimecode, framerate) {
	var tcStart = timecode_to_frames(tcstart, framerate);
	var tcIn = timecode_to_frames(timecodein, framerate);
	var tcPrev = previousTimecode


	if (tcPrev == "first") {
		tcTotal = tcStart+tcIn;
		tcTotal = frames_to_timecode(tcTotal, framerate)
		return tcTotal;
	}
	else {
		tcPrev = timecode_to_frames(previousTimecode, framerate);
		tcTotal = tcPrev+tcIn;
		tcTotal = frames_to_timecode(tcTotal, framerate)
		return tcTotal;
	}

}

// Timecode Calculator Convert TC to Frames
function timecode_to_frames(timecode, framerate) {
	var a = timecode.split(':');
	return ((Number(a[0])*3600 + Number(a[1])*60 + Number(a[2]))*framerate + Number(a[3]));
}

// Timecode Calculator Convert Frames to TC
function frames_to_timecode(frames, framerate) {
	var h = Math.floor(frames/(60*60*framerate));
	var m = (Math.floor(frames/(60*framerate))) % 60;
	var s = (Math.floor(frames/framerate)) % 60;
	var f = frames % framerate;
	return showTwoDigits(h) + ":" + showTwoDigits(m) + ":" + showTwoDigits(s) + ":" + showTwoDigits(f);
}
// Timecode Calculator Array to 00:00:00:00
function array_to_timecode (array) {
	var h = array[0];
	var m = array[1];
	var s = array[2];
	var f = array[3];
	return showTwoDigits(h) + ":" + showTwoDigits(m) + ":" + showTwoDigits(s) + ":" + showTwoDigits(f);
}
// Timecode Calculator Leading 0
function showTwoDigits(number) {
	return ("00" + number).slice(-2);
}
// Timecode Calculator Leading 0 *8
function pad(number, size) {
	return ('000000000' + number).substr(-size);
}


// MAPPING MATTER FC to PPI Converter
function mmFC_to_PPI(a, b, c, d, e) {
	var fc = document.getElementById(a).value;
	var lumens = document.getElementById(b).value;
	var width = document.getElementById(c).value;
	var height = document.getElementById(d).value;

	var total = Math.sqrt(width*height)/Math.sqrt((lumens/fc)*144)

	document.getElementById(e).value = total.toFixed(2);
}


// MAPPING MATTER PPI to FC Converter
function mmPPI_to_FC(a, b, c, d, e) {
	var ppi = document.getElementById(a).value;
	var lumens = document.getElementById(b).value;
	var width = document.getElementById(c).value;
	var height = document.getElementById(d).value;

	var total = (144*lumens*Math.pow(ppi, 2))/(width*height);

	document.getElementById(e).value = total.toFixed(2);
}



/* Calculateurs VIDEO FILE SIZE
----------------------------------------------------------------------------------
*/


// Averate Bitrate
function avgBirtagecalc(a, b, c, d) {
	var width = document.getElementById(a).value;
	var height = document.getElementById(b).value;
	var bitPerPX = 30000/(1920*1080);

	var bitrate = width*height*bitPerPX;
	document.getElementById(c).value = bitrate.toFixed(2);
	document.getElementById(d).value = (bitrate/1000).toFixed(2);
}


// Validation MPEG & HAP Conversion
function isValidConversion(a, b, c, d, e, f, g) {
	var width = document.getElementById(a).value;
	var height = document.getElementById(b).value;
	var mpegW = 16
	var mpegH = 8
	var hap = 4

	var mpegisValidWidth = (Math.trunc(width/mpegW) == (width/mpegW)) ? true : false;
	var mpegisValidHeight = (Math.trunc(height/mpegH) == (height/mpegH)) ? true : false;
	var hapisValidWidth = (Math.trunc(width/hap) == (width/hap)) ? true : false;
	var hapisValidHeight = (Math.trunc(height/hap) == (height/hap)) ? true : false;

	var mpegisValid = (mpegisValidWidth == true && mpegisValidHeight == true) ? true : false;
	var hapisValid = (hapisValidWidth == true && hapisValidHeight == true) ? true : false;

	document.getElementById(c).value = mpegisValid;
	document.getElementById(d).value = hapisValid;

	var mpegTextWidth = "";
	var mpegTextHeight = "";
	var hapTextWidth = "";
	var hapTextHeight = "";

	var classGreen = "form-control bg-success";
	var classRed = "form-control bg-danger";

	switch(mpegisValid) {
		case true:
		document.getElementById(c).className = classGreen;
		break;
		case false:
		document.getElementById(c).className = classRed;
	}

	switch(hapisValid) {
		case true:
		document.getElementById(d).className = classGreen;
		break;
		case false:
		document.getElementById(d).className = classRed;
	}

	if (mpegisValid == false || hapisValid == false) {
		document.getElementById(e).style.display = "";
		if (mpegisValidWidth == false) {
			var mpegSugUPwidth = Math.ceil(width/mpegW)*mpegW;
			var mpegSugDNwidth = Math.floor(width/mpegW)*mpegW;
			mpegTextWidth = "MPEG width: " + mpegSugUPwidth + "px or " + mpegSugDNwidth + "px" + "<br>";
		}
		if (mpegisValidHeight == false) {
			var mpegSugUPheight = Math.ceil(height/mpegH)*mpegH;
			var mpegSugDNheight = Math.floor(height/mpegH)*mpegH;
			mpegTextHeight = "MPEG height: " + mpegSugUPheight + "px or " + mpegSugDNheight + "px";
		}
		if (hapisValidWidth == false) {
			var hapSugUPWidth = Math.ceil(width/hap)*hap;
			var hapSugDNWidth = Math.floor(width/hap)*hap;
			hapTextWidth = "HAP height: " + hapSugUPWidth + "px or " + hapSugDNWidth + "px" + "<br>";
		}
		if (hapisValidHeight == false) {
			var hapSugUPheight = Math.ceil(height/hap)*hap;
			var hapSugDNheight = Math.floor(height/hap)*hap;
			hapTextHeight = "HAP height: " + hapSugUPheight + "px or " + hapSugDNheight + "px";
		}

	}
	else {
		document.getElementById(e).style.display = "none";

	}

	document.getElementById(f).innerHTML = mpegTextWidth + mpegTextHeight;
	document.getElementById(g).innerHTML = hapTextWidth + hapTextHeight;
}

// Reset MPEG & HAP Conversion
function resetisValidConversion(a, b, c) {
	document.getElementById(a).className = "form-control";
	document.getElementById(b).className = "form-control";
	document.getElementById(c).style.display = "none";
}


// Hap Video File Size
function hapFileSizeCalc(a, b, c, d, e, f, g, h, i) {
	var hapVersion = document.getElementById(a).value;
	var width = document.getElementById(b).value;
	var height = document.getElementById(c).value;
	var length = document.getElementById(d).value;
	var lengthUnits = document.getElementById(e).value;
	var fps = document.getElementById(f).value;

	var constant = "";


	var hapBytes = 0.5;
	var hapaBytes = 1;
	var hapqBytes = 1;
	var hapqaBytes = 1.5;

	var mBps = "";
	var mB = "";
	var gB = "";

	switch(lengthUnits) {
		case "min":
		length = length*60
		break;
		case "hour":
		length = length*Math.pow(60, 2)
	}

	switch(hapVersion) {
		case "hap":
		constant = 0.5;
		break;
		case "hapa":
		constant = 1;
		break;
		case "hapq":
		constant = 1;
		break;
		case "hapqa":
		constant = 1.5;
	}

	mBps = width*height*constant*fps/1024/1024;
	mB = mBps*length;
	gB = mB/1024;

	document.getElementById(g).value = mBps.toFixed(2);
	document.getElementById(h).value = mB.toFixed(2);
	document.getElementById(i).value = gB.toFixed(2);

}




/* Calculateur UNITS CONVERTER
----------------------------------------------------------------------------------
*/


// Switch Unit Converter
function converterSelect(a, b, c, d) {
	var converter = document.getElementById(a).value;

	switch(converter) {
		case "lengthConv":
		document.getElementById(b).style.display = "";
		document.getElementById(c).style.display = "none";
		document.getElementById(d).style.display = "none";
		break;
		case "areaConv":
		document.getElementById(b).style.display = "none";
		document.getElementById(c).style.display = "";
		document.getElementById(d).style.display = "none";
		break;
		case "volumeConv":
		document.getElementById(b).style.display = "none";
		document.getElementById(c).style.display = "none";
		document.getElementById(d).style.display = "";
	}
}

// Length Converter
function convertLength_mm(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('lengthMM').value = roundnum(x);
	document.getElementById('lengthCM').value = roundnum(x/10);
	document.getElementById('lengthM').value = roundnum(x/1000);
	document.getElementById('lengthKM').value = roundnum(x/1e6);
	document.getElementById('lengthIN').value = roundnum(x/25.4);
	document.getElementById('lengthFT').value = roundnum(x/25.4/12);
	document.getElementById('lengthYD').value = roundnum(x/25.4/36);
	document.getElementById('lengthMI').value = roundnum(x/1609344);
}

function convertLength_cm(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('lengthMM').value = roundnum(x*10);
	document.getElementById('lengthCM').value = roundnum(x);
	document.getElementById('lengthM').value = roundnum(x/100);
	document.getElementById('lengthKM').value = roundnum(x/1e5);
	document.getElementById('lengthIN').value = roundnum(x/2.54);
	document.getElementById('lengthFT').value = roundnum(x/2.54/12);
	document.getElementById('lengthYD').value = roundnum(x/2.54/36);
	document.getElementById('lengthMI').value = roundnum(x/160934.4);
}

function convertLength_m(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('lengthMM').value = roundnum(x*1000);
	document.getElementById('lengthCM').value = roundnum(x*100);
	document.getElementById('lengthM').value = roundnum(x);
	document.getElementById('lengthKM').value = roundnum(x/1000);
	document.getElementById('lengthIN').value = roundnum(x/0.0254);
	document.getElementById('lengthFT').value = roundnum(x/0.0254/12);
	document.getElementById('lengthYD').value = roundnum(x/0.0254/36);
	document.getElementById('lengthMI').value = roundnum(x/1609.344);
}

function convertLength_km(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('lengthMM').value = roundnum(x*1e6);
	document.getElementById('lengthCM').value = roundnum(x*1e5);
	document.getElementById('lengthM').value = roundnum(x*1000);
	document.getElementById('lengthKM').value = roundnum(x);
	document.getElementById('lengthIN').value = roundnum(x/2.54e-5);
	document.getElementById('lengthFT').value = roundnum(x/2.54e-5/12);
	document.getElementById('lengthYD').value = roundnum(x/2.54e-5/36);
	document.getElementById('lengthMI').value = roundnum(x/1.609344);
}

function convertLength_in(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('lengthMM').value = roundnum(x*25.4);
	document.getElementById('lengthCM').value = roundnum(x*2.54);
	document.getElementById('lengthM').value = roundnum(x*0.0254);
	document.getElementById('lengthKM').value = roundnum(x*2.54e-5);
	document.getElementById('lengthIN').value = roundnum(x);
	document.getElementById('lengthFT').value = roundnum(x/12);
	document.getElementById('lengthYD').value = roundnum(x/36);
	document.getElementById('lengthMI').value = roundnum(x/63360);
}

function convertLength_ft(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('lengthMM').value = roundnum(x*25.4*12);
	document.getElementById('lengthCM').value = roundnum(x*2.54*12);
	document.getElementById('lengthM').value = roundnum(x*0.0254*12);
	document.getElementById('lengthKM').value = roundnum(x*2.54e-5*12);
	document.getElementById('lengthIN').value = roundnum(x*12);
	document.getElementById('lengthFT').value = roundnum(x);
	document.getElementById('lengthYD').value = roundnum(x/3);
	document.getElementById('lengthMI').value = roundnum(x/5280);
}

function convertLength_yd(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('lengthMM').value = roundnum(x*25.4*36);
	document.getElementById('lengthCM').value = roundnum(x*2.54*36);
	document.getElementById('lengthM').value = roundnum(x*0.0254*36);
	document.getElementById('lengthKM').value = roundnum(x*2.54e-5*36);
	document.getElementById('lengthIN').value = roundnum(x*36);
	document.getElementById('lengthFT').value = roundnum(x*3);
	document.getElementById('lengthYD').value = roundnum(x);
	document.getElementById('lengthMI').value = roundnum(x/1760);
}

function convertLength_mi(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('lengthMM').value = roundnum(x*254*6336);
	document.getElementById('lengthCM').value = roundnum(x*25.4*6336);
	document.getElementById('lengthM').value = roundnum(x*0.254*6336);
	document.getElementById('lengthKM').value = roundnum(x*2.54e-4*6336);
	document.getElementById('lengthIN').value = roundnum(x*63360);
	document.getElementById('lengthFT').value = roundnum(x*5280);
	document.getElementById('lengthYD').value = roundnum(x*1760);
	document.getElementById('lengthMI').value = roundnum(x);
}

// Area Converter
function convertArea_mm(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('areaMM').value = roundnum(x);
	document.getElementById('areaCM').value = roundnum(x/10/10);
	document.getElementById('areaM').value = roundnum(x/1000/1000);
	document.getElementById('areaKM').value = roundnum(x/1e6/1e6);
	document.getElementById('areaIN').value = roundnum(x/25.4/25.4);
	document.getElementById('areaFT').value = roundnum(x/25.4/12/25.4/12);
	document.getElementById('areaYD').value = roundnum(x/25.4/36/25.4/36);
	document.getElementById('areaMI').value = roundnum(x/1609344/1609344);
}

function convertArea_cm(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('areaMM').value = roundnum(x*10*10);
	document.getElementById('areaCM').value = roundnum(x);
	document.getElementById('areaM').value = roundnum(x/100/100);
	document.getElementById('areaKM').value = roundnum(x/1e5/1e5);
	document.getElementById('areaIN').value = roundnum(x/2.54/2.54);
	document.getElementById('areaFT').value = roundnum(x/2.54/12/2.54/12);
	document.getElementById('areaYD').value = roundnum(x/2.54/36/2.54/36);
	document.getElementById('areaMI').value = roundnum(x/160934.4/160934.4);
}

function convertArea_m(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('areaMM').value = roundnum(x*1000*1000);
	document.getElementById('areaCM').value = roundnum(x*100*100);
	document.getElementById('areaM').value = roundnum(x);
	document.getElementById('areaKM').value = roundnum(x/1000/1000);
	document.getElementById('areaIN').value = roundnum(x/0.0254/0.0254);
	document.getElementById('areaFT').value = roundnum(x/0.0254/12/0.0254/12);
	document.getElementById('areaYD').value = roundnum(x/0.0254/36/0.0254/36);
	document.getElementById('areaMI').value = roundnum(x/1609.344/1609.344);
}

function convertArea_km(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('areaMM').value = roundnum(x*1e6*1e6);
	document.getElementById('areaCM').value = roundnum(x*1e5*1e5);
	document.getElementById('areaM').value = roundnum(x*1000*1000);
	document.getElementById('areaKM').value = roundnum(x);
	document.getElementById('areaIN').value = roundnum(x/2.54e-5/2.54e-5);
	document.getElementById('areaFT').value = roundnum(x/2.54e-5/12/2.54e-5/12);
	document.getElementById('areaYD').value = roundnum(x/2.54e-5/36/2.54e-5/36);
	document.getElementById('areaMI').value = roundnum(x/1.609344/1.609344);
}

function convertArea_in(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('areaMM').value = roundnum(x*25.4*25.4);
	document.getElementById('areaCM').value = roundnum(x*2.54*2.54);
	document.getElementById('areaM').value = roundnum(x*0.0254*0.0254);
	document.getElementById('areaKM').value = roundnum(x*2.54e-5*2.54e-5);
	document.getElementById('areaIN').value = roundnum(x);
	document.getElementById('areaFT').value = roundnum(x/12/12);
	document.getElementById('areaYD').value = roundnum(x/36/36);
	document.getElementById('areaMI').value = roundnum(x/63360/63360);
}

function convertArea_ft(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('areaMM').value = roundnum(x*25.4*12*25.4*12);
	document.getElementById('areaCM').value = roundnum(x*2.54*12*2.54*12);
	document.getElementById('areaM').value = roundnum(x*0.0254*12*0.0254*12);
	document.getElementById('areaKM').value = roundnum(x*2.54e-5*12*2.54e-5*12);
	document.getElementById('areaIN').value = roundnum(x*12*12);
	document.getElementById('areaFT').value = roundnum(x);
	document.getElementById('areaYD').value = roundnum(x/3/3);
	document.getElementById('areaMI').value = roundnum(x/5280/5280);
}

function convertArea_yd(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('areaMM').value = roundnum(x*25.4*36*25.4*36);
	document.getElementById('areaCM').value = roundnum(x*2.54*36*2.54*36);
	document.getElementById('areaM').value = roundnum(x*0.0254*36*0.0254*36);
	document.getElementById('areaKM').value = roundnum(x*2.54e-5*36*2.54e-5*36);
	document.getElementById('areaIN').value = roundnum(x*36*36);
	document.getElementById('areaFT').value = roundnum(x*3*3);
	document.getElementById('areaYD').value = roundnum(x);
	document.getElementById('areaMI').value = roundnum(x/1760/1760);
}

function convertArea_mi(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('areaMM').value = roundnum(x*254*6336*254*6336);
	document.getElementById('areaCM').value = roundnum(x*25.4*6336*25.4*6336);
	document.getElementById('areaM').value = roundnum(x*0.254*6336*0.254*6336);
	document.getElementById('areaKM').value = roundnum(x*2.54e-4*6336*2.54e-4*6336);
	document.getElementById('areaIN').value = roundnum(x*63360*63360);
	document.getElementById('areaFT').value = roundnum(x*5280*5280);
	document.getElementById('areaYD').value = roundnum(x*1760*1760);
	document.getElementById('areaMI').value = roundnum(x);
}

// Volume Converter
function convertVolume_mm(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('volumeMM').value = roundnum(x);
	document.getElementById('volumeCM').value = roundnum(x/10/10/10);
	document.getElementById('volumeM').value = roundnum(x/1000/1000/1000);
	document.getElementById('volumeKM').value = roundnum(x/1e6/1e6/1e6);
	document.getElementById('volumeIN').value = roundnum(x/25.4/25.4/25.4);
	document.getElementById('volumeFT').value = roundnum(x/25.4/12/25.4/12/25.4/12);
	document.getElementById('volumeYD').value = roundnum(x/25.4/36/25.4/36/25.4/36);
	document.getElementById('volumeMI').value = roundnum(x/1609344/1609344/1609344);
}

function convertVolume_cm(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('volumeMM').value = roundnum(x*10*10*10);
	document.getElementById('volumeCM').value = roundnum(x);
	document.getElementById('volumeM').value = roundnum(x/100/100/100);
	document.getElementById('volumeKM').value = roundnum(x/1e5/1e5/1e5);
	document.getElementById('volumeIN').value = roundnum(x/2.54/2.54/2.54);
	document.getElementById('volumeFT').value = roundnum(x/2.54/12/2.54/12/2.54/12);
	document.getElementById('volumeYD').value = roundnum(x/2.54/36/2.54/36/2.54/36);
	document.getElementById('volumeMI').value = roundnum(x/160934.4/160934.4/160934.4);
}

function convertVolume_m(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('volumeMM').value = roundnum(x*1000*1000*1000);
	document.getElementById('volumeCM').value = roundnum(x*100*100*100);
	document.getElementById('volumeM').value = roundnum(x);
	document.getElementById('volumeKM').value = roundnum(x/1000/1000/1000);
	document.getElementById('volumeIN').value = roundnum(x/0.0254/0.0254/0.0254);
	document.getElementById('volumeFT').value = roundnum(x/0.0254/12/0.0254/12/0.0254/12);
	document.getElementById('volumeYD').value = roundnum(x/0.0254/36/0.0254/36/0.0254/36);
	document.getElementById('volumeMI').value = roundnum(x/1609.344/1609.344/1609.344);
}

function convertVolume_km(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('volumeMM').value = roundnum(x*1e6*1e6*1e6);
	document.getElementById('volumeCM').value = roundnum(x*1e5*1e5*1e5);
	document.getElementById('volumeM').value = roundnum(x*1000*1000*1000);
	document.getElementById('volumeKM').value = roundnum(x);
	document.getElementById('volumeIN').value = roundnum(x/2.54e-5/2.54e-5/2.54e-5);
	document.getElementById('volumeFT').value = roundnum(x/2.54e-5/12/2.54e-5/12/2.54e-5/12);
	document.getElementById('volumeYD').value = roundnum(x/2.54e-5/36/2.54e-5/36/2.54e-5/36);
	document.getElementById('volumeMI').value = roundnum(x/1.609344/1.609344/1.609344);
}

function convertVolume_in(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('volumeMM').value = roundnum(x*25.4*25.4*25.4);
	document.getElementById('volumeCM').value = roundnum(x*2.54*2.54*2.54);
	document.getElementById('volumeM').value = roundnum(x*0.0254*0.0254*0.0254);
	document.getElementById('volumeKM').value = roundnum(x*2.54e-5*2.54e-5*2.54e-5);
	document.getElementById('volumeIN').value = roundnum(x);
	document.getElementById('volumeFT').value = roundnum(x/12/12/12);
	document.getElementById('volumeYD').value = roundnum(x/36/36/36);
	document.getElementById('volumeMI').value = roundnum(x/63360/63360/63360);
}

function convertVolume_ft(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('volumeMM').value = roundnum(x*25.4*12*25.4*12*25.4*12);
	document.getElementById('volumeCM').value = roundnum(x*2.54*12*2.54*12*2.54*12);
	document.getElementById('volumeM').value = roundnum(x*0.0254*12*0.0254*12*0.0254*12);
	document.getElementById('volumeKM').value = roundnum(x*2.54e-5*12*2.54e-5*12*2.54e-5*12);
	document.getElementById('volumeIN').value = roundnum(x*12*12*12);
	document.getElementById('volumeFT').value = roundnum(x);
	document.getElementById('volumeYD').value = roundnum(x/3/3/3);
	document.getElementById('volumeMI').value = roundnum(x/5280/5280/5280);
}

function convertVolume_yd(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('volumeMM').value = roundnum(x*25.4*36*25.4*36*25.4*36);
	document.getElementById('volumeCM').value = roundnum(x*2.54*36*2.54*36*2.54*36);
	document.getElementById('volumeM').value = roundnum(x*0.0254*36*0.0254*36*0.0254*36);
	document.getElementById('volumeKM').value = roundnum(x*2.54e-5*36*2.54e-5*36*2.54e-5*36);
	document.getElementById('volumeIN').value = roundnum(x*36*36*36);
	document.getElementById('volumeFT').value = roundnum(x*3*3*3);
	document.getElementById('volumeYD').value = roundnum(x);
	document.getElementById('volumeMI').value = roundnum(x/1760/1760/1760);
}

function convertVolume_mi(inputId) {

	var x = inputId.value;
	x = parseFloat(x);

	document.getElementById('volumeMM').value = roundnum(x*254*6336*254*6336*254*6336);
	document.getElementById('volumeCM').value = roundnum(x*25.4*6336*25.4*6336*25.4*6336);
	document.getElementById('volumeM').value = roundnum(x*0.254*6336*0.254*6336*0.254*6336);
	document.getElementById('volumeKM').value = roundnum(x*2.54e-4*6336*2.54e-4*6336*2.54e-4*6336);
	document.getElementById('volumeIN').value = roundnum(x*63360*63360*63360);
	document.getElementById('volumeFT').value = roundnum(x*5280*5280*5280);
	document.getElementById('volumeYD').value = roundnum(x*1760*1760*1760);
	document.getElementById('volumeMI').value = roundnum(x);
}

function roundnum(num) {
	if (num > 1e-6 && num < 1e6) {
		return Math.round((num) * 1e6) / 1e6;
	}
	else if (num <= 1e-6) {
		return num.toExponential(0);
	}
	else if (num >= 1e6) {
		return num.toExponential(0);
	}
}

// Decinmal to Fraction
function decimal_to_fraction(a, b, c, d) {
	var decimal = document.getElementById(a).value;
	var len = decimal.toString().length - 2;

	var number = Math.floor(decimal);

	var denominator = Math.pow(10, len);
	var numerator = decimal * denominator;

	var divisor = gcd(numerator, denominator);

	numerator /= divisor;
	denominator /= divisor;

	document.getElementById(b).value = number;
	document.getElementById(c).value = Math.floor(numerator % denominator);
	document.getElementById(d).value = Math.floor(denominator);

}

function gcd(a, b) {
	if (b < 0.0000001) return a;
	return gcd(b, Math.floor(a % b));
}


// Decimal to Feet & Inches
function decimal_to_ftInch(a, b, c, d) {
	var length = document.getElementById(a).value;
	var unit = document.getElementById(b).value;

	length = parseFloat(length);
	var feet = "";
	var inch = "";

	switch(unit) {
		case "feet":
		feet = Math.floor(length);
		inch = (length % 1) * 12;

		break;
		case "inches":
		feet = Math.floor(length/12);
		inch = ((length/12) % 1) * 12;

		break;

	}

	document.getElementById(c).value = feet;
	document.getElementById(d).value = Math.round((inch + Number.EPSILON) * 100) / 100;
}

// Diagonales
function diagcalc(a, b, c, d, e, f, g) {
	var ratiol = document.getElementById(a).value;
	var ratioh = document.getElementById(b).value;
	var dimension = document.getElementById(c).value;
	var side = document.getElementById(d).value;

	switch(side) {
		case "larg":
		calcHauteur = dimension/(ratiol/ratioh);
		calcDiagonale = Math.sqrt(Math.pow(dimension,2)+Math.pow(calcHauteur,2));

		document.getElementById(e).value = dimension;
		document.getElementById(f).value = calcHauteur.toFixed(2);
		document.getElementById(g).value = calcDiagonale.toFixed(2);

		break;
		case "haut":
		calcLargeur = dimension*(ratiol/ratioh);
		calcDiagonale = Math.sqrt(Math.pow(calcLargeur,2)+Math.pow(dimension,2));

		document.getElementById(e).value = calcLargeur.toFixed(2);
		document.getElementById(f).value = dimension;
		document.getElementById(g).value = calcDiagonale.toFixed(2);

		break;
		case "diag":
		calcLargeur = dimension*Math.cos(Math.atan(ratioh/ratiol))
		calcHauteur = dimension*Math.sin(Math.atan(ratioh/ratiol))

		document.getElementById(e).value = calcLargeur.toFixed(2);
		document.getElementById(f).value = calcHauteur.toFixed(2);
		document.getElementById(g).value = dimension;
	}
}




/* Calculateurs AUDIO
----------------------------------------------------------------------------------
*/


// dBu conversion to dBv & Volts
function convertdBu(a, b, c, d) {
	var dBu = document.getElementById(a).value;
	//var dBv = document.getElementById(b).value;
	//var vRMS = document.getElementById(c).value;
	//var vPTP = document.getElementById(d).value;

	if (dBu.length == 0 || dBu == null)
		{return;}
	//dBv
	document.getElementById(b).value = Math.round(1000000000*20*(Math.log(0.774596669*Math.pow(10,dBu/20))/Math.log(10)))/1000000000;
	//Volts RMS
	document.getElementById(c).value = Math.round(1000000000*0.774596669*Math.pow(10,dBu/20))/1000000000;
	//Volts Peak to Peak
	document.getElementById(d).value = Math.round(2.828427125*1000000000*0.774596669*Math.pow(10,dBu/20))/1000000000;
}

// dBv conversion to dBu & Volts
function convertdBv(a, b, c, d) {
	//var dBu = document.getElementById(a).value;
	var dBv = document.getElementById(b).value;
	//var vRMS = document.getElementById(c).value;
	//var vPTP = document.getElementById(d).value;

	if (dBv.length == 0 || dBv == null)
		{return;}
	//dBu
	document.getElementById(a).value = Math.round(1000000000*20*(Math.log((Math.pow(10,dBv/20)/0.774596669))/Math.log(10)))/1000000000;
	//Volts RMS
	document.getElementById(c).value = Math.round(1000000000*Math.pow(10,dBv/20))/1000000000;
	//Volts Peak to Peak
	document.getElementById(d).value = Math.round(2.828427125*1000000000*Math.pow(10,dBv/20))/1000000000;
}

// Volts conversion to dBu & dBv
function ConvertVolts(a, b, c, d) {
	//var dBu = document.getElementById(a).value;
	//var dBv = document.getElementById(b).value;
	var vRMS = document.getElementById(c).value;
	//var vPTP = document.getElementById(d).value;

	if (vRMS.length == 0 || vRMS == null)
		{return;}
	//dBu
	document.getElementById(a).value = Math.round(1000000000*20*(Math.log((vRMS/0.774596669))/Math.log(10)))/1000000000;
	//dBv
	document.getElementById(b).value = Math.round(1000000000*20*(Math.log((vRMS/1))/Math.log(10)))/1000000000;
	//Volts Peak to Peak
	document.getElementById(d).value = vRMS*2*Math.sqrt(2);
}


// DB loss over distance Select Operation
function dBlossSwitch(select) {

	switch (select.value) {
		case "dist":
		document.getElementById("dBlossD2").readOnly = true;
		document.getElementById("dBlossD2").value = "";
		document.getElementById("dBlossL2").readOnly = false;
		document.getElementById("dBlossDiffLabel").innerHTML = "∆Distance";
		document.getElementById("dBlossDiffUnit").innerHTML = "";
		break;
		case "level":
		document.getElementById("dBlossD2").readOnly = false;
		document.getElementById("dBlossL2").readOnly = true;
		document.getElementById("dBlossL2").value = "";
		document.getElementById("dBlossDiffLabel").innerHTML = "∆dB";
		document.getElementById("dBlossDiffUnit").innerHTML = "dB";

	}
}

// DB loss over distance
function dBlossCalc(a, b, c, d, e, f) {
	var d1 = document.getElementById(a).value;
	var d2 = document.getElementById(b).value;
	var l1 = document.getElementById(c).value;
	var l2 = document.getElementById(d).value;
	var diff = document.getElementById(e).value;
	var select = document.getElementById(f).value;

	if (select == "level") {
		l2 = l1-20*(Math.log(d2/d1)/Math.log(10));
		diff = l1-l2;
		document.getElementById(d).value = l2;
		document.getElementById(e).value = diff;
	}
	else if (select == "dist") {
		d2 = d1*Math.pow(10,(l1-l2)/20);
		diff = d2-d1;
		document.getElementById(b).value = d2;
		document.getElementById(e).value = diff;
	}
}




/* Calculateurs TEXT
----------------------------------------------------------------------------------
*/


// Functions to convert text to Hex, Binary and Decimal.
// Selection du délimiteur
function OnDelSelChange(a, b) {
	var i = document.getElementById(a).selectedIndex;
	var c = "";
	if (i == 1) c = " ";
	if (i == 2) c = ",";
	document.getElementById(b).value = c;
	document.getElementById(b).readOnly = true;
	if (i == 3) {
		document.getElementById(b).focus();
		document.getElementById(b).readOnly = false;
	}
	ConvertASCII();
}

// Délimiteur Manuel
function OnDelInput(a) {
	document.getElementById(a).selectedIndex = 3;
	ConvertASCII();
}

// Update Data in Text Input
function UpdateData(x, src) {
	var txt = hex = dec = bin = '';
	var c, h, d, b;
	var del = document.getElementById('del').value;
	var prefix = document.querySelector('#prefix').checked;
	var hexprefix = "",
	binprefix = "";
	if (prefix) {
		hexprefix = "0x";
		binprefix = "0b";
	}
	for (var i = 0; i < x.length; i++) {
		h = x[i].toString(16);
		d = x[i].toString(10);
		b = x[i].toString(2);
		if (h.length == 1) h = '0' + h;
		if (b.length < 8) b = '0'.repeat(8 - b.length) + b;
		if (d < 256) txt += String.fromCharCode(x[i]);
		hex += hexprefix + h.toUpperCase();
		dec += d;
		bin += binprefix + b;
		if (i < x.length - 1) {
			hex += del;
			dec += del;
			bin += del;
		}
	}
	if (src != 1) document.getElementById('txt').value = txt;
	if (src != 2) document.getElementById('hex').value = hex;
	if (src != 3) document.getElementById('bin').value = bin;
	if (src != 4) document.getElementById('dec').value = dec;
	document.getElementById('len').value = x.length;
	UpdateChecksum();
}

// Convert ASCII Data
function ConvertASCII() {
	var x = [];
	var txt = document.getElementById('txt').value;
	if (txt.length == 0) return;
	for (i = 0; i < txt.length; i++) {
		x[i] = txt.charCodeAt(i);
	}
	UpdateData(x, 1);
}

// Convert Hexadecimal Data
function ConvertHex() {
	var x = [];
	var hex = document.getElementById('hex').value;
	if (hex.length == 0) return;
	hex = hex.toUpperCase();
	hex = hex.match(/[0-9A-Fa-f]{1,2}/g);
	for (i = 0; i < hex.length; i++) {
		x[i] = parseInt(hex[i], 16);
	}
	UpdateData(x, 2);
}

// Convert Binary Data
function ConvertBinary() {
	var x = [];
	var bin = document.getElementById('bin').value;
	if (bin.length == 0) return;
	bin = bin.match(/[0-1]{1,8}/g);
	if (!bin) return;
	for (i = 0; i < bin.length; i++) {
		x[i] = parseInt(bin[i], 2);
	}
	UpdateData(x, 3);
}

// Convert Decimal Data
function ConvertDecimal() {
	var x = [];
	var dec = document.getElementById('dec').value;
	if (dec.length == 0) return;
	dec = dec.match(/[0-9]{1,3}/g);
	if (!dec) return;
	for (i = 0; i < dec.length; i++) {
		x[i] = parseInt(dec[i], 10);
	}
	UpdateData(x, 4);
}

// Get Checksum Value
function UpdateChecksum() {
	var ibits = document.getElementById('csbits').selectedIndex;
	var itype = document.getElementById('cstype').selectedIndex;
	var x = [];
	var hex = document.getElementById('hex').value;
	if (hex.length == 0) return;
	hex = hex.toUpperCase();
	hex = hex.match(/[0-9|A-F]{2}/g);
	if (!hex) return;
	var sum = 0;
	var xor = 0;
	for (i = 0; i < hex.length; i++) {
		x[i] = parseInt(hex[i], 16);
		sum += x[i];
		xor ^= x[i];
	}
	if (itype == 2) sum = xor;
	var size = 0;
	var range = 0;
	if (ibits == 0) {
		range = 256;
		size = 2;
	}
	if (ibits == 1) {
		range = 65536;
		size = 4;
	}
	if (ibits == 2) {
		range = 4294967296;
		size = 8;
	}
	sum %= range;
	if (itype == 1) sum = range - sum;
	sum = sum.toString(16).toUpperCase();
	sum = "000000000" + sum;
	sum = sum.substr(sum.length - size);
	document.getElementById('sum').value = sum;
}
// End of Functions to convert text to Hex, Binary and Decimal.


// Convert case
function toUpperCase(str, result) {
	var txt = document.getElementById(str).value;
	var txtOut = txt.toUpperCase();
	document.getElementById(result).value = txtOut;
}

function toLowerCase(str, result) {
	var txt = document.getElementById(str).value;
	var txtOut = txt.toLowerCase();
	document.getElementById(result).value = txtOut;
}

function toSentenceCase(str, result) {
	var txt = document.getElementById(str).value;
	var n = txt.split(".");
	var txtOut = ""
	for(i = 0; i < n.length; i++)
	{
		var spaceput = ""
		var spaceCount = n[i].replace(/^(\s*).*$/,"$1").length;
		n[i] = n[i].replace(/^\s+/,"");
		var newstring = n[i].charAt(n[i]).toUpperCase() + n[i].slice(1);
		for(j = 0; j < spaceCount; j++)
			spaceput = spaceput+" ";
		txtOut = txtOut+spaceput+newstring+".";
	}
	txtOut = txtOut.substring(0, txtOut.length - 1);
	document.getElementById(result).value = txtOut;
}

function toTitleCase(str, result) {
	var txt = document.getElementById(str).value;
	var sentence = txt.toLowerCase().split(" ");
      for(var i = 0; i< sentence.length; i++){
         sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
      }
    var txtOut = sentence.join(" ");
	document.getElementById(result).value = txtOut;
}



/* Calculateurs CAMERA TOOLBOX
----------------------------------------------------------------------------------
*/


// Camera Sensor FOV
function fovCalc(a, b, c) {
	var focalLength = document.getElementById(a).value;
	var sensorDim = document.getElementById(b).value;

	var fov = (2*Math.atan(sensorDim/(2*focalLength))) * (180/Math.PI);

	document.getElementById(c).value = fov;
}


