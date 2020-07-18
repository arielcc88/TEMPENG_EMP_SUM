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
// const outputDirName = "output";
// const filePath = "./" + outputDirName + "/team_roster.html";
let emitter; //to serve the questions

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

console.log(`
--------------------------
   TEAM ROSTER GENERATOR
--------------------------
`);

const prompts = Observable.create(function (e) {
  //using RxJS observables to dynamically change questions depending on role
  emitter = e;
  // need to start with at least one question here
  emitter.next(questions[7]);
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
              `--------- ERR!! => This team already has a Manager. Please select a different role. ---------`
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
          //terminating app
          console.log("The App has found an error defining: Role.");
          emitter.error();
          break;
      }
    } else if (
      q.name === "mg_offnum" ||
      q.name === "eg_gitusr" ||
      q.name === "in_schl"
    ) {
      //storing answer into empConstruct
      empConstruct[q.name] = q.answer;
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
          //finishing app
          console.log("The App has found an error defining: Employee.");
          emitter.error();
          break;
      }
      // console.log(myTeam);
      console.log("--------- Employee added successfully!  ---------");
      //prompt for menu
      emitter.next(questions[7]);
      //closing observable
      //emitter.complete();
    } else if (q.name === "nxt_action") {
      //cases:
      //add new employee: restart prompIterator and fire question
      //generate roster: verifies if team has manager + 1 member first, if so, creates roster
      //exit
      switch (q.answer) {
        case "Add New Employee":
          promptIterator = 0;
          emitter.next(questions[promptIterator]);
          break;
        case "Generate Roster":
          //verifying Manager is added in current team and at least a member exists
          if (myTeam.has_manager && myTeam.members.length > 0) {
            //call render function
            console.log("--------- Rendering Roster ---------");
            const empGroup = [];
            empGroup.push(myTeam.manager);
            empGroup.push(...myTeam.members);
            //calling render function
            fnWriteToFileHTML(outputPath, render(empGroup));
            emitter.complete();
          } else {
            //informing user, a manager and at least a team member are required.
            console.log(
              "--------- ERR!! => Roster cannot be generated. A Manager and at least a team member are required. ---------"
            );
            emitter.next(questions[7]);
          }
          break;
        case "Exit":
          emitter.complete();
          break;
        default:
          break;
      }
    } else {
      //storing answer into empConstruct
      empConstruct[q.name] = q.answer;
      //incrementing promptIterator for next question
      promptIterator++;
      emitter.next(questions[promptIterator]);
    }
  },
  (error) => {
    console.log("--------- Please restart the Application. ---------");
  },
  (complete) => {
    console.log("--------- Exiting Application. Bye! ---------");
  }
);

function isThereADir() {

  try { 
    fs.accessSync(OUTPUT_DIR, fs.constants.F_OK); 
    console.log("--------- Output directory verified! ---------"); 
  } catch (err) { 
    console.error("--------- Output directory not found. Creating directory.... ---------"); 
    if (err && err.code === "ENOENT") {
      //creating output file if none exists
      fs.mkdirSync(OUTPUT_DIR);
      console.log("--------- Output directory created and verified! ---------");
    }
  }
}

function IsThereAFile(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    console.error(error);
  }
}

function fnDeleteExistingFile(filePath) {
  //logging
  console.log(`---- Deleting existing ${filePath} ----`);
  try {
    fs.unlinkSync(filePath);
    console.log(`---- ${filePath} deleted successfully ----`);
  } catch (error) {
    console.error(error);
  }
}

function fnCreateEmptyFile(filePath) {
  try {
    fs.closeSync(fs.openSync(filePath, "w"));
    console.log(`---- New ${filePath} created ----`);
  } catch (error) {
    console.error(error);
  }
}

function fnWriteToFileHTML(filePath, fileContent) {
  isThereADir();
  //checking for file
  if (IsThereAFile(filePath)) {
    fnDeleteExistingFile(filePath);
  }
  fnCreateEmptyFile(filePath);
  const fsTream = fs.createWriteStream(filePath, { flags: "a" });
  fsTream.write(fileContent);
}
