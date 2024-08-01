const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getDepartments = async () => {
  const res = await pool.query('SELECT * FROM department');
  return res.rows;
};

const getRoles = async () => {
  const res = await pool.query('SELECT * FROM role');
  return res.rows;
};

const getEmployees = async () => {
  const res = await pool.query('SELECT * FROM employee');
  return res.rows;
};

const addDepartment = async (name) => {
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

const addRole = async (title, salary, department_id) => {
  await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
};

const addEmployee = async (first_name, last_name, role_id, manager_id) => {
  await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
};

const updateEmployeeRole = async (id, role_id) => {
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, id]);
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
