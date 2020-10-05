import React, { FC, useState } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const App: FC = () => {
  const [checked, setChecked] = useState(true);
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
      </List>
    </Container>
  );
}

export default App;
