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
      searchResults = searchByTrait(people, searchType); //want to enter multiple traits at this point
      // TODO: search by traits
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  if (searchResults.length >= 1) {
    //TODO: Loop through searchResults array and call main menu.
    //For (index, condition, increment)
    for (let i = 0; i < searchResults.length; i++) {
      mainMenu(searchResults[i], people);
    }
  } else {
    alert("Can't find person. Restart application.");
    app(people);
  }

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
    if (person.firstName.toLowerCase() === firstName && person.lastName.toLowerCase() === lastName) {
      return true;
    } else {
      return false;
    }
  });
  // TODO: find the person using the name they entered
  return foundPerson;
}

function displayFamilyName(people) {
  let lastName = promptFor("Confirm family last name?", chars);

  let familyNameResult = people.filter(function (person) {
    if (person.lastName == lastName) {
      alert(familyNameResult);
    }
    else {
      alert("There is no other family with that last name. Application will not restart.")
      app(people);
    }
  });
}

// searching traits
function searchForTrait(people, traitType, searchTrait) {

  let searchResults = people.filter(function (el) {
    if (el[traitType] == searchTrait) {
      return true;
    }
    else {
      return false;
    }
  });
  return searchResults;
}

// searching within multiple traits
function searchByTrait(people, searchType) {
  let traitResult = people;
  let i = 1;

  while (i <= traitResult.length) {
    i++;
    let searchType = promptFor("Let's narrow the person you are looking for by their traits: 'eye color', 'height', 'weight', 'gender', 'occupation', 'dob', 'zodiac'", typeValidation).toLowerCase();
    let searchTrait = promptFor("What is the " + searchType + " you are looking for? ", chars).toLowerCase();

    switch (searchType) {
      case "eye color":
        traitResult = searchForTrait(traitResult, "eyeColor", searchTrait);
        break;
      case "height":
        traitResult = searchForTrait(traitResult, "height", searchTrait);
        break;
      case "weight":
        traitResult = searchForTrait(traitResult, "weight", searchTrait);
        break;
      case "occupation":
        traitResult = searchForTrait(traitResult, "occupation", searchTrait);
        break;
      case "gender":
        traitResult = searchForTrait(traitResult, "gender", searchTrait);
        break;
      case "zodiac":
        traitResult = searchForTrait(traitResult, "zodiac", searchTrait);
        break;
    }
  }

  return traitResult;

}

//received person defined error, alert displaying [object, object] but not data and cannot quit/close alert
//can no longer search 1 trait and cannot search more than 2 traits combined
// function displayDescendant(searchPerson, people = data) {
//   let filteredPeople = people
//     people.map(person => {
//       if (
//         person.parents[0] === searchPerson.id ||
//         person.parents[1] === searchPerson.id
//       ) {
//         alert(filteredPeople);
//         return displayDescendant(person.firstName, people), person.lastName);
//       }
//     })
//     people.filter(person => person !== undefined)
//     people.flat();

//   return filteredPeople;
// }    else {
//         alert("No Descendant");
//       app(people);
//  }
// });
// }


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
  personInfo += "Zodiac:" + person.zodiac + "\n";

  alert(personInfo);
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
  return input.toLowerCase() == "eye color" || input.toLowerCase() === "height" || input.toLowerCase() == "weight" || input.toLowerCase() === "dob" || input.toLowerCase() === "occupation" || input.toLowerCase() === 'gender' || input.toLowerCase() === 'zodiac';
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}
