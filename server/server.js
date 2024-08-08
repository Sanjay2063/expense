const express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();

app.use(cors());
app.get('/data', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM MOCK_DATA where employee_id <=20');
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
  });


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });