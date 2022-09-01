const db = require('../db/connection');

const getEmployees = function() {
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
        }
        console.table(rows);
    });
};

const addEmployee = function({ first_name, last_name, role_id, manager }) {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager)
                VALUES (?, ?, ?, ?)`
    const params = [ first_name, last_name, role_id, manager ];

    db.query(sql, params, (err, results) => {
        if(err) {
            console.log(err.message);
            return;
        }
        console.log("Employee added!");
        return;
    })
};

module.exports = {
    getEmployees,
    addEmployee
}