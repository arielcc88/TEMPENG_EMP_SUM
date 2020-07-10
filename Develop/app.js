const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
//requiring rxjs for dynamic addition of questions
const { Observable } = require("rxjs");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

let emitter; //to serve the questions
var prompts = Observable.create(function (e) {
  emitter = e;
  // need to start with at least one question here
  emitter.next({
    type: "input",
    name: "ename",
    message: "Enter employee's name:",
  });
});

inquirer.prompt(prompts).ui.process.subscribe(
  (q) => {
    if (q.answer.toLowerCase() === "pear") {
      console.log(q);
      console.log("That's Great. I would never forget a Pear-eater.");
      emitter.complete();
    }

    emitter.next({
      type: "list",
      name: "fruits",
      message:
        "Sorry, what is your favorite fruit? I forgot, was it " +
        q.answer +
        ", or something else?",
      choices: [
        {
          name: "Uh, Banana..",
          value: "banana",
        },
        {
          name: "Uh, Apple..",
          value: "apple",
        },
        {
          name: "Pear!",
          value: "pear",
        },
      ],
    });
  },
  (error) => {
    console.log("Hm, an error happened. Why?");
  },
  (complete) => {
    console.log("I think we are done now.");
  }
);

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
