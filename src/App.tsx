import React, { FC } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const App: FC = () => {
  return (
    <Container maxWidth="sm" disableGutters>
      <AppBar position="sticky">
        <Typography variant="h6" component="h1" align="center">ToDo</Typography>
      </AppBar>
    </Container>
  );
}

export default App;
