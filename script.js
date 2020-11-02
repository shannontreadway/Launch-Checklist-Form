// Write your JavaScript code here!

window.addEventListener("load", function () {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
       let pilotName = document.querySelector("input[name=pilotName]");
       let copilotName = document.querySelector("input[name=copilotName]");
       let fuelLevel = document.querySelector("input[name=fuelLevel]");
       let cargoMass = document.querySelector("input[name=cargoMass]");
       
       //Validations.  If they fail any of the validations, prevent the form from submitting.
       //Validate (1) no blank answers, (2) Fuel Level and Cargo Mass are numbers, (3) Pilot Name and Co-pilot Name are strings
       if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === ""){
           alert("All fields are required");
           event.preventDefault();
       } else if (isNaN(cargoMass.value) || isNaN(fuelLevel.value)){
           alert("Fuel Level and Cargo Mass must be a number");
           event.preventDefault();
       } else if (!isNaN(pilotName.value) || !isNaN(copilotName.value)){
           alert("Please submit the name of the pilot and copilot.");
           event.preventDefault();
       } 
   });
});





/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
