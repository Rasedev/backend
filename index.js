const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
const path = require('path');
const dbConnection = require('./config/dbConnection');
const  route  = require('./route');

const app = express();
const port = 3000;

dbConnection()

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(route)

//// 🔹 Handle 404 errors
// app.use((req, res, next) => {
//   res.status(404).json({ message: "Route not found" });
// });

// // 🔹 Global Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Something went wrong!", error: err.message });
// });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 
