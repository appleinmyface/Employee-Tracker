-- Insert initial data into department
INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('Finance');

-- Insert initial data into role
INSERT INTO role (title, salary, department_id) VALUES ('Salesperson', 60000, 1), ('Engineer', 80000, 2), ('Accountant', 70000, 3);

-- Insert initial data into employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, 1), ('Mike', 'Johnson', 3, NULL);
