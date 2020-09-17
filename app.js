"use strict";
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      searchType = promptFor("Let's narrow the person you are looking for by their traits: 'eye color', 'height', 'weight',...", typeValidation).toLowerCase();
      searchResults = searchByTrait(people, searchType);
      // TODO: search by traits
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults[0], people);

  mainEyeColor(searchResults.eyeColor);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt(
    "Found " +
    person.firstName +
    " " +
    person.lastName +
    " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'"
  );

  switch (displayOption) {
    case "info":
      displayPerson(person);
      // TODO: get person's info
      break;
    case "family":
      displayFamilyName(people);
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    } else {
      return false;
    }
  });
  // TODO: find the person using the name they entered
  return foundPerson;
}

function searchByTrait(people, searchType) {
  let searchTrait = promptFor("What is the " + searchType + " you are looking for? ", chars).toLowerCase();
  // let findingTraits = prompt("Their traits?", chars);
  // TODO: Once you find a person, you need to add them to a list. 
  let foundTrait = people.filter(function (person) {
    let personTrait;
    switch (searchType) {
      case "eye color":
        personTrait = person.eyeColor;
        break;

      case "height":
        personTrait = person.height;

    }

    if (personTrait === searchTrait) {
      return true;
    } else {
      return false;
    }
  }); return foundTrait;
}



// alerts a list of people
function displayPeople(people) {
  alert(
    people.map(function (person) {
      return person.firstName + " " + person.lastName;
    }).join("\n")
  );
}

function displayPerson(person) {

  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender:" + person.gender + "\n";
  personInfo += "DOB:" + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color:" + person.eyeColor + "\n";
  personInfo += "Occupation:" + person.occupation + "\n";
  personInfo += "Parents:" + person.parents + "\n";
  personInfo += "Spouse:" + person.currentSpouse + "\n";

  alert(personInfo);
}



function displayFamilyName(people) {

  let personFamilyName = "Last Name: " + person.lastName;

  alert(personFamilyName);
}

// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// trait validation function
function typeValidation(input) {
  return input.toLowerCase() == "eye color" || input.toLowerCase() === "height" || input.toLowerCase() == "weight";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}
