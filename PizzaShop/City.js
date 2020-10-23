//lab5.js
window.onload=initfunction;
var OrderInfo = [];
var orderTotal = 0;
function initfunction()
{
  var toDay = new Date();
  document.getElementById("dtfield").innerHTML = toDay;
}

function calculateResults(totals)
{
  orderTotal += totals;
  document.getElementById("tDisplay").innerHTML = "$" + orderTotal.toFixed(2);
}
var pizzaObject = [];
var sandwichObject = [];
var drinkObject = [];

function displayList(type)
{
  var display = "";
  if (type == "pizza")
  {
    for (var i = 0; i < pizzaObject.length; i++)
    {
      display += "<input type=radio value=" + i + " name=pizzaLists ";
      display += "onchange=editPizza(this.value)>";
      display += pizzaObject[i];
      display += "<br>";
    }
    document.getElementById("pDisplay").innerHTML = display;
  }
  if (type == "sandwich")
  {
    for(var i = 0; i < sandwichObject.length; i++)
    {
      display += "<input type=radio value=" + i + " name=sandwichList ";
      display += "onchange=editSandwich(this.value)>";
      display += sandwichObject[i];
      display += "<br>";
    }
    document.getElementById("sDisplay").innerHTML = display;
  }
  if (type == "drink")
  {
    for (var i = 0; i < drinkObject.length; i++)
    {
      display += "<input type=radio value=" + i + " name=drinkLists ";
      display += "onchange=editDrink(this.value)>";
      display += drinkObject[i];
      display += "<br>";
    }
    document.getElementById("dDisplay").innerHTML = display;
  }
}

function addClient()
{
  var radio = "";
  var clientDisplay= "";
  var clientInfo = {firstname, lastname, address, phone};
  clientInfo.firstname = document.getElementById("firstname").value;
  clientInfo.lastname = document.getElementById("lastname").value;
  clientInfo.address = document.getElementById("address").value;
  clientInfo.phone = document.getElementById("phone").value;
  clientDisplay += clientInfo.firstname+ " ";
  clientDisplay += clientInfo.lastname + "<br>";
  clientDisplay += clientInfo.address + "<br>";
  clientDisplay += clientInfo.phone + "<br>";
  clientDisplay + "<br>";
  document.getElementById("inform").innerHTML = clientDisplay;
}

// PIZZA-----------------
var p = 0;
function addPizza (q)
{
  if (q == 1)
  {
    document.getElementById("addpizza").disabled = false;
    document.getElementById("savePizza").disabled = true;
    document.getElementById("deletePizza").disabled = true;
    pizzaObject.splice(p,1);
  }
  var valid1 = false;
  var valid2 = false;
  var radio1 = document.getElementsByName("pizzaChoice");
  var radio2 = document.getElementsByName("pSize");
  if((document.getElementById("pQuantity").value == "") ||
  (document.getElementById("pQuantity").value == 0))
  {
    alert("*Please include all necessary choices.");
    return false;
  }
  var x = 0;
  while (valid1 == false && x < radio1.length)
  {

    if (radio1[x].checked)
    {
      valid1 = true;
    }
    x++;
  }
  x = 0;
  while (valid2 == false && x < radio2.length)
  {

    if (radio2[x].checked)
    {
      valid2 = true;
    }
    x++;
  }
  if (valid1 == false || valid2 == false)
  {
    alert("*Please include all necessary choices.1");
    return false;
  }

  var pizzaInfo = [];
  var pizzaTotal = parseFloat(0);
  pizzaInfo.push(document.getElementById("pQuantity").value);
  pizzaInfo.push(document.querySelector("input[name=pSize]:checked").id);
  pizzaInfo.push(document.querySelector("input[name=pizzaChoice]:checked").id);

  pizzaTotal = parseFloat(document.querySelector("input[name=pSize]:checked").value);

  if (document.querySelector('input[name="pTopping1"]:checked'))
  {
    pizzaTotal += 1.75;
    pizzaInfo.push("Extra Cheese");
  }
  if (document.querySelector('input[name="pTopping2"]:checked'))
  {
    pizzaTotal += 1.75;
    pizzaInfo.push("Pepperoni");
  }
  if (document.querySelector('input[name="pTopping3"]:checked'))
  {
    pizzaTotal += 1.75;
    pizzaInfo.push("Mushrooms");
  }
  if (document.querySelector('input[name="pTopping4"]:checked'))
  {
    pizzaTotal += 1.75;
    pizzaInfo.push("Bacon");
  }
  if (document.querySelector('input[name="pTopping5"]:checked'))
  {
    pizzaTotal += 1.75;
    pizzaInfo.push("Olives");
  }
  pizzaTotal = pizzaTotal * parseFloat(document.getElementById("pQuantity").value);
  pizzaInfo.push(" $"+pizzaTotal.toFixed(2));
  calculateResults(pizzaTotal);
  pizzaObject.push(pizzaInfo);
  displayList("pizza");
}

function editPizza(i)
{
  if(document.getElementById("saveDrink").disabled == false ||  document.getElementById("savePizza").disabled == false || document.getElementById("saveSandwich").disabled == false)
  {
    alert("Please save your previous choice before editing another item!");
    return false;
  }
  var data;
  var pizza = [];
  pizza = pizzaObject[i];
  document.getElementById("addpizza").disabled = true;
  document.getElementById("savePizza").disabled = false;
  document.getElementById("deletePizza").disabled = false;

  document.getElementById("pQuantity").value = pizza[0];
  data = pizza[1];
  switch (data)
  {
    case "Small":
      document.getElementById("Small").checked = true;
      break;
    case "Medium":
      document.getElementById("Medium").checked = true;
      break;
    case "Large":
      document.getElementById("Large").checked = true;
      break;
    case "Extra Large":
      document.getElementById("Extra Large").cheeckd = true;
      break;
  }
  data = pizza[2];
  switch(data)
  {
    case "Super Cheesy":
      document.getElementById("Super Cheesy").checked = true;
      break;
    case "Extra Meaty":
      document.getElementById("Extra Meaty").checked = true;
      break;
    case "Really Veggy":
      document.getElementById("Really Veggy").checked = true;
      break;
  }
  var ptotal;
  var last = pizza.length - 1;
  ptotal = pizza[last];
  ptotal = parseFloat(ptotal.substring(3, (ptotal.length)));
  calculateResults(-ptotal);
  p = i;
}

function deletePizza ()
{
  pizzaObject.splice(p,1);
  displayList("pizza");
  document.getElementById("addpizza").disabled = false;
  document.getElementById("savePizza").disabled = true;
  document.getElementById("deletePizza").disabled = true;
}

//SANDWICH ------------------
var s = 0;
function addSandwich (q)
{
  if (q == 1)
  {
    document.getElementById("addSandwich").disabled = false;
    document.getElementById("saveSandwich").disabled = true;
    document.getElementById("deleteSandwich").disabled = true;
    sandwichObject.splice(s,1);
  }
  var valid1 = false;
  var radio1 = document.getElementsByName("sChoice");
  var x = 0;
  while (valid1 == false && x < radio1.length)
  {
    if (radio1[x].checked)
    {
      valid1 = true;
    }
    x++;
  }
  if((document.getElementById("sQuantity").value == "") ||
  (document.getElementById("sQuantity").value == 0) ||
  valid1 == false)
  {
    alert("*Please include all necessary choices.");
    return false;
  }
  var sandwichInfo = [];
  var sandwichTotal = parseFloat(0);
  sandwichInfo.push(document.getElementById("sQuantity").value);
  sandwichInfo.push(document.querySelector("input[name=sChoice]:checked").id);
  sandwichTotal = parseFloat(document.getElementById("sQuantity").value) * parseFloat(document.querySelector("input[name=sChoice]:checked").value);
  sandwichInfo.push(", $" + sandwichTotal.toFixed(2));
  calculateResults(sandwichTotal);
  sandwichObject.push(sandwichInfo);
  displayList("sandwich");
}

function editSandwich (i)
{
  if(document.getElementById("saveDrink").disabled == false ||  document.getElementById("savePizza").disabled == false || document.getElementById("saveSandwich").disabled == false)
  {
    alert("Please save your previous choice before editing another item!");
    return false;
  }
  var data;
  var sandwich = [];
  sandwich = sandwichObject[i];
  document.getElementById("addSandwich").disabled = true;
  document.getElementById("saveSandwich").disabled = false;
  document.getElementById("deleteSandwich").disabled = false;

  document.getElementById("sQuantity").value = sandwich[0];
  data = sandwich[1];
  switch(data)
  {
    case "All Garden Vegetarian":
      document.getElementById("All Garden Vegetarian").checked = true;
      break;
    case "Big Beef on a Bun":
      document.getElementById("Big Beef on a Bun").checked = true;
      break;
    case "Mixed Grill":
      document.getElementById("Mixed Grill").checked = true;
      break;
    case "Grilled Pork":
      document.getElementById("Grilled Pork").checked = true;
      break;
  }
  var sTotal;
  var last = sandwich.length - 1;
  sTotal = sandwich[last];
  sTotal = parseFloat(sTotal.substring(3,(sTotal.length)));
  calculateResults(-sTotal);
  s = i;
}

function deleteSandwich ()
{
  sandwichObject.splice(s,1);
  displayList("sandwich");
  document.getElementById("addSandwich").disabled = false;
  document.getElementById("saveSandwich").disabled = true;
  document.getElementById("deleteSandwich").disabled = true;
}

//Drinks----------------------------------------
var d = 0;
function addDrink (q)
{
  if (q == 1)
  {
    document.getElementById("addDrink").disabled = false;
    document.getElementById("saveDrink").disabled = true;
    document.getElementById("deleteDrink").disabled = true;
    drinkObject.splice(d,1);
  }

  var valid1 = false;
  var valid2 = false;
  var radio1 = document.getElementsByName("dChoice");
  var radio2 = document.getElementsByName("dSize");
  if((document.getElementById("dQuantity").value == "") ||
  (document.getElementById("dQuantity").value == 0))
  {
    alert("*Please include all necessary choices.");
    return false;
  }
  var x = 0;
  while (valid1 == false && x < radio1.length)
  {

    if (radio1[x].checked)
    {
      valid1 = true;
    }
    x++;
  }
  x = 0;
  while (valid2 == false && x < radio2.length)
  {

    if (radio2[x].checked)
    {
      valid2 = true;
    }
    x++;
  }
  if (valid1 == false || valid2 == false)
  {
    alert("*Please include all necessary choices.1");
    return false;
  }
  var drinkInfo = [];
  var drinkTotal = parseFloat(0);
  drinkInfo.push(document.getElementById("dQuantity").value);
  drinkInfo.push(document.querySelector("input[name=dSize]:checked").id);
  drinkInfo.push(document.querySelector("input[name=dChoice]:checked").value);
  drinkTotal = parseFloat(document.getElementById("dQuantity").value) * parseFloat(document.querySelector("input[name=dSize]:checked").value);

  drinkInfo.push(", $" +drinkTotal.toFixed(2));
  calculateResults(drinkTotal);
  drinkObject.push(drinkInfo);
  displayList("drink");
}

function editDrink (i)
{
  if(document.getElementById("saveDrink").disabled == false ||  document.getElementById("savePizza").disabled == false || document.getElementById("saveSandwich").disabled == false)
  {
    alert("Please save your previous choice before editing another item!");
    return false;
  }
  var data;
  var drink = [];
  drink = drinkObject[i];
  document.getElementById("addDrink").disabled = true;
  document.getElementById("saveDrink").disabled = false;
  document.getElementById("deleteDrink").disabled = false;

  document.getElementById("dQuantity").value = drink[0];
  data = drink[1];
  switch (data)
  {
    case "Small":
      document.getElementById("Small").checked = true;
      break;
    case "Medium":
      document.getElementById("Medium").checked = true;
      break;
    case "Large":
      document.getElementById("Large").checked = true;
      beak;
  }
  data = drink[2];

  switch(data)
  {
    case "Cola":
      document.getElementById("Cola").checked = true;
      break;
    case "Orange":
      document.getElementById("Orange").checked = true;
      break;
    case "Lemon":
      document.getElementById("Lemon").checked = true;
      break;
    case "Root Beer":
      document.getElementById("Root Beer").checked = true;
      break;
  }
  var dTotal;
  var last = drink.length - 1;
  dTotal = drink[last];
  dTotal = parseFloat(dTotal.substring(3,(dTotal.length)));
  calculateResults(-dTotal);
  d = i;
}

function deleteDrink ()
{
  drinkObject.splice(d,1);
  displayList("drink");
  document.getElementById("addDrink").disabled = false;
  document.getElementById("saveDrink").disabled = true;
  document.getElementById("deleteDrink").disabled = true;
}

function placeOrder ()
{
  alert("Order has been place!");
}
