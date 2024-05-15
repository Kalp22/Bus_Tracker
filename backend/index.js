const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 5000;

const cors = require("cors");

app.use(cors());

// MySQL connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "ce_project", // Replace with your database name
});

// Connect to the database
connection.connect();

// Define a route to fetch data from the database
app.get("/database", (req, res) => {
  // Execute a query to fetch data from the 'sensor_data' table
  connection.query(
    "SELECT * FROM sensor_data ORDER BY id DESC LIMIT 2",
    (error, results) => {
      if (error) {
        console.error("Error fetching data: ", error);
        res.status(500).json({ error: "Error fetching data" });
        return;
      }

      // Send the fetched data as JSON response
      console.log(results);
      res.status(200).json(results);
    }
  );
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
