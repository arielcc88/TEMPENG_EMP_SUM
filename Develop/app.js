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
//including questions array
const questions = require("./lib/prompts");
//team object. contains all manager and all employees.
const myTeam = {
  manager: {},
  members: [],
  has_manager: false,
};
const empConstruct = {}; //this object will temporarily store employee's attributes
let promptIterator = 0;
let emitter; //to serve the questions

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

console.log(`
--------------------------
   TEAM ROSTER GENERATOR
--------------------------
`);

var prompts = Observable.create(function (e) {
  //using RxJS observables to dynamically change questions depending on role
  emitter = e;
  // need to start with at least one question here
  emitter.next(questions[promptIterator]);
});

//subscribing observable to access answers
inquirer.prompt(prompts).ui.process.subscribe(
  (q) => {
    //for every answer, the response is checked for employee's role
    if (q.name === "em_role") {
      empConstruct[q.name] = q.answer;
      switch (q.answer) {
        case "Manager":
          //checking if Manager was set already
          if (!myTeam.has_manager) {
            promptIterator++;
          } else {
            console.log(
              `This team already has a Manager. Please select a different role.`
            );
          }
          emitter.next(questions[promptIterator]);
          break;

        case "Engineer":
          promptIterator += 2;
          emitter.next(questions[promptIterator]);
          break;

        case "Intern":
          promptIterator += 3;
          emitter.next(questions[promptIterator]);
          break;

        default:
          break;
      }
    } else if (
      q.name === "mg_offnum" ||
      q.name === "eg_gitusr" ||
      q.name === "in_schl"
    ) {
      //storing answer into empConstruct
      empConstruct[q.name] = q.answer;
      console.log("empConstruct", empConstruct);
      switch (q.name) {
        case "mg_offnum":
          myTeam.manager = new Manager(
            empConstruct.em_name,
            empConstruct.em_id,
            empConstruct.em_email,
            empConstruct.mg_offnum
          );
          myTeam.has_manager = true;
          break;

        case "eg_gitusr":
          myTeam.members.push(
            new Engineer(
              empConstruct.em_name,
              empConstruct.em_id,
              empConstruct.em_email,
              empConstruct.eg_gitusr
            )
          );
          break;

        case "in_schl":
          myTeam.members.push(
            new Intern(
              empConstruct.em_name,
              empConstruct.em_id,
              empConstruct.em_email,
              empConstruct.in_schl
            )
          );
          break;

        default:
          break;
      }
      console.log(myTeam);
      //closing observable
      emitter.complete();
    } else {
      //storing answer into empConstruct
      empConstruct[q.name] = q.answer;
      //incrementing promptIterator for next question
      promptIterator++;
      emitter.next(questions[promptIterator]);
    }
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
