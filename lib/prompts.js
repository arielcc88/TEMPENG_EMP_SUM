const questions = [
  {
    type: "input",
    name: "em_name",
    message: "Enter employee's full name: <First and Last names>",
    validate: function (usrInput) {
      //validating name with regex
      const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
      if (!regName.test(usrInput)) {
        return "Please verify the employee's name is correct. Full Name expected.";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "em_id",
    message: "Enter employee's ID:",
    validate: function (usrInput) {
      //validating name with regex
      const regName = /^[0-9]*$/;
      if (!regName.test(usrInput)) {
        return "Please verify the employee's ID. Only numbers are accepted.";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "em_email",
    message: "Enter employee's email address:",
    validate: function (usrInput) {
      //validating name with regex
      const regName = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regName.test(String(usrInput).toLowerCase())) {
        return "Please enter a valid email address.";
      }
      return true;
    },
  },
  {
    type: "list",
    name: "em_role",
    message: "What's the employee's role?",
    choices: ["Manager", "Engineer", "Intern"],
    default: "Engineer",
    validate: function (usrInput) {
      //validating name with regex
      const empRoles = ["Manager", "Engineer", "Intern"];
      if (!empRoles.includes(usrInput)) {
        return "Role not found. Please verify the Role. [Manager, Engineer, Intern]";
      }
      return true;
    },
  },
  //-----------------------
  //Class-specific questions
  //-----------------------
  // index 4 - Manager
  {
    type: "input",
    name: "mg_offnum",
    message: "Enter Manager's Office Number:",
    validate: function (usrInput) {
      //validating name with regex
      const regName = /^[0-9]*$/;
      if (!regName.test(usrInput)) {
        return "Please verify the Office Number.";
      }
      return true;
    },
  },
  // index 5 - Engineer
  {
    type: "input",
    name: "eg_gitusr",
    message: "Enter Engineer's Github username:",
    validate: function (usrInput) {
      //validating name with regex
      const regName = /^\w+$/;
      if (!regName.test(usrInput)) {
        return "Please verify the Github username.";
      }
      return true;
    },
  },
  // index 6 - Intern
  {
    type: "input",
    name: "in_schl",
    message: "Enter Intern's school name:",
    validate: function (usrInput) {
      //validating name with regex
      const regName = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 ]*)$/;
      if (!regName.test(usrInput)) {
        return "Please verify the School Name.";
      }
      return true;
    },
  },
  //index 7 - menu
  {
    type: "list",
    name: "nxt_action",
    message: "How do you want to proceed?",
    choices: ["Add New Employee", "Generate Roster", "Exit"],
    default: "Add New Employee",
    validate: function (usrInput) {
      if (!usrInput) {
        return "Not a valid option. Please choose again.";
      }
      return true;
    },
  },
];

module.exports = questions;
