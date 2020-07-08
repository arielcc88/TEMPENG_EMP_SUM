class Employee {
  //parent class constructor
  constructor(id, name, email) {
    //setting class attributes
    this.id = id;
    this.name = name;
    this.email = email;
  }

  /*--------
    METHODS
    --------*/
  //get employee's ID
  getId() {
    return this.id;
  }

  //get employee's name
  getName() {
    return this.name;
  }

  //get employee's email
  getEmail() {
    return this.email;
  }

  //get Role -> defaults to Employee
  getRole() {
    return "Employee";
  }
}

//exporting parent class
module.exports = Employee;
