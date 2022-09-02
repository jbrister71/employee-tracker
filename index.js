const db = require('./db/connection');
const { getDepartments, addDepartment } = require('./lib/deparments');
const { getRoles, getRoleNames, addRole } = require('./lib/roles');
const { getEmployees, addEmployee, getManagerNames, updateRole } = require('./lib/employees');
const cTable = require('console.table');
const inquirer = require('inquirer');


// Displays a table with the data returned from getEmployees() in the Employees.js file
const displayEmployees = function() {
    getEmployees()
        .then(rows => {
            console.log('\n');
            console.table(rows);
            displayMainMenu();
        });
};

// Returns an array of roles
// Set up this way so that the names will be displayed in the console but the id will be passed 
// when this array is given to inquirer.
const setRoleChoices = function(rows, roleChoices) {
    return new Promise((resolve, reject) => {
        for(let i = 0; i < rows.length; i++) {
            let row = {
                name: rows[i].job_title,
                value: rows[i].id
            }

            roleChoices.push(row);
        }
        resolve();
    })
}

// Returns an array of employees with a manager value of null
// Set up this was so that the names will be displayed in the console but the id will be passed
// when this array is given to inquirer
const setManagers = function(rows, managers) {
    managers.push({
        name: 'No manager',
        value: null
    });
    
    for(let i = 0; i < rows.length; i++) {
        let row = {
            name: `${rows[i].first_name} ${rows[i].last_name}`,
            value: rows[i].id
        }

        managers.push(row);
    }
};

// Gets user input and uses it to create a new row on the employee table
const promptEmployee = function() {
    const roleChoices = [];
    const managers = [];
    getRoleNames()
        .then(rows => {
            setRoleChoices(rows, roleChoices);
        })
        .then(
            getManagerNames()
                .then(rows => {
                    setManagers(rows, managers);
                })
                .then(data => {
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
                            },
                            {
                                type: 'input',
                                name: 'last_name',
                                message: "What is this employee's last name?",
                                validate: lastNameInput => {
                                    if(lastNameInput) {
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'list',
                                name: 'role_id',
                                message: "What is this employee's role?",
                                choices: roleChoices
                            },
                            {
                                type: 'list',
                                name: 'manager',
                                message: "Who is this employee's manager?",
                                default: 0,
                                choices: managers
                            }
                        ]
                    )
                })
                .then(employee => {
                    addEmployee(employee)
                        .then(data => {
                            displayMainMenu();
                        })
                })
        )
};

// Returns an array of all employees
// Set up this was so that the names will be displayed in the console but the id will be passed
// when this array is given to inquirer
const setEmployees = function(rows, employees) {
    return new Promise((resolve, reject) => {
        for(let i = 0; i < rows.length; i++) {
            let row = {
                name: `${rows[i].first_name} ${rows[i].last_name}`,
                value: rows[i].id
            }

            employees.push(row);
        }

        resolve(employees);
    });
}

// Updates the role of the employee that the user chooses
const updateEmployeeRole = function() {
    const employees = [];
    const roles = [];

    getEmployees()
        .then(rows => {
            setEmployees(rows, employees)
            .then(() => {
                getRoles()
                .then(rows => {
                    setRoleChoices(rows, roles);
                })
            })
            .then(() => {
                return inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'employeeId',
                            message: "Which employee should be updated?",
                            choices: employees
                        },
                        {
                            type: 'list',
                            name: 'role_id',
                            message: "What is this employee's new role?",
                            choices: roles
                        }
                    ])
            })
            .then(employee => {
                updateRole(employee)
                    .then(() => {
                        displayMainMenu()
                    });
            })
        })
        
}

// Returns an array of all departments with their ids
// Set up this was so that the names will be displayed in the console but the id will be passed
// when this array is given to inquirer
const setDeparments = function(rows, departmentNames) {
    return new Promise((resolve, reject) => {
        for(let i = 0; i < rows.length; i++) {
            let row = {
                name: rows[i].department_name,
                value: rows[i].id
            }

            departmentNames.push(row);
        }
        resolve();
    })
}

// Creates a new role based on user input
const promptRole = function() {
    const departmentNames = [];

    getDepartments()
        .then(rows => {
            setDeparments(rows, departmentNames);
        })
        .then(() => {
            return inquirer
                .prompt(
                    [
                        {
                            type: 'input',
                            name: 'job_title',
                            message: "What is this role's name?",
                            validate: jobTitleInput => {
                                if(jobTitleInput) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: "What is this role's salary?",
                            validate: salaryInput => {
                                if(parseInt(salaryInput)) {
                                    return true;
                                }
                                else {
                                    console.log("\nSalary must be an integer.");
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'list',
                            name: 'department_id',
                            message: "What department does this role belong to?",
                            choices: departmentNames
                        }
                    ]
                )
                .then(data => {
                    addRole(data)
                        .then(() => {
                            displayMainMenu()
                        });
                })
        })
};

// Displays a table of roles
const displayRoles = function() {
    getRoles()
        .then(rows => {
            console.log('\n');
            console.table(rows);
            displayMainMenu();
        })
};

// Creates a new department based on user input
const promptDepartment = function() {
    return inquirer
    .prompt(
        [
            {
                type: 'input',
                name: 'name',
                message: "What is the name of this department?",
                validate: nameInput => {
                    if(nameInput) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        ]
    )
    .then(department => {
        addDepartment(department)
            .then(() => {
                displayMainMenu();
            })
    })
};

// Displays a table of all departments
const displayDepartments = function() {
    getDepartments()
        .then(rows => {
            console.log('\n');
            console.table(rows);
            displayMainMenu();
        })
}

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
                { name: 'Update Employee Role', value: 2}, 
                { name: 'View all Roles', value: 3 },
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
            case 2:
                updateEmployeeRole();
                break;
            case 3:
                displayRoles();
                break;
            case 4:
                promptRole();
                break;
            case 5:
                displayDepartments();
                break;
            case 6:
                promptDepartment();
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