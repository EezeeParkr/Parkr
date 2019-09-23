const fileController = {};
const pool = require('../db/db');

// GET: grabs no parking data from DB (at a specific day/time) and returns data to front end to render no parking markers
// fileController.getSSData = (req, res) => {
//     // sql query needs tweaking
//     const currentDay = Date().slice(0,3);
//     const currentDaySS = 'SELECT lat, lng FROM boundary INNER JOIN street clean WHERE id = boundaryId';
//     pool.query(currentDaySS, (err, data) => {
//         if(err) {
//             res.json(err);
//         } else {
//             res.json(data);
//         }
//     })
// }

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

fileController.getParkingData = (req, res) => {
  // sql query needs tweaking
  const date = new Date();
  let month = date.getMonth() + 1;
  if (month <= 9) {
    month = '0' + month; // this becomes string
  }
  let today = date.getDate();
  if (today <= 9) {
    today = '0' + today; // this becomes string
  }
  const strDate = `${date.getFullYear()}/${month}/${today}`; // YYYY/MM/DD
  console.log(strDate)
  const day = `${DAYS[date.getDay()]}`
  const currentDaySS = 'SELECT * FROM "Parking" WHERE "currDate" = $1 AND "currDay" = $2';
  const values = [strDate, day];
  pool.query(currentDaySS, values ,(err, data) => {
    if(err) {
      res.json(err);
    } else {
      res.json(data.rows);
    }
  })
};

// POST: users should be able to create a new entry
fileController.createEntry = (req, res, next) => {
  // also insert into street clean at specific time??? How??
  const newEntry = `INSERT INTO boundary(lat, lng) VALUES ($1, $2)`
  const values = [req.body.lat, req.body.lng];
  pool.query(newEntry, values, (err, data) => {
    if(err) {
      res.json(err);
    } else {
      res.json(data.rows)
    }
  })
};

fileController.getSSData = (req, res, next) => {
    // sql query needs tweaking
    const currentDay = Date().slice(0,3);
    const currentDaySS = 'SELECT lat, lng FROM boundary INNER JOIN street clean WHERE id = boundaryId';
    pool.query(currentDaySS, (err, data) => {
        if(err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })
}

//
// POST: users should be able to create a new entry
fileController.createEntry = (req, res, next) => {
    // also insert into street clean at specific time??? How??
    const newEntry = `INSERT INTO boundary(lat, lng) VALUES ($1, $2)`
    const values = [req.body.lat, req.body.lng];
    pool.query(newEntry, values, (err, data) => {
        if(err) {
            res.json(err);
        } else {
            res.json(data.rows)
        }
    })
}

module.exports = fileController;