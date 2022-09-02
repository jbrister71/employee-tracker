const db = require('../db/connection');

// Returns all departments
const getDepartments = function() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM departments`;

        db.query(sql, (err, rows) => {
            if(err) {
                console.log(err.message);
                return;
            }
            
            resolve(rows);
        });
    });
};

// Creates a new row in departments
const addDepartment = function({ name }) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO departments (department_name) VALUES (?)`;
        
        db.query(sql, name, (err, results) => {
            if(err) {
                console.log(err.message);
                return;
            }
            console.log("Department added!");
            resolve(results);
        });
    })
};

module.exports = {
    getDepartments,
    addDepartment
}