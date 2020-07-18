# Employee Roster Generator

![MIT](https://img.shields.io/static/v1?label=License&message=MIT&color=green)

## Description

A Node CLI that takes in information about employees and generates an HTML webpage that displays summaries for each person. The application will prompt the user for information about the team manager and then information about the team members. The user can input any number of team members, and they may be a mix of engineers and interns. When the user has completed building the team, the application will create an HTML file that displays a nicely formatted team roster based on the information provided by the user.

## Instructions

The App initiates with a menu for the following options:

1. Add New Employee
2. Generate Team Roster
3. Exit

--- Note: Option #2 contains validation to ensure at least the Manager and 1 (one) employee exist.

When selecting option #1, the app will prompt the user to gather information about the user. Full Name, Employee ID, Email and Role are required for all employees. Depending on the Role, additional questions will be asked. The application contains validations for all inputs fields and to ensure only 1 (one) Manager is added (if attempted to add a second Manager, the app will notify the user and ask for different Role)

After a Manager and at least an Employee is added, then a Roster can be generated.

## Table of Content

- [Installation](#Installation)
- [Usage](#Usage)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [License](#License)
- [Questions](#Questions)

## Installation

`Node JS` is required. Node Packages: `inquirer`, `jest`. This app uses inquirer in combination with RxJS Observables
to dynamically generate prompts depending on user answers.

1. Clone repo.
2. Browse to repo folder and open CLI or Terminal
3. Run `npm install` to download necessary node modules
4. Run the App with `npm start`

The output file will be saved in the `output` directory. (generated if it doesn't exist)

## Usage

1. Run App with `npm start`.
2. Add team members information (Add New Employee).
3. Once a Manager and at least one member were added, select `Generate Team Roster` from the menu of options.

## Contributing

None.

## Tests

`jest` has been added as a Dev Dependencies and testing modules have been added. To ensure classes and file generating methods are working properly, run `npm test`.

## License

MIT

## Questions

Want to get in touch? Github: arielcc88
Report bugs and enhancements to: arielcc88@gmail.com
