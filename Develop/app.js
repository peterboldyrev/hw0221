const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const questions = require("./lib/questions")
const Emp = require('./lib')

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


var employees = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
start()

function start() {
    inquirer.prompt(questions.manager)
        .then(function (answers) {
            const { name, email, id, office } = answers;
            employees.push(new Emp.Manager(name, id, email, office))
            // console.log(employees)
            askAddMoreEmp()
        })
}

function askAddMoreEmp() {
    inquirer.prompt(questions.addMoreEmp)
        .then(function (answers) {
            const { add } = answers
            if (add === 'yes') {
                chooseEmpType()
            } else {
               const empl11 = render(employees);
               fs.writeFile(`hahaha.html`, empl11,(err) => {
                if (err) throw err;
                console.log('saved!');
               } );

              
            }
        })

}

function chooseEmpType() {
    inquirer.prompt(questions.chooseEmpType)
        .then(function (answers) {
            const { empType } = answers;
            if (empType === 'intern') {
                addIntern()
            } else if (empType === 'engineer') {
                addEngineer()
            } else {
                console.log(empType, 'is not supported')
            }
        })
}

function addIntern() {
    inquirer.prompt(questions.intern)
        .then(function (answers) {
            const { name, email, id, school } = answers;
            employees.push(new Emp.Intern(name, id, email, school))
            // console.log(employees)
            askAddMoreEmp()
        })
}
function addEngineer() {
    inquirer.prompt(questions.engineer)
        .then(function (answers) {
            const { name, email, id, github } = answers;
            employees.push(new Emp.Engineer(name, id, email, github))
            // console.log(employees)
            askAddMoreEmp()
        })
}

  //inquirer.prompt(questions.engineer, processAnswersEng);





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
// for the provided `render` function to work!```
