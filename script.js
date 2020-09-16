// gets the height of the page, to be used to set iframe height
function getDocHeight(doc)
{
	doc = doc || document;
	var body = doc.body, html = doc.documentElement;
	var height = Math.max(
		body.scrollHeight,
		body.offsetHeight, 
		html.clientHeight,
		html.scrollHeight,
		html.offsetHeight
	);
	return height;
}
// sets iframe height to fit its contents
function setIframeHeight(id)
{
	var ifrm = document.getElementById(id);
	var doc = ifrm.contentDocument? ifrm.contentDocument:
	ifrm.contentWindow.document;
	ifrm.style.visibility = 'hidden';
	ifrm.style.height = "10px";
	ifrm.style.height = getDocHeight( doc ) + 4 + "px";
	ifrm.style.visibility = 'visible';
}
// sidebar function to change odds in external image
function setOddsCurrent()
{
	var imgs = document.getElementsByTagName("img");
	for (var i = 0; i < imgs.length; i++)
	{
		if (imgs[i].src.substring(imgs[i].src.length-6, imgs[i].src.length) == "_o.png")
		{
			imgs[i].src = imgs[i].src.substring(0, imgs[i].src.length-6) + ".png";
		}
		else if (imgs[i].src.substring(imgs[i].src.length-8, imgs[i].src.length) == "_o_d.png")
		{
			imgs[i].src = imgs[i].src.substring(0, imgs[i].src.length-8) + "_d.png";
		}
	}
}
// sidebar function to change odds in external image
function setOddsOpening()
{
	var imgs = document.getElementsByTagName("img");
	for (var i = 0; i < imgs.length; i++)
	{
		if (imgs[i].src.substring(imgs[i].src.length-6, imgs[i].src.length) == "_o.png")
		{
			// do nothing
		}
		else if (imgs[i].src.substring(imgs[i].src.length-8, imgs[i].src.length) == "_o_d.png")
		{
			// do nothing
		}
		else if (imgs[i].src.substring(imgs[i].src.length-6, imgs[i].src.length) == "_d.png")
		{
			imgs[i].src = imgs[i].src.substring(0, imgs[i].src.length-6) + "_o_d.png";
		}
		else
		{
			imgs[i].src = imgs[i].src.substring(0, imgs[i].src.length-4) + "_o.png";
		}
	}
}
// sidebar function to change odds in external image
function setOddsMoneyline()
{
	var imgs = document.getElementsByTagName("img");
	for (var i = 0; i < imgs.length; i++)
	{
		if (imgs[i].src.substring(imgs[i].src.length-6, imgs[i].src.length) == "_d.png")
		{
			imgs[i].src = imgs[i].src.substring(0, imgs[i].src.length-6) + ".png";
		}
	}
}
// sidebar function to change odds in external image
function setOddsDecimal()
{
	var imgs = document.getElementsByTagName("img");
	for (var i = 0; i < imgs.length; i++)
	{
		if (imgs[i].src.substring(imgs[i].src.length-6, imgs[i].src.length) != "_d.png")
		{
			imgs[i].src = imgs[i].src.substring(0, imgs[i].src.length-4) + "_d.png";
		}
	}
}
// odds converter function that clears text field of invalid text if user clicks it
function clearInvalid(fieldID)
{
	if (document.getElementById(fieldID).value == "(invalid)")
	{
		document.getElementById(fieldID).value = "";
	}
}
// odds converter function that clears all text fields
function clearFields()
{
	document.getElementById("percentage").value = "";
	document.getElementById("decimal").value = "";
	document.getElementById("fractional").value = "";
	document.getElementById("moneyline").value = "";
}
// odds converter function that converts all odds to match the implied percentage entered
function convertPerc()
{
	var convert;
	var value = document.getElementById("percentage").value;
	value = value.replace(/%/g, "");
	if (value == "")
	{
		document.getElementById("percentage").value = "";
		document.getElementById("percentage").focus();
	}
	else
	{
		value = parseFloat(value);
		if ( isNaN(value) )
		{
			document.getElementById("percentage").value = "(invalid)";
		}
		else
		{
			convert = true;
		}
		if (value == 0)
		{
			value = 0.01;
		}
		else if (value >= 100)
		{
			value = 99.99;
		}
	}
	if (convert)
	{
		document.getElementById("percentage").value = value.toFixed(2) + "%";
		document.getElementById("decimal").value = (100/value).toFixed(2);
		if ( Math.round(10000/value-100) == 100)
		{
			document.getElementById("fractional").value = "EVENS";
		}
		else
		{
			document.getElementById("fractional").value = Math.round(10000/value-100) + "/100";
		}
		if ( Math.round(10000/value-100) > 100)
		{
			document.getElementById("moneyline").value = "+" + Math.round(10000/value-100);
		}
		else
		{
			document.getElementById("moneyline").value = -Math.round( 100*value/(100-value) );
		}
	}
}
// odds converter function that converts all odds to match the decimal odds entered
function convertDec()
{
	var convert;
	var value = document.getElementById("decimal").value;
	if (value == "")
	{
		document.getElementById("decimal").value = "";
		document.getElementById("decimal").focus();
	}
	else
	{
		value = parseFloat(value);
		if ( isNaN(value) )
		{
			document.getElementById("decimal").value = "(invalid)";
		}
		else
		{
			convert = true;
		}
		if (value <= 1)
		{
			value = 1.01;
		}
	}
	if (convert)
	{
		document.getElementById("percentage").value = (100/value).toFixed(2) + "%";
		document.getElementById("decimal").value = value.toFixed(2);
		if ( Math.round( 100*(value-1) ) == 100)
		{
			document.getElementById("fractional").value = "EVENS";
		}
		else
		{
			document.getElementById("fractional").value = Math.round( 100*(value-1) ) + "/100";
		}
		if ( Math.round( 100*(value-1) ) > 100)
		{
			document.getElementById("moneyline").value = "+" + Math.round( 100*(value-1) );
		}
		else
		{
			document.getElementById("moneyline").value = -Math.round( 100/(value-1) );
		}
	}
}
// odds converter function that converts all odds to match the fractional odds entered
function convertFrac()
{
	var convert;
	var value = document.getElementById("fractional").value;
	if (value == "evens" | value == "EVENS")
	{
		value = 1;
	}
	else if (value == "")
	{
		document.getElementById("fractional").value = "";
		document.getElementById("fractional").focus();
	}
	else
	{
		var slash = value.indexOf("/");
		if (slash == -1)
		{
			value = parseFloat(value);
		}
		else
		{
			var numerator = parseInt( value.substr(0, slash) );
			var denominator = parseInt( value.substr(slash+1, value.length) );
			value = parseFloat(numerator/denominator);
		}
		if ( isNaN(value) )
		{
			document.getElementById("fractional").value = "(invalid)";
		}
		else
		{
			convert = true;
		}
		if (value <= 0)
		{
			value = 0.01;
		}
	}
	if (convert)
	{
		document.getElementById("percentage").value = ( 100/(value+1) ).toFixed(2) + "%";
		document.getElementById("decimal").value = (value+1).toFixed(2);
		if ( Math.round(100*value) == 100)
		{
			document.getElementById("fractional").value = "EVENS";
		}
		else
		{
			document.getElementById("fractional").value = Math.round(100*value) + "/100";
		}
		if ( Math.round(100*value) > 100)
		{
			document.getElementById("moneyline").value = "+" + Math.round(100*value);
		}
		else
		{
			document.getElementById("moneyline").value = -Math.round(100/value);
		}
	}
}
// odds converter function that converts all odds to match the moneyline odds entered
function convertMnln()
{
	var convert;
	var value = document.getElementById("moneyline").value;
	value = value.replace("+", "");
	if (value == "")
	{
		document.getElementById("moneyline").value = "";
		document.getElementById("moneyline").focus();
	}
	else
	{
		value = parseInt(value);
		if ( isNaN(value) )
		{
			document.getElementById("moneyline").value = "(invalid)";
		}
		else
		{
			convert = true;
		}
		if (value <= 100)
		{
			if (value > -100)
			{
				value = -100;
			}
		}
	}
	if (convert)
	{
		if (value > 100)
		{
			document.getElementById("percentage").value = ( 10000/(value+100) ).toFixed(2) + "%";
			document.getElementById("decimal").value = (value/100+1).toFixed(2);
			document.getElementById("fractional").value = value + "/100";
			document.getElementById("moneyline").value = "+" + value;
		}
		else
		{
			document.getElementById("percentage").value = ( 100*value/(value-100) ).toFixed(2) + "%";
			document.getElementById("decimal").value = (-100/value+1).toFixed(2);
			document.getElementById("fractional").value = -Math.round(10000/value) + "/100";
			document.getElementById("moneyline").value = value;
		}
		if (value == -100)
		{
			document.getElementById("fractional").value = "EVENS";
		}
	}
}