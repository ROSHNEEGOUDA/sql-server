const express = require('express');
const sql = require('mssql');
const app = express();
const PORT = 3000;

const dbConfig = {
  user: 'Saurav',
  password: 'Spider@123',
  server: 'LAPTOP-3EO4LDAD', // e.g. localhost or 192.168.1.x
  database: 'MyAppDB',
  options: {
    trustServerCertificate: true,
  }
};

app.post('/trigger-cube-job', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    await sql.query(`EXEC msdb.dbo.sp_start_job N'DeployCubeJob'`);
    res.send({ status: 'success', message: 'Job triggered.' });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err.message });
  }
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
