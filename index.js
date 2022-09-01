const db = require('./db/connection');
const departments = require('./lib/deparments');
const roles = require('./lib/roles');
const { getEmployees, addEmployee } = require('./lib/employees');
const cTable = require('console.table');
const inquirer = require('inquirer');
const { end } = require('./db/connection');

const displayEmployees = function() {
    getEmployees()
    displayMainMenu();
};

const promptEmployee = function() {
    return inquirer.prompt(
        [
            {
                type: 'input',
                name: 'first_name',
                message: "What is this employee's first name?",
                validate: firstNameInput => {
                    if(firstNameInput) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        ]
    )
    .then(employee => {
        console.log(employee);
    });
};

const displayMainMenu = function() {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'userChoice',
            message: 'What would you like to do?',
            default: 0,
            choices: [
                { name: 'View all Employees', value: 0 }, 
                { name: 'Add Employee', value: 1 }, 
                { name: 'View all Roles', value: 2 },
                { name: 'Add Role', value: 4 },
                { name: 'View all Departments', value: 5 },
                { name: 'Add Department', value: 6 },
                { name: 'Quit', value: 7 }
            ]
        }
    )
    .then(({ userChoice }) => {
        switch(userChoice) {
            case 0:
                displayEmployees();
                break;
            case 1:
                promptEmployee();
                break;
            case 7:
                db.end();
                break;
        }
    });
};

const init = function() {
    displayMainMenu();
};

init();