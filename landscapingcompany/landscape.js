/*landscape.js*/

//global variables
var customerdata=[];
var plantMessage;
function storedata()
{
  //get data from form
  customerdata[0] = document.getElementById("name").value;
  customerdata[1] = document.getElementById("address").value;
  customerdata[2] = document.getElementById("postal").value;
  customerdata[3] = document.getElementById("phone").value;
  customerdata[4] = document.getElementById("email").value;
  unlockDimensions();
}

function unlockDimensions()
{
  document.getElementById("square").disabled=false;
  document.getElementById("cylinder").disabled=false;
  document.getElementById("sphere").disabled=false;
  document.getElementById("cone").disabled=false;
}

function displaySquare()
{
  document.getElementById("dimensions").style.visibility ="visible";
  document.getElementById("squareDim").style.visibility = "visible";
  document.getElementById("cylinderDim").style.visibility = "hidden";
  document.getElementById("sphereDim").style.visibility ="hidden";
  document.getElementById("coneDim").style.visibility = "hidden";
}
function displayCylinder()
{
  document.getElementById("dimensions").style.visibility ="visible";
  document.getElementById("squareDim").style.visibility = "hidden";
  document.getElementById("cylinderDim").style.visibility = "visible";
  document.getElementById("sphereDim").style.visibility ="hidden";
  document.getElementById("coneDim").style.visibility = "hidden";
}
function displaySphere()
{
  document.getElementById("dimensions").style.visibility ="visible";
  document.getElementById("squareDim").style.visibility = "hidden";
  document.getElementById("cylinderDim").style.visibility = "hidden";
  document.getElementById("sphereDim").style.visibility ="visible";
  document.getElementById("coneDim").style.visibility = "hidden";
}
function displayCone()
{
  document.getElementById("dimensions").style.visibility ="visible";
  document.getElementById("squareDim").style.visibility = "hidden";
  document.getElementById("cylinderDim").style.visibility = "hidden";
  document.getElementById("sphereDim").style.visibility ="hidden";
  document.getElementById("coneDim").style.visibility = "visible";
}
function rResults()
{
  var length = parseFloat(document.getElementById("rLength").value);
  var width = parseFloat(document.getElementById("rWidth").value);
  var height = parseFloat(document.getElementById("rHeight").value);
  var volume = (length*width*height);
  var cost = (0.10*volume);
  plantMessage = ("Square/Rectangle Cube" + "<br>");
  plantMessage += ("length: " + length + " cm"+ "<br>");
  plantMessage += ("width: " + width + " cm"+ "<br>");
  plantMessage += ("height: " + height + " cm"+ "<br>");
  plantMessage += ("Volume: " + volume.toFixed(2) + " cm3"+ "<br>");
  plantMessage += ("Total Cost: $" + cost.toFixed(2) + "<br>");
  printReport();
}

function cResults ()
{
  var radius = parseFloat(document.getElementById("cRadius").value);
  var height = parseFloat(document.getElementById("cHeight").value);
  var volume = Math.PI*radius*radius*height;
  var cost = volume*0.12;
  plantMessage = ("Flat Bottom Cylinder" + "<br>");
  plantMessage += ("radius: " + radius + " cm"+ "<br>");
  plantMessage += ("height: " + height + " cm"+ "<br>");
  plantMessage += ("Volume: " + volume.toFixed(2) + " cm3"+ "<br>");
  plantMessage += ("Total Cost: $" + cost.toFixed(2) + "<br>");
  printReport();
}

function sResults ()
{
  var radius = parseFloat(document.getElementById("sRadius").value);
  var volume = (Math.PI*radius*radius*radius*(4/3))/2;
  var cost = volume*0.15;
  plantMessage = ("Half-Sphere" + "<br>");
  plantMessage += ("radius: " + radius + " cm"+ "<br>");
  plantMessage += ("Volume: " + volume.toFixed(2) + " cm3"+ "<br>");
  plantMessage += ("Total Cost: $" + cost.toFixed(2) + "<br>");
  printReport();
}
function coResults ()
{
  var height = parseFloat(document.getElementById("coHeight").value);
  var lradius = parseFloat(document.getElementById("coRadius1").value);
  var sradius = parseFloat(document.getElementById("coRadius2").value);
  var volume = ((lradius*lradius)+(lradius*sradius)+(sradius*sradius))*height*Math.PI*(1/3);
  var cost = volume*0.20;
  plantMessage = ("Truncated Cone" + "<br>");
  plantMessage += ("height: " + height + " cm"+ "<br>");
  plantMessage += ("large radius: " + lradius + " cm"+ "<br>");
  plantMessage += ("small radius: " + sradius + " cm"+ "<br>");
  plantMessage += ("Volume: " + volume.toFixed(2) + " cm3"+ "<br>");
  plantMessage += ("Total Cost: $" + cost.toFixed(2) + "<br>");
  printReport();
}

function printReport()
{
  var infoMessage;
  infoMessage = customerdata[0] + "<br>";
  infoMessage += customerdata[1]+ "<br>";
  infoMessage += customerdata[2]+ "<br>";
  infoMessage += "<br>";
  infoMessage += plantMessage;
  document.getElementById("report").innerHTML = infoMessage;
}
