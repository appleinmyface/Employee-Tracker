const pool = require('./connection');

// Function to get all departments
const getDepartments = async () => {
  const result = await pool.query('SELECT * FROM department');
  return result.rows;
};

// Function to get all roles
const getRoles = async () => {
  const result = await pool.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id');
  return result.rows;
};

// Function to get all employees
const getEmployees = async () => {
  const result = await pool.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, manager.first_name AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
  `);
  return result.rows;
};

// Function to add a department
const addDepartment = async (name) => {
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

// Function to add a role
const addRole = async (title, salary, departmentId) => {
  await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
};

// Function to add an employee
const addEmployee = async (firstName, lastName, roleId, managerId) => {
  await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
};

// Function to update an employee's role
const updateEmployeeRole = async (employeeId, newRoleId) => {
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
};

module.exports = {
  getDepartments,
  getRoles,
  getEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
