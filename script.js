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
    let missionTarget = document.getElementById('missionTarget');

    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        response.json().then(function(json) {

            // Bonus Mission - select a random destination.  I chose the method using a combination of selecting a random number, multiplying it by the array length, and then taking the floor value.
            let index = Math.floor(Math.random()*json.length);

            // Insert 'index' in as the index number to make the selection random.  If I were to not use the random selection, I would choose index 0 - Tatooine.
            missionTarget.innerHTML = 
            `<h2>Mission Destination</h2>
            <ol>
                <li>Name: ${json[index].name}</li>
                <li>Diameter: ${json[index].diameter}</li>
                <li>Star: ${json[index].star}</li>
                <li>Distance from Earth: ${json[index].distance}</li>
                <li>Number of Moons: ${json[index].moons}</li>
            </ol>
            <img src="${json[index].image}"></img>`
        });
    })


    
    form.addEventListener("submit", function(event) {
        
        // Prevent submission so shuttle status can be viewed.
        event.preventDefault();
       
        // Validations.  If they fail any of the validations, prevent the form from submitting.
        // Validate there no blank answers.
        if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === ""){
            alert("All fields are required");
            return;
        } 
        
        // Validate Fuel Level and Cargo Mass are numbers. 
        if (isNaN(cargoMass.value) || isNaN(fuelLevel.value)){
            alert("Fuel Level and Cargo Mass must be a number");
            return;
        } 
        
        // Validate Pilot Name and Co-pilot Name are strings.
        if (!isNaN(pilotName.value) || !isNaN(copilotName.value)){
            alert("Please submit the name of the pilot and copilot.");
            return;
        } 

        // Shuttle needs at least 10000 L of fuel for launch. This function checks to see if that is true.
        function fuelStatusCheck(fuelLevel) {
            if (fuelLevel.value < 10000) {
                fuelStatus.innerHTML = `Insufficient fuel level for launch.`;
                return false;
            } else {
                fuelStatus.innerHTML = `Fuel level is high enough for launch.`;
                return true;
            }
        };
    
        // Shuttle needs a cargo mass of less than 10000 for launch. This function checks to see if that is true.
        function cargoMassCheck(cargoMass) {
            if (cargoMass.value > 10000) {
                cargoStatus.innerHTML = `Cargo mass is too high for launch.`;
                return false;
            } else {
                cargoStatus.innerHTML = `Cargo mass is low enough for launch.`;
                return true;
            }
        };
    
        function funcLaunchStatusCheck(fuelStatusCheck, cargoMassCheck) {
            //These template literals overwrite pilotStatus and copilotStatus in the HTML file.
            pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch.`;  
            copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch.`;
            
            // If either the fuel level is too low or the cargo mass is too high, the shuttle is not ready for launch.  This if / else statement checks to see if the shuttle is ready for launch and informs the end user of its status.
            if (fuelStatusCheck === false || cargoMassCheck === false) {
                launchStatus.innerHTML = `Shuttle not ready for launch.`;
                launchStatus.style.color = "red";
                faultyItems.style.visibility = 'visible';
                return;
            } else {
                launchStatus.innerHTML = `Shuttle is ready for launch.`;
                launchStatus.style.color = "green";
                //This is added in case someone needed to add a couple more digits to either the fuel level or the cargo mass and resubmitted without reloading the page.  Otherwise, visibility would be 'visible.'
                faultyItems.style.visibility = 'hidden';
                return;
            };
        };
        
        funcLaunchStatusCheck(fuelStatusCheck(fuelLevel), cargoMassCheck(cargoMass));
    });

});