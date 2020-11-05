// Write your JavaScript code here!

window.addEventListener("load", function () {
    let form = document.querySelector("form");
    let pilotName = document.querySelector("input[name=pilotName]");
    let copilotName = document.querySelector("input[name=copilotName]");
    let fuelLevel = document.querySelector("input[name=fuelLevel]");
    let cargoMass = document.querySelector("input[name=cargoMass]");
    let launchStatus = document.getElementById('launchStatus');
    let faultyItems = document.getElementById('faultyItems');
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    
    form.addEventListener("submit", function(event) {
        
       
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

        function fuelStatusCheck(fuelLevel) {
            if (fuelLevel.value < 10000) {
                fuelStatus.innerHTML = `Insufficient fuel level for launch.`;
                return false;
            } else {
                fuelStatus.innerHTML = `Fuel level is high enough for launch.`;
                return true;
            }
        };
    
        function cargoMassCheck(cargoMass) {
            if (cargoMass.value > 10000) {
                cargoStatus.innerHTML = `Cargo mass is too high for launch`;
                return false;
            } else {
                cargoStatus.innerHTML = `Cargo mass is low enough for launch.`;
                return true;
            }
        };
    
        function funcLaunchStatusCheck(fuelStatusCheck, cargoMassCheck) {
            //these need to be template literals to include the pilot and copilot names, but it isn't working!
            pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;  
            copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;
            
            if (fuelStatusCheck === false || cargoMassCheck === false) {
                launchStatus.innerHTML = `Shuttle not ready for launch`;
                launchStatus.style.color = "red";
                faultyItems.style.visibility = 'visible';
                return false;
            } else {
                launchStatus.innerHTML = `Shuttle is ready for launch`;
                launchStatus.style.color = "green";
                return true;
            };
        };
        

        //Why do I have to hit the submit button twice for it to work?!

        // fuelStatusCheck(fuelLevel);
        // cargoMassCheck(cargoMass);
        funcLaunchStatusCheck(fuelStatusCheck(fuelLevel), cargoMassCheck(cargoMass));
    });

});






// JSON data: https://handlers.education.launchcode.org/static/planets.json

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
