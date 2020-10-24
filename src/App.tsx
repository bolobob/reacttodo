import React, { FC, useEffect, useState, useRef, FormEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import db from './db';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InputBase from '@material-ui/core/InputBase';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle';

type Task = {
  id?: number;
  completed: boolean;
  content: string;
  created_at?: string;
  updated_at?: string;
};

const useStyles = makeStyles({
  addIcon: {
    position: 'absolute',
    right: '10px',
    bottom: '10px'
  },
  hidden: {
    display: 'none'
  }
});

dayjs.locale('ja');

const App: FC = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  const [newFormShown, setNewFormShown] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const labelId = `checkbox-list-label`;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    db.table('todos').toArray().then((tasks) => {
      setTasks(tasks);
    });
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [newFormShown]);

  const handleToggle = () => {
    setChecked(!checked);
  };

  const showForm = (): void => {
    setNewFormShown(true);
  };

  const addTask = (task: Task) => {
    db.table('todos').put({
      completed: task.completed,
      content: task.content,
      created_at: dayjs().format(),
      updated_at: dayjs().format(),
    }).then(() => {
      setTasks((tasks) => [task, ...tasks]);
    });
  };

  const createTask = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTask({ completed: false, content: inputRef.current?.value ?? ''});
    if (inputRef.current !== null) {
      inputRef.current.value = '';
    }
    setNewFormShown(false);
  }

  return (
    <Container maxWidth="sm" disableGutters>
      <AppBar position="sticky">
        <Typography variant="h6" component="h1" align="center">ToDo</Typography>
      </AppBar>
      <List>
        <ListItem className={newFormShown ? '' : classes.hidden} dense>
          <ListItemIcon>
          <Checkbox
            edge="start"
            checked={false}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
            onClick={handleToggle}
          />
          </ListItemIcon>
          <form noValidate autoComplete="off" onSubmit={createTask}>
            <InputBase id="standard-basic" inputRef={inputRef} />
          </form>
        </ListItem>
        {tasks.map((task) => (
          <ListItem key={task.id} dense>
            <ListItemIcon>
            <Checkbox
              edge="start"
              checked={task.completed}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
              onClick={handleToggle}
            />
            </ListItemIcon>
            <form noValidate autoComplete="off">
              <InputBase id="standard-basic" value={task.content} />
            </form>
          </ListItem>
        ))}
      </List>
      <IconButton className={classes.addIcon} aria-label="delete" onClick={showForm}>
        <AddIcon />
      </IconButton>
    </Container>
  );
}

export default App;
