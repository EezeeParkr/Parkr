import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function PaperSheet(props) {
  const classes = useStyles();
  return (
    <div onClick={() => {
      props.setCenter(props.position);
      props.anotherDone();
    }}>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {
            props.message
          }
        </Typography>
        <Typography component="p">
          {
            'Time: ' + props.startTime + ' - ' + props.endTime + '   '
          }
        </Typography>
      </Paper>
    </div>
  );
}