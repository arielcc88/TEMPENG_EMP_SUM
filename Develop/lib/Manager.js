const Employee = require("./Employee");

//Manager's class
class Manager extends Employee {
  constructor(id, name, email, officeNumber) {
    //calling parent class' constructor
    super(id, name, email);
    //assigning office number to manager
    this.officeNumber = officeNumber;
  }

  getRole() {
    return "Manager";
  }
}

module.exports = Manager;
