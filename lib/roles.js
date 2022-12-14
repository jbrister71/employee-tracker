const db = require('../db/connection');

// Returns all roles
const getRoles = function() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT roles.id, roles.job_title, departments.department_name, roles.salary
                    FROM roles
                    LEFT JOIN departments
                    ON roles.department_id = departments.id`

        db.query(sql, (err, rows) => {
            if(err) {
                console.log(err.message);
                return;
            }

            resolve(rows);
        });
    });
};

// Returns all roles with only id and job_title
const getRoleNames = function() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT roles.id, roles.job_title FROM roles'

        db.query(sql, (err, rows) => {
            if(err) {
                console.log(err.message);
                return;
            }

            resolve(rows);
        })
    })
}

// Creates a new row on the roles table
const addRole = function({ job_title, department_id, salary }) {
    return new Promise((resolve, reject) => {    
        const sql = `INSERT INTO roles (job_title, department_id, salary) VALUES (?, ?, ?)`;
        const params = [ job_title, department_id, salary ];
        
        db.query(sql, params, (err, results) => {
            if(err) {
                console.log(err.message);
                return;
            }
            console.log("Role added!");
            resolve(results)
        })
    })
};

module.exports = {
    getRoles,
    addRole,
    getRoleNames
}