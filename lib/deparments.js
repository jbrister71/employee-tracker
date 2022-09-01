const db = require('../db/connection');

const getDepartments = function() {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
    });
};

const addDepartment = function({ name }) {
    const sql = `INSERT INTO departments (department_name) VALUES (?)`;
    
    db.query(sql, name, (err, results) => {
        if(err) {
            console.log(err.message);
            return;
        }
        console.log("Department added!");
        return;
    });
};

module.exports = {
    getDepartments,
    addDepartment
}