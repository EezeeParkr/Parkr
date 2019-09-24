import 'date-fns';
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    // margin: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    // width: '100%'
  },
  iconSmall: {
    fontSize: 20,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function InputContainer (props) {
  const classes = useStyles();
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [message, setMessage] = useState('');
  function handleDateChange(date) {
    setStartDate(date);
    setEndDate(date);
  }
  function handleSubmit() {
    const position = props.position;
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    axios.post('/submit', {
      position, // object with lat and lng as properties
      message, // str
      startDate, //
      endDate
    }).then(function(res){
      console.log('response on post ', res);
      props.doneSubmit();
      props.updateParking();
    }).catch(e => {
      console.log('error: ', e);
    });
  }
  return (<div id={'inputContainer'}>
    <div>
      {
        props.position.lat && <TextField
          disabled
          id="standard-disabled"
          label="Position of marker"
          defaultValue={`Latitude: ${props.position.lat} || Longitude: ${props.position.lng}`}
          className={classes.textField}
          margin="normal"
          style={{
            width: '96%'
          }}
        />
      }

    </div>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            id="standard-name"
            label="Parking situation"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            style={{
              width: '100%'
            }}
          />
        </Grid>
        <Grid item xs={6}>
    <KeyboardDatePicker
      margin="normal"
      id="date-picker-dialog"
      label="Date picker dialog"
      format="MM/dd/yyyy"
      value={startDate}
      onChange={handleDateChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
        </Grid>
        <Grid item xs={6}>
    <KeyboardTimePicker
      margin="normal"
      id="start-time-picker"
      label="Start Time"
      value={startDate}
      onChange={date => setStartDate(date)}
      KeyboardButtonProps={{
        'aria-label': 'change time',
      }}
    />
        </Grid>
        <Grid item xs={6}>
    <KeyboardTimePicker
      margin="normal"
      id="end-time-picker"
      label="End Time"
      value={endDate}
      onChange={date => setEndDate(date)}
      KeyboardButtonProps={{
        'aria-label': 'change time',
      }}
    />
        </Grid>
        <Grid item xs={12} md={12}>
          <Button variant="contained" color="primary" className={classes.button} style={{
            width: '95%' }} onClick={handleSubmit}>
            Send
          </Button>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  </div>);
};
