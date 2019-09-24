const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const filecontroller = require('./controllers');
const port = 3000;

// parse request body
app.use(bodyParser.json());

// handle requests for static files (html, css)
//app.use(express.static(path.resolve(__dirname, '')))

// route for main app
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'))
})

// get street sweeping info
// app.get('/ss', filecontroller.getSSData);

app.get('/parking', filecontroller.getParkingData);

// get street sweeping info 
app.get('/ss', filecontroller.getSSData);

// user submitted info about available parking, should be triggered when 'submit' button is clicked
app.post('/submit', filecontroller.createEntry);

// get handicap info
// app.get('/handicap', (req, res) => {

// })

// start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

module.exports = app;