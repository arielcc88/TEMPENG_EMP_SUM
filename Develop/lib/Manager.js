const Employee = require("./Employee");

//Manager's class
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    //calling parent class' constructor
    super(id, name, email);
    //assigning office number to manager
    this.officeNumber = officeNumber;
  }

  getRole() {
    return "Manager";
  }

  getOfficeNumber() {
    //returning office id of manager
    return this.officeNumber;
  }
}

module.exports = Manager;
