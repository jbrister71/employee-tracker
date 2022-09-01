const db = require('./db/connection');

const init = function() {
    sql = 'SELECT * FROM employees';
    db.query(
        sql,
        function(err, results) {
            console.log(results);
        }
    );
};

init();