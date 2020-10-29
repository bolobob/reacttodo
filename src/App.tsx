import React, {
  FC,
  useEffect,
  useState,
  useRef,
  FormEvent,
  ChangeEvent,
  MouseEvent,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import db from "./db";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InputBase from "@material-ui/core/InputBase";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircle";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";

type Task = {
  id?: number;
  completed: boolean;
  content: string;
  created_at?: string;
  updated_at?: string;
};

const useStyles = makeStyles({
  toolBar: {
    justifyContent: "space-between",
  },
  addIcon: {
    position: "absolute",
    right: "10px",
    bottom: "10px",
  },
  hidden: {
    display: "none",
  },
});

dayjs.locale("ja");

const App: FC = () => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [newFormShown, setNewFormShown] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const labelId = `checkbox-list-label`;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    db.table("todos")
      .toArray()
      .then((tasks) => {
        setTasks(tasks);
      });
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [newFormShown]);

  const toggleEditing = (): void => {
    setEditing(!editing);
  };

  const showForm = (): void => {
    setNewFormShown(true);
  };

  const addTask = (task: Task) => {
    db.table("todos")
      .put({
        completed: task.completed,
        content: task.content,
        created_at: dayjs().format(),
        updated_at: dayjs().format(),
      })
      .then((id) => {
        task.id = parseInt(id.toString());
        setTasks((tasks) => [task, ...tasks]);
      });
  };

  const removeTask = (task: Task) => (event: MouseEvent<HTMLButtonElement>) => {
    if (task.id === undefined) {
      return;
    }
    db.table("todos")
      .delete(task.id)
      .then(() => {
        setTasks((tasks) => {
          const index = tasks.findIndex((t) => t.id === task.id);
          tasks.splice(index, 1);
          return [...tasks];
        });
      });
  };

  const toggleCompleted = (task: Task) => (
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setTasks((tasks) => {
      return tasks.map((t) => {
        if (t.id === task.id) {
          t.completed = checked;
        }
        return t;
      });
    });
  };

  const createTask = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTask({ completed: false, content: inputRef.current?.value ?? "" });
    if (inputRef.current !== null) {
      inputRef.current.value = "";
    }
    setNewFormShown(false);
  };

  return (
    <Container maxWidth="sm" disableGutters>
      <AppBar position="sticky">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6" component="h1" align="center">
            ToDo
          </Typography>
          <Button color="inherit" onClick={toggleEditing}>
            {editing ? "完了" : "編集"}
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem className={newFormShown ? "" : classes.hidden} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={false}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": labelId }}
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
                inputProps={{ "aria-labelledby": labelId }}
                onChange={toggleCompleted(task)}
              />
            </ListItemIcon>
            <form noValidate autoComplete="off">
              <InputBase value={task.content} />
            </form>
            <ListItemSecondaryAction className={editing ? "" : classes.hidden}>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={removeTask(task)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <IconButton
        className={classes.addIcon}
        aria-label="delete"
        onClick={showForm}
      >
        <AddIcon />
      </IconButton>
    </Container>
  );
};

export default App;
