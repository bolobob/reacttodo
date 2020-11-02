import React, {
  FC,
  useEffect,
  useState,
  useRef,
  FormEvent,
  ChangeEvent,
  MouseEvent,
  FocusEvent,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import db from "./db";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircle";

import Header from "./components/organisms/Header";
import NewForm from "./components/molecules/NewForm";
import TaskListItem from "./components/molecules/TaskListItem";
import { Task } from "./components/molecules/TaskListItem";

const useStyles = makeStyles({
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
    db.table("todos")
      .update(task.id, {
        completed: checked,
        updated_at: dayjs().format(),
      })
      .then(() => {
        setTasks((tasks) => {
          return tasks.map((t) => {
            if (t.id === task.id) {
              t.completed = checked;
            }
            return t;
          });
        });
      });
  };

  const updateContent = (task: Task) => (e: FocusEvent<HTMLInputElement>) => {
    e.persist();
    db.table("todos")
      .update(task.id, {
        content: e.target.value,
        updated_at: dayjs().format(),
      })
      .then(() => {
        setTasks((tasks) => {
          return tasks.map((t) => {
            if (t.id === task.id) {
              t.content = e.target.value;
            }
            return t;
          });
        });
      });
  };

  const preventSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <Header editing={editing} toggleEditing={toggleEditing}></Header>
      <List>
        <NewForm
          newFormShown={newFormShown}
          labelId={labelId}
          createTask={createTask}
          inputRef={inputRef}
        />
        {tasks.map((task) => (
          <TaskListItem
            key={`task-${task.id}`}
            task={task}
            labelId={labelId}
            toggleCompleted={toggleCompleted}
            preventSubmit={preventSubmit}
            updateContent={updateContent}
            editing={editing}
            classes={classes}
            removeTask={removeTask}
          />
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
