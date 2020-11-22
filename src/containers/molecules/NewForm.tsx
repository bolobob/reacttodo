import React, {
  FC,
  Dispatch,
  SetStateAction,
  FormEvent,
  RefObject,
} from "react";
import dayjs from "dayjs";

import db from "db";

import NewForm from "components/molecules/NewForm";
import { Task } from "components/molecules/TaskListItem";

export type Props = {
  newFormShown: boolean;
  labelId: string;
  inputRef: RefObject<HTMLInputElement>;
};

const EnhancedNewForm: FC<
  Props & {
    setTasks: Dispatch<SetStateAction<Task[]>>;
    setNewFormShown: Dispatch<SetStateAction<boolean>>;
  }
> = ({ newFormShown, labelId, inputRef, setTasks, setNewFormShown }) => {
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

  const createTask = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTask({ completed: false, content: inputRef.current?.value ?? "" });
    if (inputRef.current !== null) {
      inputRef.current.value = "";
    }
    setNewFormShown(false);
  };

  return (
    <NewForm
      newFormShown={newFormShown}
      labelId={labelId}
      inputRef={inputRef}
      createTask={createTask}
    />
  );
};

export default EnhancedNewForm;
