const db = require('../db/connection');

const getDepartments = function() {
    const sql = `SELECT * FROM deparments`

    db.query(
        sql, 
    )
}