import mysql from 'mysql2';

// Create a connection to the database
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password if applicable
  database: 'tasx' // Your database name
});

// Connect to the database
con.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

export default con;
