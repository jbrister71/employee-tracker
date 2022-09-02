const db = require('../db/connection');

// Returns all employees
const getEmployees = function() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT e.id, e.first_name, e.last_name,
                    IFNULL(CONCAT(m.last_name, ', ', m.first_name), "No Manager") AS manager,
                    roles.job_title, departments.department_name, roles.salary
                    FROM employees e
                    LEFT JOIN roles
                    ON e.role_id = roles.id
                    LEFT JOIN departments
                    ON roles.department_id = departments.id
                    LEFT JOIN employees m
                    ON e.manager = m.id`

        db.query(sql, (err, rows) => {
            if(err) {
                console.log(err.message);
                return;
            }
            // console.log('\n\n\n');
            // console.table(rows);
            
            resolve(rows)
        });
    
    });
};

// Returns all employees who don't report to a manager
const getManagerNames = function() {
    return new Promise((resolve, reject) => {    
        const sql = `SELECT employees.first_name, employees.last_name, employees.id
                    FROM employees
                    WHERE employees.manager IS NULL`

        db.query(sql, (err, rows) => {
            if(err) {
                console.log(err.message);
                return;
            }

            resolve(rows)
        });
    });
};

// Creates a new row in employees
const addEmployee = function({ first_name, last_name, role_id, manager }) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager)
                    VALUES (?, ?, ?, ?)`
        const params = [ first_name, last_name, role_id, manager ];

        db.query(sql, params, (err, results) => {
            if(err) {
                console.log(err.message);
                return;
            }

            console.log("Employee added!");
            resolve(results);
        })
    })
};

// Updates employee role
const updateRole = function({ role_id, employeeId }) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE employees
                    SET role_id = ?
                    WHERE id = ?`;

        const params = [ role_id, employeeId ];

        db.query(sql, params, (err, results) => {
            if(err) {
                console.log(err.message);
                return;
            }
            console.log("Employee updated!");
            resolve(results);
        })
    })
}

module.exports = {
    getEmployees,
    addEmployee,
    getManagerNames,
    updateRole
}