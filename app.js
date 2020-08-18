const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeTeam = [];
const ids = [];

const valueValidator = answer => {
    if (answer === "") {
        return "You need to provide an answer";
    } return true;
}
const idValidator = answer => {  
    const newId = answer.trim();
    if (ids.includes(newId)) {
        return "Id already taken";
    }else if (answer === "") {
        return "You need to provide an answer";
    } 
    else {
        ids.push(newId);
        return true;
    } 
}
const emailValidator= answer=>{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(answer)) {
        return true;
    }
    return "Please enter a valid email address.";
}
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your manager's name?:",
        validate: valueValidator
    },
    {
        type: "input",
        name: "id",
        message: "What is your manager's id?:",
        validate: idValidator
    },
    {
        type: "input",
        name: "email",
        message: "What is your manager's email?:",
        validate: emailValidator
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number:",
        validate: valueValidator
    }
]
const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your engineer's name?:",
        validate: valueValidator
    },
    {
        type: "input",
        name: "id",
        message: "What is your engineer's id?:",
        validate: idValidator
    },
    {
        type: "input",
        name: "email",
        message: "What is your engineer's email?:",
        validate: emailValidator
    },
    {
        type: "input",
        name: "github",
        message: "What is your engineer's GitHub username?:",
        validate: valueValidator
    }
]
const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your intern's name?:",
        validate: valueValidator
    },
    {
        type: "input",
        name: "id",
        message: "What is your intern's id?:",
        validate: idValidator
    },
    {
        type: "input",
        name: "email",
        message: "What is your intern's email?:",
        validate: emailValidator
    },
    {
        type: "input",
        name: "school",
        message: "What is your  intern's school?:",
        validate: valueValidator
    }
]
const moreEmployeeQuestions = [
    {
        type: "list",
        name: "options",
        message: "Which type of team member would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "I don't want to add anymore members"
        ]
    }
]
async function promptMoreUser() {
    try {
        const answers = await inquirer.prompt(moreEmployeeQuestions);
        if (answers.options === "Engineer") {
            createEngineer();
        } else if (answers.options === "Intern") {
            createIntern();
        } else {
            const teamString = render(employeeTeam);

            fs.writeFile(outputPath, teamString, function (err) {
                if (err) {
                    throw err
                };
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}
async function createEngineer() {
    try {
        const answers = await inquirer.prompt(engineerQuestions);
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        employeeTeam.push(engineer);
        promptMoreUser();
    }
    catch (err) {
        console.log(err);
    }
}
async function createIntern() {
    try {
        const answers = await inquirer.prompt(internQuestions);
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        employeeTeam.push(intern);
        promptMoreUser();
    }
    catch (err) {
        console.log(err);
    }
}

}
init();