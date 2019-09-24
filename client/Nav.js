import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddIcon from '@material-ui/icons/AddCircle';
import ListIcon from '@material-ui/icons/List';
import Drawer from '@material-ui/core/Drawer';
import InputContainer from './InputContainer';
import List from './List';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function SimpleBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: props.open,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    console.log(side, open);
    setState({ ...state, [side]: open });
  };
  const done = () => {
    setState({ ...state, bottom: false });
  };
  const anotherDone = () => {
    setState({...state, right: false});
  };
  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          if (newValue === 0) {
            toggleDrawer('bottom', true)(event);
          }
          if (newValue === 2) {
            toggleDrawer('right', true)(event);
          }
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
        id={'nav'}
      >
        <BottomNavigationAction label="Add" icon={<AddIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Summary" icon={<ListIcon />} />
      </BottomNavigation>
      <Drawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)}>
        <div><InputContainer updateParking={props.updateParking} position={props.position} doneSubmit={done} /></div>
      </Drawer>
      <Drawer anchor="bottom" open={state.right} onClose={toggleDrawer('right', false)}>
        <div style={{height: '80vh'}}>
          {
            props.parking.map(parking => {
              return <List key={parking.lat+parking.lng} message={parking.message} startTime={parking.startTime} endTime={parking.endTime} position={{ lat: parking.lat, lng: parking.lng }} setCenter={props.setCenter} anotherDone={anotherDone} />
            })
          }
        </div>
      </Drawer>
    </div>
  );
}