const inquirer = require('inquirer');
const db = require('./db/queries'); // Ensure this file exports the required functions

const mainMenu = async () => {
  try {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ],
      },
    ]);

    console.log(`Selected action: ${action}`);

    switch (action) {
      case 'View all departments':
        const departments = await db.getDepartments();
        console.log('Departments:', departments);
        console.table(departments);
        break;

      case 'View all roles':
        const roles = await db.getRoles();
        console.log('Roles:', roles);
        console.table(roles);
        break;

      case 'View all employees':
        const employees = await db.getEmployees();
        console.log('Employees:', employees);
        console.table(employees);
        break;

      case 'Add a department':
        const { deptName } = await inquirer.prompt([
          {
            type: 'input',
            name: 'deptName',
            message: 'Enter the name of the department:',
          },
        ]);
        await db.addDepartment(deptName);
        console.log(`Added department ${deptName}`);
        break;

      case 'Add a role':
        const departmentsForRole = await db.getDepartments();
        console.log('Departments for role:', departmentsForRole);
        const { roleName, roleSalary, roleDept } = await inquirer.prompt([
          {
            type: 'input',
            name: 'roleName',
            message: 'Enter the name of the role:',
          },
          {
            type: 'input',
            name: 'roleSalary',
            message: 'Enter the salary for the role:',
          },
          {
            type: 'list',
            name: 'roleDept',
            message: 'Select the department for the role:',
            choices: departmentsForRole.map(dept => ({ name: dept.name, value: dept.id })),
          },
        ]);
        await db.addRole(roleName, roleSalary, roleDept);
        console.log(`Added role ${roleName}`);
        break;

      case 'Add an employee':
        const rolesForEmployee = await db.getRoles();
        const employeesForManager = await db.getEmployees();
        console.log('Roles for employee:', rolesForEmployee);
        console.log('Employees for manager:', employeesForManager);
        const { firstName, lastName, empRole, empManager } = await inquirer.prompt([
          {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the employee:',
          },
          {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the employee:',
          },
          {
            type: 'list',
            name: 'empRole',
            message: 'Select the role for the employee:',
            choices: rolesForEmployee.map(role => ({ name: role.title, value: role.id })),
          },
          {
            type: 'list',
            name: 'empManager',
            message: 'Select the manager for the employee:',
            choices: [{ name: 'None', value: null }].concat(employeesForManager.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))),
          },
        ]);
        await db.addEmployee(firstName, lastName, empRole, empManager);
        console.log(`Added employee ${firstName} ${lastName}`);
        break;

      case 'Update an employee role':
        const employeesToUpdate = await db.getEmployees();
        const rolesToUpdate = await db.getRoles();
        console.log('Employees to update:', employeesToUpdate);
        console.log('Roles to update:', rolesToUpdate);
        const { empToUpdate, newRole } = await inquirer.prompt([
          {
            type: 'list',
            name: 'empToUpdate',
            message: 'Select the employee to update:',
            choices: employeesToUpdate.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })),
          },
          {
            type: 'list',
            name: 'newRole',
            message: 'Select the new role for the employee:',
            choices: rolesToUpdate.map(role => ({ name: role.title, value: role.id })),
          },
        ]);
        await db.updateEmployeeRole(empToUpdate, newRole);
        console.log(`Updated employee's role`);
        break;

      case 'Exit':
        console.log('Exiting...');
        process.exit();
    }

    mainMenu();
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

mainMenu();
