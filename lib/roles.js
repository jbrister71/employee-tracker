const db = require('../db/connection');

const getRoles = function() {
    const sql = `SELECT roles.id, roles.job_title, departments.department_name, roles.salary
                FROM roles
                LEFT JOIN departments
                ON roles.department_id = departments.id`

    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err.message);
            return;
        }

        console.table(rows);
        return;
    });
};

const addRole = function({ job_title, department_id, salary }) {
    const sql = `INSERT INTO roles (job_title, department_id, salary) VALUES (?, ?, ?)`;
    const params = [ job_title, department_id, salary ];
    
    db.query(sql, params, (err, results) => {
        if(err) {
            console.log(err.message);
            return;
        }
        console.log("Role added!");
        return;
    });
};

module.exports = {
    getRoles,
    addRole
}