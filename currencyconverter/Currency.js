/*Currency.js*/
function calculate()
{
  var currency = parseFloat(document.getElementById("currency").value);
  var result = document.getElementById("result");
  var hand = document.getElementById("hand").value;
  var converted = document.getElementById("converted").value;
  switch (hand)
  {
    case "USD":
      if (converted == "USD"){
        result.value = currency.toFixed(2) + " USD (1:1)";
      }
      else if (converted == "EUR") {
        result.value = (currency*0.88).toFixed(2) + " EUR (1:0.88)";
      }
      else if (converted == "UK") {
        result.value = (currency*0.75).toFixed(2) + " UK (1:0.75)";
      }
      else if (converted == "YEN"){
        result.value = (currency*110.61).toFixed(2) + " YEN (1:110.61)";
      }
      else if (converted == "CAD"){
        result.value = (currency*1.32).toFixed(2) + " CAD (1:1.32)";
      }
    break;

    case "EUR":
      if (converted == "USD") {
        result.value = (currency*1.14).toFixed(2) + " USD (1:1.14)";
      }
      else if (converted == "EUR") {
        result.value = (currency*1).toFixed(2) + " EUR (1:1)";
      }
      else if (converted == "UK") {
        result.value = (currency*0.86).toFixed(2) + " UK (1:0.86)";
      }
      else if (converted == "YEN") {
        result.value = (currency*125.88).toFixed(2) + " YEN (1:125.88)";
      }
      else if (converted == "CAD") {
        result.value = (currency*1.50).toFixed(2) + " CAD (1:1.50)";
      }
    break;

    case "UK":
      if (converted == "USD") {
        result.value = (currency*1.33).toFixed(2) + " USD (1:1.33)";
      }
      else if (converted == "EUR") {
        result.value = (currency*1.16).toFixed(2) + " EUR (1:1.16)";
      }
      else if (converted == "UK") {
        result.value = (currency*1).toFixed(2) + " UK (1:1)";
      }
      else if (converted == "YEN") {
        result.value = (currency*146.62).toFixed(2) + " YEN (1:146.62)";
      }
      else if (converted == "CAD") {
        result.value = (currency*1.75).toFixed(2) + " CAD (1:1.75)";
      }
    break;

    case "YEN":
      if (converted == "USD") {
        result.value = (currency*0.009).toFixed(2) + " USD (1:0.009)";
      }
      else if (converted == "EUR"){
        result.value = (currency*0.0079).toFixed(2) + " EUR (1:0.0079)";
      }
      else if (converted == "UK"){
        result.value = (currency*0.0068).toFixed(2) + " UK (1:0.0068)";
      }
      else if (converted == "YEN"){
        result.value = (currency*1).toFixed(2) + " YEN (1:1)";
      }
      else if (converted == "CAD"){
        result.value = (currency*0.012).toFixed(2) + " CAD (1:0.012)";
      }
    break;

    case "CAD":
      if (converted == "USD") {
        result.value = (currency*0.76).toFixed(2) + " USD (1:0.76)";
      }
      else if (converted == "EUR"){
        result.value = (currency*0.67).toFixed(2) + " EUR (1:0.67)";
      }
      else if (converted == "UK"){
        result.value = (currency*0.57).toFixed(2) + " UK (1:0.57)";
      }
      else if (converted == "YEN"){
        result.value = (currency*83.84).toFixed(2) + " YEN (1:83.84)";
      }
      else if (converted == "CAD"){
        result.value = (currency*1).toFixed(2) + " CAD (1:1)";
      }
    break;
  }
}
