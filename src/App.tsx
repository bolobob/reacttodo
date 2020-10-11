import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles({
  addIcon: {
    position: 'absolute',
    right: '10px',
    bottom: '10px'
  }
});

const App: FC = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  const [newFormShown, setNewFormShown] = useState(false);
  const labelId = `checkbox-list-label`;
  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <Container maxWidth="sm" disableGutters>
      <AppBar position="sticky">
        <Typography variant="h6" component="h1" align="center">ToDo</Typography>
      </AppBar>
      <List>
        <ListItem dense>
          <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
            onClick={handleToggle}
          />
          </ListItemIcon>
          <ListItemText primary="hoge" />
        </ListItem>
        <ListItem dense>
          <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
            onClick={handleToggle}
          />
          </ListItemIcon>
          <form noValidate autoComplete="off">
            <InputBase id="standard-basic" value="hoge" />
          </form>
        </ListItem>
      </List>
      <IconButton className={classes.addIcon} aria-label="delete" onClick={() => setNewFormShown(true)}>
        <AddIcon />
      </IconButton>
    </Container>
  );
}

export default App;