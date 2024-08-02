const { Pool } = require('pg');

// Directly include your database connection details
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employee_tracker_db',
  password: 'rootroot',
  port: 5432
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connection successful');
    client.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

testConnection();
