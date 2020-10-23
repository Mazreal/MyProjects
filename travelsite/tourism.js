/*tourism.js*/


var myPictures = new Array ("img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg","img/6.jpg","img/7.jpg","img/8.jpg","img/9.jpg","img/10.jpg");
var myCaptions = new Array
  ("Spend a night in Whistler Village, BC",
  "Tour the opera house in Sydney, AU",
  "Experience the colesseum in Rome, ITL",
  "Bask in the light of Times Square at New York",
  "Observe towering Japanese Castles",
  "Ride camels across Morocco",
  "Familiarize yourself with Chinese culture",
  "Get lost in a herd of safari animals",
  "Hike mount fuji Japan",
  "Pantheon Rome, ITL");

//AUTOMATICALLY CHANGE IMAGES
var imgIndex = 0;
window.onload = carousel;

function carousel ()
{
  document.getElementById("myPics").className += "fadeOut";
  document.getElementById("figcap").className += "fadeOut";
  setTimeout(function (){
    document.getElementById("myPics").src = myPictures[imgIndex];
    document.getElementById("figcap").innerHTML = myCaptions[imgIndex];
    document.getElementById("figcap").className= "";
    document.getElementById("myPics").className= "";
  }, 1000);

  imgIndex++;
  if (imgIndex == myPictures.length)
  {
    imgIndex = 0;
  }
  setTimeout(carousel, 4000);
}
