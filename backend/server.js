import express, { json } from 'express';
import cors from 'cors';
import sql from 'mssql';//npm install mssql

const app = express();
const port = 5000; // Choose any port you prefer

app.use(json());

app.use(cors());
export const config = {
  server: 'localhost',
  user: 'Webdev',
  password: '123',
  database: 'Bow_valley_D2l',
  options:{
    trustServerCertificate: true
  }
};

app.get('/api/AllCourseData', async (req, res) => {
  try {
    // Connect to the SQL Server
    const pool = await sql.connect(config);

    // Fetch all data from the table
    const result = await pool.request().query('SELECT * FROM Course_table');

    // Respond with the fetched data
    res.json(result.recordset);
  } catch (err) {
    console.error(err);

    // Handle specific SQL errors
    if (err.code === 'EREQUEST') {
      // SQL Server request error
      res.status(500).json({ error: 'Error in SQL request' });
    } else {
      // Other errors
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } finally {
    // Always close the SQL connection in the finally block
    if (sql) {
      await sql.close();
    }
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
