const Employee = require("./Employee");

//Manager's class
class Intern extends Employee {
  constructor(id, name, email, school) {
    //calling parent class' constructor
    super(id, name, email);
    //assigning office number to manager
    this.school = school;
  }

  getSchool() {
    return this.school;
  }

  getRole() {
    return "Intern";
  }
}

module.exports = Intern;
