INSERT INTO departments (department_name)
VALUES
("Finance"),
("Sales"),
("Engineering"),
("Legal");

INSERT INTO roles (job_title, department_id, salary)
VALUES
("Sales Lead", 2, 100000),
("Salesperson", 2, 80000),
("Lead Engineer", 3, 150000),
("Software Engineer", 3, 120000),
("Account Manager", 1, 160000),
("Accountant", 1, 125000),
("Legal Team Lead", 4, 250000),
("Lawyer", 4, 150000);

INSERT INTO employees (first_name, last_name, role_id, manager)
VALUES
("John", "Doe", 1, null),
("Mike", "Chan", 2, "John Doe"),
("Ashley", "Rodriguez", 3, null),
("Kevin", "Tupik", 4, "Ashley Rodriguez"),
("Kunal", "Singh", 5, null),
("Malia", "Brown", 6, "Kunal Singh"),
("Sarah", "Lourd", 7, null),
("Tom", "Allen", 8, "Sarah Lourd");