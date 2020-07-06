// TODO: Write code to define and export the Employee class
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
  getID() {
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
}
