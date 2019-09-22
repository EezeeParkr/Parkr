const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
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
app.get('/ss', (req, res) => {
  // SELECT street cleaning data from current day

})

// user submitted info
app.post('/post', (req, res) => {

})

// get handicap info
// app.get('/handicap', (req, res) => {

// })

// start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});