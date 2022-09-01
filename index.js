const db = require('./db/connection');
const departments = require('./lib/deparments');
const roles = require('./lib/roles');
const employees = require('./lib/employees');
const cTable = require('console.table');

const init = function() {
    db.connect();
    employees.addEmployee({ first_name: "Jane", last_name: "Doe", role_id: 2, manager: 1 } );
    employees.getEmployees();
};

init();