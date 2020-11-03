import React, {
  FC,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
  FocusEvent,
  MouseEvent,
} from "react";

import dayjs from "dayjs";
import db from "db";
import TaskListItem, { Task } from "components/molecules/TaskListItem";

type Props = {
  task: Task;
  labelId: string;
  editing: boolean;
  classes: Record<"hidden" | "addIcon", string>;
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

const EnhancedTaskListItem: FC<Props> = ({
  task,
  labelId,
  editing,
  classes,
  setTasks,
}) => {
  const preventSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  return (
    <TaskListItem
      task={task}
      labelId={labelId}
      editing={editing}
      classes={classes}
      toggleCompleted={toggleCompleted}
      preventSubmit={preventSubmit}
      updateContent={updateContent}
      removeTask={removeTask}
    />
  );
};

export default EnhancedTaskListItem;
