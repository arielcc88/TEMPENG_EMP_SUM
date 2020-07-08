const Employee = require("./Employee");

//Manager's class
class Engineer extends Employee {
  constructor(id, name, email, github) {
    //calling parent class' constructor
    super(id, name, email);
    //assigning office number to manager
    this.github = github;
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
