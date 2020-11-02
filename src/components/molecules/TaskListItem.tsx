import React, { FC, ChangeEvent, FormEvent, FocusEvent, MouseEvent } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InputBase from "@material-ui/core/InputBase";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

export type Task = {
  id?: number;
  completed: boolean;
  content: string;
  created_at?: string;
  updated_at?: string;
};

type Props = {
  task: Task;
  labelId: string;
  toggleCompleted: (
    task: Task
  ) => (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  preventSubmit: (e: FormEvent<HTMLFormElement>) => void;
  updateContent: (task: Task) => (e: FocusEvent<HTMLInputElement>) => void;
  editing: boolean;
  classes: Record<"hidden" | "addIcon", string>;
  removeTask: (task: Task) => (event: MouseEvent<HTMLButtonElement>) => void;
};

const TaskListItem: FC<Props> = ({
  task,
  labelId,
  toggleCompleted,
  preventSubmit,
  updateContent,
  editing,
  classes,
  removeTask,
}) => {
  return (
    <ListItem dense>
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
      <form noValidate autoComplete="off" onSubmit={preventSubmit}>
        <InputBase defaultValue={task.content} onBlur={updateContent(task)} />
      </form>
      <ListItemSecondaryAction className={editing ? "" : classes.hidden}>
        <IconButton edge="end" aria-label="delete" onClick={removeTask(task)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TaskListItem;
