import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Drawer from '@material-ui/core/Drawer';
import InputContainer from './InputContainer';

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
  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          if (newValue === 0) {
            toggleDrawer('bottom', true)(event);
            console.log('hello!');
          }
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
        id={'nav'}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
      <Drawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)}>
        <div><InputContainer position={props.position} /></div>
      </Drawer>
    </div>
  );
}